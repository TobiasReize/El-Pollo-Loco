class StatusBarBottle extends DrawableObject {

    amount = 0;     //zum Zählen der eingesammelten Flaschen

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    constructor() {
        super();    //immer den super-constructor aufrufen, um die Variablen und Funktionen der Über-Klasse zu laden!
        this.loadImages(this.IMAGES);
        this.x = 170;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        this.setStatusbarImage();    //damit die Statusbar am Anfang gleich angezeigt wird! (und ein img-Element definiert wird!)
    }


    setStatusbarImage() {     //wählt das passende Bild aus!
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {   //gibt den Index des IMAGES-Array zurück je nach dem wie groß "amountBottles" ist (wie viel bottles man noch hat)
        if (this.amount == 5) {
            return 5;
        } else if (this.amount == 4) {
            return 4;
        } else if (this.amount == 3) {
            return 3;
        } else if (this.amount == 2) {
            return 2;
        } else if (this.amount == 1) {
            return 1;
        } else if (this.amount == 0) {
            return 0;
        }
    }




}