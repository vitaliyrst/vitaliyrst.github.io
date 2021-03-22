import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";

class BallController {
    constructor(totalBalls, frog) {
        this.totalBalls = totalBalls;
        this.frog = frog;
        this.balls = [];
        this.views = [];
        this.path = [];
        this.createFirstBall();
    }



    getRandomBall() {
        this.totalBalls--;
        return new BallModel();
    }

    pushNextBall(index, step) {
        let tempBalls = [];
        tempBalls.push(this.balls[index]);

        for (let i = index; i < this.balls.length - 1; ++i) {
            if ((this.balls[i + 1].getPathSection() - this.balls[i].getPathSection()) <= 18) {

                if ((this.balls[i + 1].getPathSection() - this.balls[i].getPathSection()) < 18) {
                    this.balls[i + 1].setPosition(this.balls[i].getPathSection() + 18);
                }
                tempBalls.push(this.balls[i + 1]);
            } else {
                break;
            }
        }

        for (let j = 0; j < tempBalls.length; ++j) {
            console.log(1)
            tempBalls[j].updatePosition(step);
        }

        if (this.balls[this.balls.length - 1].getPathSection() >= this.path.length - 19) {
            console.log(    1)
            this.balls.splice(this.balls.length - 1, 1);
        }

    }

    createFirstBall() {
        let ball = this.getRandomBall();
        let view = new BallView(ball);
        this.views.push(view);
        this.balls.unshift(ball);

        ball.setPosition(18);
        this.path = ball.path;
    }

    createFasterBalls() {
        if (this.balls.length < 20) {
            for (let i = 0; i < this.balls.length; ++i) {
                this.balls[i].updatePosition(6);
            }

            if (this.balls[0].getPathSection() === 36) {
                console.log(1);
                let ball = this.getRandomBall();
                let view = new BallView(ball);
                this.views.push(view);
                this.balls.unshift(ball);
                ball.setPosition(18);
            }
        }
    }

    createBalls() {
        if (this.balls.length !== 0) {
            this.pushNextBall(0, 1);

            if (this.balls[0].getPathSection() === 36 && this.totalBalls !== 0) {
                console.log(this.balls)
                let ball = this.getRandomBall();
                let view = new BallView(ball);
                this.views.push(view);
                this.balls.unshift(ball);
                ball.setPosition(18);
            }
        }
    }

    updateSize(width, height) {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].updateSize(width, height);
        }
    }

    draw() {
        if (this.balls.length < 20) {
            this.createFasterBalls()
        } else {
            this.createBalls();
        }
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
            this.views[i].draw();
        }
    }
}

export {BallController}