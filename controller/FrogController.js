class FrogController {
    constructor(model) {
        this.model = model;
        this.move();
        this.shot();
    }

    move() {
        let canvas = document.getElementById('zuma-canvas');
        canvas.addEventListener('mousemove', (eo) => {
            let clientX = eo.clientX - canvas.getBoundingClientRect().x;
            let clientY = eo.clientY - canvas.getBoundingClientRect().y;
            let angle = Math.atan2(-(clientX - (this.model.frogLeft + this.model.frogWidth / 2)),
                clientY - (this.model.frogTop + this.model.frogHeight / 2));
            if (this.model.bulletState === 0) {
                this.model.updateFrogAngle(angle);
            }
        });
    }

    shot() {
        let canvas = document.getElementById('zuma-canvas');
        canvas.addEventListener('click', (eo) => {
            if (!this.model.bulletState) {
                let clientX = eo.clientX - canvas.getBoundingClientRect().x;
                let clientY = eo.clientY - canvas.getBoundingClientRect().y;
                this.model.bulletAngle = Math.atan2((clientX - (this.model.frogLeft + this.model.frogWidth / 2)),
                    clientY - (this.model.frogTop + this.model.frogHeight / 2));
                this.model.speed = 6;
                this.model.bulletState = 1;
                this.model.gunSound().play();
            }
        });
    }
}

export {FrogController};