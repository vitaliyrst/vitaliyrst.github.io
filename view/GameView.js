import {Level} from "../classes/Level.js";

class GameView {
    constructor() {
        this.settings = new Level(2);
        this.data = this.settings.getData();
        this.level = this.data.level;
        this.levelBg = this.data.levelBg;
        this.canvasWidth = this.data.canvasWidth;
        this.canvasHeight = this.data.canvasHeight;
        this.ballsColor = this.data.ballsColor;
        this.ballRadius = this.data.ballRadius;
        this.bulletRadius = this.data.bulletRadius;
        this.frogLeft = this.data.frogLeft;
        this.frogTop = this.data.frogTop;
        this.frogWidth = this.data.frogWidth;
        this.frogHeight = this.data.frogHeight;
        this.ballsColor = this.data.ballsColor;
        this.context = document.getElementById('canvas').getContext('2d');
    }
}

export {GameView}