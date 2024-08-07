class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 720;

    
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