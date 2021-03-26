class Records {
    constructor() {
        this.score = 0;
    }

    setRecords(data) {
        let table = document.querySelector('.records_table');
        let trs = table.querySelectorAll('.top_five');

        for (let i = 0; i < trs.length; i++) {
            trs[i].firstElementChild.textContent = data[i][0];
            trs[i].lastElementChild.textContent = data[i][1];
        }
    }

    getScore() {
        let gameField = document.querySelector('.zuma_field');
    }

    updateScore() {
        let gameScore = document.querySelector('.game_score');
        gameScore.textContent = `SCORE : ${this.score}`;
    }

    getExtraScore(path, lastBallPathSection) {
        let gameField = document.querySelector('.zuma_field');

        let canvas = document.getElementById('canvas');
        let offsetLeft = document.body.offsetLeft - canvas.offsetLeft;
        let offsetTop = document.body.offsetTop - canvas.offsetTop;

        let divExtraScore = document.createElement('div');
        divExtraScore.classList.add('extra_score');
        let img = document.createElement('img');
        divExtraScore.append(img);
        img.src = './storage/extra.png';

        gameField.append(divExtraScore);

        let width = divExtraScore.offsetWidth / 2;
        let height = divExtraScore.offsetHeight / 2;
        divExtraScore.style.left = path[lastBallPathSection].x - width - offsetLeft + 'px';
        divExtraScore.style.top = path[lastBallPathSection].y - height - offsetTop + 'px';

        for (let i = lastBallPathSection + 40; i < path.length; i += 40) {
            let x = path[i].x;
            let y = path[i].y;
            setTimeout(() => {
                divExtraScore.style.left = x - width - offsetLeft + 'px';
                divExtraScore.style.top = y - height - offsetTop + 'px';
                this.score += 10;
            }, i);
        }
    }

    win() {
        let gameField = document.querySelector('.zuma_field');
        let winDiv = document.createElement('div');


    }

    async updateTable(name, value) {
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

        let records = await fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptions)
            .then(response => response.json())
            .then(result => JSON.parse(result.result))
            .catch(error => console.log('error', error))

        let newRecords = await this.checkTop(records, value);

        newRecords.sort(function (a, b) {
            return (a[1] < b[1]) ? 1 : (a[1] > b[1]) ? -1 : 0;
        });

        let myHeadersUpdate = new Headers();
        myHeadersUpdate.append('Content-type', 'application/x-www-form-urlencoded');

        let urlencodedRecordsUpdate = new URLSearchParams();
        urlencodedRecordsUpdate.append('f', 'UPDATE');
        urlencodedRecordsUpdate.append('n', name);
        urlencodedRecordsUpdate.append('p', password);
        urlencodedRecordsUpdate.append('v', JSON.stringify(newRecords));

        let requestOptionsUpdate = {
            method: 'POST',
            headers: myHeadersUpdate,
            body: urlencodedRecordsUpdate
        }

        fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptionsUpdate)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));

        return 'updated';
    }

    checkTop(records, value) {
        let nameIndex = null;
        for (let i = 0; i < records.length; i++) {
            if (records[i][0] === value[0]) {
                nameIndex = i;
            }
        }

        if (nameIndex) {
            if (records[nameIndex][1] <= value[1]) {
                records[nameIndex][1] = value[1];
                return records;
            } else if (records[nameIndex[1] >= value[1]]) {
                return records;
            }
        } else {
            for (let j = 0; j < records.length; j++) {
                if (value[1] > records[j][1]) {
                    records.splice(j, 0, value);
                    records.pop();
                    return records;
                }
            }
        }
        return records;
    }

    getCombo(value) {

    }
}

export {Records}