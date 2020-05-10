import { default as axios } from "axios";
import qs from "querystring";
import { ReadStream } from "fs";
import Beatmapset from "./Beatmapset";

export default class Client {
    constructor() {
        this.api = axios.create({
            baseURL: "https://osu.ppy.sh/api/v2",
            timeout: 10e3
        });
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
        let { data } = await axios.default.post('https://osu.ppy.sh/oauth/token', {
            username,
            password,
            grant_type: "password",
            client_id: 5,
            client_secret: "FGc9GAtyHzeQDshWP5Ah7dega8hJACAJpQtw6OXk",
            scope: "*"
        });
        if(!data.access_token)
            return false;
        this.token = data.access_token;
        this.refresh_token = data.refresh_token;
        return true;
    }

    /**
     * Refreshes token
     * 
     * @returns {Promise<true>} Always returns true
     */
    async refresh() {
        if(!this.refresh_token)
            throw "No refresh token";
        let { data } = await axios.default.post('https://osu.ppy.sh/oauth/token', {
            client_id: 5,
            client_secret: "FGc9GAtyHzeQDshWP5Ah7dega8hJACAJpQtw6OXk",
            grant_type: "refresh_token",
            refresh_token: this.refresh_token,
            scope: "*"
        });
        this.token = data.access_token;
        this.refresh_token = data.refresh_token;
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
        try {
            let { data } = await this.api.get(`${method}${qs.stringify(query)}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return data;
        } catch(e) {
            if(e.response.status == 401) {
                await this.refresh();
                return this.request(method, query);
            }
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
        let { data } = await this.request('/beatmapsets/search', { 
            q: params.query || null,
            s: params.status || 'leaderboard',
            m: params.mode || null,
            c: params.general ? params.general.join('.') : null,
            cursor: params.cursor || null
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
            throw "No mapset ID provided";
        let { data, headers } = await this.api.get(`/beatmapsets/${mapsetId}/download`, {
            responseType: "stream"
        });
        return {
            stream: data,
            headers
        };
    }
}