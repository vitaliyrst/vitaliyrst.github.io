import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";

class BallController {
    constructor(totalBalls, frog) {
        this.totalBalls = totalBalls;
        this.frog = frog;
        this.balls = [];
        this.views = [];
        this.path = [];
        this.knockedDownBalls = [];
        this.bullets = [];
        this.createFirstBall();
        this.combo = 0;
    }

    updateSize(width, height) {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].updateSize(width, height);
        }
    }

    getRandomBall() {
        this.totalBalls--;
        return new BallModel();
    }


    createFirstBall() {
        let ball = this.getRandomBall();
        let view = new BallView(ball);
        this.views.unshift(view);
        this.balls.unshift(ball);

        ball.setPosition(18);
        this.path = ball.path;
    }

    createFasterBalls() {
        if (this.balls.length < this.totalBalls / 2) {
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].update(6);
            }

            if (this.balls[0].getPathSection() === 36) {
                let ball = this.getRandomBall();
                let view = new BallView(ball);
                this.views.unshift(view);
                this.balls.unshift(ball);
                ball.setPosition(18);
            }
        }
    }

    createBalls() {
        if (this.balls.length !== 0) {
            this.getNextBall(0, 1);

            if (this.balls[0].getPathSection() === 36 && this.totalBalls !== 0 && this.totalBalls > 0) {
                let ball = this.getRandomBall();
                let view = new BallView(ball);
                this.views.unshift(view);
                this.balls.unshift(ball);
                ball.setPosition(18);
            }
        }
    }

    getNextBall(index, speed) {
        let tempBalls = [];
        tempBalls.push(this.balls[index]);

        for (let i = index; i < this.balls.length - 1; i++) {
            if ((this.balls[i + 1].getPathSection() - this.balls[i].getPathSection()) <= 18) {
                if ((this.balls[i + 1].getPathSection() - this.balls[i].getPathSection()) < 18) {
                    this.balls[i + 1].update(3);
                    /*this.balls[i + 1].setPosition(this.balls[i].getPathSection() + 18);*/
                }

                tempBalls.push(this.balls[i + 1]);
            } else {
                break;
            }
        }

        for (let j = 0; j < tempBalls.length; j++) {
            tempBalls[j].update(speed);
        }

        if (this.balls[this.balls.length - 1].getPathSection() >= this.path.length - 18) {
            this.balls.splice(this.balls.length - 2, 1);
        }

    }

    insertBall(ball, index, label) {
        let x;
        let y;
        let insertPosition;

        if (label === 'next') {
            insertPosition = this.balls[index].getPathSection() + 18;

            if (this.balls[index + 1] &&
                (this.balls[index + 1].getPathSection() - this.balls[index].getPathSection()) < 36) {
                this.knockedDownBalls.push([ball, this.balls[index + 1]]);
            } else {
                if (this.balls[index - 1] &&
                    (this.balls[index - 1].getPathSection() - this.balls[index].getPathSection()) < 36) {
                    this.knockedDownBalls.push([ball, this.balls[index]])
                } else {
                    insertPosition = this.balls[index].getPathSection() - 18;
                }
            }
        }

        this.insertMotion(ball, insertPosition);
    }

    checkTail(index, clear) {
        let tempBalls = [];
        tempBalls.push(this.balls[index]);
        let color = this.frog.color;
        let i = index + 1;

        while (this.balls[i]) {

            if (this.balls[i].color === color) {
                if (this.balls[i].getPathSection() - this.balls[i - 1].getPathSection() <= 18) {
                    tempBalls.push(this.balls[i]);
                    i++;
                } else if (!clear) {
                    tempBalls.push(this.balls[i]);
                    i++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        let j = index - 1;

        while (this.balls[j]) {
            if (this.balls[j].color === color) {
                if (this.balls[j + 1].getPathSection() - this.balls[j].getPathSection() <= 18) {
                    tempBalls.push(this.balls[j]);
                    j--;
                } else if (!clear) {
                    tempBalls.push(this.balls[j]);
                    j--;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        j++;

        if (tempBalls.length > 2 && clear) {

            this.clearBalls(j, tempBalls);
        }
        return tempBalls.length;
    }

    clearBalls(index, tempBalls) {
        this.combo++;

        let tempScore = 0;

        for (let i = 0; i < tempBalls.length; i++) {
            tempScore += 1;
        }

        if (this.balls.length === tempBalls.length) {
            console.log(1);
        }

        this.balls.splice(index, tempBalls.length);
this.views.splice(index,tempBalls.length)
        if (this.totalBalls === 0) {
            console.log(22);
            /*this.checkColor(tempBalls[0].color);*/
        }
    }

    insertMotion(ball, insertPosition) {
        let index;

        for (let i = 0; i < this.balls.length; i++) {
            if (this.balls[i].pathSection > insertPosition) {

                index = i;
                break;
            }
            if (i === this.balls.length - 1) {
                index = i + 1;
            }
        }

        /*this.knockedDownBalls.splice(this.knockedDownBalls.indexOf(ball), 1);*/

        ball.setPosition(insertPosition);

        this.balls.splice(index, 0, ball);
        let view = new BallView(ball);
        this.views.splice(index, 0, view);
        this.checkTail(index, true);

        // проверка оставшихся цветов
        /*  if (this.balls[index - 1] &&
              this.balls[index - 1].color === this.balls[index].color &&
              this.balls[index].getPathSection() - this.balls[index - 1].getPathSection() > 17
          ) {
              this.
          }*/
    }

    checkCollision(bullet) {
        let ball = bullet;

        for (let i = 0; i < this.balls.length; i++) {

            let dx = this.balls[i].x - ball.x;
            let dy = this.balls[i].y - ball.y;
            let distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance <= 36) {
                this.frog.down = 1;
                return i;
            }
        }
        return -1;
    }

    shoot() {
        let angle = this.frog.bulletAngle;
        let bullet = this.frog.getBullet();
        this.bullets.push([bullet, angle]);
    }

    shooting() {
        if (this.frog.bulletState === 1) {


            let flag = this.checkCollision({x: this.frog.bulletLeft, y: this.frog.bulletTop});
            /*if (flag === -1) {
                this.frog.bulletLeft
            }*/

            let ball = this.frog.bulletLeft;
            let angle = this.frog.bulletAngle;
            let dy = 11;

            if (flag !== -1) {

                let ball = this.getRandomBall();

                ball.color = this.frog.color;


                let view = new BallView(ball);
                this.views.push(view)

                this.insertBall(ball, flag, 'next');
            }

        }

    }

    draw() {
        console.log(this.totalBalls)
        this.shooting()
        if (this.balls.length < this.totalBalls / 2) {
            this.createFasterBalls()
        } else {
            this.createBalls();
        }
        for (let i = 0; i < this.balls.length; i++) {
            this.views[i].draw();
        }
    }
}

export {
    BallController
}