import {GameView} from "./GameView.js";

class FrogView extends GameView{
    constructor(frog) {
        super();
        this.frog = frog;
        this.color = 0;
        this.getRandomColor(this.data.ballsColor);
    }

    getRandomColor(colors) {
        let randomColor = Math.floor(Math.random() * colors.length);
        this.color = colors[randomColor];
    }

    drawFrog() {
        let frogImage = new Image();
        frogImage.src = './storage/frog/FrogModel.gif';
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.frog.frogLeft + this.frog.frogWidth / 2, this.frog.frogTop + this.frog.frogHeight / 2,
            this.frog.frogWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.clip();
        this.context.translate(this.frog.frogLeft + this.frog.frogWidth / 2, this.frog.frogTop + this.frog.frogHeight / 2);
        this.context.rotate(this.angle);
        this.context.drawImage(frogImage, -this.frog.frogWidth / 2, -this.frog.frogHeight / 2, this.frog.frogWidth, this.frog.frogHeight);
        this.context.restore();
    }


    drawBullet() {
        let bulletImage = new Image();
        bulletImage.src = this.color;
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.frog.frogLeft + this.frog.frogWidth / 2, this.frog.frogTop + this.frog.frogHeight / 2,
            this.frog.frogWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.translate(this.frog.bulletCenterX, this.frog.bulletCenterY);

        this.context.rotate(this.angle);


        this.context.beginPath();
        this.context.arc(0, -35, this.frog.bulletRadius, 0, Math.PI * 2, false)
        this.context.closePath();
        this.context.clip();

        this.context.drawImage(bulletImage, 0, 0, 30, 30, -15, -50, 30, 30);


        this.context.restore();
        this.frog.updateBullet();
        this.frog.restartBullet();
    }

    draw() {
        this.drawFrog();
        this.drawBullet();
    }
}

export {FrogView}