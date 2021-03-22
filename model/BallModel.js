import {GameModel} from "./GameModel.js";

class BallModel extends GameModel {
    constructor() {
        super();
        this.pathSection = 0;
        this.ballId = 0;
        this.ballsColor = this.colors;
        this.width = this.canvasWidth;
        this.height = this.canvasHeight;
        this.color = 0;
        this.getRandomColor();
    }

    getRandomColor() {
        let randomColor = Math.floor(Math.random() * this.colors.length);
        this.color = this.colors[randomColor];
    }

    update() {
        if (this.pathSection >= this.path.length) {
            this.setPosition(0);

        }

        this.x = this.path[this.pathSection].x;
        this.y = this.path[this.pathSection].y;

        /*this.pathSection += this.speed;*/
    }

    updateSize(width, height) {
        this.ballRadius = width / 70;
        let path = this.path;
        let ratioW = width / this.width;
        let ratioH = height / this.height;

        let newPath = [];
        for (let i = 0; i < path.length; i++) {
            newPath.push({x: path[i].x * ratioW, y: path[i].y * ratioH});
        }

        if (newPath.length === this.path.length) {
            this.path = newPath;
            this.width = width;
            this.height = height;
        }
    }

    getPathSection() {
        return this.pathSection;
    }

    updatePosition(speed) {
        let index = this.pathSection + speed;
        this.setPosition(index);
    }

    setPosition(index) {
        this.pathSection = index;
        this.x = this.path[this.pathSection].x;
        this.y = this.path[this.pathSection].y;
    }
}

export {BallModel};
