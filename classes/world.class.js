class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0)
    ];
    canvas;     //"Leinwand"
    ctx;        //"Pinsel"
    keyboard;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();    //damit die draw-Funktion gleich aufgerufen wird, sobald eine neue Welt erstellt wird!
        this.setWorld();
    }


    setWorld() {    //übergibt eine Referenz dieser Welt! (damit die Variablen dieser Klasse verwendet werden können!)
        this.character.world = this;    //durch "this" wird die komplette Instanz der "World" übergeben!
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    //das Canvas muss immer zuerst geleert werden, bevor es neu gezeichnet wird!

        this.addObjectsToMap(this.backgroundObjects);    //zeichnet die Hintergründe, jedes einzelne aus dem Array (muss zuerst gezeichnet werden, damit die anderen Elemente davor angezeigt werden!)
        this.addToMap(this.character);                 //zeichnet den Charakter, drawImage(Bild, x-Pos, y-Pos, Breite, Höhe)
        this.addObjectsToMap(this.enemies);                //zeichnet die Enemies (Chicken), jedes einzelne aus dem Array
        this.addObjectsToMap(this.clouds);                //zeichnet die Clouds, jedes einzelne aus dem Array


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
        if (movableObject.otherDirection) {
            this.ctx.save();    //aktuelle Einstellungen/ Status von unserem Kontext werden gespeichert
            this.ctx.translate(movableObject.width, 0); //Da das Bild an der y-Achse gespiegelt wird, muss die Breite des Objektes noch abgezogen werden! (Bild wird um die Breite verschoben!)
            this.ctx.scale(-1, 1);  //Bild wird an der y-Achse gespiegelt --> Dadurch fängt die x-Achse nun rechts an und nicht mehr links!
            movableObject.x = movableObject.x * -1;     //x-Achse wird wieder korrigiert! (fängt wieder links an)
        }
        
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);

        if (movableObject.otherDirection) {     //wenn der Kontext verändert wurde (Bilder wurden gespiegelt), wird diese Einstellung wieder zurückgesetzt!
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }


}