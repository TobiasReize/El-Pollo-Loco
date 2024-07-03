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


    moveRight() {
        console.log('moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);  //60x pro Sekunde (60 fps)
    }

}