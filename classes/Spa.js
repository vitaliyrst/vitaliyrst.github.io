class Spa {
    constructor() {
        this.spaState = {};
        this.readyState = 0;
    }

    switchToStateFromURLHash() {
        let URLHash = window.location.hash;
        let state = URLHash.substr(1);

        if (state !== '') {
            let parts = state.split("_");
            this.spaState = {pageName: parts[0]};
        } else {
            this.spaState = {pageName: 'Load'};
        }

        let loading = document.querySelector('.loading_container');
        let menu = document.querySelector('.main_menu');
        let records = document.querySelector('.zuma_records');
        let rules = document.querySelector('.zuma_rules');
        let about = document.querySelector('.zuma_about');
        let game = document.querySelector('.zuma_game');
        let name = document.querySelector('.game_name');

        switch (this.spaState.pageName) {
            case 'Menu':
                loading.classList.add('hidden');
                game.classList.add('hidden');
                records.classList.add('hidden');
                rules.classList.add('hidden');
                about.classList.add('hidden');
                menu.classList.remove('hidden');
                name.classList.remove('hidden');
                break;
            case 'Game':
                loading.classList.add('hidden');
                menu.classList.add('hidden');
                records.classList.add('hidden');
                rules.classList.add('hidden');
                about.classList.add('hidden');
                name.classList.add('hidden');
                game.classList.remove('hidden');
                break;
            case 'Records':
                loading.classList.add('hidden');
                menu.classList.add('hidden');
                game.classList.add('hidden');
                rules.classList.add('hidden');
                about.classList.add('hidden');
                name.classList.remove('hidden');
                records.classList.remove('hidden');
                break;
            case 'Rules':
                loading.classList.add('hidden');
                menu.classList.add('hidden');
                game.classList.add('hidden');
                records.classList.add('hidden');
                about.classList.add('hidden');
                name.classList.remove('hidden');
                rules.classList.remove('hidden');
                break;
            case 'About':
                loading.classList.add('hidden');
                menu.classList.add('hidden');
                game.classList.add('hidden');
                records.classList.add('hidden');
                rules.classList.add('hidden');
                name.classList.remove('hidden');
                about.classList.remove('hidden');
                break;
            case 'Load':
                menu.classList.add('hidden');
                game.classList.add('hidden');
                records.classList.add('hidden');
                rules.classList.add('hidden');
                about.classList.add('hidden');
                name.classList.remove('hidden');
                break;
        }
    }

    switchToState(newState) {
        location.hash = newState.pageName;
    }

    switchToMenuPage() {
        this.switchToState({pageName: 'Menu'});
    }

    switchToGamePage() {
        this.switchToState({pageName: 'Game'});
    }

    switchToRecordsPage() {
        this.switchToState({pageName: 'Records'});
    }

    switchToRulesPage() {
        this.switchToState({pageName: 'Rules'});
    }

    switchToAboutPage() {
        this.switchToState({pageName: 'About'});
    }

    observer() {
        window.addEventListener('hashchange', this.switchToStateFromURLHash);
    }

    run(run) {
        let oldHash = window.location.hash;

        if (this.readyState) {
            if (oldHash === '#Game') {
                location.hash = 'Menu';
            } else if (oldHash && oldHash !== '#Game') {
                location.hash = oldHash.substr(1);
            } else {
                location.hash = 'Menu';
            }
        }

        let logo = document.querySelector('.game_name');
        logo.addEventListener('click', (eo) => {
            this.switchToMenuPage('Menu');
        });

        let buttonGame = document.querySelector('.game_button');
        buttonGame.addEventListener('click', () => {
            run();
            this.switchToGamePage('Game');
        });

        let buttonRecords = document.querySelector('.records_button');
        buttonRecords.addEventListener('click', () => {
            this.switchToRecordsPage('Records');
        });

        let buttonRules = document.querySelector('.rules_button');
        buttonRules.addEventListener('click', () => {
            this.switchToRulesPage('Rules');
        });

        let buttonAbout = document.querySelector('.about_button');
        buttonAbout.addEventListener('click', () => {
            this.switchToAboutPage('About');
        });

        this.observer();
        this.switchToStateFromURLHash();
    }
}

export {Spa}