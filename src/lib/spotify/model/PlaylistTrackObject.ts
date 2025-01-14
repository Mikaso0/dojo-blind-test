import { TrackObject } from "./TrackObject";
import { EpisodeObject } from "./EpisodeObject";

export type PlaylistTrackObject = {
	added_at?: string;
	added_by?: any;
	is_local?: boolean;
	track?: (TrackObject | EpisodeObject)
};