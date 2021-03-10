class GameController {
    constructor(game) {
        this.game = game;
    }

    resize() {
        /*window.addEventListener('resize', (eo) =>{
            let bodyWidth = document.body.clientWidth;
            if (bodyWidth === 800 && this.game.state !== 800) {
                console.log(1)
                this.game.state = 800;
                this.game.canvasWidth = this.game.canvasWidth / 1.2;
                this.game.canvasHeight = this.game.canvasHeight / 1.2;
                this.game.ballRadius = this.game.ballRadius / 1.2;
                this.game.bulletRadius = this.game.bulletRadius / 1.2;
                this.game.frogLeft = this.game.frogLeft / 1.2;
                this.game.frogTop = this.game.frogTop / 1.2;
                this.game.frogWidth = this.game.frogWidth / 1.2;
                this.game.frogHeight = this.game.frogHeight / 1.2;
            }
        });*/
    }
}

export {GameController}