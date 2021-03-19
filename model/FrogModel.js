import {GameModel} from "./GameModel.js";

class FrogModel extends GameModel {
    constructor() {
        super();
        this.frogAngle = 0;
        this.bulletSpeed = 0;
        this.bulletCenterX = 506;
        this.bulletCenterY = 323;
        this.bulletAngle = 0;
        this.bulletState = 0;
        this.frogWidth = this.frog.width;
        this.frogHeight = this.frog.height;
        this.frogLeft = this.frog.left;
        this.frogTop = this.frog.top;
    }

    updateBullet() {
        this.bulletCenterX += Math.sin(this.bulletAngle) * this.bulletSpeed;
        this.bulletCenterY += Math.cos(this.bulletAngle) * this.bulletSpeed;
    }

    restartBullet() {
        this.bulletAngle = this.frogAngle;
        this.bulletSpeed = 0;
        this.bulletState = 0;
        this.bulletCenterX = 506;
        this.bulletCenterY = 323;
    }
}

export {FrogModel};