import {GameModel} from "./GameModel.js";

class FrogModel extends GameModel {
    constructor() {
        super();
        this.frogAngle = 0;
        this.bulletSpeed = 0;
        this.bulletCenterX = 408;
        this.bulletCenterY = 290;
        this.bulletAngle = 0;
        this.bulletState = 0;
    }

    updateBullet() {
        this.bulletCenterX += Math.sin(this.bulletAngle) * this.bulletSpeed;
        this.bulletCenterY += Math.cos(this.bulletAngle) * this.bulletSpeed;
    }

    restartBullet() {
        this.bulletAngle = this.frogAngle;
        this.bulletSpeed = 0;
        this.bulletState = 0;
        this.bulletCenterX = 408;
        this.bulletCenterY = 290;
    }
}

export {FrogModel};