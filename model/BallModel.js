import {GameModel} from "./GameModel.js";

class BallModel extends GameModel {
       constructor() {
        super();
        this.color = 0;
        this.pathSection = 0;
        this.speed = 1;
        this.ballId = 0;
        this.ballsColor = this.colors;
        this.width = this.canvasWidth;
        this.height = this.canvasHeight;
    }

    update() {
        if (this.pathSection >= this.path.length) {
            this.pathSection = 0;
            this.setPosition(this.path[this.pathSection].x, this.path[this.pathSection].y);

        }

        this.x = this.path[this.pathSection].x;
        this.y = this.path[this.pathSection].y;

        this.pathSection += this.speed;
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

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

export {BallModel};
