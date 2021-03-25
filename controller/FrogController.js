import {FrogModel} from "../model/FrogModel.js";
import {FrogView} from "../view/FrogView.js";

class FrogController {
    constructor() {
        this.model = new FrogModel();
        this.view = new FrogView(this.model);
        this.moveFrog();
        this.shot();
    }

    moveFrog() {
        let canvas = document.getElementById('canvas');
        canvas.addEventListener('mousemove', (eo) => {
            let clientX = eo.clientX - canvas.getBoundingClientRect().x;
            let clientY = eo.clientY - canvas.getBoundingClientRect().y;

            this.model.updateFrogAngle(clientX, clientY);
            if (this.model.bulletState === 0) {
                this.model.updateBulletAngle(clientX, clientY)
            }
        });
    }

    shot() {
        let canvas = document.getElementById('canvas');
        canvas.addEventListener('click', (eo) => {
            if (!this.model.bulletState && this.model.canShoot) {
                this.model.bulletSpeed = this.model.frogWidth / 10;
                this.model.bulletState = 1;
                this.gunSound().play();
            }
        });
    }

    gunSound() {
        let gunSound = new Audio();
        gunSound.src = './storage/sounds/bullet.ogg';
        return gunSound;
    }

    updateSize(width, height) {
        this.model.updateSize(width, height)
    }

    restartBullet() {
        let canvas = document.getElementById('canvas');
        if (this.model.bulletLeft - this.model.bulletRadius < canvas.offsetLeft ||
            this.model.bulletTop - this.model.bulletRadius < canvas.offsetTop ||
            this.model.bulletLeft + this.model.bulletRadius > canvas.offsetWidth ||
            this.model.bulletTop + this.model.bulletRadius > canvas.offsetHeight) {
            this.model.restartBullet();
            this.view.color = this.model.color
        }
    }

    stopBullet() {
        if (this.model.down === 1) {
            this.model.stopBullet();
            this.view.color = this.model.color;
        }
    }

    draw() {
        this.stopBullet();
        this.restartBullet();
        this.view.draw();
        this.model.updateBullet()
    }
}

export {FrogController};