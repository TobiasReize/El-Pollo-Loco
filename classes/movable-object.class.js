/**
 * Class representing a movable object.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    /**
     * Plays the animation of the images.
     * @param {array} images - array of image urls
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /** Move to the right. */
    moveRight() {
        this.x += this.speed;
    }


    /** Move to the left. */
    moveLeft() {
        this.x -= this.speed;
    }


    /** Jump-function. */
    jump() {
        this.speedY = 30;
    }


    /** Gravity is activated. */
    applyGravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }


    /** Checks if an object is above the ground. */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof NormalChicken) {
            return this.y < 360;
        } else if (this instanceof Character) {
            return this.y < 150;
        } else if (this instanceof Endboss) {
            return this.y < 100;
        }
    }


    /**
     * Checks whether two objects collide.
     * @param {object} obj - instance of a class
     */
    isColliding(obj) {
        return  (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&
                (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&
                (this.y + this.height - this.offset.bottom) >= (obj.y + obj.offset.top) &&
                (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
    }


    /** Object was hit and energy will be decreased. */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /** Checks if the object is hurt. */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }


    /** Checks if the object is dead. */
    isDead() {
        return this.energy == 0;
    }

}