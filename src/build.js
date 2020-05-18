const builder = require('electron-builder');
const { version } = require('../package.json');

var config = {
    appId: 'org.octodumb.beatmapdownloader',
    buildDependenciesFromSource: true,
    win: {
        target: 'nsis',
    }
};

(async function() {
    console.log("Building ia32");
    var ia32 = await builder.build({
        config: { 
            ...config, 
            productName: "Beatmap Downloader",
            artifactName: `Beatmap Downloader ${version} Setup x32.\${ext}` 
        },
        ia32: true
    });
    console.log("Finished building", ia32);

    console.log("Building x64");
    var x64 = await builder.build({
        config: { 
            ...config, 
            productName: "Beatmap Downloader",
            artifactName: `Beatmap Downloader ${version} Setup x64.\${ext}` 
        },
        x64: true
    });
    console.log("Finished building", x64);
})();