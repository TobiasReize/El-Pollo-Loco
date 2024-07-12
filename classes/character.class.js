class Character extends MovableObject {

    height = 280;
    y = 150;
    speed = 10;
    world;  //Referenz auf die Klasse "world" (aktuelle Instanz), damit die Variable "keyboard" der Klasse "world" auch hier verwendet werden kann!
    walking_sound = new Audio('assets/audio/walking.mp3');
    jumping_sound = new Audio('assets/audio/jump.mp3');
    idleTimer = 0;
    idleStatus = false;

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 120,
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
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');   //lädt das Start-Bild. Der "super-constructor" darf nur einmal aufgerufen werden! Danach immer nur "this" verwenden!
        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();     //animiert den Charakter
        this.applyGravity();
    }


    animate() {     //animiert den Charakter
        //Bewegungen:
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);

        //Animationen:
        setStoppableInterval(() => this.dead(), 100);
        setStoppableInterval(() => this.hurt(), 100);
        setStoppableInterval(() => this.aboveGround(), 150);
        setStoppableInterval(() => this.walk(), 50);
        setStoppableInterval(() => this.idle(), 150);
    }


    dead() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.idleStatus = false;
        }
    }


    hurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleStatus = false;
        }
    }


    aboveGround() {
        if (this.isAboveGround() && !this.isDead()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.idleStatus = false;
        }
    }


    walk() {
        if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleStatus = false;
        }
    }


    idle() {
        let timePassed = new Date().getTime() - this.idleTimer;     //Differenz zw. letztem idle-Zustand und aktuellem Zeitpunkt
        timePassed = timePassed / 1000;
        
        if (this.idleStatus && timePassed > 3) {
            this.playAnimation(this.IMAGES_LONG_IDLE);

        } else if (this.idleStatus) {
            this.playAnimation(this.IMAGES_IDLE);

        } else if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.idleStatus) {
            this.idleTimer = new Date().getTime();  //startet den idle-Timer
            this.idleStatus = true;                 //setzt den idle-Zustand auf "true" (somit wird nur einmal der idle-Timer gesetzt!)
        }
    }


    moveCharacter() {       //Funktion zum Bewegen des Charakters
        this.walking_sound.pause();     //wenn Pepe nicht läuft, wird der Sound pausiert!

        if (this.canMoveRight()) {    //Bewegung nach rechts! (bis die max. x-Pos. erreicht ist)
            this.moveRight();
        }

        if (this.canMoveLeft()) {    //Bewegung nach links! (bis max. zur x-Pos = 0)
            this.moveLeft();
        }

        if (this.canJump()) {   //Sprung nach oben! (nur wenn Pepe den Boden berührt!)
            this.jump();
        }

        this.world.camera_x = -this.x + 100;
    }


    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    moveRight() {
        super.moveRight();
        this.otherDirection = false;    //Bilder werden nicht gespiegelt! (Blickrichtung rechts)
        this.walking_sound.play();      //Audio wird nur abgespielt wenn Pepe läuft
    }


    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;     //Bilder werden gespiegelt! (Blickrichtung links)
        this.walking_sound.play();
    }


    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    jump() {
        super.jump();
        this.jumping_sound.play();
    }

}