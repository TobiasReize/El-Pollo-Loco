class World {
    character = new Character();
    level = LEVEL_1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    endboss = this.level.enemies[0];
    bottles = [];
    coins = [];
    distanceEndbossCharacter = 0;
    lastJumpEndboss = 0;


    /**
     * Initiates the instance of the world.
     * @param {HTMLElement} canvas - canvas HTML element
     * @param {object} keyboard - instance of the keyboard class
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.creatBottles(10);
        this.creatCoins();
        this.run();
    }


    /** Passes a reference of this instance of the world to the character. */
    setWorld() {
        this.character.world = this;
    }


    /** Draws and updates the complete game on the canvas. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawAllBackgroundObjects();
        this.drawCollectableObjects();
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.drawFixedObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /** Draws all background objects on the canvas. */
    drawAllBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    /** Draws all collectable objects on the canvas. */
    drawCollectableObjects() {
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.coins);
    }


    /** Draws the fixed objects on the canvas. */
    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        // ----- ↓ Space for fixed objects ↓ ----- //
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
        // ----- ↑ Space for fixed objects ↑ ----- //
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Every single object is added to the map.
     * @param {array} objects - array of objects
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * Draws the object on the canvas.
     * @param {object} object - instance of a class
     */
    addToMap(object) {
        if (object.otherDirection) {
            this.mirrorImage(object);
        }
        object.draw(this.ctx);
        object.drawFrame(this.ctx);
        if (object.otherDirection) {
            this.mirrorImageBack(object);
        }
    }


    /**
     * Mirrors the object on the y-axis.
     * @param {object} movableObject - instance of a class
     */
    mirrorImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    /**
     * Mirrors the object back again.
     * @param {object} movableObject - instance of a class
     */
    mirrorImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }


    /** Auxiliary function to start all intervals. */
    run() {
        setStoppableInterval(() => this.checkCollisionCharacter(), 250);
        setStoppableInterval(() => this.checkThrowObjects(), 150);
        setStoppableInterval(() => this.checkHitEndboss(), 150);
        setStoppableInterval(() => this.checkHitChicken(), 100);
        setStoppableInterval(() => this.checkJumpOnChicken(), 50);
        setStoppableInterval(() => this.checkCollectBottle(), 150);
        setStoppableInterval(() => this.checkCollectCoin(), 150);
        setStoppableInterval(() => this.checkEncounterEndboss(), 250);
        setStoppableInterval(() => this.calcDistanceEndbossCharacter(), 250);
        setStoppableInterval(() => this.controlEndbossMovement(), 250);
    }


    /** Checks whether the character collides with an enemy. */
    checkCollisionCharacter() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && this.character.speedY >= 0) {
                this.character.hit();
                this.statusBarHealth.setStatusbarImage(this.character.energy);
                if (this.character.isDead() && !this.character.deadStatus) {
                    this.endboss.hecticMusic.pause();
                    this.playYouLostSound();
                    setTimeout(() => {
                        gameOver();
                    }, 2000);
                }
            }
        });
    }


    /** Throws a bottle and updates the status bar. */
    checkThrowObjects() {
        if (this.keyboard.KEY_D && this.statusBarBottle.amount > 0) {
            let thrownBottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
            this.throwableObjects.push(thrownBottle);
            this.statusBarBottle.amount--;
            this.statusBarBottle.setStatusbarImage();
            this.character.idleStatus = false;
        }
        this.checkBottleOutsideGame();
    }


    /** Check if the bottle is outside the game and delete it. */
    checkBottleOutsideGame() {
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach(thrownBottle => {
                let currentBottleIndex = this.throwableObjects.findIndex(element => thrownBottle == element);
                if (thrownBottle.y > 480) {
                    delete this.throwableObjects[currentBottleIndex];
                }
            });
        }
    }


    /** Checks the collision between the endboss and the thrown bottle. */
    checkHitEndboss() {
        this.throwableObjects.forEach(thrownBottle => {
            let currentBottleIndex = this.throwableObjects.findIndex(element => thrownBottle == element);
            if (this.endboss.isColliding(thrownBottle) && !thrownBottle.hitEnemy) {
                this.endboss.hurt();
                thrownBottle.hitEnemy = true;
                this.endboss.hit();
                this.statusBarEndboss.setStatusbarImage(this.endboss.energy);
                this.stopThrownBottle(thrownBottle);
                thrownBottle.splash();
            }
            this.checkBottleIsSplashed(thrownBottle, currentBottleIndex);
            this.checkEndbossIsDead();
        });
    }


    /**
     * Stops the movement of the thrown bottle.
     * @param {object} thrownBottle - instance of throwable-object
     */
    stopThrownBottle(thrownBottle) {
        clearInterval(thrownBottle.throwIntervalID);
        thrownBottle.speedY = 0;
        thrownBottle.acceleration = 0;
    }


    /**
     * Checks if the bottle splash is finished and deletes it.
     * @param {object} thrownBottle - instance of throwable-object
     * @param {integer} currentBottleIndex - array index of the current thrown bottle
     */
    checkBottleIsSplashed(thrownBottle, currentBottleIndex) {
        if (thrownBottle.splashDone) {
            delete this.throwableObjects[currentBottleIndex];
        }
    }


    /** Checks if the endboss is defeated and shows the win screen. */
    checkEndbossIsDead() {
        if (this.endboss.isDead() && !this.endboss.deadStatus) {
            this.endboss.hecticMusic.pause();
            this.playEndbossDefeatedSound();
            this.endboss.currentImage = 0;
            this.endboss.dead();
            setTimeout(() => {
                youWin();
            }, 2000);
        }
    }


    /** Checks the collision between the chickens and the thrown bottle. */
    checkHitChicken() {
        this.throwableObjects.forEach(thrownBottle => {
            let currentBottleIndex = this.throwableObjects.findIndex(element => thrownBottle == element);
            this.level.enemies.slice(1).forEach(enemy => {
                let currentEnemyIndex = this.level.enemies.findIndex(element => enemy == element);
                if (thrownBottle.isColliding(enemy) && !thrownBottle.hitEnemy && !enemy.isDead()) {
                    thrownBottle.hitEnemy = true;
                    this.stopThrownBottle(thrownBottle);
                    thrownBottle.splash();
                    this.enemyIsDead(enemy, currentEnemyIndex);
                }
                this.checkBottleIsSplashed(thrownBottle, currentBottleIndex);
            });
        });
    }


    /** Checks if the character jumps on a chicken. */
    checkJumpOnChicken() {
        this.level.enemies.slice(1).forEach(enemy => {
            let currentEnemyIndex = this.level.enemies.findIndex(element => enemy == element);
            if (this.character.isColliding(enemy) && this.character.speedY < 0 && !enemy.isDead()) {
                this.enemyIsDead(enemy, currentEnemyIndex);
                this.character.jump();
            }
        });
    }


    /**
     * Shows the dead animation of the enemy and deletes it.
     * @param {object} enemy - instance of chickens
     * @param {integer} currentEnemyIndex - array index of the current chicken
     */
    enemyIsDead(enemy, currentEnemyIndex) {
        enemy.energy = 0;
        enemy.stop();
        enemy.dead(currentEnemyIndex);
    }


    /** Function for collecting bottles. */
    checkCollectBottle() {
        this.bottles.forEach(bottle => {
            let currentBottleIndex = this.bottles.findIndex(element => bottle == element);
            if (this.character.isColliding(bottle) && this.statusBarBottle.amount < 5) {
                bottle.playCollectBottleSound();
                this.bottles.splice(currentBottleIndex, 1);
                this.statusBarBottle.amount++;
                this.statusBarBottle.setStatusbarImage();
                this.checkBottlesAreEmpty();
            }
        });
    }


    /** Checks if all bottles are collected. */
    checkBottlesAreEmpty() {
        if (this.bottles.length == 0) {
            this.creatBottles(5);
        }
    }


    /** Function for collecting coins. */
    checkCollectCoin() {
        this.coins.forEach(coin => {
            let currentCoinIndex = this.coins.findIndex(element => coin == element);
            if (this.character.isColliding(coin)) {
                coin.playCollectCoinSound();
                this.coins.splice(currentCoinIndex, 1);
                this.statusBarCoin.amount++;
                this.statusBarCoin.setStatusbarImage();
            }
        });
    }


    /** Checks if the character reaches the endboss. */
    checkEncounterEndboss() {
        if (this.character.x >= 1930 && !this.endboss.visible) {
            this.endboss.playEncounterEndbossSound();
            this.statusBarEndboss.setStatusbarImage(50);
            this.endboss.initEndboss();
        }
    }


    /** Calculates the distance between the endboss and the character. */
    calcDistanceEndbossCharacter() {
        this.distanceEndbossCharacter = ((this.endboss.x + this.endboss.width / 2) - (this.character.x + this.character.width / 2));
    }


    /** Controls the movement of the endboss towards the character. */
    controlEndbossMovement() {
        if (this.endboss.visible && !this.endboss.isDead()) {
            let timePassed = new Date().getTime() - this.lastJumpEndboss;
            timePassed = timePassed / 1000;
            if (this.distanceEndbossCharacter >= 0 && (this.endboss.isWalking || this.endboss.isAttacking)) {
                this.endboss.moveLeft();
            } else if (this.distanceEndbossCharacter < 0 && (this.endboss.isWalking || this.endboss.isAttacking)) {
                this.endboss.moveRight();
            }
            this.controlEndbossJump(timePassed);
        }
    }


    /**
     * Controls the jump of the endboss.
     * @param {integer} timePassed - time passed since last jump
     */
    controlEndbossJump(timePassed) {
        if (this.lastJumpEndboss == 0 && this.endboss.x < 2480) {
            this.lastJumpEndboss = new Date().getTime();
        } else if (timePassed > 4 && this.endboss.x < 2480) {
            this.lastJumpEndboss = new Date().getTime();
            this.endboss.jump();
        }
    }


    /**
     * Creates new bottles.
     * @param {integer} amount - amount of bottles to be created
     */
    creatBottles(amount) {
        for (let i = 0; i < amount; i++) {
            this.bottles.push(new Bottle());
        }
    }


    /** Creates coins. */
    creatCoins() {
        for (let i = 0; i < 10; i++) {
            this.coins.push(new Coin());
        }
    }


    /** Plays the short winning sound. */
    playEndbossDefeatedSound() {
        let winSound = new Audio('assets/audio/endboss-defeated.mp3');
        winSound.volume = 0.5;
        checkPlayAudio(winSound);
    }


    /** Plays the short loser sound. */
    playYouLostSound() {
        let lostSound = new Audio('assets/audio/you-lost.mp3');
        lostSound.playbackRate = 2;
        checkPlayAudio(lostSound);
    }
}