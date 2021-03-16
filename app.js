import {GameModel} from "./model/GameModel.js";
import {BallModel} from "./model/BallModel.js";
import {FrogModel} from "./model/FrogModel.js";
import {FrogController} from "./controller/FrogController.js";
import {Path} from "./classes/Path.js";
import {MainModel} from "./model/MainModel.js";
import {FrogView} from "./view/FrogView.js";
import {Route} from "./classes/Route.js";
import {Router} from "./classes/Router.js";

console.log(innerHeight)
    let game = new GameModel();
    game.createCanvas();

    let path = new Path();
    let getPath = path.getPath();
console.log(getPath)
/*    let mainMusic = new Audio();
    mainMusic.src = './storage/sounds/main.mp3';

    let buttonMusic = document.querySelector('.main-music');
    buttonMusic.addEventListener('click', eo => {
        if (eo.target) {
            mainMusic.play();
        }
    });*/


    let frog = new FrogModel();
    let frogView = new FrogView(frog);
    let frogController = new FrogController(frog,frogView);

    let balls = [];
    let ballView;
    function getBall() {
        let ball = new BallModel(getPath);
        ball.init(0);
        balls.push(ball);
    }

    getBall();

    function work() {
        game.updateCanvas();
        frogController.draw();

        for (let i = 0; i < balls.length; i++) {
            if (balls[balls.length - 1].pathSection === 16 && balls.length < 50) {
                getBall();
            }

            let xMax = Math.max(frog.bulletCenterX, balls[i].x);
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
                            balls[j].speed +=  2;
                            setTimeout(() => {
                                balls[j].speed = 1;
                            }, 130)
                        }, 0);


                    }
                    balls.splice(pos, 0, ball);


                }
                frog.stopBullet();
                continue
            }

            if (balls.length !== 0) {
                balls[i].draw();
                balls[i].update();
            }
        }
        window.requestAnimationFrame(work);
    }
    window.requestAnimationFrame(work);

/*
function init() {
    new Router([
        new Route('home', 'home.html'),
        new Route('about', 'about.html'),
        new Route('rules', 'rules.html'),
        new Route('records', 'records.html'),
        new Route('game', 'game.html', true),
    ]);
}

init();*/
