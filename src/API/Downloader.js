import { EventEmitter } from "events";
import Beatmapset from "./Beatmapset";
const limit = 2;

export default class Downloader extends EventEmitter {
    /**
     * @type {Client} client
     */
    constructor(client) {
        super();
        /**
         * @type {Client}
         */
        this.client = client;
        /**
         * @type {{ mapset: Beatmapset }[]}
         */
        this.queue = [];

        this.setMaxListeners(1e3);
    }

    /**
     * @param {Beatmapset} mapset
     */
    async download(mapset) {
        let { createWriteStream } = window.fs;

        let { stream, headers } = await this.client.downloadBeatmapset(mapset.id);
        let fileName = `${mapset.id} ${mapset.artist} - ${mapset.title}.osz`.replace(/[^0-9A-Za-z!@#$%^&()_+=[\]'. -]/g, "");
        let writeStream = createWriteStream(`${window.Config.songs_path}/${fileName}`);

        const totalLength = parseInt(headers['content-length']);
        let dlLength = 0;
        
        stream.on("data", (chunk) => {
            dlLength += chunk.length;
            // this.queue[this.queue.findIndex(q => q.mapset.id === mapset.id)].progress = dlLength / totalLength;
            this.emit('progress', { id: mapset.id, progress: dlLength / totalLength * 100 });
        });

        stream.on("end", () => {
            this.queue.splice(this.queue.findIndex(m => m.id === mapset.id), 1);
            this.emit('done', { id: mapset.id });
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
        if(this.queue.find(m => m.id === mapset.id))
            throw new Error("This mapset is already in queue");
        this.queue.push(mapset);
        if(this.queue.length <= limit)
            this.download(mapset);
    }
}