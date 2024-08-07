class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    KEY_D = false;


    constructor() {
        this.addKeyboardEvents();
        this.addTouchEvents();
    }


    /** Implements keyboard control. */
    addKeyboardEvents() {
        window.addEventListener('keydown', (e) => {
            if(e.code == 'ArrowLeft') {
                this.LEFT = true;
            }
            
            if(e.code == 'ArrowRight') {
                this.RIGHT = true;
            }
        
            if(e.code == 'ArrowUp') {
                this.UP = true;
            }
        
            if(e.code == 'ArrowDown') {
                this.DOWN = true;
            }
        
            if(e.code == 'Space') {
                this.SPACE = true;
            }
            
            if(e.code == 'KeyD') {
                this.KEY_D = true;
            }
        });
        
        
        window.addEventListener('keyup', (e) => {
            if(e.code == 'ArrowLeft') {
                this.LEFT = false;
            }
            
            if(e.code == 'ArrowRight') {
                this.RIGHT = false;
            }
        
            if(e.code == 'ArrowUp') {
                this.UP = false;
            }
        
            if(e.code == 'ArrowDown') {
                this.DOWN = false;
            }
        
            if(e.code == 'Space') {
                this.SPACE = false;
            }
        
            if(e.code == 'KeyD') {
                this.KEY_D = false;
            }
        });
    }


    /** Implements touchscreen control. */
    addTouchEvents() {
        document.getElementById('btn_left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btn_left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        
        document.getElementById('btn_right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btn_right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        
        document.getElementById('btn_jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('btn_jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
        
        document.getElementById('btn_throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_D = true;
        });

        document.getElementById('btn_throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_D = false;
        });
    }
}