import { ImageObject } from "./ImageObject";

export type ArtistObject = {
	external_urls?: any;
	followers?: any;
	genres?: string[];
	href?: string;
	id?: string;
	images?: ImageObject[];
	name?: string;
	popularity?: number;
	type?: string;
	uri?: string
};