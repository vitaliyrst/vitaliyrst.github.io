import {Level} from "../classes/Level.js";
import {Path} from "../classes/Path.js";

class GameModel {

    constructor() {
        this.settings = new Level();
        this.data = this.settings.getData();
        this.path = this.settings.getPath();
        this.level = this.data.level;
        this.levelBg = this.data.levelBg;
        this.ballsColor = this.data.ballsColor;
        this.pointsPath = this.data.pointsPath;
        this.bulletRadius = this.data.bulletRadius;
        this.context = document.getElementById('canvas').getContext('2d');
        this.getCanvasWidth();
        this.getCanvasHeight()
    }

    createCanvas() {
        let canvas = document.getElementById('canvas');
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
    }

    updateCanvas() {
        let levelBg = new Image();
        levelBg.src = this.levelBg;
        this.context.drawImage(levelBg, 0, 0, this.canvasWidth, this.canvasHeight);
    }

    update(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    getCanvasWidth() {
        return this.canvasWidth;
    }

    getCanvasHeight() {
        return this.canvasHeight;
    }
}

export {GameModel};