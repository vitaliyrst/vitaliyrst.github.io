import {Level} from "../classes/Level.js";
import {Path} from "../classes/Path.js";

class GameModel {

    constructor() {
        this.settings = new Level();
        this.data = this.settings.getData();
        this.path = this.settings.getPath();
        this.level = this.data.level;
        this.levelBg = this.data.levelBg;
        this.canvasWidth = this.data.canvasWidth;
        this.canvasHeight = this.data.canvasHeight;
        this.ballsColor = this.data.ballsColor;
        this.pointsPath = this.data.pointsPath;
        this.ballRadius = this.data.ballRadius;
        this.bulletRadius = this.data.bulletRadius;
        this.context = document.getElementById('canvas').getContext('2d');
    }

    createCanvas() {
        this.context.canvas.width = this.canvasWidth;
        this.context.canvas.height = this.canvasHeight;
    }

    updateCanvas() {
        let levelBg = new Image();
        levelBg.src = this.levelBg;
        this.context.drawImage(levelBg, 0, 0, this.canvasWidth, this.canvasHeight);
    }
}

export {GameModel};