import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";

class BallController {
    constructor(totalBalls, frog) {
        this.totalBalls = totalBalls;
        this.frog = frog;
        this.ballId = 0;
        this.balls = [];
        this.views = [];
        this.temps = [];
    }

    createBall() {
        if (this.totalBalls && this.ballId === 0) {
            let ball = new BallModel();
            let ballView = new BallView(ball);
            this.balls.push(ball);
            this.views.push(ballView);
            this.ballId++;
            this.totalBalls--;
        }

        if (this.totalBalls && this.ballId !== 0) {
            if (this.balls[this.ballId - 1].pathSection === 18) {
                let ball = new BallModel();
                let ballView = new BallView(ball);
                this.balls.push(ball);
                this.views.push(ballView);
                this.ballId++;
                this.totalBalls--;
            }
        }
        /*if (this.balls.length < this.totalBalls)
        if (this.ballId === 0) {

            let ball = new BallModel();
            let ballView = new BallView(ball);
            ball.ballId = this.ballId;
            this.balls.push(ball);
            this.views.push(ballView);
            this.ballId++;
            this.totalBalls--;

        } else if (this.balls[this.ballId - 1].pathSection === 18) {

            let ball = new BallModel();
            let ballView = new BallView(ball);
            ball.ballId = this.ballId;
            this.balls.push(ball);
            this.views.push(ballView);
            this.ballId++;
            this.totalBalls--;

        }*/
    }

    checkCollision() {
        for (let i = 0; i < this.balls.length; i++) {
            let dx = this.balls[i].x - this.frog.bulletLeft + this.frog.bulletRadius * 2;
            let dy = this.balls[i].y - this.frog.bulletTop + this.frog.bulletRadius * 2;
            let distance = Math.sqrt(dx*dx + dy*dy)
            /*let xMax = Math.max(this.frog.bulletLeft, this.balls[i].x);
            let xMin = Math.min(this.frog.bulletLeft, this.balls[i].x);
            let yMax = Math.max(this.frog.bulletTop, this.balls[i].y);
            let yMin = Math.min(this.frog.bulletTop, this.balls[i].y);*/

            /*if (this.frog.bulletState === 1 &&
                xMax - xMin <= this.frog.bulletRadius &&
                yMax - yMin <= this.frog.bulletRadius
            )*/
            if(distance <= this.frog.bulletRadius){
                console.log(distance)
                this.frog.stopBullet();
                /*let currentBall = this.balls[i];

                this.frog.stopBullet();
                if (this.frog.color !== this.balls[i].color) {
                    let pos = i;
                    let x = this.balls[i - 1].x;
                    let y = this.balls[i - 1].y;
                    let pathSection = this.balls[pos - 1].pathSection;
                    let ball = new BallModel();
                    let ballView = new BallView(ball);
                    ball.x = x;
                    ball.y = y;
                    ball.pathSection = pathSection;
                    ball.color = this.frog.color;
                    for (let j = 0; j < i; j++) {
                        setTimeout(() => {
                            this.balls[j].speed += 2;
                            setTimeout(() => {
                                this.balls[j].speed = 1;
                            }, 130)
                        }, 0);


                    }
                    this.balls.splice(pos, 0, ball);


                }
                this.frog.stopBullet();
*/
            }
        }
    }

    updateSize(width, height) {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].updateSize(width, height);
        }
    }

    draw() {
        if (this.totalBalls) {
            this.createBall();
        }

        for (let i = 0; i < this.balls.length; i++) {
            this.checkCollision();
            this.balls[i].update();
            this.views[i].draw();
        }
    }

}

export {BallController}