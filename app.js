import {Game} from "./model/Game.js";
import {Ball} from "./model/Ball.js";
import {Frog} from "./model/Frog.js";
import {FrogController} from "./controller/FrogController.js";
import {GameController} from "./controller/GameController.js";
import {Bezier} from "./classes/Bezier.js";
import {List} from "./classes/List.js";

let game = new Game();
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

let frog = new Frog();
new FrogController(frog);

let bezier = new Bezier();
let gamePoints = bezier.getGamePoints();

let balls = [];


function getBall() {
    let ball = new Ball(gamePoints);
    ball.init(0);
    balls.push(ball);
}

getBall();

/*function insertBall(ball, index) {
    var iPosX;
    var iPosY;
    var iInsertPos;

    if(szLabel === "next"){
        iInsertPos = balls[index].pathSection + 12;

        if(balls[index + 1] && (balls[index + 1].pathSection - balls[index + 1].pathSection) < 24 ){
            _aBallCrushed.push(new Array(oBall,_aBalls[iIndex + 1]));
            _bCheckPushCollision = true;
        }
    }else{
        if(_aBalls[iIndex - 1] && (_aBalls[iIndex].getFotogram() - _aBalls[iIndex - 1].getFotogram()) < 32){
            iInsertPos = _aBalls[iIndex - 1].getFotogram() + 16;
            _aBallCrushed.push(new Array(oBall,_aBalls[iIndex]));
            _bCheckPushCollision = true;
        }else {
            iInsertPos = _aBalls[iIndex].getFotogram() - 16;
        }
    }
}*/


function work() {
    game.updateCanvas();
    frog.draw();

    for (let i = 0; i < balls.length; i++) {
        if (balls[balls.length - 1].pathSection === 10 && balls.length < 10) {
            getBall();
        }

        let xMax = Math.max(frog.bulletCenterX, balls[i].x);
        let xMin = Math.min(frog.bulletCenterX, balls[i].x);
        let yMax = Math.max(frog.bulletCenterY, balls[i].y);
        let yMin = Math.min(frog.bulletCenterY, balls[i].y);
        if (frog.bulletState === 1 && xMax - xMin <= 15 && yMax - yMin <= 15) {
            if (frog.bulletColor !== balls[i].color) {
                let pos = i;
                let x = balls[i - 1].x;
                let y = balls[i - 1].y;
                let pathSection = balls[pos - 1].pathSection;
                let ball = new Ball(gamePoints);
                ball.init(pathSection);
                ball.color = frog.bulletColor;
                for (let j = 0; j < i; j++) {
                    setTimeout(() => {
                        balls[j].speed = 10;
                        setTimeout(() => {
                            balls[j].speed = 1;
                        }, 290);
                    }, 0);
                }
                balls.splice(pos, 0, ball);
                let vector = ball.getVector(ball, balls[pos +1]);



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
const times = [];
let fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
    });
}

refreshLoop();*/
