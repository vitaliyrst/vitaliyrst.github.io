import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";

class BallController {
    constructor(totalBalls, frog) {
        this.frog = frog;
        this.totalBalls = totalBalls;
        this.balls = [];
        this.spacing = 20;
        this.path = [];
        this.views = [];
        this.createFirstBall();

        this.checkPushBallCollision = false;
        this.knockedDownBalls = [];
        this.bullets = [];

        this.combo = 0;
        this.ballNeedShift = false;
        this.shiftedBalls = [];

    }

    /**
     * @param width {width}
     * @param height {height}
     * Ресайз свойств
     */
    updateSize(width, height) {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].updateSize(width, height);
        }
    }

    /**
     * @method
     * Создание первого шара
     */
    createFirstBall() {
        let ball = this.getRandomBall();
        let view = new BallView(ball);
        this.views.unshift(view);
        this.balls.unshift(ball);

        ball.setPosition(this.spacing);
        this.path = ball.path;
    }

    /**
     * @method
     * Создание быстрых шаров
     */
    createFasterBalls() {
        if (this.balls.length < this.totalBalls / 2) {

            let speed = 10;
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].update(speed);
            }

            if (this.balls[0].getPathSection() === this.spacing * 2) {
                let ball = this.getRandomBall();
                let view = new BallView(ball);
                this.views.unshift(view);
                this.balls.unshift(ball);

                ball.setPosition(this.spacing);
            }
        }
    }

    /**
     * @method
     * Создание шаров
     */
    createBalls() {
        if (this.balls.length !== 0) {

            // Подталкивание шаров
            this.pushNextBall(0, 1);

            if (this.balls[0].getPathSection() === this.spacing * 2 &&
                this.totalBalls !== 0 && this.totalBalls > 0
            ) {
                let ball = this.getRandomBall();
                let view = new BallView(ball);
                this.views.unshift(view);
                this.balls.unshift(ball);
                ball.setPosition(this.spacing);
            }
        }
    }

    /**
     * @method
     * @return {BallModel}
     * Создание случайного шара (случайный цвет)
     */
    getRandomBall() {
        this.totalBalls--;
        return new BallModel();
    }

    /**
     * @method
     * @param index {Number}
     * @param speed {Number}
     * Подталкивание передних шаров
     */
    pushNextBall(index, speed) {
        let tempBalls = [];
        tempBalls.push(this.balls[index]);

        // Подталкивание при вставке нового шара
        for (let i = index; i < this.balls.length - 1; i++) {

            if (this.balls[i + 1].getPathSection() - this.balls[i].getPathSection() <= this.spacing) {

                if (this.balls[i + 1].getPathSection() - this.balls[i].getPathSection() < this.spacing) {
                    this.balls[i + 1].update(1);
                }

                tempBalls.push(this.balls[i + 1]);
            } else {
                break;
            }
        }

        // Обновление позиции шаров за тик
        for (let j = 0; j < tempBalls.length; j++) {
            tempBalls[j].update(speed);
        }

        // Удаление шаров, если дойдут до черепа
        if (this.balls[this.balls.length - 1].getPathSection() >= this.path.length - this.spacing) {
            this.balls.splice(this.balls.length - 2, 1);
            this.checkPushBallCollision = false;

            // конец игры, отключаем музыку, запрещаем стрелять, играем музыку проигрыша, удаляем ссылки на шары
        }

    }

    /**
     * @method
     * @param ball {BallModel}
     * @param index {Number}
     * @param position {String}
     * Проверка позиции вставки
     */
    insertPositionCheck(ball, index, position) {
        let insertPosition;

        if (position === 'next') {
            insertPosition = this.balls[index].getPathSection() + this.spacing;

            if (this.balls[index + 1] &&
                this.balls[index + 1].getPathSection() - this.balls[index].getPathSection() < this.spacing * 2
            ) {
                this.knockedDownBalls.push(new Array(ball, this.balls[index + 1]));
                this.checkPushBallCollision = true;
            }
        } else if (position === 'previous') {

            if (this.balls[index - 1] &&
                this.balls[index - 1].getPathSection() - this.balls[index].getPathSection() < this.spacing * 2
            ) {
                insertPosition = this.balls[index - 1].getPathSection() + this.spacing;
                this.knockedDownBalls.push(new Array(ball, this.balls[index]));
                this.checkPushBallCollision = true;
            } else {
                insertPosition = this.balls[index].getPathSection() - this.spacing;
            }
        }

        this.insertBall(ball, insertPosition);
    }

    /**
     * @method
     * @param ball {BallModel}
     * @param insertPosition {Number}
     * Вставка шара
     */
    insertBall(ball, insertPosition) {
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

        this.knockedDownBalls.splice(this.knockedDownBalls.indexOf(ball), 1);
        ball.setPosition(insertPosition);

        this.balls.splice(index, 0, ball);
        let view = new BallView(ball);
        this.views.splice(index, 0, view);

        if (this.balls[index - 1] &&
            this.balls[index - 1].color === this.balls[index].color &&
            this.balls[index].getPathSection() - this.balls[index - 1].getPathSection() > this.spacing + 1) {
            this.addShiftedBall(ball);
        }

        if (this.balls[index + 1] &&
            this.balls[index + 1].color === this.balls[index].color &&
            this.balls[index + 1].getPathSection() - this.balls[index].getPathSection() > this.spacing + 1) {
            this.addShiftedBall(this.balls[index + 1]);
        }

        this.checkTail(index, true);
    }

    /**
     * @method
     * @param index {Number}
     * @param status {Boolean}
     * @return {number}
     * Проверка хвоста на совпадение цвета
     */
    checkTail(index, status) {
        let tempBalls = [];
        tempBalls.push(this.balls[index]);

        let color = this.frog.color;
        let i = index + 1;

        while (this.balls[i]) {

            if (this.balls[i].color === color) {

                if (this.balls[i].getPathSection() - this.balls[i - 1].getPathSection() <= this.spacing + 1) {
                    tempBalls.push(this.balls[i]);
                    i++;
                } else if (!status) {
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

                if (this.balls[j + 1].getPathSection() - this.balls[j].getPathSection() <= this.spacing + 1) {
                    tempBalls.push(this.balls[j]);
                    j--;
                } else if (!status) {
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

        if (tempBalls.length > 2 && status) {
            this.clearTailBalls(j, tempBalls);
        }
        return tempBalls.length;
    }

    /**
     * @method
     * @param index {Number}
     * @param tempBalls {Array}
     * Удаление хвоста при совпадении более двух шаров одного цвета (+комбо)
     */
    clearTailBalls(index, tempBalls) {

        // очки + выигранный раунд


        this.balls.splice(index, tempBalls.length);
        this.views.splice(index, tempBalls.length)

        if (this.balls[index - 1] &&
            this.balls[index] &&
            this.balls[index - 1].color === this.balls[index].color
        ) {
            this.addShiftedBall(this.balls[index]);
        }

    }

    /**
     * @method
     * @param ball {BallModel}
     * Добавление шара к шарам, которые необходимо сдвинуть если между двумя концами нет шаров
     */
    addShiftedBall(ball) {
        if (this.shiftedBalls === null) {
            this.shiftedBalls = [];
            this.shiftedBalls.push(ball);
        } else {
            this.shiftedBalls.push(ball);
        }
        setTimeout(() => this.ballNeedShift = true, 100);
    }

    /**
     * @method
     * Сближение двух концов, если между ними нет шаров и они одного цвета
     */
    shiftOfTwoTails() {
        if (this.shiftedBalls.length !== 0) {

            for (let i = 0; i < this.shiftedBalls.length; i++) {
                let index = this.balls.indexOf(this.shiftedBalls[i]);

                if (index !== -1 && this.balls[index - 1]) {

                    if (this.shiftedBalls[i].color === this.balls[index - 1].color) {
                        let speed;

                        if (this.shiftedBalls[i].getPathSection() - this.balls[index - 1].getPathSection() > this.spacing + 4) {
                            speed = 4;
                        } else {
                            speed = this.shiftedBalls[i].getPathSection() - this.balls[index - 1].getPathSection() - this.spacing;
                        }

                        this.pushNextBall(index, -speed);

                        if (this.shiftedBalls[i].getPathSection() - this.balls[index - 1].getPathSection() <= this.spacing) {

                            this.shiftedBalls.splice(i, 1);

                            this.checkTail(index - 1, true);

                            if (this.shiftedBalls.length === 0) {
                                this.ballNeedShift = false;
                            }
                        }
                    } else {
                        this.shiftedBalls.splice(i, 1);
                    }
                }
            }
        } else {
            this.ballNeedShift = false;
        }
    }

    /**
     * @method
     * @param bullet {Object}
     * @return {number}
     * Проверка столкновения
     */
    checkCollision(bullet) {
        for (let i = 0; i < this.balls.length; i++) {

            let dx = this.balls[i].x - bullet.x;
            let dy = this.balls[i].y - bullet.y;
            let distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance <= this.balls[i].ballRadius * 2) {
                this.frog.down = 1;
                return i;
            }
        }
        return -1;
    }

    checkPushNextBallCollision() {
        if (this.knockedDownBalls.length !== 0) {

            for (let i = 0; i < this.knockedDownBalls.length; i++) {
                let dx = this.knockedDownBalls[i][0].x - this.knockedDownBalls[i][1].x;
                let dy = this.knockedDownBalls[i][0].y - this.knockedDownBalls[i][1].y;
                let distance = (dx * dx) + (dy * dy);
                let collision = (distance < this.knockedDownBalls[i][0].ballRadius);
                let speed = 0;
                console.log(distance)
                while (collision) {
                    speed++;
                    dx = this.knockedDownBalls[i][0].x - this.path[this.knockedDownBalls[i][1].getPathSection() + speed].x;
                    dy = this.knockedDownBalls[i][0].y - this.path[this.knockedDownBalls[i][1].getPathSection() + speed].y;
                    distance = (dx * dx) + (dy * dy);

                    collision = (distance < this.knockedDownBalls[i][0].ballRadius);
                }

                let index;
                index = this.balls.indexOf(this.knockedDownBalls[i][1]);

                if (index !== -1) {
                    this.pushNextBall(index, speed);
                }
            }
        } else {

            this.checkPushBallCollision = false;
        }
    }

    shoot() {
        let angle = this.frog.bulletAngle;
        let bullet = this.frog.getBullet();
        this.bullets.push([bullet, angle]);
    }


    shooting() {
        if (this.frog.bulletState === 1) {

            let flag = this.checkCollision({x: this.frog.bulletLeft, y: this.frog.bulletTop});
            if (flag !== -1) {
                let previousX = this.path[this.balls[flag].getPathSection() - Math.ceil(this.frog.bulletRadius)].x;
                let previousY = this.path[this.balls[flag].getPathSection() - Math.ceil(this.frog.bulletRadius)].y;
                let previousDistance = Math.sqrt(
                    (this.frog.bulletLeft - previousX) * (this.frog.bulletLeft - previousX) +
                    (this.frog.bulletTop - previousY) * (this.frog.bulletTop - previousY)
                );

                let nextX = this.path[this.balls[flag].getPathSection() + Math.floor(this.frog.bulletRadius)].x;
                let nextY = this.path[this.balls[flag].getPathSection() + Math.floor(this.frog.bulletRadius)].y;
                let nextDistance = Math.sqrt(
                    (this.frog.bulletLeft - nextX) * (this.frog.bulletLeft - nextX) +
                    (this.frog.bulletTop - nextY) * (this.frog.bulletTop - nextY)
                );

                let position = (previousDistance > nextDistance) ? 'next' : 'previous';
                let ball = this.getRandomBall();
                ball.color = this.frog.color;
                this.insertPositionCheck(ball, flag, position);
            }

        }

    }

    draw() {
        if (this.ballNeedShift) {
            this.shiftOfTwoTails();
        }

        if (this.checkPushBallCollision) {
            this.checkPushNextBallCollision();
        }

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

export {BallController}