import {GameController} from "./controller/GameController.js";
import {Spa} from "./classes/Spa.js";

let spa = new Spa()
spa.run(run);

/*let mainMusic = new Audio();
mainMusic.src = './storage/sounds/main.mp3';

let buttonMusic = document.querySelector('.game_button');
buttonMusic.addEventListener('click', eo => {
    if (eo.target) {
        mainMusic.play();
    }
});*/

function run() {
    let gameController = new GameController();

    window.addEventListener('resize', () => {
        setTimeout(() => {
            gameController.resize();
        }, 1000);
    });


    function work() {
        gameController.draw();
        window.requestAnimationFrame(work);
    }

    window.requestAnimationFrame(work);
}
