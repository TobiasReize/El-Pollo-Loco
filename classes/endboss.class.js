/**
 * Class representing the endboss object.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 350;
    width = 220;
    y = 100;
    energy = 50;
    visible = false;
    deadStatus = false;
    endbossSound = new Audio('assets/audio/endboss-sound.mp3');
    hecticMusic = new Audio('assets/audio/hectic-music.mp3');
    hurtEndbossSound = new Audio('assets/audio/hurt-endboss-sound.mp3');
    imgCounter = 0;
    isAttacking = false;
    isAlert = false;
    isWalking = false;

    offset = {
        top: 140,
        left: 40,
        right: 30,
        bottom: 70
    };

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /** Creates the endboss. */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2550;
        this.speed = 20;
        setStoppableInterval(() => this.applyGravity(), 1000 / 25);
        this.animate();
    }


    /** Starts the animation of the endboss. */
    initEndboss() {
        this.visible = true;
        this.isWalking = true;
        let intervalID = setInterval(() => {
            if (this.x <= 2500) {
                this.isAlert = true;
                clearInterval(intervalID);
            }
        }, 250);
    }


    /** Animates the endboss. */
    animate() {
        setStoppableInterval(() => this.walk(), 150);
        setStoppableInterval(() => this.alert(), 200);
        setStoppableInterval(() => this.attack(), 150);
        setStoppableInterval(() => this.hurt(), 200);
        setStoppableInterval(() => this.dead(), 250);
    }


    // --- Animation: --- //
    /** Checks if the endboss can walk and plays the animation. */
    walk() {
        if (this.visible && !this.isAttacking && !this.isAlert && !this.isAboveGround() && !this.isHurt() && !this.deadStatus) {
            this.isWalking = true;
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.isWalking = false;
        }
    }


    /** Checks if the endboss is alert and plays the animation. */
    alert() {
        if (this.visible && !this.isAttacking && !this.isWalking && !this.isAboveGround() && !this.isHurt() && (this.imgCounter < this.IMAGES_ALERT.length - 1) && !this.deadStatus) {
            this.isAlert = true;
            this.playAnimation(this.IMAGES_ALERT);
            this.imgCounter++;
        } else {
            this.isAlert = false;
        }
    }


    /** Checks if the endboss can attack and plays the animation. */
    attack() {
        if (this.visible && this.isAboveGround() && !this.isWalking && !this.isAlert && !this.isHurt() && !this.deadStatus) {
            this.isAttacking = true;
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.isAttacking = false;
        }
    }


    /** Checks if the endboss is hurt and plays the animation. */
    hurt() {
        if (this.visible && this.isHurt() && !this.deadStatus) {
            this.playHurtEndbossSound();
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    /** Checks if the endboss is dead and plays the animation. */
    dead() {
        if (this.isDead() && (this.currentImage < (this.IMAGES_DEAD.length - 1) * 3)) {
            this.deadStatus = true;
            this.playAnimation(this.IMAGES_DEAD);
        }
    }


    // --- Movement: --- //
    /** Endboss moves to the right. */
    moveRight() {
        super.moveRight();
        this.otherDirection = true;
    }
    
    
    /** Endboss moves to the left. */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;
    }


    /** Endboss jumps. */
    jump() {
        super.jump();
    }


    // --- Sounds: --- //
    /** Plays the sound when the endboss is hurt. */
    playHurtEndbossSound() {
        if (this.hurtEndbossSound.paused || this.hurtEndbossSound.currentTime == 0) {
            this.hurtEndbossSound.currentTime = 4.6;
            checkPlayAudio(this.hurtEndbossSound);
            setTimeout(() => {
                this.hurtEndbossSound.pause();
            }, 600);
        }
    }


    /** Plays the sound when the character encounters the endboss. */
    playEncounterEndbossSound() {
        this.hecticMusic.loop = true;
        this.hecticMusic.volume = 0.8;
        this.checkIfAudioIsMuted();
        this.endbossSound.play();
        let intervalID = setInterval(() => {
            if (this.endbossSound.ended) {
                gameSound.pause();
                this.hecticMusic.play();
                clearInterval(intervalID);
            }
        }, 100);
    }


    /** Checks if the audio is muted and sets the volume to zero. */
    checkIfAudioIsMuted() {
        if (audioMuted) {
            this.hecticMusic.volume = 0;
            this.endbossSound.volume = 0;
        }
    }
}