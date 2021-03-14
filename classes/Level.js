import {data} from "./data.js";
import {Path} from "./Path.js";

class Level {
    constructor() {
        this.data = data;
        this.path = new Path().getPath();
    }

    getData() {
        return this.data
    }

    getPath() {
        return this.path;
    }
}

export {Level}