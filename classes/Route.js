class Route {
    name = undefined;
    htmlName = undefined;
    default = undefined;

    constructor(name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    }

    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}

export {Route}
