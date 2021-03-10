class Bezier {
    /**
     *
     * @param referencePoints - опорные точки
     * @property {Array} pointsArray - массив заполненных точек
     * @property {Number} numberOfTotalPoint - количество точек
     * @property {Array} rowLengthArray - длина одного сегмента точек A B C D  xy
     * @property {Function} pointsFunctionArray - функции для вычисления xy на сегменте
     * @property {Array} evenlyDistributedRowLengthArr - длина одного сегмента после равномерного распределения
     * @property {Number} totalPathLength - общая длина пути
     */
    constructor(referencePoints) {
        this.referencePoints = referencePoints;
        this.pointsArray = [];
        this.numberOfTotalPoint = this.referencePoints.length * 100;
        this.rowLengthArray = this.#getRowLengthArray();
        this.pointsFunctionArray = this.#getXAndYPoint();
        this.#setSameRowLengthPoints();
        this.evenlyDistributedRowLengthArr = [];
        this.totalPathLength = 0;
    }

    /**
     * @method
     * возвращает массив длин сегментов
     * @returns {Array}
     */
    #getRowLengthArray() {
        return Array(this.referencePoints.length).fill(this.numberOfTotalPoint / this.referencePoints.length);
    }

    /**
     * @method
     * распределяет xy по длине пути
     * @returns {(function(*=): {x: number, y: number})}
     */
    #getXAndYPoint() {
        return this.referencePoints.map((row, col) => {
            return (t) => {
                return {
                    x: (
                        (Math.pow(1 - t, 3) * row.A.x) +
                        (3 * Math.pow(1 - t, 2) * t * row.B.x) +
                        (3 * (1 - t) * Math.pow(t, 2) * row.C.x) +
                        (Math.pow(t, 3) * row.D.x)
                    ),
                    y: (
                        (Math.pow(1 - t, 3) * row.A.y) +
                        (3 * Math.pow(1 - t, 2) * t * row.B.y) +
                        (3 * (1 - t) * Math.pow(t, 2) * row.C.y) +
                        (Math.pow(t, 3) * row.D.y)
                    ),
                };
            };
        });
    }

    /**
     * @method
     * выполняет первый посев по длине сегмента (каждый сегмент = 100)
     * @return {VoidFunction}
     */
    #setSameRowLengthPoints() {
        this.referencePoints.forEach((row, col) => {
            this.pointsArray[col] = [];
            const dt = 1 / this.rowLengthArray[col];

            for (let t = 0; t < 1; t += dt) {
                this.pointsArray[col].push(this.pointsFunctionArray[col](t));
            }
        });
    }

    /**
     * @method
     * равномерное распределение по длине сегмента
     * @param a
     * @param b
     * @return {number}
     */
    #getEvenlyDistributedLength(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    /**
     * @method
     * заполняет массив сегментов с учетом равномерного распределения длины сегмента
     * @return {VoidFunction}
     */
    #setEvenlyDistributedRowLengthArray() {
        for (let i = 0; i < this.referencePoints.length; i++) {
            this.evenlyDistributedRowLengthArr[i] = 0;
            for (let j = 0; j < this.rowLengthArray[i] - 1; j++) {
                this.evenlyDistributedRowLengthArr[i] += this.#getEvenlyDistributedLength(
                    (this.pointsArray[i][j + 1].x - this.pointsArray[i][j].x),
                    (this.pointsArray[i][j + 1].y - this.pointsArray[i][j].y)
                );
            }
            if (i < this.referencePoints.length - 1) {
                this.evenlyDistributedRowLengthArr[i] += this.#getEvenlyDistributedLength(
                    (this.pointsArray[i + 1][0].x - this.pointsArray[i][this.rowLengthArray[i] - 1].x),
                    (this.pointsArray[i + 1][0].y - this.pointsArray[i][this.rowLengthArray[i] - 1].y)
                );
            }
        }
    }

    /**
     * @method
     * общая длина пути
     * @return {VoidFunction}
     */
    #getTotalPathLength() {
        this.totalPathLength = this.evenlyDistributedRowLengthArr.reduce((a, c) => {
            return a + c;
        });
    }

    /**
     * @method
     * выполняет второй посев точек, учитывая равномерное распределение длин
     * @return {VoidFunction}
     */
    #setEvenlyDistributedRowLengthPoints() {
        this.#setEvenlyDistributedRowLengthArray();
        this.#getTotalPathLength();
        this.referencePoints.forEach((row, col) => {
            this.pointsArray[col] = [];
            this.rowLengthArray[col] =
                Math.floor((this.evenlyDistributedRowLengthArr[col] / this.totalPathLength) * this.numberOfTotalPoint);
            const dt = 1 / this.rowLengthArray[col];
            for (let t = 0; t < 1; t += dt) {
                this.pointsArray[col].push(this.pointsFunctionArray[col](t));
            }
        });
    }

    /**
     * @method
     * выполняет параметризацию (r для точности)
     * @return {VoidFunction}
     */
    #getEqualizationOfDiscontinuities() {
        this.#setEvenlyDistributedRowLengthPoints();
        const averageRowLength = this.totalPathLength / (this.numberOfTotalPoint - 1);
        const step = (1 / this.numberOfTotalPoint) / 10;

        for (let i = 0; i < this.referencePoints.length; i++) {
            let t = [];
            for (let j = 0; j < this.rowLengthArray[i]; j++) {
                t[j] = j / this.rowLengthArray[i];
            }
            for (let r = 0; r < 100; r++) {
                let d = [];
                for (let j = 0; j < this.rowLengthArray[i] - 1; j++) {
                    d[j] = this.#getEvenlyDistributedLength(
                        (this.pointsArray[i][j + 1].x - this.pointsArray[i][j].x),
                        (this.pointsArray[i][j + 1].y - this.pointsArray[i][j].y)
                    );
                }
                const d_err = d.map((row) => {
                    return (row - averageRowLength);
                });
                let offset = 0;
                const cutoff = (i === this.referencePoints.length - 1) ? 0 : 1;
                for (let j = 1; j < this.rowLengthArray[i] - cutoff; j++) {
                    offset += d_err[j - 1];
                    t[j] -= step * offset;
                    this.pointsArray[i][j] = this.pointsFunctionArray[i](t[j]);
                }
            }
        }
    }

    /**
     * @method
     * возвращает точки для игры
     * @return {Array}
     */
    getGamePoints() {
        this.#setEvenlyDistributedRowLengthArray();
        this.#getTotalPathLength();
        this.#setEvenlyDistributedRowLengthPoints();
        this.#getEqualizationOfDiscontinuities();

        let gamePointsArray = [];

        this.pointsArray.forEach(function (value, key) {
            value.forEach(function (value) {
                gamePointsArray.push(value);

            })
        });
        return gamePointsArray;
    }
}

export {Bezier};
