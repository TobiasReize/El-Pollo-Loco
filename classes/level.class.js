/** Class representing the level. */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2500;


/**
 * Assigns the object arrays to the variables.
 * @param {array} enemies - array of the enemies objects
 * @param {array} clouds - aray of the clouds objects
 * @param {array} backgroundObjects - array of the backgrounds objects
 */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}