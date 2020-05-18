import semver from "semver";
import { version, repository } from "../package.json";

const axios = window.axios;

export default async function CheckUpdates() {
    let repo = repository.split("github.com/")[1];
    let { data } = await axios.get(`https://api.github.com/repos/${repo}/releases/latest`);
    if(data.message) return null;
    let lastVersion = semver.valid(semver.coerce(data.tag_name));
    let nowVersion = semver.valid(semver.coerce(version));
    if(semver.lt(nowVersion, lastVersion))
        return lastVersion;
    return null;
}

// export default class Updater {
//     constructor() {
//         this.version = semver.valid(semver.coerce(version));
//     }

//     async check() {
//         let repo = repository.split("github.com/")[1];
//         let { data } = await axios.get(`https://api.github.com/repos/${repo}/releases`);
//         if(!data[0]) return null;
//         let newVersion = data[0].tag_name;
//         if(semver.lt(this.version, newVersion)) {
//             return newVersion;
//         }
//         return null;
//     }
// }