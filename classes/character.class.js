class Character extends MovableObject {

    height = 280;
    y = 150;
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;

    
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');   //der "super-constructor" darf nur einmal aufgerufen werden! Danach immer nur "this" verwenden!
       
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;     //Berechnung des "Modulo" (% --> Rest der Division). Erzeugt eine unendliche Reihe von 0 - 5.
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }


    jump() {

    }
}