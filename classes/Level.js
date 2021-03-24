import {Path} from "./Path.js";
import {data} from "./data.js";

class Level {
    constructor() {
        this.level = this.getLevel();
        this.data = data[this.level];
        this.path = new Path(this.level).getPath();
    }

    getData() {

        return this.data;
    }

    getPath() {
        return this.path;
    }

    getLevel() {
        let canvas = document.getElementById('canvas');
        return Number(canvas.getAttribute('level'));
    }
}

export {Level}