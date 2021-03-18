class FrogController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.moveFrog();
        this.shot();
    }

    moveFrog() {
        let canvas = document.getElementById('canvas');
        canvas.addEventListener('mousemove', (eo) => {
            let clientX = eo.clientX - canvas.getBoundingClientRect().x;
            let clientY = eo.clientY - canvas.getBoundingClientRect().y;
            if (this.model.bulletState === 0) {
                this.model.frogAngle = Math.atan2(-(clientX - (this.view.frogLeft + this.view.frogWidth / 2)),
                    clientY - (this.view.frogTop + this.view.frogHeight / 2));
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
                let clientX = eo.clientX - canvas.getBoundingClientRect().x;
                let clientY = eo.clientY - canvas.getBoundingClientRect().y;
                this.model.bulletAngle = Math.atan2((clientX - (this.view.frogLeft + this.view.frogWidth / 2)),
                    clientY - (this.view.frogTop + this.view.frogHeight / 2));

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

    restartBullet() {
        if (this.model.bulletCenterX + this.view.bulletRadius + this.view.frogWidth / 2 < this.view.context.canvas.offsetLeft ||
            this.model.bulletCenterY + this.view.bulletRadius + this.view.frogHeight / 2 < this.view.context.canvas.offsetTop ||
            this.model.bulletCenterX - this.view.bulletRadius - this.view.frogWidth / 2 > this.view.context.canvas.width ||
            this.model.bulletCenterY - this.view.bulletRadius - this.view.frogHeight / 2 > this.view.context.canvas.height) {
            this.view.getRandomColor();
            this.model.restartBullet();
        }
    }

    draw() {
        this.restartBullet();
        this.model.updateBullet()
        this.view.draw();
    }
}

export {FrogController};