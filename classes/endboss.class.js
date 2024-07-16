class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;
    energy = 50;    //Ursprungs-Energie ist nur 50, damit man den Endboss nur 5x treffen muss!
    visible = false;    //zum Prüfen ob der Endboss sichtbar ist (zum Anzeigen der Statusbar des Endbosses)

    offset = {  //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 150,
        left: 40,
        right: 30,
        bottom: 70
    };

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);    //lädt das Start-Bild
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2600;      //x-Pos. am Ende der Map
        this.speed = 8;
    }


    walk() {
        let walkInterval = setInterval(() => {
            if (this.x <= 2500) {
                clearInterval(walkInterval);
                this.alert();
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


    alert() {
        let imgCounter = 0;
        let alertInterval = setInterval(() => {
            if (imgCounter == this.IMAGES_ALERT.length - 1) {
                clearInterval(alertInterval);
                this.attack();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
                imgCounter++;
            }
        }, 200);
    }


    attack() {
        let attackInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 200);
    }

}