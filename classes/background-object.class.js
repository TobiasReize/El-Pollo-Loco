/**
 * Class representing a background object.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    
    /**
     * Creates a background.
     * @param {string} imagePath - path of the image
     * @param {integer} x - the x value
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}