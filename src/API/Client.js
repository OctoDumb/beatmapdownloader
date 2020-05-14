// import qs from "querystring";
import stringify from "../qs";
import Beatmapset from "./Beatmapset";

const axios = window.axios;

export default class Client {
    /**
     * @param {Config} cfg
     */
    constructor(cfg) {
        this.config = cfg;
        this.api = axios.create({
            baseURL: "https://osu.ppy.sh/api/v2",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            }
        });
        this.logged = false;
    }

    /**
     * Logges in with player's credentials
     * 
     * @param {String} username Player's username
     * @param {String} password Player's password
     * 
     * @returns {Promise<Boolean>} Returns `true` if the user was successfully logged in
     */
    async login(username, password) {
        let { data } = await axios.post('https://osu.ppy.sh/oauth/token', {
            username,
            password,
            grant_type: "password",
            client_id: 5,
            client_secret: "FGc9GAtyHzeQDshWP5Ah7dega8hJACAJpQtw6OXk",
            scope: "*"
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            }
        });
        if(!data.access_token)
            return false;
        this.token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.config.refresh_token = this.refresh_token;
        this.config.save();
        this.logged = true;
        return true;
    }

    /**
     * Logs in with player's refresh_token
     * 
     * @returns {Promise<Boolean>} Returns `true` if the user was successfully logged in
     */
    async loginWithRefresh() {
        this.refresh_token = this.config.refresh_token;
        try {
            await this.refresh();
            this.logged = true;
            return true;
        } catch(e) {
            return false;
        }
    }

    /**
     * Refreshes token
     * 
     * @returns {Promise<true>} Always returns true
     */
    async refresh() {
        if(!this.refresh_token)
            throw new Error("No refresh token");
        let { data } = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: 5,
            client_secret: "FGc9GAtyHzeQDshWP5Ah7dega8hJACAJpQtw6OXk",
            grant_type: "refresh_token",
            refresh_token: this.refresh_token,
            scope: "*"
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            }
        });
        this.token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.config.refresh_token = this.refresh_token;
        this.refreshAfter = Date.now() + data.expires_in * 1e3 - 5e3;
        this.config.save();
        return true;
    }

    /**
     * Makes a GET request to osu! API
     * 
     * @param {String} method An API method starting with `/`
     * @param {{[key: string]: any}} query Query parameters
     * 
     * @returns {Promise<Object>} A JSON response from osu! API
     */
    async request(method, query = {}) {
        if(Date.now() > this.refreshAfter)
            await this.refresh();
        try {
            console.log('Токен', this.token)
            console.log('Рефреш токен', this.refresh_token)
            let { data } = await this.api.get(`${method}?${stringify(query)}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return data;
        } catch(e) {
            throw e;
        }
    }

    /**
     * Searches for beatmapsets
     * 
     * @param {{query?: String, status?: String, mode?: Number, general?: String[], cursor?: { approved_date: String, _id: String }}} params Search parameters
     * 
     * @returns {{beatmapsets: Beatmapset[], cursor: { approved_date: String, _id: String }, recommended: Number}}
     */
    async getBeatmapsets(params = {}) {
        let data = await this.request('/beatmapsets/search', { 
            q: params.query || undefined,
            s: params.status || 'leaderboard',
            m: typeof params.mode === 'number' ? parseInt(params.mode) : false || undefined,
            c: params.general ? params.general.join('.') : undefined,
            "cursor[approved_date]": params.cursor?.approved_date || undefined,
            "cursor[_id]": params.cursor?._id || undefined
        });
        return {
            beatmapsets: data.beatmapsets.map(s => new Beatmapset(s)),
            cursor: data.cursor,
            recommended: data.recommended_difficulty
        };
    }

    /**
     * Download beatmapset
     * 
     * @param {Number} mapsetId
     * 
     * @returns {Promise<{ stream: ReadStream, headers: {[key: string]: any} }>} Returns ReadStream for mapset's `osz`
     */
    async downloadBeatmapset(mapsetId) {
        if(!mapsetId)
            throw new Error("No mapset ID provided");
        let { data, headers } = await this.api.get(`/beatmapsets/${mapsetId}/download`, {
            responseType: "stream",
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
            timeout: 240e3
        });
        return {
            stream: data,
            headers
        };
    }
}