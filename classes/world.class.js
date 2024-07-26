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
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    endboss = this.level.enemies[0];
    bottles = [];
    coins = [];
    distanceEndbossCharacter = 0;
    lastJumpEndboss = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();    //damit die draw-Funktion gleich aufgerufen wird, sobald eine neue Welt erstellt wird!
        this.creatBottles(10);    //es werden am Anfang 10x Flaschen erstellt
        this.creatCoins();
        this.run();
    }


    setWorld() {    //übergibt eine Referenz dieser Welt! (damit die Variablen dieser Klasse verwendet werden können!)
        this.character.world = this;    //durch "this" wird die komplette Instanz der "World" übergeben!
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    //das Canvas muss immer zuerst geleert werden, bevor es neu gezeichnet wird!

        this.ctx.translate(this.camera_x, 0);  //der gesamte Kontext wird um den Betrag der Kamera (= x-Pos. des Charakters) verschoben! (Die Position, an der die Bilder eingefügt werden!) (zweite Wert: y ist 0) 

        this.addObjectsToMap(this.level.backgroundObjects);    //zeichnet die Hintergründe, jedes einzelne aus dem Array (muss zuerst gezeichnet werden, damit die anderen Elemente davor angezeigt werden!)
        this.addObjectsToMap(this.level.clouds);                //zeichnet die Clouds, jedes einzelne aus dem Array
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.level.enemies);                //zeichnet die Enemies (Chicken), jedes einzelne aus dem Array
        this.addToMap(this.character);                      //zeichnet den Charakter, drawImage(Bild, x-Pos, y-Pos, Breite, Höhe)
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);  //der Kontext wird wieder zurück verschoben, damit die folgenden Objekte immer an der selben Stelle bleiben!
        // ----- ↓ Space for fixed objects ↓ ----- //   (diese Objekte verschieben sich nicht!)
        this.addToMap(this.statusBarHealth);  //zeichnet die Statusbar. Muss nach den Wolken eingefügt werden, damit die Wolken nicht die Statusbar verdecken können! Die Statusbar bewegt sich mit dem Charakter mit! (bleibt immer auf der selben Position)
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
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

        if (object.otherDirection) {     //wenn der Kontext verändert wurde, wird er hier wieder rückgängig gemacht!
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


    run() {     //Hilfsfunktion für das Durchführen aller Intervalle!
        setStoppableInterval(() => this.checkCollisionCharacter(), 250);
        setStoppableInterval(() => this.checkThrowObjects(), 150);
        setStoppableInterval(() => this.checkHitEndboss(), 150);
        setStoppableInterval(() => this.checkHitChicken(), 100);
        setStoppableInterval(() => this.checkJumpOnChicken(), 50);
        setStoppableInterval(() => this.checkCollectBottle(), 150);
        setStoppableInterval(() => this.checkCollectCoin(), 150);
        setStoppableInterval(() => this.checkEncounterEndboss(), 250);
        setStoppableInterval(() => this.calcDistanceEndbossCharacter(), 250);
        setStoppableInterval(() => this.controlEndbossMovement(), 250);
    }


    checkCollisionCharacter() {      //prüft, ob der Charakter mit einem Gegner kollidiert und zieht dann die Energie ab
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {  //wird nur verletzt wenn der Gegener kollidiert und der Gegner nicht tot ist!
                this.character.hit();
                this.statusBarHealth.setStatusbarImage(this.character.energy);    //die Statusbar wird entsprechend der neuen, verbleibenden Energie des Charakters aktualisiert
                if (this.character.isDead() && !this.character.deadStatus) {
                    this.endboss.hecticMusic.pause();
                    this.playYouLostSound();
                    setTimeout(() => {
                        gameOver();
                    }, 2000);
                } else {
                    console.log('Collision with Character, energy: ', this.character.energy);
                }
            }
        });
    }


    checkThrowObjects() {       //erstellt ein neues Objekt der Flasche, wenn die Anzahl größer 0 ist! (Flasche wird geworfen)
        if (this.keyboard.KEY_D && this.statusBarBottle.amount > 0) {
            let thrownBottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);   //neue Instanz der Klasse "ThrowableObject" wird erstellt
            this.throwableObjects.push(thrownBottle);     //neue Instanz wird in das Array reingepusht (durch die draw()-Funktion wird das Element sofort angezeigt)
            this.statusBarBottle.amount--;   //Menge reduzieren
            this.statusBarBottle.setStatusbarImage();   //Statusbar anpassen
            this.character.idleStatus = false;      //der "idleStatus" des Charakters muss wieder zurück gesetzt werden, damit er nicht in den "long-idle" Zustand kommt!
        }
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach(thrownBottle => {
                let currentBottleIndex = this.throwableObjects.findIndex(element => thrownBottle == element);
                if (thrownBottle.y > 480) {
                    delete this.throwableObjects[currentBottleIndex];
                }
            });
        }
    }


    checkHitEndboss() {       //prüft die Kollision der geworfenen Flasche mit dem Endboss
        this.throwableObjects.forEach(thrownBottle => {
            let currentBottleIndex = this.throwableObjects.findIndex(element => thrownBottle == element);
            if (this.endboss.isColliding(thrownBottle) && !thrownBottle.hitEnemy) {
                this.endboss.hurt();
                thrownBottle.hitEnemy = true;   //damit der Endboss nur einmal je Flasche getroffen wird!
                this.endboss.hit();
                this.statusBarEndboss.setStatusbarImage(this.endboss.energy);
                console.log('Hit Endboss!!!', this.endboss.energy);
                clearInterval(thrownBottle.throwIntervalID);    //Bewegung der Flasche wird gestoppt (auf der x-Achse und nachfolgend auf der y-Achse)
                thrownBottle.speedY = 0;
                thrownBottle.acceleration = 0;
                thrownBottle.splash();      //splash-Animation abspielen!
            }
            if (thrownBottle.splashDone) {    //die splashDone-Variable wird erst "true", wenn die Animation beendet wurde!
                delete this.throwableObjects[currentBottleIndex];
            }
            if (this.endboss.isDead() && !this.endboss.deadStatus) {
                this.endboss.hecticMusic.pause();
                this.playEndbossDefeatedSound();
                console.log('Endboss is dead!!!');
                this.endboss.currentImage = 0;      //damit die dead-Animation von vorne beginnt!
                this.endboss.dead();
                setTimeout(() => {
                    youWin();
                }, 2000);
            }
        });
    }


    checkHitChicken() {
        this.throwableObjects.forEach(thrownBottle => {
            let currentBottleIndex = this.throwableObjects.findIndex(element => thrownBottle == element);
            this.level.enemies.slice(1).forEach(enemy => {  //der Endboss wird aus dem Array entfernt!
                let currentEnemyIndex = this.level.enemies.findIndex(element => enemy == element);
                if (thrownBottle.isColliding(enemy) && !thrownBottle.hitEnemy && !enemy.isDead()) {
                    thrownBottle.hitEnemy = true;
                    clearInterval(thrownBottle.throwIntervalID);    //Bewegung der Flasche wird gestoppt (auf der x-Achse und nachfolgend auf der y-Achse)
                    thrownBottle.speedY = 0;
                    thrownBottle.acceleration = 0;
                    thrownBottle.splash();
                    enemy.energy = 0;
                    enemy.stop();       //Intervalle müssen beendet werden, damit die Hühnchen sich nicht weiterbewegen!
                    enemy.dead(currentEnemyIndex);
                }
                if (thrownBottle.splashDone) {
                    delete this.throwableObjects[currentBottleIndex];
                }
            });
        });
    }


    checkJumpOnChicken() {      //prüft das Springen auf die Hühnchen, zeigt die dead-Animation an und entfernt dann das Hühnchen
        this.level.enemies.slice(1).forEach(enemy => {      //der Endboss wird aus dem Array entfernt!
            let currentEnemyIndex = this.level.enemies.findIndex(element => enemy == element);
            if (this.character.isColliding(enemy) && this.character.speedY < 0 && !enemy.isDead()) {
                enemy.energy = 0;   //damit die Abfrage "enemy.isDead()" true wird!
                enemy.stop();    //Intervalle müssen beendet werden, damit die Hühnchen sich nicht weiterbewegen!
                enemy.dead(currentEnemyIndex);  //dead-Animation des Chickens abspielen und danach aus dem Array löschen
                this.character.jump();
            }
        });
    }


    checkCollectBottle() {      //Funktion zum Einsammeln von Flaschen
        this.bottles.forEach(bottle => {
            let currentBottleIndex = this.bottles.findIndex(element => bottle == element);
            if (this.character.isColliding(bottle) && this.statusBarBottle.amount < 5) {
                bottle.playCollectBottleSound();
                this.bottles.splice(currentBottleIndex, 1);     //eingesammelte Falsche wird aus dem Array entfernt (und somit auch nicht mehr angezeigt!)
                this.statusBarBottle.amount++;      //Menge erhöhen
                this.statusBarBottle.setStatusbarImage();   //Statusbar updaten
                if (this.bottles.length == 0) {      //wenn alle Flaschen eingesammelt wurden, werden 5x weitere erstellt!
                    this.creatBottles(5);
                }
            }
        });
    }


    checkCollectCoin() {
        this.coins.forEach(coin => {
            let currentCoinIndex = this.coins.findIndex(element => coin == element);
            if (this.character.isColliding(coin)) {
                coin.playCollectCoinSound();
                this.coins.splice(currentCoinIndex, 1);
                this.statusBarCoin.amount++;
                this.statusBarCoin.setStatusbarImage();
            }
        });
    }


    checkEncounterEndboss() {
        if (this.character.x >= 1930 && !this.endboss.visible) {
            this.endboss.playEncounterEndbossSound();
            this.statusBarEndboss.setStatusbarImage(50);    //Statusbar des Endboss wird angezeigt (mit voller Energie!)
            this.endboss.initEndboss();
        }
    }


    calcDistanceEndbossCharacter() {    //ermittelt die Distanz zwischen Mittelpunkt Endboss und Charakter
        this.distanceEndbossCharacter = ((this.endboss.x + this.endboss.width / 2) - (this.character.x + this.character.width / 2));
    }


    controlEndbossMovement() {
        if (this.endboss.visible && !this.endboss.isDead()) {
            let timePassed = new Date().getTime() - this.lastJumpEndboss;
            timePassed = timePassed / 1000;
            if (this.distanceEndbossCharacter >= 0 && (this.endboss.isWalking || this.endboss.isAttacking)) {
                this.endboss.moveLeft();
            } else if (this.distanceEndbossCharacter < 0 && (this.endboss.isWalking || this.endboss.isAttacking)) {
                this.endboss.moveRight();
            }
            if (this.lastJumpEndboss == 0 && this.endboss.x < 2480) {   //erst wenn er Endboss seine Anfangsposition erreicht hat!
                this.lastJumpEndboss = new Date().getTime();
            } else if (timePassed > 4 && this.endboss.x < 2480) {       //erst wenn er Endboss seine Anfangsposition erreicht hat!
                this.lastJumpEndboss = new Date().getTime();
                this.endboss.jump();
            }
        }
    }


    // Hilfsfunktionen:
    creatBottles(amount) {    //es wird am Anfang nur einmal die 10x Flaschen erstellt
        for (let i = 0; i < amount; i++) {
            this.bottles.push(new Bottle());
        }
    }


    creatCoins() {    //es wird am Anfang nur einmal die 10x Coins erstellt
        for (let i = 0; i < 10; i++) {
            this.coins.push(new Coin());
        }
    }


    playEndbossDefeatedSound() {
        let winSound = new Audio('assets/audio/endboss-defeated.mp3');
        winSound.volume = 0.5;
        winSound.play();
    }


    playYouLostSound() {
        let lostSound = new Audio('assets/audio/you-lost.mp3');
        lostSound.playbackRate = 2;
        lostSound.play();
    }
}