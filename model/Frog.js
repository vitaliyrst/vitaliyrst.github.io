import {Game} from "./Game.js";

class Frog extends Game {
    constructor() {
        super();
        this.angle = 0;
        this.speed = 0;
        this.bulletCenterX = 408;
        this.bulletCenterY = 290;
        this.bulletAngle = 0;
        this.bulletState = 0;
        this.bulletColor = 0;
        this.getRandomColor(this.ballsColor);
    }

    getRandomColor(colors) {
        let randomColor = Math.floor(Math.random() * colors.length);
        this.bulletColor = colors[randomColor];
    }

    draw() {
        this.drawFrog();
        this.drawBullet();
    }

    drawFrog() {
        let frogImage = new Image();
        frogImage.src = './storage/frog/Frog.gif';
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2,
            this.frogWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.clip();
        this.context.translate(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2);
        this.context.rotate(this.angle);
        this.context.drawImage(frogImage, -this.frogWidth / 2, -this.frogHeight / 2, this.frogWidth, this.frogHeight);
        this.context.restore();
    }


    drawBullet() {
        let bulletImage = new Image();
        bulletImage.src = this.bulletColor;
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2,
            this.frogWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.translate(this.bulletCenterX, this.bulletCenterY);

        this.context.rotate(this.angle);


        this.context.beginPath();
        this.context.arc(0, -35, this.bulletRadius, 0, Math.PI * 2, false)
        this.context.closePath();
        this.context.clip();

        this.context.drawImage(bulletImage, 0, 0, 30, 30, -15, -50, 30, 30);


        this.context.restore();
        this.updateBullet();
        this.restartBullet();
    }


    stopBullet() {
        this.speed = 0;
        this.bulletCenterX = 408;
        this.bulletCenterY = 290;
        this.bulletState = 0;
        this.getRandomColor(this.ballsColor);
    }

    restartBullet() {
        if (this.bulletCenterX + this.bulletRadius + this.frogWidth / 2 < this.context.canvas.offsetLeft ||
            this.bulletCenterY + this.bulletRadius + this.frogHeight / 2 < this.context.canvas.offsetTop ||
            this.bulletCenterX - this.bulletRadius - this.frogWidth / 2 > this.context.canvas.width ||
            this.bulletCenterY - this.bulletRadius - this.frogHeight / 2 > this.context.canvas.height) {
            this.bulletAngle = 0;
            this.speed = 0;
            this.bulletState = 0;
            this.bulletCenterX = 408;
            this.bulletCenterY = 290;
            this.getRandomColor(this.ballsColor);
        }
    }

    updateFrogAngle(angle) {
        this.angle = angle;
    }

    updateBullet() {
        this.bulletCenterX += Math.sin(this.bulletAngle) * this.speed;
        this.bulletCenterY += Math.cos(this.bulletAngle) * this.speed;
    }

    gunSound() {
        let gunSound = new Audio();
        gunSound.src = './storage/sounds/bullet.ogg';
        return gunSound;
    }
}

export {Frog};