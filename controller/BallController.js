import {BallModel} from "../model/BallModel.js";
import {BallView} from "../view/BallView.js";
import {Player} from "../classes/Player.js";

class BallController {
    constructor(totalBalls, frog) {
        this.frog = frog;
        this.totalBalls = totalBalls;
        this.player = new Player();

        this.balls = [];
        this.spacing = 36;
        this.path = [];
        this.views = [];
        this.createFirstBall();
        this.gameEnd = false;

        this.ballNeedShift = false;
        this.shiftedBalls = [];
        this.fasterBallsState = true;

        this.ballCounter = 0;
        this.currentCombo = 0;
        this.maxCombo = 0;
        this.multiplierCombo = 1;
        this.comboCounter = 0;

        this.checkUnload();
        this.sound = localStorage.getItem('sound');
        this.music = this.setMusic();
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
        this.ballCounter++;
        return new BallModel();
    }


    /**
     * @method
     * @return {{}}
     * Установка звуков игры
     */
    setMusic() {
        if (this.sound === 'on') {
            let musicArray = {};
            let main = new Audio();
            main.src = './storage/sounds/main.mp3';
            main.play();
            main.loop = true;

            let win = new Audio();
            win.src = './storage/sounds/win.mp3';

            let end = new Audio();
            end.src = './storage/sounds/end.mp3';

            let clearBall = new Audio();
            clearBall.src = './storage/sounds/clear-ball.mp3';

            let shifted = new Audio();
            shifted.src = './storage/sounds/shifted.ogg';

            let score = new Audio();
            score.src = './storage/sounds/score.mp3';

            musicArray.main = main;
            musicArray.win = win;
            musicArray.end = end;
            musicArray.clearBall = clearBall;
            musicArray.shifted = shifted;
            musicArray.score = score;

            return musicArray;
        } else {
            return [];
        }
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
            this.balls.splice(this.balls.length - 2, 1);

            if (this.balls.length === 2) {
                this.gameEnd = true;
                this.frog.canShoot = 0;

                if (this.sound === 'on') {
                    this.music.main.pause();
                    this.music.end.play();
                }
            }

            if (this.gameEnd) {
                setTimeout(() => {
                    this.player.nextLevel('lose');
                }, 500);
            }
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

        this.frog.colors = this.checkColor();
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

        this.checkWinGame(tempBalls);

        let tempScore = 0;

        for (let i = 0; i < tempBalls.length; i++) {
            tempScore += 10 + this.frog.level
        }

        tempScore *= this.multiplierCombo * this.frog.level;
        this.player.score += tempScore;

        this.balls.splice(index, tempBalls.length);
        this.views.splice(index, tempBalls.length);

        if (!this.gameEnd) {
            this.frog.colors = this.checkColor();
        }

        if (this.balls[index - 1] &&
            this.balls[index] &&
            this.balls[index - 1].color === this.balls[index].color
        ) {
            if (this.checkTail(index, false) < 3) {
                if (this.currentCombo > this.maxCombo) {
                    this.maxCombo = this.currentCombo;
                }
                this.comboCounter += this.currentCombo;
                this.currentCombo = 0;
            }

            this.addShiftedBall(this.balls[index]);
        } else {
            if (this.currentCombo > this.maxCombo) {
                this.maxCombo = this.currentCombo;
            }
            this.comboCounter += this.currentCombo;
            this.currentCombo = 0;

            if (this.sound === 'on') {
                this.music.clearBall.currentTime = 0;
                this.music.clearBall.play();
            }
        }
    }

    checkWinGame(tempBalls) {
        if (this.balls.length === tempBalls.length) {
            this.gameEnd = true;

            if (this.sound === 'on') {
                this.music.main.pause();
                this.music.score.play();
            }

            this.frog.canShoot = 0;
            this.player.getExtraScore(this.path, this.balls[this.balls.length - 1].getPathSection(), this.frog.level);

            let currentLevel = localStorage.getItem('level');
            let nextLevel = this.frog.level + 1;

            if (nextLevel < currentLevel) {
                localStorage.setItem('level', currentLevel);
            } else if (nextLevel > currentLevel && this.frog.level < 9) {
                localStorage.setItem('level', String(nextLevel));
            }

            setTimeout(() => {
                this.player.checkScore(this.player.score);
                if (this.sound === 'on') {
                    this.music.win.play();
                }
                this.player.nextLevel(
                    'win',
                    this.frog.level,
                    this.ballCounter,
                    this.player.score,
                    this.comboCounter
                );
            }, 5000);
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
        setTimeout(() => {
            this.ballNeedShift = true;

            if (this.sound === 'on') {
                this.music.shifted.currentTime = 0;
                this.music.shifted.play();
            }
        }, 100);
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
                        this.comboCounter += this.currentCombo;
                        this.currentCombo = 0;
                    }
                }
            }
        } else {
            this.ballNeedShift = false;
            this.multiplierCombo = 1;
        }
    }

    /**
     * @method
     * @return {*[]}
     * Проверка оставшихся цветов
     */
    checkColor() {
        let colorArray = [];

        for (let i = 0; i < this.balls.length; i++) {
            colorArray.push(this.balls[i].color);
        }

        return Array.from(new Set(colorArray));
    }

    /**
     * @method
     * Проверка столкновения пули с шаром
     */
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

    /**
     * @method
     * Проверка на уход пользователя с поля игры
     */
    checkUnload() {
        window.addEventListener('beforeunload', (eo) => {
            if (!this.gameEnd && location.hash === '#Game') {
                eo.returnValue = 'You will lose your score!!!';
                if (eo.returnValue) {
                    window.location.reload();
                }
            }
        });

        window.addEventListener('popstate', (eo) => {
            if (location.hash === '#Play' && !this.gameEnd) {
                let conf = confirm('You will lose your score!!!');
                if (conf) {
                    window.location.reload();
                } else {
                    location.hash = '#Game';
                }
            }
        });
    }

    /**
     * @method
     * Передача обновления в model и отрисовки во view
     */
    draw() {
        this.player.updateGameScore();

        if (this.ballNeedShift) {
            this.shiftOfTwoTails();
        }

        this.shooting();

        if (!this.gameEnd) {
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
}

export {BallController}