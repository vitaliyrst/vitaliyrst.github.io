import {data} from "./data.js";
import {Path} from "./Path.js";

class Level {
    constructor(level) {
        this.data = data[level];
        this.path = new Path(level).getPath();
    }

    getData() {
        return this.data;
    }

    getPath() {
        return this.path;
    }
}

export {Level}