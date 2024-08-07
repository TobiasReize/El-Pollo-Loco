class Character extends MovableObject {

    height = 280;
    y = 150;
    speed = 10;
    world;
    walkingSound = new Audio('assets/audio/walking.mp3');
    jumpingSound = new Audio('assets/audio/jump.mp3');
    hurtSound = new Audio('assets/audio/hurt.mp3');
    snoringSound = new Audio('assets/audio/snoring.mp3');
    idleTimer = 0;
    idleStatus = false;
    deadStatus = false;

    offset = {
        top: 140,
        left: 20,
        right: 30,
        bottom: 20
    };

    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];


    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        setStoppableInterval(() => this.applyGravity(), 1000 / 25);
        this.walkingSound.volume = 0.3;
        this.snoringSound.playbackRate = 3;
        this.snoringSound.loop = true;
    }


    /** Animates the character. */
    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.dead(), 100);
        setStoppableInterval(() => this.hurt(), 100);
        setStoppableInterval(() => this.aboveGround(), 150);
        setStoppableInterval(() => this.walk(), 50);
        setStoppableInterval(() => this.idle(), 150);
    }


    /** Checks if the character is dead and plays the animation. */
    dead() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.snoringSound.pause();
            this.deadStatus = true;
            this.idleStatus = false;
        }
    }


    /** Checks if the character is hurt and plays the animation. */
    hurt() {
        if (this.isHurt()) {
            this.snoringSound.pause();
            checkPlayAudio(this.hurtSound);
            this.playAnimation(this.IMAGES_HURT);
            this.idleStatus = false;
        }
    }


    /** Checks if the character is above the ground and plays the jumping animation. */
    aboveGround() {
        if (this.isAboveGround() && !this.isDead()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.idleStatus = false;
        } else {
            this.speedY = 0;
        }
    }


    /** Checks if the character is walking and plays the animation. */
    walk() {
        if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleStatus = false;
        } else {
            this.walkingSound.currentTime = 0;
        }
    }


    /** Checks if the character is inactive and plays the animation. */
    idle() {
        let timePassed = new Date().getTime() - this.idleTimer;
        timePassed = timePassed / 1000;
        if (this.idleStatus && timePassed > 5 && !this.world.keyboard.KEY_D) {
            checkPlayAudio(this.snoringSound);
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else if (this.idleStatus) {
            this.snoringSound.pause();
            this.playAnimation(this.IMAGES_IDLE);
        } else if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.KEY_D && !this.idleStatus) {
            this.idleTimer = new Date().getTime();
            this.idleStatus = true;
        }
    }


    /** Function for the movement of the character. */
    moveCharacter() {
        this.walkingSound.pause();
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
        }
        if (this.canJump()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }


    /** Checks if the character can move to the right. */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.deadStatus;
    }


    /** Character moves to the right. */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.snoringSound.pause();
        checkPlayAudio(this.walkingSound);
    }


    /** Checks if the character can move to the left. */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && !this.deadStatus;
    }


    /** Character moves to the left. */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.snoringSound.pause();
        checkPlayAudio(this.walkingSound);
    }


    /** Checks if the character can jump. */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround() && !this.deadStatus;
    }


    /** Character jumps. */
    jump() {
        this.currentImage = 0;
        super.jump();
        this.snoringSound.pause();
        checkPlayAudio(this.jumpingSound);
    }
}