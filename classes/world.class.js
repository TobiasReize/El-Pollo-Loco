class World {
    character = new Character();
    level = LEVEL_1;    //damit kann man auf alle Variablen der Klasse "level" zugreifen!
    canvas;     //"Leinwand"
    ctx;        //"Pinsel"
    keyboard;
    camera_x = 0;    //um den Bildausschnitt zu verschieben (wenn Pepe läuft)
    statusBar = new StatusBar();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();    //damit die draw-Funktion gleich aufgerufen wird, sobald eine neue Welt erstellt wird!
        this.setWorld();
        this.checkCollisions();
    }


    setWorld() {    //übergibt eine Referenz dieser Welt! (damit die Variablen dieser Klasse verwendet werden können!)
        this.character.world = this;    //durch "this" wird die komplette Instanz der "World" übergeben!
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    //das Canvas muss immer zuerst geleert werden, bevor es neu gezeichnet wird!

        this.ctx.translate(this.camera_x, 0);  //der gesamte Kontext wird nach links verschoben! (Die Position, an der die Bilder eingefügt werden!) (zweite Wert: y ist 0) 

        this.addObjectsToMap(this.level.backgroundObjects);    //zeichnet die Hintergründe, jedes einzelne aus dem Array (muss zuerst gezeichnet werden, damit die anderen Elemente davor angezeigt werden!)
        this.addToMap(this.statusBar);
        this.addToMap(this.character);                      //zeichnet den Charakter, drawImage(Bild, x-Pos, y-Pos, Breite, Höhe)
        this.addObjectsToMap(this.level.enemies);                //zeichnet die Enemies (Chicken), jedes einzelne aus dem Array
        this.addObjectsToMap(this.level.clouds);                //zeichnet die Clouds, jedes einzelne aus dem Array

        this.ctx.translate(-this.camera_x, 0);  //der gesamte Kontext wird wieder nach rechts verschoben!

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


    addToMap(movableObject) {   //Hilfsfunktion zum Zeichnen der Objekte
        if (movableObject.otherDirection) {     //prüft, ob die Bilder gespiegelt werden sollen
            this.mirrowImage(movableObject);
        }
        
        movableObject.draw(this.ctx);   //Bild wird auf dem Canvas gezeichnet
        movableObject.drawFrame(this.ctx);   //Rechtecke zeichnen, nur für Charakter und Chicken (zur Kollisions-Prüfung)

        if (movableObject.otherDirection) {     //wenn der Kontext verändert wurde
            this.mirrowImageBack(movableObject);
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


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {

                    this.character.hit();

                    if (this.character.isDead()) {
                        console.log('Character is dead! You lose!');
                    } else {
                        console.log('Collision with Character, energy: ', this.character.energy);
                    }

                }
            });
        }, 500);
    }
}