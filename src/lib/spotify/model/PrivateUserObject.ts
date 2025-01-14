import { ImageObject } from "./ImageObject";

export type PrivateUserObject = {
	country?: string;
	display_name?: string;
	email?: string;
	explicit_content?: any;
	external_urls?: any;
	followers?: any;
	href?: string;
	id?: string;
	images?: ImageObject[];
	product?: string;
	type?: string;
	uri?: string
};