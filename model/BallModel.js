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

    constructor() {
        super();
        this.color = 0;
        this.pathSection = 0;
        this.speed = 1;
        this.ballId = 0;
        this.getRandomColor(this.colors);
        this.width = this.canvasWidth;
        this.height = this.canvasHeight;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getRandomColor(colors) {
        let randomColor = Math.floor(Math.random() * colors.length);
        this.color = colors[randomColor];
    }

    updatePath() {
        let path = this.path;

        let ratioW = this.canvasWidth / 1138;
        let ratioH = this.canvasHeight / 768;
        let newPath = [];
        for (let i = 0; i < path.length; i++) {
            newPath.push({x: path[i].x * ratioW, y: path[i].y * ratioH});
        }
        return newPath;
    }

    animateColor(image) {

        this.context.translate(this.x - this.ballRadius, this.y - this.ballRadius);
        this.context.drawImage(
            image,
            this.frame * this.spriteWidth / this.numberOfRows,
            this.rowCount * this.spriteHeight / this.numberOfCols,
            this.spriteWidth / this.numberOfRows, this.spriteHeight,
            0, 0,
            this.ballRadius * 2 * 10 / this.numberOfRows, this.ballRadius * 2 * 6
        );

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

    update() {
        if (this.pathSection >= this.path.length) {
            this.pathSection = 0;
            this.setPosition(this.path[this.pathSection].x, this.path[this.pathSection].y);

        }

        this.x = this.path[this.pathSection].x;
        this.y = this.path[this.pathSection].y;

        this.pathSection += this.speed;
    }

    updateSize(width, height) {
        this.ballRadius = width / 70;
        let path = this.path;
        let ratioW = width / this.width;
        let ratioH = height / this.height;

        let newPath = [];
        for (let i = 0; i < path.length; i++) {
            newPath.push({x: path[i].x * ratioW, y: path[i].y * ratioH});
        }

        if (newPath.length === this.path.length) {
            this.path = newPath;
            this.width = width;
            this.height = height;
        }
    }
}

export {BallModel};
