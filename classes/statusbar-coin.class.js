class StatusBarCoin extends DrawableObject {

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];


    constructor() {
        super();    //immer den super-constructor aufrufen, um die Variablen und Funktionen der Über-Klasse zu laden!
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage();    //damit die Statusbar am Anfang gleich angezeigt wird! (und ein img-Element definiert wird!)
    }


    setPercentage() {     //wählt das passende Bild zum aktuellen "percentage" aus!
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {   //gibt den Index des IMAGES-Array zurück je nach dem wie groß "percentage" ist (wie viel health man noch hat)
        if (this.amount >= 10) {
            return 5;
        } else if (this.amount >= 8) {
            return 4;
        } else if (this.amount >= 6) {
            return 3;
        } else if (this.amount >= 4) {
            return 2;
        } else if (this.amount >= 1) {
            return 1;
        } else if (this.amount == 0) {
            return 0;
        }
    }


}