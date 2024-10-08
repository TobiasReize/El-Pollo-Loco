/** Class representing a drawable object. */
class DrawableObject {
    x = 100;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /**
     * Loads the start image.
     * @param {string} path - url of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Saves all images in the image cache.
     * @param {array} arr - array of image urls
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the image on the canvas.
     * @param {*} ctx - 2d context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    
    /**
     * Draws a rectangle around the object for collision checking.
     * @param {*} ctx - 2d context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof NormalChicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}