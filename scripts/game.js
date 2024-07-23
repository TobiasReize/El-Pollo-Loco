let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];   //Sammler für alle Intervalle
let introSound = new Audio('assets/audio/intro.mp3');


function init() {
    // introSound.autoplay = true;
    introSound.volume = 0.5
    let promise = introSound.play();
    console.log(promise);
    setInterval(() => {
        if (introSound.currentTime > 41) {
            introSound.currentTime = 0;
        }
    }, 200);
}


function startGame() {
    introSound.pause();
    document.getElementById('overlay_screen').classList.add('d-none');
    document.getElementById('start_screen').classList.add('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    //Der Instanz der "World" wird das "canvas" und die Instanz des "Keyboard" übergeben!
}


function showInstructions() {
    document.getElementById('overlay_instructions').classList.remove('d-none');
}


function closeInstructions() {
    document.getElementById('overlay_instructions').classList.add('d-none');
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


function stopAllIntervals() {                           //Funkion, die alle Intervalle beendet!
    for (let i = 0; i < 999; i++) {
        window.clearInterval(i);
    }
}


function gameOver() {
    stopAllIntervals();
    document.getElementById('overlay_screen').style.backgroundImage = 'none';
    document.getElementById('overlay_screen').classList.remove('d-none');
    document.getElementById('game_over_screen').classList.remove('d-none');
}


function youWin() {
    stopAllIntervals();
    document.getElementById('overlay_screen').style.backgroundImage = 'none';
    document.getElementById('overlay_screen').classList.remove('d-none');
    document.getElementById('win_screen').classList.remove('d-none');
}


function stopPropagation(event) {
    event.stopPropagation();
}