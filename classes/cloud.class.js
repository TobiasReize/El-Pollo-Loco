class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;   //x-Pos. zwischen 0 und 500

        this.animate();     //es wird automatisch immer die anmimate-Funktion aufgerufen!
    }


    animate() {
        setInterval(() => {
            this.x -= 0.25;
        }, 1000 / 60);  //60x pro Sekunde (60 fps)
    }
}