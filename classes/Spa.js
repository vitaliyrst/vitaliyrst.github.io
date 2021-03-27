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

        let name = document.querySelector('.game_name');
        let player = document.querySelector('.player_name');
        let loading = document.querySelector('.loading_container');
        let menu = document.querySelector('.main_menu');
        let play = document.querySelector('.zuma_play');
        let game = document.querySelector('.zuma_game');
        let records = document.querySelector('.zuma_records');
        let rules = document.querySelector('.zuma_rules');
        let about = document.querySelector('.zuma_about');
        let localStorageName = localStorage.getItem('name');

        switch (this.spaState.pageName) {
            case 'Menu':
                loading.classList.add('hidden');

                if (localStorageName) {
                    player.classList.add('hidden');
                    play.classList.add('hidden');
                    game.classList.add('hidden');
                    records.classList.add('hidden');
                    rules.classList.add('hidden');
                    about.classList.add('hidden');
                    menu.classList.remove('hidden');
                } else {
                    name.classList.remove('hidden');
                    player.classList.remove('hidden');
                }
                break;
            case 'Play':
                loading.classList.add('hidden');

                if (localStorageName) {
                    menu.classList.add('hidden');
                    game.classList.add('hidden');
                    records.classList.add('hidden');
                    rules.classList.add('hidden');
                    about.classList.add('hidden');
                    name.classList.remove('hidden');
                    play.classList.remove('hidden');
                } else {
                    name.classList.remove('hidden');
                    player.classList.remove('hidden');
                }
                break;
            case 'Game' :
                loading.classList.add('hidden');

                if (localStorage) {
                    menu.classList.add('hidden');
                    play.classList.add('hidden');
                    records.classList.add('hidden');
                    rules.classList.add('hidden');
                    about.classList.add('hidden');
                    name.classList.add('hidden');
                    game.classList.remove('hidden');
                } else {
                    game.classList.add('hidden');
                    name.classList.remove('hidden');
                    player.classList.remove('hidden');
                }
                break;
            case 'Records':
                loading.classList.add('hidden');

                if (localStorageName) {
                    menu.classList.add('hidden');
                    play.classList.add('hidden');
                    game.classList.add('hidden');
                    rules.classList.add('hidden');
                    about.classList.add('hidden');
                    name.classList.remove('hidden');
                    records.classList.remove('hidden');
                } else {
                    name.classList.remove('hidden');
                    player.classList.remove('hidden');
                }
                break;
            case 'Rules':
                loading.classList.add('hidden');

                if (localStorageName) {
                    menu.classList.add('hidden');
                    play.classList.add('hidden');
                    game.classList.add('hidden');
                    records.classList.add('hidden');
                    about.classList.add('hidden');
                    name.classList.remove('hidden');
                    rules.classList.remove('hidden');
                } else {
                    name.classList.remove('hidden');
                    player.classList.remove('hidden');
                }
                break;
            case 'About':
                loading.classList.add('hidden');

                if (localStorageName) {
                    menu.classList.add('hidden');
                    play.classList.add('hidden');
                    game.classList.add('hidden');
                    records.classList.add('hidden');
                    rules.classList.add('hidden');
                    name.classList.remove('hidden');
                    about.classList.remove('hidden');
                } else {
                    name.classList.remove('hidden');
                    player.classList.remove('hidden');
                }
                break;
            case 'Load':
                menu.classList.add('hidden');
                play.classList.add('hidden');
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

    switchToPlayPage() {
        this.switchToState({pageName: 'Play'});
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
                location.hash = 'Play';
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

        let buttonPlay = document.querySelector('.play_button');
        buttonPlay.addEventListener('click', () => {
            this.switchToPlayPage('Play');
        });

        let buttonsLevel = document.querySelectorAll('.level_button');
        for (let i = 0; i < buttonsLevel.length; i++) {

            buttonsLevel[i].addEventListener('click', (eo) => {

                let zumaOrientation = window.screen.orientation;
                let orientationDiv = document.querySelector('.orientation');
                let html = document.documentElement;

                let div = document.getElementById('canvas');
                div.setAttribute('level', buttonsLevel[i].value);

                if (/Android|webOS|iPhone|iPad|iPod|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {



                    if (zumaOrientation.type === 'portrait-primary') {
                        orientationDiv.classList.remove('hidden');
                    }

                    if (zumaOrientation.type === 'landscape-primary') {
                        orientationDiv.classList.add('hidden');

                        function fullScreen(element) {
                            if (element.requestFullscreen) {
                                element.requestFullscreen();
                            }
                        }
                        fullScreen(html);
                        run();
                        this.switchToGamePage('Game');
                    }
                    window.addEventListener('orientationchange', () => {
                        if (zumaOrientation.type === 'portrait-primary') {
                            location.hash = '#Play';
                        }
                        if (zumaOrientation.type === 'landscape-primary') {
                            orientationDiv.classList.add('hidden');

                            function fullScreen(element) {
                                if (element.requestFullscreen) {
                                    element.requestFullscreen();
                                }
                            }
                            fullScreen(html);
                        }
                        run();
                        this.switchToGamePage('Game');
                    });
                } else if (zumaOrientation.type === 'landscape-primary') {
                    run();
                    this.switchToGamePage('Game');
                }
            });
        }

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

    checkPlayer(records, recordsArray) {
        let form = document.forms['formPlayer'];
        let errorSpan = document.querySelector('.error_span');

        form.addEventListener('change', () => {
            errorSpan.textContent = '';
            let inputName = document.querySelector('input[name]').value;
            let re = /^[a-zA-Zа-яА-ЯёЁ]{5,16}$/;
            let same;

            for (let i = 0; i < recordsArray.length; i++) {
                if (recordsArray[i][0] === inputName) {
                    errorSpan.textContent = 'player exist';
                    same = true;
                }
            }

            if (!re.test(inputName)) {
                errorSpan.textContent = 'name must be 5-16 letters';

            } else if (re.test(inputName) && !same) {
                localStorage.setItem('name', inputName);
                localStorage.setItem('checked', '1');
                localStorage.setItem('level', '1');
                records.setPlayer();
                setTimeout(() => {
                    this.switchToStateFromURLHash();
                }, 500);
            }
        });
    }
}

export {Spa}