import {FrogModel} from "../model/FrogModel.js";
import {FrogView} from "../view/FrogView.js";

class FrogController {
    constructor() {
        this.model = new FrogModel();
        this.view = new FrogView(this.model);
        this.moveFrog();
        this.shot();
        this.swapColor();
    }

    moveFrog() {
        let canvas = document.getElementById('canvas');
        canvas.addEventListener('mousemove', (eo) => {
            let clientX = eo.clientX - canvas.getBoundingClientRect().x;
            let clientY = eo.clientY - canvas.getBoundingClientRect().y;

            this.model.updateFrogAngle(clientX, clientY);
            if (this.model.bulletState === 0) {
                this.model.updateBulletAngle(clientX, clientY);
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
        let field = document.querySelector('.zuma_field');

        let offsetLeft = (field.clientWidth - canvas.offsetWidth) / 2;
        let offsetTop = (field.clientHeight - canvas.offsetHeight) / 2;

        if (this.model.bulletLeft - this.model.bulletRadius < canvas.offsetLeft - offsetLeft ||
            this.model.bulletTop - this.model.bulletRadius < canvas.offsetTop - offsetTop ||
            this.model.bulletLeft + this.model.bulletRadius > canvas.offsetWidth ||
            this.model.bulletTop + this.model.bulletRadius > canvas.offsetHeight) {
            this.model.restartBullet();
            this.view.secondColor = this.model.secondBulletColor;
            this.view.color = this.model.color;
        }
    }

    stopBullet() {
        if (this.model.down === 1) {
            this.model.stopBullet();
            this.view.secondColor = this.model.secondBulletColor;
            this.view.color = this.model.color;
        }
    }

    swapColor() {
        window.oncontextmenu = function (eo) {
            return false;
        }
        window.addEventListener('mousedown', (eo) => {
            if (eo.button === 2) {
                let firstColor = this.model.color;
                let secondColor = this.model.secondBulletColor;

                this.model.color = secondColor;
                this.model.secondBulletColor = firstColor;
                this.view.color = secondColor;
                this.view.secondColor = firstColor;
            }
        });

        let gameField = document.querySelector('.zuma_field');
        let hammer = new Hammer(gameField);
        hammer.get('swipe').set({direction : Hammer.DIRECTION_DOWN});
        hammer.on('swipe', (eo) => {
            let firstColor = this.model.color;
            let secondColor = this.model.secondBulletColor;

            this.model.color = secondColor;
            this.model.secondBulletColor = firstColor;
            this.view.color = secondColor;
            this.view.secondColor = firstColor;
        });
    }

    draw() {
        this.stopBullet();
        this.restartBullet();
        this.view.draw();
        this.model.updateBullet()
    }
}

export {FrogController};