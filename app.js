import {GameController} from "./controller/GameController.js";
import {Spa} from "./classes/Spa.js";
import {Player} from "./classes/Player.js";


async function ready() {
    let spa = new Spa();

    // fetch images
    let requestOptionsImages = {
        method: 'GET',
        redirect: 'follow'
    };

    let images = await fetch("https://vitaliyrst.github.io/images.json", requestOptionsImages)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));


    let count = 0
    images.forEach(function (value) {
        let img = new Image();
        img.src = value;

        count++;
    });

    new Promise((resolve => {
        if (count === images.length) {
            resolve(1);
        }
    }));

    await (images.length === count);

    //fetch records
    let myHeadersRecords = new Headers();
    myHeadersRecords.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencodedRecords = new URLSearchParams();
    urlencodedRecords.append("f", "READ");
    urlencodedRecords.append("n", "KLUBKOU_ZUMA_RECORDS");

    let requestOptionsRecords = {
        method: 'POST',
        headers: myHeadersRecords,
        body: urlencodedRecords,
        redirect: 'follow'
    };

    let recordsArray = await fetch("https://fe.it-academy.by/AjaxStringStorage2.php", requestOptionsRecords)
        .then(response => response.json())
        .then(result => JSON.parse(result.result))
        .catch(error => console.log('error', error));

    let player = new Player();
    player.setRecords(await recordsArray);

    for (let i = 0; i < recordsArray.length; i++) {
        let state = localStorage.getItem('projready');
        if (localStorage.getItem('name') !== recordsArray[i][0] && state !== '1') {
            localStorage.clear();
            location.hash = 'Menu';
        }
    }

    await spa.checkPlayer(player, recordsArray);

    spa.readyState = 1;
    return spa;
}

ready().then(spa => spa.run(run));

/*let dt = 1000 / 60;
let timeTarget = 0;

function run() {
    let gameController = new GameController();

    function work() {
        gameController.draw();

        if (Date.now() >= timeTarget) {
            timeTarget += dt;
        }
        requestAnimationFrame(work);
    }
    requestAnimationFrame(work);
}*/


function run() {
    let now;
    let delta;
    let then = Date.now();
    let interval = 1000 / 62;
    let gameController = new GameController();

    function work() {
        requestAnimationFrame(work);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {

            then = now - (delta % interval);
            gameController.draw();
        }
    }
    requestAnimationFrame(work);
}

/*let arr = [['1', '100'],['2', '99'] , ['3', '98'],['4', '97'] , ['5', '96']];

async function update(name, value) {
    let password = String(Math.random());

    let myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/x-www-form-urlencoded');

    let urlencodedRecords = new URLSearchParams();
    urlencodedRecords.append('f', 'LOCKGET');
    urlencodedRecords.append('n', name);
    urlencodedRecords.append('p', password);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencodedRecords
    }
    console.log(value)
    let records = await fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))

    console.log(records)

    let myHeadersUpdate = new Headers();
    myHeadersUpdate.append('Content-type', 'application/x-www-form-urlencoded');

    let urlencodedRecordsUpdate = new URLSearchParams();
    urlencodedRecordsUpdate.append('f', 'UPDATE');
    urlencodedRecordsUpdate.append('n', name);
    urlencodedRecordsUpdate.append('p', password);
    urlencodedRecordsUpdate.append('v', JSON.stringify(value));

    let requestOptionsUpdate = {
        method: 'POST',
        headers: myHeadersUpdate,
        body: urlencodedRecordsUpdate
    }

    fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptionsUpdate)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error))
}

update('KLUBKOU_ZUMA_RECORDS',arr);*/
