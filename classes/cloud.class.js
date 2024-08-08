/**
 * Class representing a cloud object.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 720;

    
    /**
     * Creates a cloud.
     * @param {string} imagePath - path of the image
     * @param {integer} x - the x value
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }


    /** Animates the clouds. */
    animate() {
        setStoppableInterval(() => this.moveLeft(), 1000 / 60);
    }
}