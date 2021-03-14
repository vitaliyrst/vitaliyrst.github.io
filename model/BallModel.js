import {GameModel} from "./GameModel.js";

class BallModel extends GameModel {
    frame = 0;
    numberOfRows = 10;
    numberOfCols = 6;
    tickPerFrame = 1;
    tickCount = 0;
    spriteWidth = 300;
    spriteHeight = 180;
    rowCount = 0;

    constructor(path) {
        super();
        this.color = 0;
        this.path = path;
        this.pathSection = 0;
        this.radius = 15;
        this.angle = 0;
        this.moved = 0;
        this.speed = 1;
        this.getRandomColor(this.ballsColor);
    }

    getPathSection() {
        return this.pathSection;
    }

    init(point) {
        this.x = this.path[point].x;
        this.y = this.path[point].y;
        this.pathSection = point;
    }


    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getRandomColor(colors) {
        let randomColor = Math.floor(Math.random() * colors.length);
        this.color = colors[randomColor];
    }

    animateColor(image) {
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

        this.animateColor(ballImage)

        this.context.restore();
    }

    updatePathSection(tick) {
        this.pathSection += tick;
    }

    update() {
        if (this.pathSection >= this.path.length) {

            this.setPosition(this.path[this.pathSection].x, this.path[this.pathSection].y);
            this.pathSection = 0;
        }
        this.x = this.path[this.pathSection].x;
        this.y = this.path[this.pathSection].y;
        this.pathSection += this.speed;
    }
}

export {BallModel};
