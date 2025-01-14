import { SimplifiedArtistObject } from "./SimplifiedArtistObject";

export type SimplifiedTrackObject = {
	artists?: SimplifiedArtistObject[];
	available_markets?: string[];
	disc_number?: number;
	duration_ms?: number;
	explicit?: boolean;
	external_urls?: any;
	href?: string;
	id?: string;
	is_playable?: boolean;
	linked_from?: any;
	restrictions?: any;
	name?: string;
	preview_url?: string;
	track_number?: number;
	type?: string;
	uri?: string;
	is_local?: boolean
};