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


           /* if (balls[balls.length - 1].pathSection === 18 && balls.length < 50) {
                getBall();
            }*/

            /*let xMax = Math.max(frog.bulletCenterX, balls[i].x);
            let xMin = Math.min(frog.bulletCenterX, balls[i].x);
            let yMax = Math.max(frog.bulletCenterY, balls[i].y);
            let yMin = Math.min(frog.bulletCenterY, balls[i].y);
            if (frog.bulletState === 1 && xMax - xMin <= 16 && yMax - yMin <= 16) {
                if (frog.bulletColor !== balls[i].color) {
                    let pos = i;
                    let x = balls[i - 1].x;
                    let y = balls[i - 1].y;
                    let pathSection = balls[pos - 1].getPathSection();
                    let ball = new BallModel(getPath);
                    ball.x = x;
                    ball.y = y;
                    ball.init(pathSection);
                    ball.color = frog.bulletColor;
                    for (let j = 0; j < i; j++) {
                        setTimeout(() => {
                            balls[j].speed += 2;
                            setTimeout(() => {
                                balls[j].speed = 1;
                            }, 130)
                        }, 0);


                    }
                    balls.splice(pos, 0, ball);


                }
                frog.stopBullet();
                continue
            }*/
        window.requestAnimationFrame(work);
    }

    window.requestAnimationFrame(work);
}
