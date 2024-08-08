/**
 * Class representing a bottle.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    y = 350;
    height = 80;
    width = 60;
    collectBottleSound = new Audio('assets/audio/collect-bottle.mp3');

    offset = {
        top: 20,
        left: 20,
        right: 15,
        bottom: 10
    };

    IMAGES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    /** Creates a bottle. */
    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1800;
        this.animate();
    }


    /** Animates the collectable bottles. */
    animate() {
        setStoppableInterval(() => this.playAnimation(this.IMAGES), 500);
    }


    /** Plays the sound when a bottle is collected. */
    playCollectBottleSound() {
        this.collectBottleSound.volume = 0.2;
        checkPlayAudio(this.collectBottleSound);
    }
}