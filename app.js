import {GameModel} from "./model/GameModel.js";
import {BallModel} from "./model/BallModel.js";
import {FrogModel} from "./model/FrogModel.js";
import {FrogController} from "./controller/FrogController.js";
import {Path} from "./classes/Path.js";
import {FrogView} from "./view/FrogView.js";


/*fetch("https://fe.it-academy.by/AjaxStringStorage2.php", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));*/


let oldHash = window.location.hash;

if (oldHash) {
    console.log(oldHash)
    location.hash = oldHash.substr(1);
} else {
    location.hash = 'Menu';
}

let game = new GameModel();

let mainMusic = new Audio();
mainMusic.src = './storage/sounds/main.mp3';

let buttonMusic = document.querySelector('.game_button');
buttonMusic.addEventListener('click', eo => {
    if (eo.target) {
        mainMusic.play();
    }
});

function run() {

    game.createCanvas();

    let path = new Path();
    let getPath = path.getPath();


    /*let frog = new FrogModel();
    let frogView = new FrogView(frog);
    let frogController = new FrogController(frog, frogView);*/

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
        /*frogController.draw();*/

        for (let i = 0; i < balls.length; i++) {
            if (balls[balls.length - 1].pathSection === 16 && balls.length < 50) {
                getBall();
            }

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

            if (balls.length !== 0) {
                balls[i].draw();
                balls[i].update();
            }
        }
        window.requestAnimationFrame(work);
    }

    window.requestAnimationFrame(work);
}

let logo = document.querySelector('.game_name');
logo.addEventListener('click', (eo) => {
    switchToMenuPage('Menu');
});

let buttonGame = document.querySelector('.game_button');
buttonGame.addEventListener('click', () => {
    switchToGamePage('Game');
    run();
});

let buttonRecords = document.querySelector('.records_button');
buttonRecords.addEventListener('click', () => {
    switchToRecordsPage('Records');
});

let buttonRules = document.querySelector('.rules_button');
buttonRules.addEventListener('click', () => {
    switchToRulesPage('Rules');
});

let buttonAbout = document.querySelector('.about_button');
buttonAbout.addEventListener('click', () => {
    switchToAboutPage('About');
});


window.addEventListener('resize', resize);

function resize() {
    let container = document.querySelector('.zuma_field');
    let offsetWidth = container.clientWidth;
    let offsetHeight = container.clientHeight;

    let canvas = document.getElementById('canvas');
    let canvasRatio = 384 / 569;
    let windowRatio = (offsetWidth > offsetHeight) ? offsetHeight / offsetWidth : offsetWidth / offsetHeight;

    let width;
    let height;

    if (windowRatio < canvasRatio) {
        height = offsetHeight;
        width = height / canvasRatio;
    } else {

        width = offsetWidth;
        height = width * canvasRatio;
    }
    canvas.width = width;
    canvas.height = height
    game.canvasWidth = width;
    game.canvasHeight = height;
}

window.addEventListener('hashchange', switchToStateFromURLHash);

let spaState = {};

function switchToStateFromURLHash() {
    let URLHash = window.location.hash;

    let state = URLHash.substr(1);
    if (state !== '') {
        let parts = state.split("_");
        spaState = {pageName: parts[0]};

    } else {
        spaState = {pageName: 'Load'};
    }

    let loading = document.querySelector('.loading_container');
    let menu = document.querySelector('.main_menu');
    let records = document.querySelector('.zuma_records');
    let rules = document.querySelector('.zuma_rules');
    let about = document.querySelector('.zuma_about');
    let game = document.querySelector('.zuma_game');
    let name = document.querySelector('.game_name');

    switch (spaState.pageName) {
        case 'Menu':
            loading.classList.add('hidden');
            game.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            menu.classList.remove('hidden');
            name.classList.remove('hidden');
            break;
        case 'Game':
            loading.classList.add('hidden');
            menu.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            name.classList.add('hidden');
            game.classList.remove('hidden');
            break;
        case 'Records':
            loading.classList.add('hidden');
            menu.classList.add('hidden');
            game.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            name.classList.remove('hidden');
            records.classList.remove('hidden');
            break;
        case 'Rules':
            loading.classList.add('hidden');
            menu.classList.add('hidden');
            game.classList.add('hidden');
            records.classList.add('hidden');
            about.classList.add('hidden');
            name.classList.remove('hidden');
            rules.classList.remove('hidden');
            break;
        case 'About':
            loading.classList.add('hidden');
            menu.classList.add('hidden');
            game.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            name.classList.remove('hidden');
            about.classList.remove('hidden');
            break;
        case 'Load':
            menu.classList.add('hidden');
            game.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            name.classList.remove('hidden');
            break;
    }
}

function switchToState(newState) {
    location.hash = newState.pageName;
}

function switchToMenuPage() {
    switchToState({pageName: 'Menu'});
}

function switchToGamePage() {
    switchToState({pageName: 'Game'});
}

function switchToRecordsPage() {
    switchToState({pageName: 'Records'});
}

function switchToRulesPage() {
    switchToState({pageName: 'Rules'});
}

function switchToAboutPage() {
    switchToState({pageName: 'About'});
}


switchToStateFromURLHash();