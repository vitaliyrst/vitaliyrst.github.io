class Records {
    constructor() {
        this.score = 0;
        this.setPlayer();
    }

    setRecords(data) {
        let table = document.querySelector('.records_table');
        let trs = table.querySelectorAll('.top_five');

        for (let i = 0; i < trs.length; i++) {
            trs[i].firstElementChild.textContent = data[i][0];
            trs[i].lastElementChild.textContent = data[i][1];
        }
    }

    setPlayer() {
        let name = localStorage.getItem('name');

        if (name) {
            let playerScore = localStorage.getItem('score');
            let playerNameDiv = document.querySelector('.player_info_name');
            let playerScoreDiv = document.querySelector('.player_info_score');
            playerNameDiv.textContent = `Hi, ${name}`;
            if (playerScore > 0) {
                playerScoreDiv.textContent = `Your score: ${playerScore}`;
            } else {
                localStorage.setItem('score', '0');
                playerScoreDiv.textContent = 'Your score: 0';
            }
        }

        let currentLevel = localStorage.getItem('level');

        let levelDiv = document.querySelectorAll('.level_button');
        for (let i = 1; i < levelDiv.length; i++) {
            if (currentLevel >= levelDiv[i].value) {
                levelDiv[i].removeAttribute('disabled');
            }
        }
    }

    checkScore(score) {
        let localStorageScore = localStorage.getItem('score');
        if (score > localStorageScore) {
            localStorage.setItem('score', score);
            this.setPlayer();
        } else {
            localStorage.setItem('score', localStorageScore);
        }

        this.updateTable('KLUBKOU_ZUMA_RECORDS', [localStorage.getItem('name'), String(this.score)])
            .then(result => this.setRecords(result));
    }

    updateGameScore() {
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

        let count = 50;
        for (let i = lastBallPathSection + 40; i < path.length; i += 40) {
            let x = path[i].x;
            let y = path[i].y;
            setTimeout(() => {
                divExtraScore.style.left = x - width - offsetLeft + 'px';
                divExtraScore.style.top = y - height - offsetTop + 'px';
                this.score += 10;

                if (i + 40 > path.length) {
                    setTimeout(() => {
                        divExtraScore.remove()
                    }, 200)
                }
            }, count += 30);
        }
    }

    checkTop(records, value) {
        let nameIndex = null;
        for (let i = 0; i < records.length; i++) {
            if (records[i][0] === value[0]) {
                nameIndex = i;
                break;
            }
        }

        if (nameIndex !== null) {
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
                    return records;
                }
            }
        }
        return records;
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

        return records;
    }
}

export {Records}