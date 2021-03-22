class Records {
    constructor(data) {
        this.data = data;
        this.set();
    }

    set() {
        let table = document.querySelector('.records_table');
        let trs = table.getElementsByTagName('tr');
        for (let i = 0; i < trs.length; i++) {
            if (i !== 0) {
                trs[i].firstElementChild.textContent = this.data[i][0];
                trs[i].lastElementChild.textContent = this.data[i][1];
            }
        }
    }
}

export {Records}