import {GameView} from "./GameView.js";

class FrogView extends GameView {
    frame = 0;
    numberOfRows = 10;
    numberOfCols = 6;
    tickPerFrame = 1;
    tickCount = 0;
    spriteWidth = 300;
    spriteHeight = 180;
    rowCount = 0;

    constructor(model) {
        super();
        this.model = model;
        this.color = this.model.color;
        this.secondColor = this.model.secondBulletColor;
    }

    drawFrog() {
        let frogImage = new Image();
        frogImage.src = './storage/frog/zuma.png';

        this.context.save();
        this.context.beginPath();

        this.context.arc(
            this.model.frogLeft + this.model.frogWidth / 2,
            this.model.frogTop + this.model.frogHeight / 2,
            this.model.frogWidth / 2, 0, Math.PI * 2, false
        );
        this.context.closePath();
        this.context.clip();

        this.context.translate(
            this.model.frogLeft + this.model.frogWidth / 2,
            this.model.frogTop + this.model.frogHeight / 2
        );

        this.context.rotate(this.model.frogAngle);

        this.context.drawImage(
            frogImage,
            -this.model.frogWidth / 2, -this.model.frogHeight / 2,
            this.model.frogWidth, this.model.frogHeight
        );
        this.context.restore();
    }

    drawBullet() {
        let bulletImage = new Image();
        bulletImage.src = this.color;

        this.context.save();
        this.context.beginPath();

        this.context.arc(
            this.model.frogLeft + this.model.frogWidth / 2,
            this.model.frogTop + this.model.frogHeight / 2,
            this.model.frogWidth / 2, 0, Math.PI * 2, false
        );
        this.context.closePath();

        this.context.translate(
            this.model.bulletLeft, this.model.bulletTop
        );

        this.context.rotate(-this.model.bulletAngle);

        this.context.beginPath();
        this.context.arc(
            0,
            this.model.frogHeight / 4,
            this.model.bulletRadius, 0, Math.PI * 2, false)
        this.context.closePath();
        this.context.clip()

        this.animateColor(bulletImage);

        this.context.restore();
    }

    animateColor(image) {
        this.context.translate(0, 0);

        this.context.drawImage(
            image,
            this.frame * this.spriteWidth / this.numberOfRows, this.rowCount * this.spriteHeight / this.numberOfCols,
            this.spriteWidth / this.numberOfRows, this.spriteHeight,
            -this.model.bulletRadius, -this.model.bulletRadius + this.model.frogHeight / 4,
            this.model.bulletRadius * 2 * 10 / this.numberOfRows, this.model.bulletRadius * 2 * 6
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

    drawSecondBall() {
        let bulletImage = new Image();
        bulletImage.src = this.secondColor;
        this.context.save();
        this.context.beginPath();

        this.context.arc(
            this.model.frogLeft + this.model.frogWidth / 2,
            this.model.frogTop + this.model.frogHeight / 2,
            this.model.frogWidth / 2 + 2, 0, Math.PI * 2, false
        );
        this.context.closePath();

        this.context.translate(
            this.model.secondBulletLeft, this.model.secondBulletTop
        );

        this.context.rotate(this.model.frogAngle);

        this.context.beginPath();
        this.context.arc(
            0,
            -this.model.frogHeight / 5,
            this.model.bulletRadius / 2 + 1, 0, Math.PI * 2, false)
        this.context.closePath();
        this.context.clip();
        this.context.fill();


        this.context.translate(0, 0);

        this.context.drawImage(
            bulletImage,
            0, 0,
            30, 30,
            -this.model.bulletRadius / 2 - 2, -this.model.frogHeight / 5 - this.model.bulletRadius / 2 - 1,
            this.model.bulletRadius + 3, this.model.bulletRadius + 3
        );

        this.context.restore();
    };


    draw() {
        this.drawFrog();
        this.drawBullet();
        this.drawSecondBall();
    }
}

export {FrogView}
