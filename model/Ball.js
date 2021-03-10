import {Game} from "./Game.js";

class Ball extends Game {
    frame = 0;
    numberOfRows = 10;
    numberOfCols = 6;
    tickPerFrame = 1;
    tickCount = 0;
    spriteWidth = 300;
    spriteHeight = 180;
    rowCount = 0;

    constructor(dataGame, x, y, path) {
        super(dataGame);
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.color = 0;
        this.path = path;
        this.pathSection = 0;
        this.#setColor(this.ballsColor);
        this.angle = 0;
        this.canNext = 0;
        this.id = 0;
    }

    #setColor(colors) {
        let randomColor = Math.floor(Math.random() * colors.length);
        this.color = colors[randomColor];
    }

    #animateColor(image) {
        this.context.translate(this.x - this.ballRadius, this.y - this.ballRadius);
        this.context.drawImage(image,
            this.frame * this.spriteWidth / this.numberOfRows,
            this.rowCount * this.spriteHeight / this.numberOfCols,
            this.spriteWidth / this.numberOfRows, this.spriteHeight,
            0, 0,
            this.spriteWidth / this.numberOfRows, this.spriteHeight);

        if (this.tickCount > this.tickPerFrame) {
            this.tickCount = 0;
            if (this.frame === this.numberOfRows - 1) {
                this.rowCount++;
            }
            if (this.rowCount === 6) {
                this.rowCount = 0;
            }
            this.frame = (this.frame < this.numberOfRows - 1) ? this.frame += 1 : this.frame = 0;
        }
        this.tickCount++;
    }

    draw() {
        let ballImage = new Image();
        ballImage.src = this.color;

        this.context.save();
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);
        this.context.fill()
        this.context.closePath();
        this.context.clip();

        this.#animateColor(ballImage)

        this.context.restore();
    }

    update() {
        if (this.path.length < 2) {
            return;
        }
        let angle = Math.atan2(this.path[this.pathSection].x - this.x, this.path[this.pathSection].y - this.y);
        this.angle = angle;
        if (Math.abs(this.x - this.path[this.pathSection].x) < this.speed &&
            Math.abs(this.y - this.path[this.pathSection].y) < this.speed) {
            this.x = this.path[this.pathSection].x;
            this.y = this.path[this.pathSection].y;
            this.pathSection++;
        } else {
            this.x += Math.sin(angle) * this.speed;
            this.y += Math.cos(angle) * this.speed;
        }
    }

    changeState() {
        if (this.x > this.context.canvas.offsetLeft + this.ballRadius &&
            this.y > this.context.canvas.offsetTop + this.ballRadius) {
            this.canNext = 1;
        }
    }
}

export {Ball};
