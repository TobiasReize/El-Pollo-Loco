let LEVEL_1;


function initLevel() {
    LEVEL_1 = new Level(
        [   // 1. enemy-Array
            new Endboss(),  //0
            new Chicken(),  //1
            new Chicken(),  //2
            new Chicken()   //3
        ],
        [   // 2. cloud-Array
            new Cloud('assets/img/5_background/layers/4_clouds/1.png', 0),   //Wolke an der x-Pos. 0
            new Cloud('assets/img/5_background/layers/4_clouds/2.png', 720),  //2. Wolke an der x-Pos. 720, usw.
            new Cloud('assets/img/5_background/layers/4_clouds/1.png', 800*2),
            new Cloud('assets/img/5_background/layers/4_clouds/2.png', 800*3)
        ],
        [   // 3. background-objects-Array
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
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719*3)
        ]
    );
}