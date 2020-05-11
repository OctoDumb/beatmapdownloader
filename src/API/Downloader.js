import Client from "./Client";
import Beatmapset from "./Beatmapset";

const limit = 2;

export default class Downloader {
    /**
     * @type {Client} client
     */
    constructor(client) {
        /**
         * @type {Client}
         */
        this.client = client;
        /**
         * @type {{ mapset: Beatmapset, progress: Number }[]}
         */
        this.queue = [];
    }

    /**
     * @param {Number} mapsetId
     */
    async download(mapsetId) {
        let { createWriteStream } = window.fs;

        let { stream, headers } = await this.client.downloadBeatmapset(mapsetId);
        let writeStream = createWriteStream(`${window.Config.songs_path}/${mapsetId}.osz`);

        const totalLength = parseInt(headers['content-length']);
        let dlLength = 0;
        
        stream.on("data", (chunk) => {
            dlLength += chunk.length;
            this.queue[this.queue.findIndex(q => q.mapset.id === mapsetId)].progress = dlLength / totalLength;
        });

        stream.on("end", () => {
            this.queue.splice(this.queue.findIndex(q => q.mapset.id === mapsetId), 1);
            if(this.queue.length >= limit)
                this.download(this.queue[1].mapset.id);
        });

        stream.pipe(writeStream);
    }

    /**
     * 
     * @param {Beatmapset} mapset
     */
    add(mapset) {
        if(this.queue.find(q => q.mapset.id === mapset.id))
            throw "This mapset is already in queue";
        this.queue.push({ mapset, progress: 0 });
        if(this.queue.length <= limit)
            this.download(mapset.id);
    }
}