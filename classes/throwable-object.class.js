class ThrowableObject extends MovableObject {

    throwIntervalID = 0;        //zum Zwischenspeichern der throw-Intervall-ID je Flasche
    splashIntervalID = 0;       //zum Zwischenspeichern der splash-Intervall-ID je Flasche
    splashDone = false;         //zum Prüfen, ob die splash-Animation komplett durchgeführt wurde
    hitEnemy = false;           //damit der Endboss/ Chicken nur einmal je Flasche getroffen wird
    imgCounter = 0;             //zum Zählen der Animations-Bilder (damit die Animation nur einmal durchlaufen wird)
    throwSound = new Audio('assets/audio/throw.mp3');
    bottleBreakSound = new Audio('assets/audio/bottle-break.mp3');
    
    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    
    constructor(x, y, otherDirection) {
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');    //am Anfang muss immer ein Startbild einzeln geladen werden, wenn das Objekt erstellt wird! Ansonten gibt die Funktion "draw(ctx){}" der "DrawableObject" Klasse einen Fehler!
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y + 100;
        this.height = 60;
        this.width = 50;
        this.speedY = 30;
        this.speed = 15;
        this.otherDirection = otherDirection;   //um zu prüfen ob die Flasche nach links oder rechts fliegen soll

        setStoppableInterval(() => this.applyGravity(), 1000 / 25);     //sobald eine neue Instanz erstellt wird, wird die Funktion "applyGravity" ausgeführt!
        this.throw();   //die Funktion "throw" muss im constructor ausgeführt werden, damit die Flasche immer gleich geworfen wird, sobalb ein neues Objekt erstellt wird!
    }


    throw() {
        this.throwSound.volume = 0.2;
        this.throwSound.play();
        if (this.otherDirection) {  //Wurf nach links
            this.throwIntervalID = setInterval(() => {
                this.playAnimation(this.IMAGES_ROTATION);
                this.x -= this.speed;
            }, 50);
        } else {    //Wurf nach rechts
            this.x = this.x + 50;
            this.throwIntervalID = setInterval(() => {
                this.playAnimation(this.IMAGES_ROTATION);
                this.x += this.speed;
            }, 50);
        }
    }


    splash() {
        this.bottleBreakSound.volume = 0.2;
        this.bottleBreakSound.play();
        this.splashIntervalID = setInterval(() => {
            if (this.imgCounter == this.IMAGES_SPLASH.length - 1) {
                clearInterval(this.splashIntervalID);
                this.splashDone = true;    //erst wenn die Animation fertig ist und das Interval beendet wurde, wird "true" zurückgegeben!
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
                this.imgCounter++;
            }
        }, 50);
    }
}