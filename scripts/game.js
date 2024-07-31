let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];   //Sammler für alle Intervalle
let introSound = new Audio('assets/audio/intro.mp3');
let gameSound = new Audio('assets/audio/game-music.mp3');
let winScreenSound = new Audio('assets/audio/you-win.mp3');
let gameOverSound = new Audio('assets/audio/game-over-music.mp3');


function init() {
    introSound.autoplay = true;
    introSound.volume = 0.4
    introSound.loop = true;

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
    gameSound.volume = 0.1;
    gameSound.loop = true;
    gameSound.play();
    document.getElementById('overlay_start_screen').classList.add('d-none');
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


function muteAllSounds() {
    let audioCollection = document.getElementsByTagName('audio');
    console.log(audioCollection);
}


function gameOver() {
    let fullscreen = document.getElementById('fullscreen');
    gameSound.pause();
    stopAllIntervals();
    fullscreen.innerHTML += gameOverHTML();
    gameOverSound.volume = 0.2;
    gameOverSound.play();
}


function gameOverHTML() {
    return /*html*/ `
        <section class="df-ai-jc-ctr overlay-screen">
            <div class="df-jc-ctr content-screen game-over-screen">
                <button onclick="location.reload()" class="button">Restart</button>
            </div>
        </section>
    `;
}


function youWin() {
    let fullscreen = document.getElementById('fullscreen');
    gameSound.pause();
    stopAllIntervals();
    fullscreen.innerHTML += youWinHTML();
    winScreenSound.volume = 0.2;
    winScreenSound.play();
}


function youWinHTML() {
    return /*html*/ `
        <section class="df-ai-jc-ctr overlay-screen">
            <div class="df-jc-ctr content-screen win-screen">
                <button onclick="location.reload()" class="button">Restart</button>
            </div>
        </section>
    `;
}


// Hilfsfunktionen:
function stopPropagation(event) {
    event.stopPropagation();
}


function setStoppableInterval(fn, time) {       //Hilfsfunktion für alle Intervalle! Alle Intervall-IDs werden in einem Array gespeichert!
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}


function stopAllIntervals() {                           //Funkion, die alle Intervalle beendet!
    for (let i = 0; i < 999; i++) {
        window.clearInterval(i);
    }
}


function showFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    let canvas = document.getElementById('canvas');
    let gameInfoContainer = document.getElementById('game_info_container');

    fullscreen.requestFullscreen();
    canvas.classList.add('canvas-fullscreen');
    gameInfoContainer.classList.add('game-info-container-fullscreen');

    document.getElementById('game_imprint_container').classList.add('d-none');
    document.getElementById('headline').classList.add('d-none');

    document.getElementById('icon_fullscreen').classList.add('d-none');
    document.getElementById('icon_exit_fullscreen').classList.remove('d-none');
}


function removeFullscreen() {
    let canvas = document.getElementById('canvas');
    let gameInfoContainer = document.getElementById('game_info_container');

    document.exitFullscreen();
    canvas.classList.remove('canvas-fullscreen');
    gameInfoContainer.classList.remove('game-info-container-fullscreen');

    document.getElementById('game_imprint_container').classList.remove('d-none');
    document.getElementById('headline').classList.remove('d-none');

    document.getElementById('icon_fullscreen').classList.remove('d-none');
    document.getElementById('icon_exit_fullscreen').classList.add('d-none');
}