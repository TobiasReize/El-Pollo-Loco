let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];   //Sammler für alle Intervalle
let introSound = new Audio('assets/audio/intro.mp3');
let introSoundIntervalID = 0;
let gameSound = new Audio('assets/audio/game-music.mp3');
let winScreenSound = new Audio('assets/audio/you-win.mp3');
let gameOverSound = new Audio('assets/audio/game-over-music.mp3');
let audioMuted = true;  //standardmäßig sind die Töne gemuted


// Start screen:
function startGame() {
    introSound.pause();
    gameSound.volume = 0.1;
    gameSound.loop = true;
    if (audioMuted) {
        gameSound.volume = 0;
    }
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


function activateIntroSound() {
    document.getElementById('start_screen_sound_off').classList.add('d-none');
    document.getElementById('start_screen_sound_on').classList.remove('d-none');
    showGameSoundOnIcon();
    audioMuted = false;
    introSound.volume = 0.2;
    introSound.loop = true;
    introSound.play();
    introSoundIntervalID = setInterval(() => {
        if (introSound.currentTime > 41) {
            introSound.currentTime = 0;
        }
    }, 200);
}

function deactivateIntroSound() {
    document.getElementById('start_screen_sound_off').classList.remove('d-none');
    document.getElementById('start_screen_sound_on').classList.add('d-none');
    showGameSoundOffIcon();
    audioMuted = true;
    introSound.pause();
    introSound.currentTime = 0;
    clearInterval(introSoundIntervalID);
}


function showInfoContainer(id) {
    if (id == 'start') {
        document.getElementById('overlay_info_container_start').classList.add('translateX0');
    } else if (id == 'game') {
        document.getElementById('overlay_info_container_game').classList.add('translateY0');
    }
}


function closeInfoContainer(id) {
    if (id == 'start') {
        document.getElementById('overlay_info_container_start').classList.remove('translateX0');
    } else if (id == 'game') {
        document.getElementById('overlay_info_container_game').classList.remove('translateY0');
    }
}


// Game screen:
function showFullscreen() {
    let canvas = document.getElementById('canvas');
    let gameInfoContainer = document.getElementById('game_info_container');

    checkFullscreen();
    canvas.classList.add('canvas-fullscreen');
    gameInfoContainer.classList.add('game-info-container-fullscreen');

    document.getElementById('game_imprint_container').classList.add('d-none');
    document.getElementById('headline').classList.add('d-none');

    document.getElementById('icon_fullscreen').classList.add('d-none');
    document.getElementById('icon_exit_fullscreen').classList.remove('d-none');
}


function checkFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (fullscreen.requestFullscreen) {
	    fullscreen.requestFullscreen();
	  } else if (fullscreen.webkitRequestFullscreen) { /* Safari */
	    fullscreen.webkitRequestFullscreen();
	  } else if (fullscreen.msRequestFullscreen) { /* IE11 */
	    fullscreen.msRequestFullscreen();
	  }
}


function removeFullscreen() {
    let canvas = document.getElementById('canvas');
    let gameInfoContainer = document.getElementById('game_info_container');

    checkExitFullscreen();
    canvas.classList.remove('canvas-fullscreen');
    gameInfoContainer.classList.remove('game-info-container-fullscreen');

    document.getElementById('game_imprint_container').classList.remove('d-none');
    document.getElementById('headline').classList.remove('d-none');

    document.getElementById('icon_fullscreen').classList.remove('d-none');
    document.getElementById('icon_exit_fullscreen').classList.add('d-none');
}


function checkExitFullscreen() {
    if (document.exitFullscreen) {
	    document.exitFullscreen();
	  } else if (document.webkitExitFullscreen) { /* Safari */
	    document.webkitExitFullscreen();
	  } else if (document.msExitFullscreen) { /* IE11 */
	    document.msExitFullscreen();
	  }
}


function deactivateGameSounds() {
    showGameSoundOffIcon();
    audioMuted = true;
    gameSound.volume = 0;
    world.level.enemies[0].hecticMusic.volume = 0;
    world.level.enemies[0].endbossSound.volume = 0;
}


function showGameSoundOffIcon() {
    document.getElementById('game_sound_on').classList.add('d-none');
    document.getElementById('game_sound_off').classList.remove('d-none');
}


function activateGameSounds() {
    showGameSoundOnIcon();
    audioMuted = false;
    gameSound.volume = 0.1;
    world.level.enemies[0].hecticMusic.volume = 0.8;
    world.level.enemies[0].endbossSound.volume = 1;
}


function showGameSoundOnIcon() {
    document.getElementById('game_sound_on').classList.remove('d-none');
    document.getElementById('game_sound_off').classList.add('d-none');
}


function gameOver() {
    let fullscreen = document.getElementById('fullscreen');
    gameSound.pause();
    stopAllIntervals();
    fullscreen.innerHTML += gameOverHTML();
    gameOverSound.volume = 0.2;
    checkPlayAudio(gameOverSound);
}


function gameOverHTML() {
    return /*html*/ `
        <section class="df-ai-jc-ctr overlay-screen">
            <div class="df-jc-ctr content-screen game-over-screen">
                <button onclick="location.reload()" class="button">Neustart</button>
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
    checkPlayAudio(winScreenSound);
}


function youWinHTML() {
    return /*html*/ `
        <section class="df-ai-jc-ctr overlay-screen">
            <div class="df-jc-ctr content-screen win-screen">
                <button onclick="location.reload()" class="button">Neustart</button>
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


function checkPlayAudio(audio) {
    if (!audioMuted) {
        audio.play();
    }
}