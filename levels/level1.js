let LEVEL_1;


/** Initiates the level. */
function initLevel() {
    LEVEL_1 = new Level(
        [   // 1. enemy-array
            new Endboss(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ],
        [   // 2. cloud-array
            new Cloud('assets/img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('assets/img/5_background/layers/4_clouds/2.png', 720),
            new Cloud('assets/img/5_background/layers/4_clouds/1.png', 800*2),
            new Cloud('assets/img/5_background/layers/4_clouds/2.png', 800*3)
        ],
        [   // 3. background-objects-array
            new BackgroundObject('assets/img/5_background/layers/air.png', -719),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('assets/img/5_background/layers/air.png', 0),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('assets/img/5_background/layers/air.png', 719),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('assets/img/5_background/layers/air.png', 719*2),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719*2),

            new BackgroundObject('assets/img/5_background/layers/air.png', 719*3),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719*3),
            
            new BackgroundObject('assets/img/5_background/layers/air.png', 719*4),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719*4)
        ]
    );
}