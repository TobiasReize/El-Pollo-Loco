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

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    // IMAGES_EMPTY = [
    //     ''
    // ];

    moveIntervalID = 0;     //zum Zwischenspeichern der move-Intervall-ID je Hühnchen (damit kann dann die Bewegung des Hühnchens gestoppt werden!)
    animationIntervalID = 0;    //zum Zwischenspeichern der animation-Intervall-ID je Hühnchen (damit kann dann die Animation des Hühnchens gestoppt werden!)


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');    //lädt das Start-Bild
        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache
        this.loadImages(this.IMAGES_DEAD);
        // this.loadImages(this.IMAGES_EMPTY);
        this.x = 200 + Math.random() * 500;     //chicken werden zwischen 200 und 700 eingefügt
        this.speed = 0.2 + Math.random() * 0.5;   //zufälliger Geschwindigkeitsbereich
        this.animate();
    }


    animate() {     //animiert die Chicken
        this.moveIntervalID = setInterval(() => {   //für die Bewegung nach links (60x pro Sekunde (60 fps))
            this.moveLeft();
        }, 1000 / 60);
        
        this.animationIntervalID = setInterval(() => {      //für die Animation der Bilder
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


    dead(currentEnemyIndex) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            // this.playAnimation(this.IMAGES_EMPTY);
            delete LEVEL_1.enemies[currentEnemyIndex];
        }, 1000);
    }
}