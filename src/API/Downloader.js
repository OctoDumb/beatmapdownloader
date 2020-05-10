import Client from "./Client";
import Beatmapset from "./Beatmapset";
import { createWriteStream } from "fs";

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
        let { stream: readStream, headers } = await this.client.downloadBeatmapset(mapsetId);
        const basePath = "E:/1000Gb/2/osu!/Songs";
        let writeStream = createWriteStream(`${basePath}/${mapsetId}.osz`);

        const totalLength = parseInt(headers['content-length']);
        let dlLength = 0;
        
        readStream.on("data", (chunk) => {
            dlLength += chunk.length;
            this.queue[this.queue.findIndex(q => q.mapset.id == mapsetId)].progress = dlLength / totalLength;
        });

        readStream.on("end", () => {
            this.queue.splice(this.queue.findIndex(q => q.mapset.id == mapsetId), 1);
            if(this.queue.length >= limit)
                this.download(this.queue[1].mapset.id);
        });

        readStream.pipe(writeStream);
    }

    /**
     * 
     * @param {Beatmapset} mapset
     */
    add(mapset) {
        this.queue.push({ mapset, progress: 0 });
        if(this.queue.length <= limit)
            this.download(mapset.id);
    }
}