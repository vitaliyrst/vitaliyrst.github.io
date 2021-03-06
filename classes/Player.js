class Player {
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

    getExtraScore(path, lastBallPathSection, level) {
        let gameField = document.querySelector('.zuma_field');

        let canvas = document.getElementById('canvas');
        let offsetLeft = document.body.offsetLeft - canvas.offsetLeft;
        let offsetTop = document.body.offsetTop - canvas.offsetTop;

        let divExtraScore = document.createElement('div');

        divExtraScore.classList.add('extra_score');
        gameField.append(divExtraScore);

        let width = divExtraScore.offsetWidth / 2;
        let height = divExtraScore.offsetHeight / 2;
        divExtraScore.style.left = path[lastBallPathSection].x - width - offsetLeft + 'px';
        divExtraScore.style.top = path[lastBallPathSection].y - height - offsetTop + 'px';

        let count = 50;
        for (let i = lastBallPathSection + 36; i < path.length; i += 36) {

            let x = path[i].x;
            let y = path[i].y;

            setTimeout(() => {
                divExtraScore.style.left = x - width - offsetLeft + 'px';
                divExtraScore.style.top = y - height - offsetTop + 'px';
                this.score += 1 * level;
                divExtraScore.textContent = `+ ${this.score}`;

                if (i + 72 > path.length) {
                    setTimeout(() => {
                        divExtraScore.remove();
                    }, 200);
                }
            }, count += 40);
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
            if (Number(records[nameIndex][1]) <= Number(value[1])) {
                records[nameIndex][1] = value[1];
                return records;
            } else if (Number(records[nameIndex][1]) >= Number(value[1])) {
                return records;
            }
        } else {
            for (let j = 0; j < records.length; j++) {
                if (Number(value[1]) > Number(records[j][1])) {
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

        await newRecords.sort(function (a, b) {
            return (Number(a[1]) < Number(b[1])) ? 1 : (Number(a[1]) > Number(b[1])) ? -1 : 0;
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

        await fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptionsUpdate)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));

        return records;
    }

    nextLevel(status,level,totalBalls, score, combo){
        let continueButton = document.querySelector('.continue');
        continueButton.addEventListener('click', () => {
            window.location.reload();
            location.hash = '#Play';
        });

        let canvas = document.getElementById('canvas');
        let closeDiv = document.querySelector('.close');
        let summaryDivs = document.querySelectorAll('.summary');

        closeDiv.style.width = canvas.offsetWidth + 'px';
        closeDiv.style.height = canvas.offsetHeight + 'px';
        closeDiv.style.left = canvas.offsetLeft + 'px';

        if (status === 'win') {
            summaryDivs[0].textContent = `You WIN`;
            summaryDivs[1].textContent = `Level: ${level}`;
            summaryDivs[2].textContent = `Balls: ${totalBalls}`;
            summaryDivs[3].textContent = `Score: ${score}`;
            summaryDivs[4].textContent = `Combo: x${combo}`;
        }
        if (status === 'lose') {
            summaryDivs[0].textContent = `You LOSE`;
        }

        closeDiv.classList.remove('hidden');
    }
}

export {Player}