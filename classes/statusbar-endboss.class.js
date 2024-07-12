class StatusBarEndboss extends DrawableObject {

    percentage = 0;   //Wert der Statusbar (zum Anzeigen des Bildes)

    IMAGES = [
        'assets/img/2_character_pepe/5_dead/D-57.png',  //Bild ist nicht optimal! (es ist ein Schatten zu sehen!)
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];


    constructor() {
        super().loadImage('assets/img/2_character_pepe/5_dead/D-57.png');
        this.loadImages(this.IMAGES);
        this.x = 550;
        this.y = 5;
        this.width = 150;
        this.height = 50;
        this.setStatusbarImage(-1);    //damit die Statusbar am Anfang gleich angezeigt wird! (und ein img-Element definiert wird!) (-1 damit die Statusbar erst mal nicht sichtbar ist!)
    }


    setStatusbarImage(energy) {     //wählt das passende Bild zum aktuellen "percentage" aus!
        this.percentage = energy;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {   //gibt den Index des IMAGES-Array zurück je nach dem wie groß "percentage" ist (wie viel Energie man noch hat)
        if (this.percentage == -1) {
            return 0;   //Bild ist durchsichtig! (somit nicht zu sehen!)
        } else if (this.percentage >= 50) {
            return 6;
        } else if (this.percentage >= 40) {
            return 5;
        } else if (this.percentage >= 30) {
            return 4;
        } else if (this.percentage >= 20) {
            return 3;
        } else if (this.percentage >= 10) {
            return 2;
        } else {
            return 1;
        }
    }



}