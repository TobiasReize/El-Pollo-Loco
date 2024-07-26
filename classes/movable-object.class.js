class MovableObject extends DrawableObject {
 
    speed = 0.15;
    otherDirection = false;     //Variable zum Spiegeln der Bilder
    speedY = 0;
    acceleration = 2.5;
    energy = 100;   //Ursprungs-Energie bei 100%
    lastHit = 0;    //Zeitpunkt der letzten Kollision (zw. Charakter und Gegner)


    playAnimation(images) {     //Spielt die Animation der Bilder ab
        let i = this.currentImage % images.length;     //Berechnung des "Modulo" (% --> Rest der Division). Erzeugt eine unendliche Reihe wiederkehrender Zahlenfolge!
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;           //auf der x-Achse nach rechts
    }


    moveLeft() {
        this.x -= this.speed;           //auf der x-Achse nach links
    }


    jump() {
        this.speedY = 30;
    }


    applyGravity() {    //Funktion zum Verändern der y-Pos. (wenn Pepe springt) (Muss als Intervall-Funktion aufgerufen werden!)
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;  //auf die y-Pos. wird ständig speedY drauf gerechnet! (beim Fallen ist speedY negativ, beim Springen ist speedY positiv!)
            this.speedY -= this.acceleration;   //von speedY wird regelmäßig die acceleration abgezogen!
        }
    }


    isAboveGround() {   //Hilfsfunktion zum Prüfen ob ein Objekt in der Luft ist!
        if (this instanceof ThrowableObject) {  //Throwable Objects fallen immer weiter nach unten!
            return true;
        } else if (this instanceof NormalChicken) {
            return this.y < 360;
        } else if (this instanceof Character) {
            return this.y < 150;
        } else if (this instanceof Endboss) {
            return this.y < 100;
        }
    }


    isColliding(obj) {  //prüft, ob die Objekte miteinander kollidieren, wenn ja gibt "WAHR" zurück
        return  (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&   //Pepe rechts von Chicken
                (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&    //Pepe links von Chicken
                (this.y + this.height - this.offset.bottom) >= (obj.y + obj.offset.top) &&   //Pepe unterhalb von Chicken
                (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) //&&    //Pepe oberhalb von Chicken
                // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann. (z. B. für Plattformen --> aktuell nicht vorhanden!)
    }


    hit() {     //Pepe wurde getroffen und die Energie wird abgezogen
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();    //der Zeitpunkt der letzten Kollision wird gespeichert (in ms)
        }
    }


    isHurt() {  //gibt "WAHR" zurück, wenn die letzte Kollision weniger als 0,5s her ist
        let timePassed = new Date().getTime() - this.lastHit;   //Differenz in ms
        timePassed = timePassed / 1000;     //Differenz in s
        return timePassed < 0.5;
    }


    isDead() {
        return this.energy == 0;
    }

}