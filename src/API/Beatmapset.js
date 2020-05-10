import Beatmap from "./Beatmap";

class BeatmapsetCovers {
    constructor(data) {
        this.cover = data.cover;
        this.cover2x = data["cover@2x"];
        this.card = data.card;
        this.card2x = data["card@2x"];
        this.list = data.list;
        this.list2x = data["list@2x"];
        this.slimcover = data.slimcover;
        this.slimcover2x = data["slimcover@2x"];
    }
}

export default class Beatmapset {
    constructor(data) {
        /** 
         * Song's artist
         * @type {String}
         */
        this.artist = data.artist;
        /**
         * Cover images
         * @type {BeatmapsetCovers}
         */
        this.covers = new BeatmapsetCovers(data.covers);
        /**
         * Mapset creator
         * @type {{id: Number, nickname: String}}
         */
        this.creator = {
            id: data.user_id,
            nickname: data.creator
        };
        /**
         * Favourites count
         * @type {Number}
         */
        this.favourites = data.favourite_count;
        /**
         * Beatmapset ID
         * @type {Number}
         */
        this.id = data.id;
        /**
         * Playcount
         * @type {Number}
         */
        this.playcount = data.play_count;
        /**
         * Music preview link
         * @type {String}
         */
        this.preview = "https:" + data.preview_url;
        /**
         * Song source
         * @type {String}
         */
        this.source = data.source;
        /**
         * Mapset status (ranked, loved, etc.)
         * @type {String}
         */
        this.status = data.status;
        /**
         * Song title
         * @type {String}
         */
        this.title = data.title;
        /**
         * Mapset extra (video/storyboard)
         * @type {{video:Boolean,storyboard:Boolean}}
         */
        this.extra = {
            video: data.video,
            storyboard: data.storyboard
        };
        /**
         * Is mapset available for download
         * @type {Boolean}
         */
        this.canDownload = !data.availability.download_disabled;
        /**
         * Song BPM
         * @type {Number}
         */
        this.bpm = data.bpm;
        /**
         * Last updated date
         * @type {Date}
         */
        this.lastUpdated = new Date(data.last_updated);
        /**
         * Ranked/Loved date
         * @type {Date}
         */
        this.rankedDate = new Date(data.ranked_date);
        /**
         * Has user favourited the mapset
         * @type {Boolean}
         */
        this.isFavourite = data.has_favourited;
        /**
         * Array of beatmaps in mapset (unsorted)
         * @type {Beatmap[]}
         */
        this.beatmaps = data.beatmaps.map(m => new Beatmap(m));
    }
}