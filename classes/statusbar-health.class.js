class StatusBarHealth extends DrawableObject {

    percentage = 0;   //Wert der Statusbar (zum Anzeigen des Bildes)

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];


    constructor() {
        super();    //immer den super-constructor aufrufen, um die Variablen und Funktionen der Über-Klasse zu laden!
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        this.setStatusbarImage(100);    //damit die Statusbar am Anfang gleich angezeigt wird! (und ein img-Element definiert wird!)
    }


    setStatusbarImage(energy) {     //wählt das passende Bild zum aktuellen "percentage" aus!
        this.percentage = energy;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {   //gibt den Index des IMAGES-Array zurück je nach dem wie groß "percentage" ist (wie viel health man noch hat)
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }


}