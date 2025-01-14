import { ImageObject } from "./ImageObject";

export type SimplifiedPlaylistObject = {
	collaborative?: boolean;
	description?: string;
	external_urls?: any;
	href?: string;
	id?: string;
	images?: ImageObject[];
	name?: string;
	owner?: any;
	public?: boolean;
	snapshot_id?: string;
	tracks?: any;
	type?: string;
	uri?: string
};