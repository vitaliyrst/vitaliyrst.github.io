import {BallModel} from "./BallModel.js";
import {FrogModel} from "./FrogModel.js";
import {GameModel} from "./GameModel.js";

class MainModel {
    constructor() {
        this.game = this.createGame();
        this.frog = this.createFrog();
    }

    createGame() {
        return new GameModel();
    }

    createBall() {
        return new BallModel();
    }

    createFrog() {
        return new FrogModel();
    }

    run() {
        let frog = this.createFrog();
        frog.updateBullet();
        frog.updateFrogAngle();
    }
}

export {MainModel}