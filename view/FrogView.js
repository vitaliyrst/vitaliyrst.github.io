import {GameView} from "./GameView.js";

class FrogView extends GameView {
    /*frame = 0;
    numberOfRows = 10;
    numberOfCols = 6;
    tickPerFrame = 1;
    tickCount = 0;
    spriteWidth = 300;
    spriteHeight = 180;
    rowCount = 0;*/

    constructor(frog) {
        super();
        this.frog = frog;
        this.color = 0;
        this.colors = this.data.ballsColor;
        this.getRandomColor();
    }

    getRandomColor() {
        let randomColor = Math.floor(Math.random() * this.colors.length);
        this.color = this.colors[randomColor];
    }

    drawFrog() {
        let frogImage = new Image();
        frogImage.src = './storage/frog/frog.gif';
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2,
            this.frogWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.clip();
        this.context.translate(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2);
        this.context.rotate(this.frog.frogAngle);
        this.context.drawImage(frogImage, -this.frogWidth / 2, -this.frogHeight / 2, this.frogWidth, this.frogHeight);
        this.context.restore();
    }

    /*animateColor(image) {
        this.context.translate(this.frog.bulletCenterX - this.frog.bulletRadius, this.frog.bulletCenterY - this.frog.bulletRadius);
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
    }*/

    drawBullet() {
        let bulletImage = new Image();
        bulletImage.src = this.color;
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2,
            this.frogWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.translate(this.frog.bulletCenterX, this.frog.bulletCenterY);

        this.context.rotate(this.frog.frogAngle);
        this.context.beginPath();
        this.context.arc(0, -35, this.bulletRadius, 0, Math.PI * 2, false)
        this.context.closePath();
        this.context.clip();

        this.context.drawImage(bulletImage, 0, 0, 30, 30, -15, -50, 30, 30);
        /*this.animateColor(bulletImage);*/
        this.context.restore();
    }

    draw() {
        this.drawFrog();
        this.drawBullet();
    }
}

export {FrogView}
