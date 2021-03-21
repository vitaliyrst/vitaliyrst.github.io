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
            if (!this.model.bulletState) {
                this.model.bulletSpeed = this.model.frogWidth / 15;
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
        if (this.model.bulletLeft + this.model.bulletRadius + this.model.frogWidth / 2 < canvas.offsetLeft ||
            this.model.bulletTop + this.model.bulletRadius + this.model.frogHeight / 2 < canvas.offsetTop ||
            this.model.bulletLeft - this.model.bulletRadius - this.model.frogWidth / 2 > canvas.offsetWidth ||
            this.model.bulletTop - this.model.bulletRadius - this.model.frogHeight / 2 > canvas.offsetHeight) {
            this.view.getRandomColor();
            this.model.restartBullet();
        }
    }

    draw() {
        this.restartBullet();
        this.view.draw();
        this.model.updateBullet()

    }
}

export {FrogController};