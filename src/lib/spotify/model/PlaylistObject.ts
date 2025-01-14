import { ImageObject } from "./ImageObject";

export type PlaylistObject = {
	collaborative?: boolean;
	description?: string;
	external_urls?: any;
	followers?: any;
	href?: string;
	id?: string;
	images?: ImageObject[];
	name?: string;
	owner?: any;
	public?: boolean;
	snapshot_id?: string;
	tracks?: {};
	type?: string;
	uri?: string
};