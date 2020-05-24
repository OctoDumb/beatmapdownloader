export default class Beatmap {
    constructor(data) {
        this.id = data.id;

        this.mode = data.mode_int;

        this.stats = {
            ar: data.ar,
            cs: data.cs,
            hp: data.drain,
            od: data.accuracy
        };

        this.length = data.total_length;

        this.bpm = data.bpm;

        this.countCircles = data.count_circles;

        this.countSliders = data.count_sliders;

        this.version = data.version;

        this.stars = data.difficulty_rating;
    }
}