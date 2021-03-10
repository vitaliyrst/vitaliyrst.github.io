import {dataGame} from "./classes/Data.js";
import {Game} from "./model/Game.js";
import {Ball} from "./model/Ball.js";
import {Frog} from "./model/Frog.js";
import {FrogController} from "./controller/FrogController.js";
import {GameController} from "./controller/GameController.js";
import {Bezier} from "./classes/Bezier.js";

let game = new Game(dataGame);
game.createCanvas();
let mainMusic = new Audio();
mainMusic.src = './storage/sounds/main.mp3';

let buttonMusic = document.querySelector('.main-music');
buttonMusic.addEventListener('click', eo => {
    if (eo.target) {
        mainMusic.play();
    }
});

let gameController = new GameController(game);
gameController.resize();

let frog = new Frog(dataGame);
new FrogController(frog);

let bezier = new Bezier(dataGame.pointsPath);
let gamePoints = bezier.getGamePoints();

let balls = [];

function getBall() {

    let ball = new Ball(dataGame, gamePoints[0].x, gamePoints[0].y, gamePoints);
    ball.id = balls.length;
    if (balls.length < 30) {
        balls.push(ball);
    }
}

getBall()
/*for (let i = 0; i < 30; i++) {
    getBall();
}*/
let currentIndex = 0;
let nextIndex = 1;

function work() {
    game.updateCanvas();
    frog.draw();
    balls[0].canNext = 1;

    /*let cc;
    let dd;
    let vvv;
    if (nextIndex < balls.length) {
        cc = balls[currentIndex].x - balls[nextIndex].x;
        dd = balls[currentIndex].y - balls[nextIndex].y;
        vvv = Math.sqrt((cc * cc) + (dd * dd));
    } else {
        cc = balls[currentIndex].x - balls[currentIndex - 1].x;
        dd = balls[currentIndex].y - balls[currentIndex - 1].y;
        vvv = Math.sqrt((cc * cc) + (dd * dd));
    }

    if (vvv > 30) {
        if (nextIndex < balls.length) {
            currentIndex += 1;
            nextIndex += 1;
        }
        balls[currentIndex].canNext = 1;
    }*/
    for (let i = 0; i < balls.length; i++) {
        if (balls[balls.length - 1].pathSection === 12) {
            getBall();
        }

        /*console.log(balls[i].x - balls[i].path[balls[i].pathSection].x);*/

        /*else {
            dx = balls[i].x - balls[i - 1].x;
            dy = balls[i - 1].y - balls[i].y;
        }*/


        let xMax = Math.max(frog.bulletCenterX, balls[i].x);
        let xMin = Math.min(frog.bulletCenterX, balls[i].x);
        let yMax = Math.max(frog.bulletCenterY, balls[i].y);
        let yMin = Math.min(frog.bulletCenterY, balls[i].y);
        if (frog.bulletState === 1 && xMax - xMin <= 15 && yMax - yMin <= 15) {

            if (frog.bulletColor !== balls[i].color) {
                console.log(i, balls[i]);
                let x = balls[i-1].x;
                let y = balls[i-1].y;
                let pathSection = balls[i-1].pathSection;

                let ball = new Ball(dataGame, x, y, gamePoints);
                ball.color = frog.bulletColor;
                ball.canNext = 1;
                ball.pathSection = pathSection;

                for (let j = i - 1; j >= 0; j--) {
                    setTimeout(() => {
                        balls[j].speed = 10;
                        setTimeout(() => {
                            balls[j].speed = 1;
                        }, 300)
                    }, 0);
                    balls[j].speed = 5;
                }
                balls.splice(i + 1, 0, ball);
            }
            frog.stopBullet();
            continue
        }
        /*if (balls[i].canNext) {*/
        balls[i].draw();
        balls[i].update();
        /*}*/

    }
    window.requestAnimationFrame(work);
}

window.requestAnimationFrame(work);