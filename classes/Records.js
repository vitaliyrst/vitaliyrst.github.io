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

    updateScore(score) {
        let gameScore = document.querySelector('.game_score');
        gameScore.textContent = `SCORE : ${score}`;
    }

    getCombo(value) {

    }
}

export {Records}