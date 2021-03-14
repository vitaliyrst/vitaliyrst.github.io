import {data} from "../classes/data.js";
import {BallView} from "./BallView.js";
import {FrogView} from "./FrogView.js";

class GameView {
    constructor() {
        this.data = data;
        this.context = document.getElementById('zuma-canvas').getContext('2d');
    }

    getBallView(ball) {
        return new BallView(ball);
    }

    getFrogView(frog) {
        return new FrogView(frog);
    }
}

export {GameView}