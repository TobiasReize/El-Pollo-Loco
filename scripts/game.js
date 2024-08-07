let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let introSound = new Audio('assets/audio/intro.mp3');
let introSoundIntervalID = 0;
let gameSound = new Audio('assets/audio/game-music.mp3');
let winScreenSound = new Audio('assets/audio/you-win.mp3');
let gameOverSound = new Audio('assets/audio/game-over-music.mp3');
let audioMuted = true;


// --- Start screen: --- //
/** Initiates the world and shows the game screen. */
function startGame() {
    setUpSounds();
    document.getElementById('overlay_start_screen').classList.add('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/** Set up game sound. */
function setUpSounds() {
    introSound.pause();
    gameSound.volume = 0.05;
    gameSound.loop = true;
    if (audioMuted) {
        gameSound.volume = 0;
    }
    gameSound.play();
}


/** Shows the instruction overlay. */
function showInstructions() {
    document.getElementById('overlay_instructions').classList.remove('d-none');
}


/** Closes the instruction overlay. */
function closeInstructions() {
    document.getElementById('overlay_instructions').classList.add('d-none');
}


/** Sets up and plays the intro sound. */
function activateIntroSound() {
    showStartSoundOnIcon();
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


/** Shows the sound-on-icon on the start screen. */
function showStartSoundOnIcon() {
    document.getElementById('start_screen_sound_off').classList.add('d-none');
    document.getElementById('start_screen_sound_on').classList.remove('d-none');
}


/** Deactivates the intro sound. */
function deactivateIntroSound() {
    showStartSoundOffIcon();
    showGameSoundOffIcon();
    audioMuted = true;
    introSound.pause();
    introSound.currentTime = 0;
    clearInterval(introSoundIntervalID);
}


/** Shows the sound-off-icon on the start screen. */
function showStartSoundOffIcon() {
    document.getElementById('start_screen_sound_off').classList.remove('d-none');
    document.getElementById('start_screen_sound_on').classList.add('d-none');
}


// --- Game screen: --- //
/** Shows the fullscreen view. */
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


/** Checks and enables fullscreen mode for different browsers. */
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


/** Exit the fullscreen view. */
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


/** Checks and exits fullscreen mode for different browsers. */
function checkExitFullscreen() {
    if (document.exitFullscreen) {
	    document.exitFullscreen();
	  } else if (document.webkitExitFullscreen) { /* Safari */
	    document.webkitExitFullscreen();
	  } else if (document.msExitFullscreen) { /* IE11 */
	    document.msExitFullscreen();
	  }
}


/** Deactivates all game sounds. */
function deactivateGameSounds() {
    showGameSoundOffIcon();
    audioMuted = true;
    gameSound.volume = 0;
    world.level.enemies[0].hecticMusic.volume = 0;
    world.level.enemies[0].endbossSound.volume = 0;
    world.character.snoringSound.volume = 0;
}


/** Shows the sound-off-icon on the game screen. */
function showGameSoundOffIcon() {
    document.getElementById('game_sound_on').classList.add('d-none');
    document.getElementById('game_sound_off').classList.remove('d-none');
}


/** Activates all game sounds. */
function activateGameSounds() {
    showGameSoundOnIcon();
    audioMuted = false;
    gameSound.volume = 0.1;
    world.level.enemies[0].hecticMusic.volume = 0.8;
    world.level.enemies[0].endbossSound.volume = 1;
    world.character.snoringSound.volume = 1;
}


/** Shows the sound-on-icon on the game screen. */
function showGameSoundOnIcon() {
    document.getElementById('game_sound_on').classList.remove('d-none');
    document.getElementById('game_sound_off').classList.add('d-none');
}


/** Stops the game and shows the game over screen. */
function gameOver() {
    let fullscreen = document.getElementById('fullscreen');
    gameSound.pause();
    stopAllIntervals();
    fullscreen.innerHTML += gameOverHTML();
    gameOverSound.volume = 0.2;
    checkPlayAudio(gameOverSound);
}


/** Game over screen HTML. */
function gameOverHTML() {
    return /*html*/ `
        <section class="df-ai-jc-ctr overlay-screen">
            <div class="df-jc-ctr content-screen game-over-screen">
                <button onclick="location.reload()" class="button">Neustart</button>
            </div>
        </section>
    `;
}


/** Stops the game and shows the win screen. */
function youWin() {
    let fullscreen = document.getElementById('fullscreen');
    gameSound.pause();
    stopAllIntervals();
    fullscreen.innerHTML += youWinHTML();
    winScreenSound.volume = 0.2;
    checkPlayAudio(winScreenSound);
}


/** Win screen HTML. */
function youWinHTML() {
    return /*html*/ `
        <section class="df-ai-jc-ctr overlay-screen">
            <div class="df-jc-ctr content-screen win-screen">
                <button onclick="location.reload()" class="button">Neustart</button>
            </div>
        </section>
    `;
}


// --- Auxiliary functions: --- //
/**
 * Stops the event propagation.
 * @param {event} event - triggered event
 */
function stopPropagation(event) {
    event.stopPropagation();
}


/**
 * Executes functions as interval and saves the interval ID.
 * @param {*} fn - interval function
 * @param {*} time - interval time
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}


/** Stops all intervals. */
function stopAllIntervals() {
    for (let i = 0; i < 999; i++) {
        window.clearInterval(i);
    }
}


/**
 * Checks if sounds are muted and plays the audio.
 * @param {audio} audio - audio object
 */
function checkPlayAudio(audio) {
    if (!audioMuted) {
        audio.play();
    }
}


/**
 * Shows the info overlay container for mobile view.
 * @param {string} id - ID to identify start or game screen
 */
function showInfoContainer(id) {
    if (id == 'start') {
        document.getElementById('overlay_info_container_start').classList.add('translateX0');
    } else if (id == 'game') {
        document.getElementById('overlay_info_container_game').classList.add('translateY0');
    }
}


/**
 * Closes the info overlay container for mobile view.
 * @param {string} id - ID to identify start or game screen
 */
function closeInfoContainer(id) {
    if (id == 'start') {
        document.getElementById('overlay_info_container_start').classList.remove('translateX0');
    } else if (id == 'game') {
        document.getElementById('overlay_info_container_game').classList.remove('translateY0');
    }
}