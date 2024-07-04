class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 720;

    constructor(x) {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = x;
        // this.x = Math.random() * 500;   //x-Pos. zwischen 0 und 500

        this.animate();     //es wird automatisch immer die anmimate-Funktion aufgerufen!
    }


    animate() {
        this.moveLeft();
    }


}