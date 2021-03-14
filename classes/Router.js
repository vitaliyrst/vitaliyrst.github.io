class Router {
    routes = undefined;
    rootElem = undefined;

    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
        this.init();
    }

    init() {
        let routes = this.routes;
        (function (scope, routes) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, routes);
            });
        })(this, routes);
        this.hasChanged(this, routes);
    }

    hasChanged(scope, routes) {
        if (window.location.hash.length > 0) {
            for (let i = 0, length = routes.length; i < length; i++) {
                let route = routes[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (let i = 0, length = routes.length; i < length; i++) {
                let route = routes[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    }

    goToRoute(htmlName) {
        (function (scope) {
            let url = 'templates/' + htmlName,
                xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        })(this);
    }
}

export {Router}
