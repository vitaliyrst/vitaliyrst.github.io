class Records {
    constructor(/*data*/) {
        /*this.data = data;*/
        /*this.set();*/
        this.score = 0;
        this.currentCombo = 0;
        this.maxCombo = 0;
        this.multiplierCombo = 0;
    }

    /*set() {
        let table = document.querySelector('.records_table');
        let trs = table.getElementsByTagName('tr');
        for (let i = 0; i < trs.length; i++) {
            if (i !== 0) {
                trs[i].firstElementChild.textContent = this.data[i][0];
                trs[i].lastElementChild.textContent = this.data[i][1];
            }
        }
    }*/

    getScore() {
        let gameField = document.querySelector('.zuma_field');
    }

    updateScore() {
        let gameScore = document.querySelector('.game_score');
        gameScore.textContent = `SCORE : ${this.score}`;
    }

    getFullScore(path, lastBallPathSection) {
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
                divExtraScore.style.top =  y - height - offsetTop+ 'px';
                this.score += 10;
            }, i);
        }
    }

    win() {
        let gameField = document.querySelector('.zuma_field');
        let winDiv = document.createElement('div');


    }

    getCombo(value) {

    }
}

export {Records}