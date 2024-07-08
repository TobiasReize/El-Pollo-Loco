class DrawableObject {
    x = 100;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};    //Bilder-Speicher
    currentImage = 0;   //Zählvariable



    loadImage(path) {   //am Anfang muss immer ein Startbild einzeln geladen werden, wenn das Objekt erstellt wird! Ansonten gibt die Funktion "draw(ctx){}" einen Fehler! (diese Funktion erwartet ein img-Element!)
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


    draw(ctx) {     //Bild wird auf dem Canvas gezeichnet
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    
    drawFrame(ctx) {    //zeichnet die Rechtecke um die Objekte (zur Kollisionsprüfung)
        if (this instanceof Character || this instanceof Chicken) {     //nur für den Charakter und die Chickens
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y + this.offsetY, this.width, this.height - this.offsetY);     //cxt.rect(x, y, width, height)
            ctx.stroke();
        }
    }

}