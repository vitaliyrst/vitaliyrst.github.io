import {data} from "./data.js";
import {Bezier} from "./Bezier.js";

class Path {
    constructor() {
        this.path = [];
    }

    getPoint(x, y) {
        return {x, y};
    }

    getPoints() {
        let mapCurve = data.pointsPath;

        let bezier = new Bezier();

        for (let i = 0; i < mapCurve.length - 2; ++i) {
            let point0 = (i === 0) ? this.getPoint(mapCurve[0].x, mapCurve[0].y) :
                this.getPoint((mapCurve[i].x + mapCurve[i + 1].x) / 2,
                    (mapCurve[i].y + mapCurve[i + 1].y) / 2);

            let point1 = this.getPoint(mapCurve[i + 1].x, mapCurve[i + 1].y);

            let point2 = (i <= mapCurve.length - 4) ? this.getPoint((mapCurve[i + 1].x + mapCurve[i + 2].x) / 2,
                    (mapCurve[i + 1].y + mapCurve[i + 2].y) / 2) :
                this.getPoint(mapCurve[i + 2].x, mapCurve[i + 2].y);

            let steps = bezier.init(point0, point1, point2, 1.8);

            for (let m = 1; m <= steps; ++m) {
                let data = bezier.getAnchorPoint(m);

                this.path.push(data);
            }
        }
    };

    getPath() {
        this.getPoints();
        return this.path;
    }
}

export {Path}