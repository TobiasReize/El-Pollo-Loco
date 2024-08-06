class Coin extends MovableObject {

    height = 120;
    width = 120;
    collectCoinSound = new Audio('assets/audio/collect-coin.mp3');  	//für jeden eingesammelten Coin wird ein neues Audio-Objekt erstellt! (somit wird immer ein neuer Ton abgespielt)

    offset = {      //Offset zur genauen Kollisionsprüfung (Offset wird von der ursprünglichen Bildgröße abgezogen!)
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };

    IMAGES = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ]


    constructor() {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1800;    //zufällige x-Pos. zwischen 200 und 2000
        this.y = 60 + Math.random() * 150;       //zufällige y-Pos. zwischen 60 und 210
        this.animate();
    }


    animate() {
        setStoppableInterval(() => this.playAnimation(this.IMAGES), 500);
    }


    playCollectCoinSound() {
        this.collectCoinSound.volume = 0.2;
        checkPlayAudio(this.collectCoinSound);
    }
}