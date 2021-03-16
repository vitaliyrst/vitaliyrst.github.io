"use strict";

window.addEventListener('hashchange', switchToStateFromURLHash);

let spaState = {};

function switchToStateFromURLHash() {
    let URLHash = window.location.hash;
    let state = URLHash.substr(1);

    if (state !== '') {
        let parts = state.split("_");
        spaState = {pageName: parts[0]}; // первая часть закладки - номер страницы
    } else {
        spaState = {pageName: 'Load'}; // иначе показываем главную страницу
    }

    let loading = document.querySelector('.loading_container');
    let menu = document.querySelector('.main_menu');
    let records = document.querySelector('.zuma_records');
    let rules = document.querySelector('.zuma_rules');
    let about = document.querySelector('.zuma_about');
    let game = document.querySelector('.zuma_game');
    let name = document.querySelector('.game_name');

    switch (spaState.pageName) {
        case 'Load':
            loading.classList.remove('hidden');
            menu.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            game.classList.add('hidden');
            break;
        case 'Menu':
            loading.classList.add('hidden');
            menu.classList.remove('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            game.classList.add('hidden');
            break;
        case 'Game':
            menu.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            name.classList.add('hidden');
            game.classList.remove('hidden');

            break;
        case 'Records':
            menu.classList.add('hidden');
            records.classList.remove('hidden');
            rules.classList.add('hidden');
            about.classList.add('hidden');
            game.classList.add('hidden');
            break;
        case 'Rules':
            menu.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.remove('hidden');
            about.classList.add('hidden');
            game.classList.add('hidden');
            break;
        case 'About':
            menu.classList.add('hidden');
            records.classList.add('hidden');
            rules.classList.add('hidden');
            about.classList.remove('hidden');
            game.classList.add('hidden');
            break;
    }
}

function switchToState(newState) {
    location.hash = newState.pageName;
}

function switchToMenuPage() {
    switchToState( { pageName:'Menu' } );
}

function switchToGamePage() {
    switchToState( { pageName:'Game'} );
}

function switchToRecordsPage() {
    switchToState( { pageName:'Records'} );
}

function switchToRulesPage() {
    switchToState( { pageName:'Rules'} );
}

function switchToAboutPage() {
    switchToState( { pageName:'About' } );
}

switchToStateFromURLHash();