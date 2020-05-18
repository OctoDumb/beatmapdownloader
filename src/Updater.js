import semver from "semver";
import { version } from "../package.json";

const axios = window.axios;

export default async function CheckUpdates() {
    try {
        let { data } = await axios.get(`https://api.github.com/repos/OctoDumb/beatmapdownloader/releases/latest`);
        if(data.message) return null;
        let lastVersion = semver.valid(semver.coerce(data.tag_name));
        let nowVersion = semver.valid(semver.coerce(version));
        if(semver.lt(nowVersion, lastVersion))
            return data.tag_name;
        return null;
    } catch (e) {
        return null;
    }
    
    
}