import {GameModel} from "../model/GameModel.js";
import {GameView} from "../view/GameView.js";
import {BallModel} from "../model/BallModel.js";
import {FrogController} from "./FrogController.js";

class GameController {
    constructor(game, frog) {
        this.game = game;
        this.frog = frog;
        this.frogController = new FrogController();
        this.balls = [];
    }

    resize() {
        let container = document.querySelector('.zuma_field');
        let offsetWidth = container.clientWidth;
        let offsetHeight = container.clientHeight;

        let canvas = document.getElementById('canvas');
        let canvasRatio = 384 / 569;
        let windowRatio = (offsetWidth > offsetHeight) ? offsetHeight / offsetWidth : offsetWidth / offsetHeight;

        let width;
        let height;

        if (windowRatio < canvasRatio) {
            height = offsetHeight;
            width = height / canvasRatio;
        } else {
            width = offsetWidth;
            height = width * canvasRatio;
        }
        canvas.width = width;
        canvas.height = height;
        this.game.updateCanvasSize(width, height);
        this.frogController.updateSize(width,height);
    }

    draw() {
        this.frogController.draw();
    }
}

export {GameController}