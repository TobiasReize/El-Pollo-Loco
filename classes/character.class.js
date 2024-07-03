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

    
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');   //ladet ein Bild. Der "super-constructor" darf nur einmal aufgerufen werden! Danach immer nur "this" verwenden!
       
        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache

        this.animate();     //animiert den Charakter
    }


    animate() {     //animiert den Charakter

        setInterval(() => { //Intervall für die Bewegung des Charakters
            if (this.world.keyboard.RIGHT) {    //Bewegung nach rechts!
                this.x += this.speed;           //auf der x-Achse nach rechts
                this.otherDirection = false;    //Bilder werden nicht gespiegelt!
            }

            if (this.world.keyboard.LEFT) {    //Bewegung nach links!
                this.x -= this.speed;           //auf der x-Achse nach links
                this.otherDirection = true;     //Bilder werden gespiegelt!
            }
        }, 1000 / 60);


        setInterval(() => { //Intervall für die Animation des Charakters
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {    //nur wenn die rechte oder linke Pfeiltaste gedrückt ist, wird der Charakter animiert!
                let i = this.currentImage % this.IMAGES_WALKING.length;     //Berechnung des "Modulo" (% --> Rest der Division). Erzeugt eine unendliche Reihe von 0 - 5.
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }


    jump() {

    }
}