class Game {
    constructor(data) {
        this.state = 700;
        this.level = data.level;
        this.levelBg = data.levelBg;
        this.canvasWidth = data.canvasWidth;
        this.canvasHeight = data.canvasHeight;
        this.ballsColor = data.ballsColor;
        this.pointsPath = data.pointsPath;
        this.ballRadius = data.ballRadius;
        this.bulletRadius = data.bulletRadius;
        this.frogLeft = data.frogLeft;
        this.frogTop = data.frogTop;
        this.frogWidth = data.frogWidth;
        this.frogHeight = data.frogHeight;
        this.ballsColor = data.ballsColor;
        this.pointsPath = data.pointsPath;
        this.context = document.getElementById('zuma-canvas').getContext('2d');
    }

    createCanvas() {
        this.context.canvas.width = this.canvasWidth;
        this.context.canvas.height = this.canvasHeight;
    }

    updateCanvas() {
        let levelBg = new Image();
        levelBg.src = this.levelBg;
        this.context.drawImage(levelBg, 0, 0, this.canvasWidth, this.canvasHeight);
    }
}

export {Game};