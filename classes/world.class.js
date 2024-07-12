class World {
    character = new Character();
    level = LEVEL_1;    //damit kann man auf alle Variablen der Klasse "level" zugreifen!
    canvas;     //"Leinwand"
    ctx;        //"Pinsel"
    keyboard;
    camera_x = 0;    //um den Bildausschnitt zu verschieben (wenn Pepe läuft)
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];
    endboss = this.level.enemies[this.level.enemies.length - 1];
    bottles = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();    //damit die draw-Funktion gleich aufgerufen wird, sobald eine neue Welt erstellt wird!
        this.creatBottles();    //es werden nur einmal die Flaschen erstellt!
        this.run();     //Intervall, das ständig läuft!
    }


    setWorld() {    //übergibt eine Referenz dieser Welt! (damit die Variablen dieser Klasse verwendet werden können!)
        this.character.world = this;    //durch "this" wird die komplette Instanz der "World" übergeben!
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    //das Canvas muss immer zuerst geleert werden, bevor es neu gezeichnet wird!

        this.ctx.translate(this.camera_x, 0);  //der gesamte Kontext wird um den Betrag der Kamera (= x-Pos. des Charakters) verschoben! (Die Position, an der die Bilder eingefügt werden!) (zweite Wert: y ist 0) 

        this.addObjectsToMap(this.level.backgroundObjects);    //zeichnet die Hintergründe, jedes einzelne aus dem Array (muss zuerst gezeichnet werden, damit die anderen Elemente davor angezeigt werden!)
        this.addToMap(this.character);                      //zeichnet den Charakter, drawImage(Bild, x-Pos, y-Pos, Breite, Höhe)
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.level.enemies);                //zeichnet die Enemies (Chicken), jedes einzelne aus dem Array
        this.addObjectsToMap(this.level.clouds);                //zeichnet die Clouds, jedes einzelne aus dem Array
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);  //der Kontext wird wieder zurück verschoben, damit die folgenden Objekte immer an der selben Stelle bleiben!
        // ----- ↓ Space for fixed objects ↓ ----- //   (diese Objekte verschieben sich nicht!)
        this.addToMap(this.statusBarHealth);  //zeichnet die Statusbar. Muss nach den Wolken eingefügt werden, damit die Wolken nicht die Statusbar verdecken können! Die Statusbar bewegt sich mit dem Charakter mit! (bleibt immer auf der selben Position)
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        // ----- ↑ Space for fixed objects ↑ ----- //
        this.ctx.translate(this.camera_x, 0);  //der Kontext wird wieder verschoben, damit sich die Hintergrundbilder nach links bewegen, wenn Pepe nach rechts läuft!

        this.ctx.translate(-this.camera_x, 0);  //der gesamte Kontext wird wieder zurück verschoben!

        let self = this;
        requestAnimationFrame(function () {      //ruft die draw-Funktion immer wieder neu auf! Benötigt eine callback-function! Innerhalb dieser callback-function kann man nicht das "this" verwenden! Daher macht man den Workaround mit "self"!
            self.draw();
        });
    }


    addObjectsToMap(objects) {      //Hilfsfunktion, zum Aufrufen jedes einzelnen Elements aus dem Array
        objects.forEach(object => {
            this.addToMap(object);  //jedes einzelne Objekt wird der "addToMap" Funktion übergeben!
        });
    }


    addToMap(object) {   //Hilfsfunktion zum Zeichnen der Objekte
        if (object.otherDirection) {     //prüft, ob die Bilder gespiegelt werden sollen
            this.mirrowImage(object);
        }
        
        object.draw(this.ctx);   //Bild wird auf dem Canvas gezeichnet
        object.drawFrame(this.ctx);   //Rechtecke zeichnen, nur für Charakter und Chicken (zur Kollisions-Prüfung)

        if (object.otherDirection) {     //wenn der Kontext verändert wurde
            this.mirrowImageBack(object);
        }
    }


    mirrowImage(movableObject) {
        this.ctx.save();    //aktuelle Einstellungen/ Status von unserem Kontext werden gespeichert (bevor die Bilder gespiegelt werden!)
        this.ctx.translate(movableObject.width, 0); //Da das Bild an der y-Achse gespiegelt wird, muss die Breite des Objektes noch abgezogen werden! (Bild wird um die Breite verschoben!)
        this.ctx.scale(-1, 1);  //Bild (bzw. der gesamte Kontext) wird an der y-Achse gespiegelt --> Dadurch fängt die x-Achse nun rechts an und nicht mehr links!
        movableObject.x = movableObject.x * -1;     //x-Achse wird wieder korrigiert! (fängt wieder links an)
    }


    mirrowImageBack(movableObject) {    //wenn der Kontext verändert wurde (Bilder wurden gespiegelt), wird diese Einstellung wieder zurückgesetzt!
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();     //Hier werden die zuvor gespeicherten Einstellungen des Kontext wieder hergestellt!
    }


    run() {     //Hilfsfunktion für das Durchführen des Intervalls! (somit braucht man nur ein Intervall!)
        setInterval(() => {
            this.checkCollisionCharacter();
            this.checkThrowObjects();
            this.checkCollisionEndboss();
            this.checkCollisionThrowObject();
            this.checkCollectBottle();
        }, 250);
    }


    checkCollisionCharacter() {      //prüft, ob der Charakter mit einem Gegner kollidiert und zieht dann die Energie ab
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);    //die Statusbar wird entsprechend der neuen, verbleibenden Energie des Charakters aktualisiert

                if (this.character.isDead()) {
                    console.log('Character is dead! You lost!');
                } else {
                    console.log('Collision with Character, energy: ', this.character.energy);
                }
            }
        });
    }


    checkThrowObjects() {       //erstellt ein neues Objekt der Flasche, wenn die Anzahl größer 0 ist! (Flasche wird geworfen)
        if (this.keyboard.KEY_D && this.statusBarBottle.amount > 0) {
            let thrownBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);   //neue Instanz der Klasse "ThrowableObject" wird erstellt
            this.throwableObjects.push(thrownBottle);     //neue Instanz wird in das Array reingepusht (durch die draw()-Funktion wird das Element sofort angezeigt)
            this.statusBarBottle.amount--;   //Menge reduzieren
            this.statusBarBottle.setStatusbarImage();   //Statusbar anpassen
        }
    }


    checkCollisionEndboss() {       //prüft die Kollision der geworfenen Flasche mit dem Endboss
        this.throwableObjects.forEach(thrownBottle => {
            if (this.endboss.isColliding(thrownBottle)) {
                console.log('Hit Endboss!!!');
            }
        });
    }


    checkCollectBottle() {      //Funktion zum Einsammeln von Flaschen
        this.bottles.forEach(bottle => {
            let currentBottleIndex = this.bottles.findIndex(element => bottle == element);
            if (this.character.isColliding(bottle) && this.statusBarBottle.amount < 5) {
                this.bottles.splice(currentBottleIndex, 1);     //eingesammelte Falsche wird aus dem Array entfernt (und somit auch nicht mehr angezeigt!)
                this.statusBarBottle.amount++;      //Menge erhöhen
                this.statusBarBottle.setStatusbarImage();   //Statusbar updaten
            }
        });
    }


    checkCollisionThrowObject() {
        this.throwableObjects.forEach(thrownBottle => {
            let currentBottleIndex = this.throwableObjects.findIndex(element => thrownBottle == element);
            
            //1. Kollision mit dem Boden
            if (thrownBottle.y > 280) {
                thrownBottle.x = thrownBottle.x;    //Flasche soll sich nicht weiter nach rechts bewegen
                setInterval(() => {
                    thrownBottle.playAnimation(thrownBottle.IMAGES_SPLASH);     //Animation SPLASH wird ausgeführt
                }, 50);
                this.throwableObjects.splice(currentBottleIndex, 1);     //aktuelle Flasche muss aus dem Array entfernt werden?! (sonst wird diese Funktion immer ausgeführt!)
            }
            //2. Kollision mit einem Chicken
        });
    }


    creatBottles() {    //es wird am Anfang nur einmal die 10x Flaschen erstellt
        for (let i = 0; i < 10; i++) {
            this.bottles.push(new Bottle());
        }
    }


}