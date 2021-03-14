import {GameModel} from "./model/GameModel.js";
import {BallModel} from "./model/BallModel.js";
import {BallView} from "./view/BallView.js";
import {FrogModel} from "./model/FrogModel.js";
import {FrogController} from "./controller/FrogController.js";
import {Path} from "./classes/Path.js";
import {FrogView} from "./view/FrogView.js";

let game = new GameModel();
game.createCanvas();

let path = new Path();
let getPath = path.getPath();

let mainMusic = new Audio();
mainMusic.src = './storage/sounds/main.mp3';

let buttonMusic = document.querySelector('.main-music');
buttonMusic.addEventListener('click', eo => {
    if (eo.target) {
        mainMusic.play();
    }
});


let frog = new FrogModel();
let frogView = new FrogView(frog);
new FrogController(frog);

let balls = [];
let ballView;
function getBall() {
    let ball = new BallModel(getPath);
    ballView = new BallView(ball);
    ball.init(0);
    balls.push(ball);
}

getBall();


/*function insertBall (ball, index, szLabel) {
    let x;
    let y;
    let insertPosition;

    if (szLabel === "next") {
        insertPosition = balls[index].getPathSection() + 16;
        if (balls[index+1] && (balls[index+1].getPathSection() - balls[index].getPathSection()) < 32) {
            /!*_aBallCrushed.push(new Array(oBall, _aBalls[iIndex + 1]));
            _bCheckPushCollision = true;*!/
        }
    } else {
        if (balls[index - 1] && (balls[index].getPathSection() - balls[index - 1].getPathSection()) < 32) {
            insertPosition = balls[index - 1].getPathSection() + 16;
            /!*_aBallCrushed.push(new Array(oBall, _aBalls[iIndex]));
            _bCheckPushCollision = true;*!/
        } else {
            insertPosition = balls[index].getPathSection() - 16;
        }
    }

    x = getPath[insertPosition].x;
    y = getPath[insertPosition].y;
    console.log(x, y)
    ball.x = x;
    ball.y = y;
    ball.pathSection = getPath[insertPosition];
    balls.splice(insertPosition, 0, ball);
    /!*var oParent = this;
    createjs.Tween.get(oBall.getSprite()).to({x: iPosX, y: iPosY}, 200).call(function () {
        oParent.motionFinished(oBall, iInsertPos)
    });*!/
}*/

function work() {
    game.updateCanvas();
    frog.draw();

    for (let i = 0; i < balls.length; i++) {
        if (balls[balls.length - 1].pathSection === 16 && balls.length < 15) {
            getBall();
        }

        let xMax = Math.max(frog.bulletCenterX, balls[i].x);
        let xMin = Math.min(frog.bulletCenterX, balls[i].x);
        let yMax = Math.max(frog.bulletCenterY, balls[i].y);
        let yMin = Math.min(frog.bulletCenterY, balls[i].y);
        if (frog.bulletState === 1 && xMax - xMin <= 15 && yMax - yMin <= 15) {
/*
let ball = new BallModel(path);
            insertBall(ball, i, 'next');
        }
*/
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
                    balls[j].pathSection += 16;
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
