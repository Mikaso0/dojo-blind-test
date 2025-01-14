import { TrackObject } from "./TrackObject";
import { EpisodeObject } from "./EpisodeObject";

export type CurrentlyPlayingContextObject = {
	device?: any;
	repeat_state?: string;
	shuffle_state?: boolean;
	context?: any;
	timestamp?: number;
	progress_ms?: number;
	is_playing?: boolean;
	item?: (TrackObject | EpisodeObject);
	currently_playing_type?: string;
	actions?: any
};