class SmallChicken extends MovableObject {

    y = 370;
    height = 50;
    width = 60;
    walkIntervalID = 0;     //zum Zwischenspeichern der move-Intervall-ID je Hühnchen (damit kann dann die Bewegung des Hühnchens gestoppt werden!)
    animationIntervalID = 0;    //zum Zwischenspeichern der animation-Intervall-ID je Hühnchen (damit kann dann die Animation des Hühnchens gestoppt werden!)
    killChickenSound = new Audio('assets/audio/chicken-dead.mp3');  //es wird jedes Mal ein neues Audio-Objekt erstellt, damit immer ein neuer Ton abgespielt wird!

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');    //lädt das Start-Bild
        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 1700;     //zufällige x-Pos.
        this.speed = 0.2 + Math.random() * 0.8;   //zufälliger Geschwindigkeitsbereich
        this.animate();
        setStoppableInterval(() => this.applyGravity(), 1000 / 25);     //Gravity ergänzt, damit die Chicken auch springen können
    }


    animate() {     //animiert die Chicken
        this.walkIntervalID = setInterval(() => {   //für die Bewegung nach links (60x pro Sekunde (60 fps))
            this.moveLeft();
        }, 1000 / 60);
        
        this.animationIntervalID = setInterval(() => {      //für die Animation der Bilder
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


    dead(currentEnemyIndex) {
        this.killChickenSound.volume = 0.4;
        this.killChickenSound.play();
        setTimeout(() => {
            this.killChickenSound.pause();
        }, 500);     //es sollen nur die ersten 500ms abgespielt werden!
        
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            delete LEVEL_1.enemies[currentEnemyIndex];
        }, 1000);
    }


    stop() {    //stoppt alle Bewegungs- und Animationsintervalle
        clearInterval(this.walkIntervalID);
        clearInterval(this.animationIntervalID);
    }
}