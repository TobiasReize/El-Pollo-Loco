class Endboss extends MovableObject {

    height = 350;
    width = 220;
    y = 100;
    energy = 50;    //Ursprungs-Energie ist nur 50, damit man den Endboss nur 5x treffen muss!
    visible = false;    //zum Prüfen ob der Endboss sichtbar ist (zum Anzeigen der Statusbar des Endbosses)
    deadStatus = false;     //damit die dead-Animation nur einmal ausgeführt wird!
    endbossSound = new Audio('assets/audio/endboss-sound.mp3');
    hecticMusic = new Audio('assets/audio/hectic-music.mp3');
    hurtEndbossSound = new Audio('assets/audio/hurt-endboss-sound.mp3');
    imgCounter = 0;
    isAttacking = false;
    isAlert = false;
    isWalking = false;

    offset = {  //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
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


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);    //lädt das Start-Bild
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2550;      //x-Pos. am Ende der Map
        this.speed = 10;
        setStoppableInterval(() => this.applyGravity(), 1000 / 25);     //Gravity ergänzt, damit der Endboss auch springen kann
        this.animate();
    }


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


    animate() {
        setStoppableInterval(() => this.walk(), 150);
        setStoppableInterval(() => this.alert(), 200);
        setStoppableInterval(() => this.attack(), 150);
        setStoppableInterval(() => this.hurt(), 200);
        setStoppableInterval(() => this.dead(), 250);
    }

    //Animationen:
    walk() {
        if (this.visible && !this.isAttacking && !this.isAlert && !this.isAboveGround() && !this.isHurt() && !this.deadStatus) {
            this.isWalking = true;
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.isWalking = false;
        }
    }


    alert() {
        if (this.visible && !this.isAttacking && !this.isWalking && !this.isAboveGround() && !this.isHurt() && (this.imgCounter < this.IMAGES_ALERT.length - 1) && !this.deadStatus) {
            this.isAlert = true;
            this.playAnimation(this.IMAGES_ALERT);
            this.imgCounter++;
        } else {
            this.isAlert = false;
        }
    }


    attack() {
        if (this.visible && this.isAboveGround() && !this.isWalking && !this.isAlert && !this.isHurt() && !this.deadStatus) {
            this.isAttacking = true;
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.isAttacking = false;
        }
    }


    hurt() {
        if (this.visible && this.isHurt() && !this.deadStatus) {
            this.playHurtEndbossSound();
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    dead() {
        if (this.isDead() && (this.currentImage < (this.IMAGES_DEAD.length - 1) * 3)) {
            this.deadStatus = true;
            this.playAnimation(this.IMAGES_DEAD);
        }
    }


    //Bewegung:
    moveRight() {
        super.moveRight();
        this.otherDirection = true;     //Bilder werden gespiegelt
    }
    
    
    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;    //Bilder werden nicht gespiegelt (Endboss blickt ursprünglich nach links!)
    }


    jump() {
        super.jump();
    }


    //Sounds:
    playHurtEndbossSound() {    //Sound soll nur von Sekunde 4,6 bis 5,2 abgespielt werden!
        if (this.hurtEndbossSound.paused || this.hurtEndbossSound.currentTime == 0) {   //Sound soll nur abgespielt werden, wenn er noch nie abgespielt wurde oder er pausiert wurde! (damit der Sound immer von Sekunde 4,6 bis 5,2 durchläuft!)
            this.hurtEndbossSound.currentTime = 4.6;
            checkPlayAudio(this.hurtEndbossSound);
            setTimeout(() => {
                this.hurtEndbossSound.pause();
            }, 600);
        }
    }


    playEncounterEndbossSound() {
        this.hecticMusic.loop = true;
        this.hecticMusic.volume = 0.8;
        if (audioMuted) {
            this.hecticMusic.volume = 0;
            this.endbossSound.volume = 0;
        }
        this.endbossSound.play();
        let intervalID = setInterval(() => {
            if (this.endbossSound.ended) {
                gameSound.pause();
                this.hecticMusic.play();
                clearInterval(intervalID);
            }
        }, 100);
    }
}