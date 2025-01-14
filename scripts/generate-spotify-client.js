import { mkdir, writeFile } from "fs/promises";

import openapi from "../openapi.json" assert { type: 'json' };
import { Console } from "console";

const targetDirectory = "src/lib/spotify/model";

async function generateSpotifyClient() {
  console.log("\nLaunched generate-spotify-client script");
  console.log('Generating Spotify client from OpenApi spec file...\n')
  await mkdir(targetDirectory, { recursive: true }); // Generate target directory

  const schemas = openapi.components.schemas;
  const typesToGenerate = Object.keys(schemas);

  for (const typeName of typesToGenerate) {
    const typeSchema = schemas[typeName];
    generateType(typeName, typeSchema);
  }
}

function generateType(typeName, typeSchema) {  
  console.log(`Generating type ${typeName}...`);

  const generatedCode = getGeneratedCode(typeName, typeSchema);

  writeFile(`${targetDirectory}/${typeName}.ts`, generatedCode);
}

function getGeneratedCode(typeName, typeSchema) {
  const [generatedType, generatedImports] = generatedTypeAndImports(typeSchema, []);

  let generatedCode = "";
  if (Array.isArray(generatedImports)) {
    generatedImports.forEach((element) => {
      if (element) {
        generatedCode += `import { ${element} } from "./${element}";\n`;
      }
    });
  }

  generatedCode += `\nexport type ${typeName} = ${generatedType};`;
  return generatedCode;
}

function generatedTypeAndImports(typeSchema, imports) {
  if ("$ref" in typeSchema) {
    const ref = typeSchema["$ref"].split("/").pop();
    imports.push(ref);
    return [ref, imports];
  }

  if ("oneOf" in typeSchema) {
    let properties = [];
    let allImports = [...imports]; 
    Object.keys(typeSchema.oneOf).forEach( (element) => {
      const [propType, propImports] = generatedTypeAndImports(typeSchema.oneOf[element], allImports);
      allImports = [...new Set([...allImports, ...propImports])];
      properties.push(propType);
    });
    const types = "(" + properties.join(" | ") + ")"
    return [types, allImports];
  }

  const schemaType = typeSchema.type;

  switch (schemaType) {
    case "number":
    case "integer":
      return ["number", imports];
    case "string":
      return ["string", imports];
    case "boolean":
      return ["boolean", imports];
    case "array":
      const [propType, propImports] = generatedTypeAndImports(typeSchema.items, imports)
      return [propType + "[]", [...new Set([...imports, ...propImports])]];
    case "object":
      if ("properties" in typeSchema) {
        let allImports = [...imports]
        const properties = Object.keys(typeSchema.properties)
          .map(element => {
            const [propType, propImports] = generatedTypeAndImports(typeSchema.properties[element], []);
            allImports = [...new Set([...allImports, ...propImports])];
            const isRequired =
              "required" in typeSchema &&
              typeSchema.required.includes(element);
            return "\t" + element + (isRequired ? "" : "?") + ": " + propType;
          })
          .join(";\n");
        return [`{\n${properties}\n}`, allImports];
      }
      else {return ["{}", imports];}
    default:
      return ["any", imports];
  }
}


generateSpotifyClient();