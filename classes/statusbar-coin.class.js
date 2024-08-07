class StatusBarCoin extends DrawableObject {

    amount = 0;

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 320;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        this.setStatusbarImage();
    }


    /** Selects the image of the status bar according to the amount. */
    setStatusbarImage() {
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /** Returns the image index according to the amount. */
    resolveImageIndex() {
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