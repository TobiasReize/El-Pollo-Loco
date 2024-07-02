class MovableObject {
    x = 100;
    y = 250;
    img;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();     //new Image() vgl. mit einem <img>-HTML-Element (nur für JS vordefiniert, wird später in die HTML-Datei eingefügt)
        this.img.src = path;
    }

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {

    }
}