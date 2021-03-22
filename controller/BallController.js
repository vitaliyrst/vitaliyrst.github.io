import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";

class BallController {
    constructor(totalBalls, frog) {
        this.totalBalls = totalBalls;
        this.frog = frog;
        this.ballId = 0;
        this.balls = [];
        this.views = [];
        this.path = [];
        this.initBall();

    }

    initBall() {
        let ball = this.getRandomBall();
        let view = new BallView(ball);
        this.views.push(view);
        this.balls.unshift(ball);

        ball.setPosition(18);
        this.path = ball.path;
    }

    rollIn() {
        if (this.balls.length < 20) {
            for (let i = 0; i < this.balls.length; ++i) {

                this.balls[i].updatePosition(6);
            }
            console.log(this.balls[0].pathSection)
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

    introduceBall() {
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

    /*createBall() {
        if (this.totalBalls && this.ballId === 0) {
            let ball = new BallModel();
            ball.ballId = this.ballId;
            let ballView = new BallView(ball);
            this.balls.push(ball);
            this.views.push(ballView);
            this.ballId++;
            this.totalBalls--;
        }

        if (this.totalBalls && this.ballId !== 0) {
            if (this.balls[this.ballId - 1].pathSection === 18) {
                let ball = new BallModel();
                ball.ballId = this.ballId;
                let ballView = new BallView(ball);
                this.balls.unshift(ball);
                this.views.unshift(ballView);
                this.ballId++;
                this.totalBalls--;
            }
        }*/

    checkCollision() {
        for (let i = 0; i < this.balls.length; i++) {
            /*let dx = this.balls[i].x - this.frog.bulletLeft + this.frog.bulletRadius * 2;
            let dy = this.balls[i].y - this.frog.bulletTop + this.frog.bulletRadius * 2;
            let distance = Math.sqrt(dx*dx + dy*dy);*/
            let xMax = Math.max(this.frog.bulletLeft, this.balls[i].x);
            let xMin = Math.min(this.frog.bulletLeft, this.balls[i].x);
            let yMax = Math.max(this.frog.bulletTop, this.balls[i].y);
            let yMin = Math.min(this.frog.bulletTop, this.balls[i].y);

            if (this.frog.bulletState === 1 &&
                xMax - xMin <= this.frog.bulletRadius &&
                yMax - yMin <= this.frog.bulletRadius
            ) {

                if (this.frog.color !== this.balls[i].color) {

                    let x = this.balls[i - 1].x;
                    let y = this.balls[i - 1].y;
                    let pathSection = this.balls[i - 1].pathSection;

                    let ball = new BallModel();
                    ball.x = x;
                    ball.y = y;
                    ball.pathSection = pathSection;
                    let ballView = new BallView(ball);
                    this.views.push(ballView)
                    ball.color = this.frog.color;


                    for (let j = i - 1; j >= 0; j--) {
                        setTimeout(() => {
                            this.balls[j].speed = 3;
                            setTimeout(() => {
                                this.balls[j].speed = 1;
                            }, 300)
                        }, 0);
                        this.balls[j].speed = 1;
                    }
                    this.frog.stopBullet();
                    this.balls.splice(i + 1, 0, ball);
                    console.log(this.balls)
                    continue;
                    /* this.balls.splice(i + 1, 0, ball);*/
                }
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
            this.rollIn()
        } else {
            this.introduceBall();
        }


        for (let i = 0; i < this.balls.length; i++) {

            this.balls[i].update();
            this.views[i].draw();
        }
    }

}

export {BallController}