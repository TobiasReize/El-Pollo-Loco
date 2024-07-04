class MovableObject {
    x = 100;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};    //Bilder-Speicher
    currentImage = 0;   //Zählvariable
    speed = 0.15;
    otherDirection = false;     //Variable zum Spiegeln der Bilder
    speedY = 0;
    acceleration = 1.5;


    loadImage(path) {   //ein Bild wird geladen mit dem jeweiligen Pfad "path"
        this.img = new Image();     //new Image() vgl. mit einem <img>-HTML-Element (nur für JS vordefiniert, wird später in die HTML-Datei eingefügt)
        this.img.src = path;
    }


    loadImages(arr) {   //es werden alle Bilder aus dem Array "arr" geladen und in "imageCache" abgespeichert
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;    //key: Image-Pfad und value: Image-Objekt
        });
    }


    playAnimation(images) {     //Spielt die Animation der Bilder ab
        let i = this.currentImage % this.IMAGES_WALKING.length;     //Berechnung des "Modulo" (% --> Rest der Division). Erzeugt eine unendliche Reihe wiederkehrender Zahlenfolge!
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        console.log('moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);  //60x pro Sekunde (60 fps)
    }


    applyGravity() {    //Funktion zum Verändern der y-Pos. (wenn Pepe springt)
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;  //auf die y-Pos. wird ständig speedY drauf gerechnet! (beim Fallen ist speedY negativ, beim Springen ist speedY positiv!)
                this.speedY -= this.acceleration;   //von speedY wird regelmäßig die acceleration abgezogen!
            }
        }, 1000 / 25);
    }


    isAboveGround() {   //Hilfsfunktion zum Prüfen ob Pepe in der Luft ist!
        return this.y < 150;    //gibt "WAHR" zurück wenn die y-Pos. < 150 ist (Objekt in der Luft)
    }

}