import {GameController} from "./controller/GameController.js";
import {Spa} from "./classes/Spa.js";
import {Records} from "./classes/Records.js";

async function ready() {
    let userName = localStorage.getItem('name');
    let currentLevel = localStorage.getItem('level');



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

    let records = await fetch("https://fe.it-academy.by/AjaxStringStorage2.php", requestOptionsRecords)
        .then(response => response.json())
        .then(result => JSON.parse(result.result))
        .catch(error => console.log('error', error));

    let record = new Records();
        record.setRecords(await records);

    //fetch level
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
}

ready().then(() => {
    let spa = new Spa();
    spa.readyState = 1;
    setTimeout(() => spa.run(run), 1000);

})

function run() {
    let gameController = new GameController();

    function work() {
        gameController.draw();
        window.requestAnimationFrame(work);
    }

    window.requestAnimationFrame(work);
}

/*let arr = [['Kolya', 2000],['Sten', 1600] , ['Vitaliy', 1400],['Jake', 1200] , ['Alex', 1000]];

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
