class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;  //max. x-Pos. für das Ende der Map


    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}