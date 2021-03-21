import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";

class BallController {
    constructor(totalBalls) {
        this.totalBalls = totalBalls;
        this.ballId = 0;
        this.balls = [];
        this.temps = [];

    }

    createBall() {
        if (this.ballId === 0) {
            let ball = new BallModel();
            ball.ballId = this.ballId;
            this.balls.push(ball);
            this.ballId++;
        } else if (this.balls[this.ballId - 1].pathSection === 18) {
            let ball = new BallModel();
            ball.ballId = this.ballId;
            this.balls.push(ball);
            this.ballId++;
        }
    }

    updateSize(width, height) {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].updateSize(width, height);
        }
    }

    draw() {
        for (let j = this.totalBalls; j > this.balls.length; j--) {
            this.createBall();
        }
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
            this.balls[i].draw();
        }
    }

}

export {BallController}