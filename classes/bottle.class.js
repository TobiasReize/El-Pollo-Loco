class Bottle extends MovableObject {

    y = 350;
    height = 80;
    width = 60;
    collectBottleSound = new Audio('assets/audio/collect-bottle.mp3');      //für jede eingesammelte Falsche wird ein neues Audio-Objekt erstellt! (somit wird immer ein neuer Ton abgespielt)

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 20,
        left: 20,
        right: 15,
        bottom: 10
    };

    IMAGES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1800;    //zufällige x-Pos. zwischen 200 und 2000
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.playAnimation(this.IMAGES), 500);
    }


    playCollectBottleSound() {
        this.collectBottleSound.volume = 0.2;
        this.collectBottleSound.play();
    }
}