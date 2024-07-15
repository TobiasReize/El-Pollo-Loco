class ThrowableObject extends MovableObject {

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


    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');    //am Anfang muss immer ein Startbild einzeln geladen werden, wenn das Objekt erstellt wird! Ansonten gibt die Funktion "draw(ctx){}" der "DrawableObject" Klasse einen Fehler!
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;

        this.throw();   //die Funktion "throw" muss im constructor ausgeführt werden, damit die Flasche immer gleich geworfen wird, sobalb ein neues Objekt erstellt wird!
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            this.x += 20;
        }, 50);
    }


}