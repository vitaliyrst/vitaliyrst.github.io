class Bezier {
    step;
    point0;
    point1;
    point2;
    ax;
    ay;
    bx;
    by;
    A;
    B;
    C;
    totalLength;

    init(point0, point1, point2, speed) {
        this.point0 = point0;
        this.point1 = point1;
        this.point2 = point2;

        this.ax = this.point0.x - 2 * this.point1.x + this.point2.x;
        this.ay = this.point0.y - 2 * this.point1.y + this.point2.y;
        this.bx = 2 * this.point1.x - 2 * this.point0.x;
        this.by = 2 * this.point1.y - 2 * this.point0.y;

        this.A = 4 * (Math.pow(this.ax, 2) + Math.pow(this.ay, 2));
        this.B = 4 * (this.ax * this.bx + this.ay * this.by);
        this.C = Math.pow(this.bx, 2) + Math.pow(this.by, 2);

        this.totalLength = this.length(1);
        this.step = Math.floor(this.totalLength / speed);

        if (this.totalLength % speed > speed / 2) {
            this.step++;
        }

        return this.step;
    };

    speed(t) {
        return Math.sqrt(this.A * t * t + this.B * t + this.C);
    };

    length(t) {
        let temp1 = Math.sqrt(this.C + t * (this.B + this.A * t));
        let temp2 = (2 * this.A * t * temp1 + this.B * (temp1 - Math.sqrt(this.C)));
        let temp3 = Math.log(this.B + 2 * Math.sqrt(this.A) * Math.sqrt(this.C));
        let temp4 = Math.log(this.B + 2 * this.A * t + 2 * Math.sqrt(this.A) * temp1);
        let temp5 = 2 * Math.sqrt(this.A) * temp2;
        let temp6 = (this.B * this.B - 4 * this.A * this.C) * (temp3 - temp4);

        return (temp5 + temp6) / (8 * Math.pow(this.A, 1.5));
    };

    invertL(t, l) {
        let t1 = t;
        let t2;

        do {
            t2 = t1 - (this.length(t1) - l) / this.speed(t1);
            if (Math.abs(t1 - t2) < 0.000001) break;
            t1 = t2;
        } while (true);

        return t2;
    };

    getPoint(x, y) {
        return {x: x, y: y};
    }

    getAnchorPoint(index) {
        if (index >= 0 && index <= this.step) {
            let t = index / this.step;
            let l = t * this.totalLength;
            t = this.invertL(t, l);

            let xx = Math.pow(1 - t, 2) * this.point0.x + 2 * (1 - t) * t * this.point1.x + t * t * this.point2.x;
            let yy = Math.pow(1 - t, 2) * this.point0.y + 2 * (1 - t) * t * this.point1.y + t * t * this.point2.y;

            let Q0 = this.getPoint(
                (1 - t) * this.point0.x + t * this.point1.x,
                (1 - t) * this.point0.y + t * this.point1.y);

            let Q1 = this.getPoint(
                (1 - t) * this.point1.x + t * this.point2.x,
                (1 - t) * this.point1.y + t * this.point2.y);

            let dx = Q1.x - Q0.x;
            let dy = Q1.y - Q0.y;
            let radians = Math.atan2(dy, dx);
            let degrees = radians * 180 / Math.PI;

            return {x: xx, y: yy, degrees: degrees};
        } else {
            return {};
        }
    };
}

export {Bezier}