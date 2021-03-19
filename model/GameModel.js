import {Level} from "../classes/Level.js";

class GameModel {

    constructor() {
        this.settings = new Level();
        this.data = this.settings.getData();
        this.path = this.settings.getPath();
        this.ratio = 384 / 569;
        this.setCanvasSize();
        this.ballRadius = this.setBallRadius();
        this.bulletRadius = this.setBulletRadius();
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
        /*console.log(width,height)
        let canvasWidth = (innerWidth < 569) ? 569 :
            (innerWidth > 1138 && innerHeight > 768) ? 1138 :
                (innerWidth > 1138 && innerHeight < 384) ? 384 / this.ratio :
                    (innerWidth < 1138 && innerHeight > 768) ? innerWidth :
                        (innerWidth < 1138 && innerHeight < 384) ? 384 / this.ratio :
                            (innerWidth > 1138 && innerHeight < 768) ? innerHeight / this.ratio :
                                (innerWidth < 1138 && innerHeight < 768 && innerWidth > 768) ? innerWidth :
                                    innerHeight / this.ratio;

        let canvasHeight = (innerHeight < 384) ? 384 :
            (innerHeight > 768 && innerWidth > 1138) ? 768 :
                (innerHeight > 768 && innerWidth < 569) ? 569 * this.ratio :
                    (innerHeight < 768 && innerWidth > 1138) ? innerHeight :
                        (innerHeight < 768 && innerWidth < 569) ? 569 * this.ratio :
                            (innerHeight > 768 && innerWidth < 1138) ? innerWidth * this.ratio :
                                (innerHeight < 768 && innerWidth < 1138 && innerHeight > 569) ? innerHeight :
                                    innerWidth * this.ratio;*/

        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    setBallRadius() {
        return this.canvasWidth / 65;
    }

    setBulletRadius() {
        return this.canvasWidth / 65;
    }

    setFrogSize() {
        return {
            width: this.canvasWidth / 6.15,
            height: this.canvasWidth / 6.15,
            left: this.canvasWidth / 2.70,
            top: this.canvasWidth / 4.74
        };
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

    update(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }
}

export {GameModel};