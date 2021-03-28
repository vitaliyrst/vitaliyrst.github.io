import {GameModel} from "./GameModel.js";

class FrogModel extends GameModel {
    constructor() {
        super();
        this.frogAngle = 0;
        this.bulletSpeed = 0;
        this.bulletAngle = 0;
        this.bulletState = 0;
        this.down = 0;

        this.bulletRadius = this.bullet.radius;
        this.bulletLeft = this.bullet.left;
        this.bulletTop = this.bullet.top;
        this.color = 0;
        this.canShoot = false;

        this.secondBulletLeft = this.bullet.left;
        this.secondBulletTop = this.bullet.top;
        this.secondBulletColor = 0;

        this.frogWidth = this.frog.width;
        this.frogHeight = this.frog.height;
        this.frogLeft = this.frog.left;
        this.frogTop = this.frog.top;
        this.getRandomColor();
        this.getRandomSecondBulletColor();
    }

    getRandomColor() {
        let randomColor = Math.floor(Math.random() * this.colors.length);
        this.color = this.colors[randomColor];
    }

    getRandomSecondBulletColor() {
        let randomColor = Math.floor(Math.random() * this.colors.length);
        this.secondBulletColor = this.colors[randomColor];
    }

    updateFrogAngle(x, y) {
        this.frogAngle = Math.atan2(
            -(x - (this.frogLeft + this.frogWidth / 2)),
            (y - (this.frogTop + this.frogHeight / 2))
        );
    }

    updateBulletAngle(x, y) {
        this.bulletAngle = Math.atan2(
            (x - (this.frogLeft + this.frogWidth / 2)),
            (y - (this.frogTop + this.frogHeight / 2))
        );
    }

    updateBullet() {
        this.bulletLeft += Math.sin(this.bulletAngle) * this.bulletSpeed;
        this.bulletTop += Math.cos(this.bulletAngle) * this.bulletSpeed;
    }

    updateSize(width, height) {
        this.frogWidth = width / 6.15;
        this.frogHeight = width / 6.15;
        this.bulletRadius = width / 63;
        this.frogLeft = width / this.data.offsetFrogLeft;
        this.frogTop = height / this.data.offsetFrogTop;
        this.bulletLeft = this.frogLeft + this.frogWidth / 2;
        this.bulletTop = this.frogTop + this.frogHeight / 2;
    }

    stopBullet() {
        this.bulletState = 0;
        this.bulletSpeed = 0;
        this.bulletAngle = -this.frogAngle;
        this.bulletLeft = this.frogLeft + this.frogWidth / 2;
        this.bulletTop = this.frogTop + this.frogHeight / 2;
        this.down = 0;
        this.color = this.secondBulletColor;
        this.getRandomSecondBulletColor();
        if (this.colors.length === 1) {
            this.color = this.secondBulletColor;
            this.getRandomSecondBulletColor();
        }
    }

    restartBullet() {
        this.bulletSpeed = 0;
        this.bulletState = 0;
        this.bulletAngle = -this.frogAngle;
        this.bulletLeft = this.frogLeft + this.frogWidth / 2;
        this.bulletTop = this.frogTop + this.frogHeight / 2;
        this.color = this.secondBulletColor;
        this.getRandomSecondBulletColor();
    }
}

export {FrogModel};