import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";
import {Records} from "../classes/Records.js";

class BallController {
    constructor(totalBalls, frog) {
        this.frog = frog;
        this.totalBalls = totalBalls;
        this.records = new Records();

        this.balls = [];
        this.spacing = 36;
        this.path = [];
        this.views = [];
        this.createFirstBall();
        this.gameEnd = false;

        this.ballNeedShift = false;
        this.shiftedBalls = [];
        this.fasterBallsState = true;

        this.currentCombo = 0;
        this.maxCombo = 0;
        this.multiplierCombo = 1;

        this.checkUnload();
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
        if (this.balls.length < 30 && this.fasterBallsState) {
            let speed = 12;
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
                    this.balls[i + 1].update(4);
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
            delete this.balls[this.balls.length - 2];
            this.balls.splice(this.balls.length - 2, 1);

            // конец игры, отключаем музыку, запрещаем стрелять, играем музыку проигрыша, удаляем ссылки на шары
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
            insertPosition = this.balls[index].getPathSection();
        } else if (position === 'previous') {
            insertPosition = this.balls[index].getPathSection() - this.spacing;
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

        let color = this.balls[index].color;
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
            this.clearBalls(j, tempBalls);
        }
        return tempBalls.length;
    }

    /**
     * @method
     * @param index {Number}
     * @param tempBalls {Array}
     * Удаление шаров совпадении более двух шаров одного цвета (+комбо)
     */
    clearBalls(index, tempBalls) {
        this.currentCombo++;

        if (this.balls.length === tempBalls.length) {
            this.gameEnd = true;
            this.frog.canShoot = 0;
            this.records.getExtraScore(this.path, this.balls[this.balls.length - 1].getPathSection());

            setTimeout(()=> {
                localStorage.setItem('score', this.records.score);
                this.records.checkScore(this.records.score);
            }, 5000);

        }


        let tempScore = 0;
        for (let i = 0; i < tempBalls.length; i++) {
            tempScore += 10;
        }
        tempScore *= this.multiplierCombo;
        this.records.score += tempScore;


        this.balls.splice(index, tempBalls.length);
        this.views.splice(index, tempBalls.length)

        if (this.balls[index - 1] &&
            this.balls[index] &&
            this.balls[index - 1].color === this.balls[index].color
        ) {
            if (this.checkTail(index, false) < 3) {
                if (this.currentCombo > this.maxCombo) {
                    this.maxCombo = this.currentCombo;
                }
                this.currentCombo = 0;
            }
            this.addShiftedBall(this.balls[index]);

        } else {
            if (this.currentCombo > this.maxCombo) {
                this.maxCombo = this.currentCombo;
            }
            this.currentCombo = 0;
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

                        if (this.shiftedBalls[i].getPathSection() - this.balls[index - 1].getPathSection() > this.spacing + 2) {
                            speed = 3;
                        } else {
                            speed = 10;
                        }

                        this.pushNextBall(index, -speed);

                        if (this.shiftedBalls[i].getPathSection() - this.balls[index - 1].getPathSection() <= this.spacing) {
                            this.multiplierCombo++;
                            this.shiftedBalls.splice(i, 1);

                            this.checkTail(index - 1, true);

                            if (this.shiftedBalls.length === 0) {
                                this.ballNeedShift = false;
                                this.multiplierCombo = 1;
                            }
                        }
                    } else {
                        this.shiftedBalls.splice(i, 1);
                        if (this.currentCombo > this.maxCombo) {
                            this.maxCombo = this.currentCombo;
                        }
                        this.currentCombo = 0;
                    }
                }
            }
        } else {
            this.ballNeedShift = false;
            this.multiplierCombo = 1;
        }
    }

    shooting() {
        if (this.frog.bulletState === 1) {

            let flag = this.checkCollision({x: this.frog.bulletLeft, y: this.frog.bulletTop});

            if (flag !== -1) {
                let previousX = this.path[this.balls[flag].getPathSection() - Math.ceil(this.balls[flag].ballRadius)].x;
                let previousY = this.path[this.balls[flag].getPathSection() - Math.ceil(this.balls[flag].ballRadius)].y;
                let previousDistance = Math.sqrt(
                    (this.frog.bulletLeft - previousX) * (this.frog.bulletLeft - previousX) +
                    (this.frog.bulletTop - previousY) * (this.frog.bulletTop - previousY)
                );

                let nextX = this.path[this.balls[flag].getPathSection() + Math.ceil(this.balls[flag].ballRadius)].x;
                let nextY = this.path[this.balls[flag].getPathSection() + Math.ceil(this.balls[flag].ballRadius)].y;
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

    checkUnload() {
        window.addEventListener('beforeunload', (eo) => {
            if (!this.gameEnd && location.hash === '#Game') {
                eo.returnValue = 'You will lose your score!!!';
            }
        });
    }

    draw() {
        this.records.updateGameScore();
        if (this.ballNeedShift) {
            this.shiftOfTwoTails();
        }

        this.shooting();

        if (this.fasterBallsState && this.balls.length < 30) {
            this.createFasterBalls();
        } else {
            if (!this.gameEnd) {
                this.fasterBallsState = false;
                this.frog.canShoot = 1;
                this.createBalls();
            }
        }
        for (let i = 0; i < this.balls.length; i++) {
            this.views[i].draw();
        }
    }
}

export {BallController}