import {data} from "../classes/data.js";
import {GameModel} from "../model/GameModel.js";
import {GameView} from "../view/GameView.js";
import {BallModel} from "../model/BallModel.js";

class GameController {
    constructor(game, frog) {
        this.data = data;
        this.game = game;
        this.frog = frog;
        this.balls = [];
        this.ratio = 384 / 569;
        this.ballRadius = null;

        this.init();
    }

    init() {
        let canvasWidth = (innerWidth < 569) ? 569 :
            (innerWidth > 1138 && innerHeight > 768) ? 1138 :
                (innerWidth > 1138 && innerHeight < 384) ? 384 / this.ratio :
                    (innerWidth < 1138 && innerHeight > 768) ? innerWidth :
                        (innerWidth < 1138 && innerHeight < 384) ? 384 / this.ratio :
                            (innerWidth > 1138 && innerHeight < 768) ? innerHeight / this.ratio :
                                (innerWidth < 1138 && innerHeight < 768 && innerWidth > 768) ? innerWidth :
                                    innerHeight / this.ratio;

        let canvasHeight = (innerHeight < 384) ? 384 :
            (innerHeight > 768 && innerWidth > 1138) ? 768 :
                (innerHeight > 768 && innerWidth < 569) ? 569 * this.ratio :
                    (innerHeight < 768 && innerWidth > 1138) ? innerHeight :
                        (innerHeight < 768 && innerWidth < 569) ? 569 * this.ratio :
                            (innerHeight > 768 && innerWidth < 1138) ? innerWidth * this.ratio :
                                (innerHeight < 768 && innerWidth < 1138 && innerHeight > 569) ? innerHeight :
                                    innerWidth * this.ratio;

        this.game.update(canvasWidth, canvasHeight);
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
        this.game.update(width, height)

    }
}

export {GameController}