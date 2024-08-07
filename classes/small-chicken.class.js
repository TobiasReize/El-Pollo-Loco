class SmallChicken extends MovableObject {

    y = 370;
    height = 50;
    width = 60;
    walkIntervalID = 0;
    animationIntervalID = 0;
    killChickenSound = new Audio('assets/audio/chicken-dead.mp3');

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 1700;
        this.speed = 0.2 + Math.random() * 0.8;
        this.animate();
        setStoppableInterval(() => this.applyGravity(), 1000 / 25);
    }


    /** Animates the small chicken. */
    animate() {
        this.walkIntervalID = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        this.animationIntervalID = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


    /**
     * Plays the death animation of the chicken.
     * @param {integer} currentEnemyIndex - array index of the current chicken
     */
    dead(currentEnemyIndex) {
        this.killChickenSound.volume = 0.4;
        checkPlayAudio(this.killChickenSound);
        setTimeout(() => {
            this.killChickenSound.pause();
        }, 500);
        
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            delete LEVEL_1.enemies[currentEnemyIndex];
        }, 1000);
    }


    /** Stops all movement and animation intervals of the chicken. */
    stop() {
        clearInterval(this.walkIntervalID);
        clearInterval(this.animationIntervalID);
    }
}