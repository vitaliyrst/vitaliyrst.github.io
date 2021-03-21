import {GameController} from "./controller/GameController.js";
import {Spa} from "./classes/Spa.js";

let images = ["./storage/backgrounds/bg.jpg",
    "./storage/backgrounds/border.png",
    "./storage/colors/BlueBall.jpg",
    "./storage/colors/GreenBall.jpg",
    "./storage/colors/PurpleBall.jpg",
    "./storage/colors/RedBall.jpg",
    "./storage/colors/WhiteBall.jpg",
    "./storage/colors/YellowBall.jpg",
    "./storage/frog/zuma.png",
    "./storage/levels/1.jpg",
    "./storage/levels/2.jpg",
    "./storage/load/loadBlueBall.jpg",
    "./storage/load/loadGreenBall.jpg",
    "./storage/load/loadPurpleBall.jpg",
    "./storage/load/loadRedBall.jpg",
    "./storage/load/loadWhiteBall.jpg",
    "./storage/load/loadYellowBall.jpg",
    "./storage/social/github.png",
    "./storage/social/linkedin.png",
    "./storage/social/github.png",
    "./storage/social/volume-off.png",
    "./storage/social/volume-on.png"];
/*let prFPS = new Promise((resolve, reject) => {
    let sss = {};
    let s1 = new Date().getMilliseconds();
    getFPS();

    function getFPS() {
        let s2 = new Date().getMilliseconds();
        let delta = s2 - s1;
        s1 = s2;
        if (delta in sss) {
            sss[delta] = sss[delta] + 1;
            if (sss[delta] > 50) {
                let fps = Math.round(1000 / delta);
                console.log(fps)
                resolve(true);
                return;
            }
        } else {
            sss[delta] = 1;
        }
        requestAnimationFrame(getFPS);
    }
});*/

let imageLoader = new Promise((resolve, reject) => {
    location.hash = '';
    let count = 0;
    images.forEach(function (value) {
        let img = new Image();
        img.src = value;
        count++;
    });

    if (count === images.length) {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    }
});

let musicLoader = new Promise((resolve, reject) => {
   setTimeout(() => {
       resolve(true);
   }, 2000)
});

let recordsLoader = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true);
    }, 2000)
});

let levelLoader = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true);
    }, 2000)
});

Promise.all([imageLoader, musicLoader, recordsLoader, levelLoader]).then(() => {
    let spa = new Spa();
    spa.readyState = 1;
    spa.run(run);
});

function run() {
    let gameController = new GameController();

    function work() {
        gameController.draw();
        window.requestAnimationFrame(work);
    }
    window.requestAnimationFrame(work);
}
