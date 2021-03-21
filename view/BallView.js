import {GameView} from "./GameView.js";

class BallView extends GameView{
    frame = 0;
    numberOfRows = 10;
    numberOfCols = 6;
    tickPerFrame = 1;
    tickCount = 0;
    spriteWidth = 300;
    spriteHeight = 180;
    rowCount = 0;

    constructor(model) {
        super();
/*        this.model = model;
        this.color = 0;
        this.colors = this.data.ballsColor;
        this.getRandomColor();*/
    }

/*    getRandomColor(colors) {
        let randomColor = Math.floor(Math.random() * colors.length);
        this.color = colors[randomColor];
    }

    animateColor(image) {
        this.context.translate(this.model.x - this.model.ballRadius, this.model.y - this.model.ballRadius);
        this.context.drawImage(image,
            this.frame * this.spriteWidth / this.numberOfRows,
            this.rowCount * this.spriteHeight / this.numberOfCols,
            this.spriteWidth / this.numberOfRows, this.spriteHeight,
            0, 0,
            this.spriteWidth / this.numberOfRows, this.spriteHeight);

        if (this.tickCount > this.tickPerFrame) {
            this.tickCount = 0;
            if (this.frame === this.numberOfRows - 1) {
                this.rowCount++;
            }
            if (this.rowCount === 6) {
                this.rowCount = 0;
            }
            this.frame = (this.frame < this.numberOfRows - 1) ? this.frame += 1 : this.frame = 0;
        }
        this.tickCount++;
    }

    draw() {
        let ballImage = new Image();
        this.getRandomColor(this.data.ballsColor);
        ballImage.src = this.color;

        this.context.save();
        this.context.beginPath();
        this.context.arc(this.model.x, this.model.y, this.model.ballRadius, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.closePath();
        this.context.clip();

        this.animateColor(ballImage)

        this.context.restore();
    }*/
}

export {BallView}

