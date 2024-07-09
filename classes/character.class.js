class Character extends MovableObject {

    height = 280;
    y = 0;
    speed = 10;

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
        'assets/img/2_character_pepe/4_hurt/H-43.png',
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

    world;  //Referenz auf die Klasse "world" (aktuelle Instanz), damit die Variable "keyboard" der Klasse "world" auch hier verwendet werden kann!
    walking_sound = new Audio('assets/audio/walking.mp3');
    jumping_sound = new Audio('assets/audio/jump.mp3');
    
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');   //lädt das Start-Bild. Der "super-constructor" darf nur einmal aufgerufen werden! Danach immer nur "this" verwenden!
       
        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();     //animiert den Charakter
        this.applyGravity();
    }


    animate() {     //animiert den Charakter

        setInterval(() => { //Intervall für die Bewegung des Charakters + Abspielen des walking-sounds
            this.walking_sound.pause();     //wenn Pepe nicht läuft, wird der Sound pausiert!

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {    //Bewegung nach rechts! (bis die max. x-Pos. erreicht ist)
                this.moveRight();
                this.otherDirection = false;    //Bilder werden nicht gespiegelt! (Blickrichtung rechts)
                this.walking_sound.play();      //Audio wird nur abgespielt wenn Pepe läuft
            }

            if (this.world.keyboard.LEFT && this.x > 0) {    //Bewegung nach links! (bis max. zur x-Pos = 0)
                this.moveLeft();
                this.otherDirection = true;     //Bilder werden gespiegelt! (Blickrichtung links)
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {   //Sprung nach oben! (nur wenn Pepe den Boden berührt!)
                this.jump();
                this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;  //jedes Mal wenn der Charakter seine x-Pos. verändert, wird die Kameraeinstellung um den selben Betrag in die andere Richtung verschoben! (standardmäßig um +100 verschoben, damit der Charakter etwas weiter in der Mitte ist!)
        }, 1000 / 60);


        setInterval(() => { //Intervall für die Animation des Charakters (walking & jumping & hurt & dead)
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);

            } else if (this.isAboveGround()) {     //nur wenn sich der Charakter über dem Boden befindet, wird die Animation für jumping ausgeführt!
                this.playAnimation(this.IMAGES_JUMPING);

            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {    //die Animation für walking ist innerhalb des else-Teil der jumping-Animation, damit der Charakter nicht gleichzeitig die jumping- und walking-Animaion durchführt! (falls man während des Sprungs die Pfeiltasten drückt)
                this.playAnimation(this.IMAGES_WALKING);    //nur wenn die rechte oder linke Pfeiltaste gedrückt ist, wird der Charakter animiert!
            }
        }, 50);




    }

}