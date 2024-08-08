/**
 * Class representing a throwable object.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    throwIntervalID = 0;
    splashIntervalID = 0;
    splashDone = false;
    hitEnemy = false;
    imgCounter = 0;
    throwSound = new Audio('assets/audio/throw.mp3');
    bottleBreakSound = new Audio('assets/audio/bottle-break.mp3');
    
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    
    /**
     * Creates a throwable object.
     * @param {integer} x - the x value
     * @param {integer} y - the y value
     * @param {boolean} otherDirection - to check if images need to be mirrored
     */
    constructor(x, y, otherDirection) {
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y + 100;
        this.height = 60;
        this.width = 50;
        this.speedY = 30;
        this.speed = 15;
        this.otherDirection = otherDirection;
        setStoppableInterval(() => this.applyGravity(), 1000 / 25);
        this.throw();
    }


    /** Throws a new bottle. */
    throw() {
        this.throwSound.volume = 0.2;
        checkPlayAudio(this.throwSound);
        if (this.otherDirection) {
            this.throwLeft();
        } else {
            this.throwRight();
        }
    }


    /** Throws the bottle to the left. */
    throwLeft() {
        this.throwIntervalID = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            this.x -= this.speed;
        }, 50);
    }


    /** Throws the bottle to the right. */
    throwRight() {
        this.x = this.x + 50;
        this.throwIntervalID = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            this.x += this.speed;
        }, 50);
    }


    /** Plays the splash animation of the bottle. */
    splash() {
        this.bottleBreakSound.volume = 0.2;
        checkPlayAudio(this.bottleBreakSound);
        this.splashIntervalID = setInterval(() => {
            if (this.imgCounter == this.IMAGES_SPLASH.length - 1) {
                clearInterval(this.splashIntervalID);
                this.splashDone = true;
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
                this.imgCounter++;
            }
        }, 50);
    }
}