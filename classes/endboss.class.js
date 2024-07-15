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
        bottom: 20
    };

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


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);    //lädt das Start-Bild
        this.loadImages(this.IMAGES_ALERT);           //lädt alle Animations-Bilder
        this.x = 2500;  //x-Pos. am Ende der Map
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.playAnimation(this.IMAGES_ALERT), 200);
    }

}