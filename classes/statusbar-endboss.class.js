class StatusBarEndboss extends DrawableObject {

    percentage = 0;

    IMAGES = [
        '',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 550;
        this.y = 5;
        this.width = 150;
        this.height = 50;
        this.setStatusbarImage(-1);
    }


    /**
     * Selects the image of the status bar according to the energy.
     * @param {integer} energy - energy value of the status bar
     */
    setStatusbarImage(energy) {
        this.percentage = energy;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /** Returns the image index according to the percentage. */
    resolveImageIndex() {
        if (this.percentage == -1) {
            return 0;
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