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
        let divExtraScore = document.createElement('div');
        let extra = Math.round((path.length - lastBallPathSection) / 40);

        divExtraScore.classList.add('extra_score');
        divExtraScore.textContent = '+10';
        gameField.append(divExtraScore);

        let width = divExtraScore.offsetWidth / 2;
        let height = divExtraScore.offsetHeight / 2;

        for (let i = lastBallPathSection; i < path.length; i += 40) {
            let x = path[i].x;
            let y = path[i].y;
            setTimeout(() => {

                divExtraScore.style.left = x - width + 'px';
                divExtraScore.style.top = y - height + 'px';
                this.score += 10;
            }, i);
        }
    }

    getCombo(value) {

    }
}

export {Records}