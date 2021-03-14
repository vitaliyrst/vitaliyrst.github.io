import {data} from "../classes/data.js";
import {GameModel} from "../model/GameModel.js";
import {GameView} from "../view/GameView.js";

class GameController {
    constructor(game) {
        this.game = game;
    }

    run () {
        let game = new GameModel();
        game.createCanvas();
        game.updateCanvas();

        let frog = game.getFrog();
    }
}

export {GameController}