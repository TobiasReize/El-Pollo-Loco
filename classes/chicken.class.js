class Chicken extends MovableObject {

    y = 360;
    height = 60;
    width = 80;

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');    //lädt das Start-Bild
        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache
        this.x = 200 + Math.random() * 500;     //chicken werden zwischen 200 und 700 eingefügt
        this.speed = 0.2 + Math.random() * 0.5;   //zufälliger Geschwindigkeitsbereich
        this.animate();
    }


    animate() {     //animiert die Chicken
        setStoppableInterval(() => this.moveLeft(), 1000 / 60);     //für die Bewegung nach links (60x pro Sekunde (60 fps))
        setStoppableInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);   //für die Animation der Bilder
    }
}