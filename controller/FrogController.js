import {FrogModel} from "../model/FrogModel.js";
import {FrogView} from "../view/FrogView.js";

class FrogController {
    constructor() {
        this.model = new FrogModel();
        this.view = new FrogView(this.model);
        this.moveFrog();
        this.shot();
    }

    updateSize(width, height) {
        this.model.updateSize(width, height)
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

    /*    moveBullet() {
            let canvas = document.getElementById('canvas');
            canvas.addEventListener('mousemove', (eo) => {
                let clientX = eo.clientX - canvas.getBoundingClientRect().x;
                let clientY = eo.clientY - canvas.getBoundingClientRect().y;
                if (this.model.bulletState === 0) {
                    this.model.bulletAngle = Math.atan2(-(clientX - (this.view.frogLeft + this.view.frogWidth / 2)),
                        clientY - (this.view.frogTop + this.view.frogHeight / 2));
                }
            });
        }*/

    shot() {
        let canvas = document.getElementById('canvas');
        canvas.addEventListener('click', (eo) => {
            if (!this.model.bulletState) {

                this.model.bulletSpeed = 7;
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

  /*  restartBullet() {
        if (this.model.bulletCenterX + this.view.bulletRadius + this.view.frogWidth / 2 < this.view.context.canvas.offsetLeft ||
            this.model.bulletCenterY + this.view.bulletRadius + this.view.frogHeight / 2 < this.view.context.canvas.offsetTop ||
            this.model.bulletCenterX - this.view.bulletRadius - this.view.frogWidth / 2 > this.view.context.canvas.width ||
            this.model.bulletCenterY - this.view.bulletRadius - this.view.frogHeight / 2 > this.view.context.canvas.height) {
            this.view.getRandomColor();
            this.model.restartBullet();
        }
    }*/



    draw() {
        /*this.restartBullet();*/
        this.view.draw();
        this.model.updateBullet()

    }
}

export {FrogController};