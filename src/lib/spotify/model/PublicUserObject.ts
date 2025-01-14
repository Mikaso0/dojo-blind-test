import { ImageObject } from "./ImageObject";

export type PublicUserObject = {
	display_name?: string;
	external_urls?: any;
	followers?: any;
	href?: string;
	id?: string;
	images?: ImageObject[];
	type?: string;
	uri?: string
};