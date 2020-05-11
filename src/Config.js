const path = window.electron.remote.app.getPath("userData") + "\\data.json";

export default class Config {
    username = "";
    refresh_token = "";
    songs_path = "";

    load() {
        if(!window.fs.existsSync(path)) return;
        let data = JSON.parse(!window.fs.existsSync(path) ? {} : window.fs.readFileSync(path).toString());
        this.username = data.username || "";
        this.refresh_token = data.refresh_token || "";
        this.songs_path = data.songs_path = "";
        this.save();
    }

    save() {
        window.fs.writeFileSync(path, JSON.stringify({ 
            username: this.username, 
            refresh_token: this.refresh_token, 
            songs_path: this.songs_path 
        }));
    }

    resetCredentials() {
        this.username = "";
        this.refresh_token = "";
        this.save();
    }
}