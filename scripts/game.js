let canvas;
let world;
let keyboard = new Keyboard();


function init() {
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
