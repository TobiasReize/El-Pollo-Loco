/**
 * Class representing a coin.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 120;
    width = 120;
    collectCoinSound = new Audio('assets/audio/collect-coin.mp3');

    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };

    IMAGES = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ]


    /** Creates a coin. */
    constructor() {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1800;
        this.y = 60 + Math.random() * 150;
        this.animate();
    }


    /** Animates the collectable coins. */
    animate() {
        setStoppableInterval(() => this.playAnimation(this.IMAGES), 500);
    }


    /** Plays the sound when a coin is collected. */
    playCollectCoinSound() {
        this.collectCoinSound.volume = 0.2;
        checkPlayAudio(this.collectCoinSound);
    }
}