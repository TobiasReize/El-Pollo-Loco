class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 720;

    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();     //es wird automatisch immer die anmimate-Funktion aufgerufen!
    }


    animate() {
        setStoppableInterval(() => this.moveLeft(), 1000 / 60);     //für die Bewegung nach links (60x pro Sekunde (60 fps))
    }
}