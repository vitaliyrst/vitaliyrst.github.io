import {Level} from "../classes/Level.js";

class GameModel {
    /**
     *
     */

    constructor() {
        this.settings = new Level(1);

        this.data = this.settings.getData();
        this.ratio = 384 / 569;
        this.setCanvasSize();
        this.path = this.setPath();
        this.ballRadius = this.setBallRadius();
        this.bullet = this.setBulletSize();
        this.frog = this.setFrogSize();
        this.level = this.data.level;
        this.levelBg = this.data.levelBg;
        this.ballsColor = this.data.ballsColor;
        this.context = document.getElementById('canvas').getContext('2d');
    }

    setCanvasSize() {
        let windowRatio = (innerWidth > innerHeight) ? innerHeight / innerWidth : innerWidth / innerHeight;

        let width;
        let height;

        if (innerWidth > 1138 && innerHeight > 768) {
            width = 1138;
            height = 768
        } else if (innerWidth < 569 && innerHeight < 384) {
            width = 569;
            height = 384;
        } else if (windowRatio < this.ratio) {
            if (innerWidth < 589 && innerHeight > 384) {
                width = 589;
                height = width * this.ratio
            } else if (innerHeight < 384 && innerWidth > 569) {
                height = 384;
                width = height / this.ratio
            } else {

                height = innerHeight;
                width = height / this.ratio;
            }
        } else {
            width = innerWidth;
            height = width * this.ratio;
        }

        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    setBallRadius() {
        return this.canvasWidth / 65;
    }

    setBulletSize() {
        return {
            radius: this.canvasWidth / 65,
            left: this.canvasWidth / this.data.offsetBulletLeft,
            top: this.canvasHeight / this.data.offsetBulletTop,
        }
    }

    setFrogSize() {
        return {
            width: this.canvasWidth / 6.15,
            height: this.canvasWidth / 6.15,
            left: this.canvasWidth / this.data.offsetFrogLeft,
            top: this.canvasHeight / this.data.offsetFrogTop,
        };
    }

    setPath() {
        let path = this.settings.getPath();

        let ratioW = this.canvasWidth / 1138;
        let ratioH = this.canvasHeight / 768;
        let newPath = [];
        for (let i = 0; i < path.length; i++) {
            newPath.push({x: path[i].x * ratioW, y: path[i].y * ratioH});
        }
        return newPath;
    }

    updateCanvasSize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    createCanvas() {
        let canvas = document.getElementById('canvas');
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
    }

    updateCanvas() {
        let levelBg = new Image();
        levelBg.src = this.levelBg;
        this.context.drawImage(levelBg, 0, 0, this.canvasWidth, this.canvasHeight);
    }


}

export {GameModel};