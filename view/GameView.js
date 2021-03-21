class GameView {
    constructor(model) {
        this.model = model;
        this.context = document.getElementById('canvas').getContext('2d');
    }

    createCanvas() {
        let canvas = document.getElementById('canvas');
        canvas.width = this.model.canvasWidth;
        canvas.height = this.model.canvasHeight;
    }

    draw() {
        let levelBg = new Image();
        levelBg.src = this.model.levelBg;
        this.context.drawImage(levelBg, 0, 0, this.model.canvasWidth, this.model.canvasHeight);
    }
}

export {GameView}