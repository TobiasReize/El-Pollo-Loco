let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];   //Sammler für alle Intervalle


function init() {
    document.getElementById('start_screen').classList.add('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    //Der Instanz der "World" wird das "canvas" und die Instanz des "Keyboard" übergeben!
    console.log('My character is', world.character);
}


window.addEventListener('keydown', (e) => {
    if(e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    
    if(e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if(e.code == 'ArrowUp') {
        keyboard.UP = true;
    }

    if(e.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if(e.code == 'Space') {
        keyboard.SPACE = true;
    }
    
    if(e.code == 'KeyD') {
        keyboard.KEY_D = true;
    }
});


window.addEventListener('keyup', (e) => {
    if(e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    
    if(e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if(e.code == 'ArrowUp') {
        keyboard.UP = false;
    }

    if(e.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if(e.code == 'Space') {
        keyboard.SPACE = false;
    }

    if(e.code == 'KeyD') {
        keyboard.KEY_D = false;
    }
});


function setStoppableInterval(fn, time) {       //Hilfsfunktion für alle Intervalle! Alle Intervall-IDs werden in einem Array gespeichert!
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}


function stopGame() {                           //Funkion, die alle Intervalle beendet!
    // intervalIDs.forEach(clearInterval);
    for (let i = 0; i < 999; i++) {
        window.clearInterval(i);
    }
}


function gameOver() {
    stopGame();
    console.log('Spiel beendet!!!');
    document.getElementById('game_over_screen').classList.remove('d-none');
}


function youWin() {
    'coming soon...'
}