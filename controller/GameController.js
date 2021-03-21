import {GameModel} from "../model/GameModel.js";
import {GameView} from "../view/GameView.js";
import {FrogController} from "./FrogController.js";
import {BallController} from "./BallController.js";

class GameController {
    constructor() {
        this.game = new GameModel();
        this.view = new GameView(this.game);
        this.frogController = new FrogController();
        this.ballController = new BallController(this.game.totalBalls);
        this.view.createCanvas();
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
        this.game.updateSize(width, height);
        this.frogController.updateSize(width, height);
        this.ballController.updateSize(width, height);
    }

    draw() {
        this.view.draw();
        this.frogController.draw();
        this.ballController.draw();
    }
}

export {GameController}