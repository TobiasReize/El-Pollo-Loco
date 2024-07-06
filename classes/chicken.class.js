class Chicken extends MovableObject {

    y = 360;
    offsetY = 0;    //die Bilder der Chicken  haben keine Freifläche! (daher 0)
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');    //lädt das Start-Bild

        this.x = 200 + Math.random() * 500;     //chicken werden zwischen 200 und 700 eingefügt
        this.speed = 0.15 + Math.random() * 0.5;   //zufällige Geschwindigkeitsbereich (min. 0.15)

        this.loadImages(this.IMAGES_WALKING);   //speichert alle Bilder für die Animation in dem ImageCache

        this.animate();
    }


    animate() {     //animiert die Chicken
        
        setInterval(() => {     //für die Bewegung nach links
            this.moveLeft();
        }, 1000 / 60);  //60x pro Sekunde (60 fps)


        setInterval(() => {     //für die Animation der Bilder
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}