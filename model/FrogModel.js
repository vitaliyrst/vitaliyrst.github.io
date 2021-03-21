import {GameModel} from "./GameModel.js";

class FrogModel extends GameModel {
    constructor() {
        super();
        this.frogAngle = 0;
        this.bulletSpeed = 0;
        this.bulletAngle = 0;
        this.bulletState = 0;

        this.bulletRadius = this.bullet.radius;
        this.bulletLeft = this.bullet.left;
        this.bulletTop = this.bullet.top;

        this.frogWidth = this.frog.width;
        this.frogHeight = this.frog.height;
        this.frogLeft = this.frog.left;
        this.frogTop = this.frog.top;
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

    restartBullet() {
        this.bulletAngle = -this.frogAngle;
        this.bulletSpeed = 0;
        this.bulletState = 0;
        this.bulletLeft = this.frogLeft + this.frogWidth / 2;
        this.bulletTop = this.frogTop + this.frogHeight /2;
    }

    updateSize(width, height) {
        this.frogWidth = width / 6.15;
        this.frogHeight = width / 6.15;
        this.bulletRadius = width / 65;
        this.frogLeft = width / this.data.offsetFrogLeft;
        this.frogTop = height / this.data.offsetFrogTop;
        this.bulletLeft = this.frogLeft + this.frogWidth / 2;
        this.bulletTop = this.frogTop + this.frogHeight /2;
    }
}

export {FrogModel};