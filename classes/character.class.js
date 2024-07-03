class Character extends MovableObject {

    height = 280;
    y = 150;
    speed = 10;
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    world;  //Referenz auf die Klasse (aktuelle Instanz) "world", damit die Variable "keyboard" der Klasse "world" auch hier verwendet werden kann!
    walking_sound = new Audio('assets/audio/walking.mp3');
    
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');   //lädt das Start-Bild. Der "super-constructor" darf nur einmal aufgerufen werden! Danach immer nur "this" verwenden!
       
        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache

        this.animate();     //animiert den Charakter
    }


    animate() {     //animiert den Charakter

        setInterval(() => { //Intervall für die Bewegung des Charakters
            this.walking_sound.pause();     //wenn Pepe nicht läuft, wird der Sound pausiert!

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {    //Bewegung nach rechts! (bis die max. x-Pos. erreicht ist)
                this.x += this.speed;           //auf der x-Achse nach rechts
                this.otherDirection = false;    //Bilder werden nicht gespiegelt!
                this.walking_sound.play();      //Audio wird nur abgespielt wenn Pepe läuft
            }

            if (this.world.keyboard.LEFT && this.x > 0) {    //Bewegung nach links! (bis max. zur x-Pos = 0)
                this.x -= this.speed;           //auf der x-Achse nach links
                this.otherDirection = true;     //Bilder werden gespiegelt! (Pepe läuft nach links!)
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;  //jedes Mal wenn der Charakter seine x-Pos. verändert, wird die Kameraeinstellung um den selben Betrag in die andere Richtung verschoben! (standardmäßig um +100 verschoben, damit der Charakter etwas weiter in der Mitte ist!)
        }, 1000 / 60);


        setInterval(() => { //Intervall für die Animation des Charakters
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {    //nur wenn die rechte oder linke Pfeiltaste gedrückt ist, wird der Charakter animiert!
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }


    jump() {

    }
}