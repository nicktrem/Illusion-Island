/**
 * class: WestZone
 * author: Max Stelmack
 * 
 * Manages properties of the west zone of blocks. Has a jungle theme, with a large tree as a landmark.
 */
 class WestZone extends Zone {
    constructor(me) {
        super();
        this.initTileMaps(me);
        this.currentBlockCoord = createVector(1, 1);
    }

    initTileMaps(me) {
        this.blocks = [[new Block(), new Block(), new Block()],
                       [new Block(), new Block(), new Block()],
                       [new Block(), new Block(), new Block()]];

        let tileMaps = [
            // Top left
            ["XXXXXXXXXXXXXXXXXXXX",
            "XWWWWW__X___________",
            "XWMGPW__X__X_______X",
            "XWMJPP__X__X_______X",
            "XWPGPW__X1_X________",
            "XWWWWW__X__X________",
            "X_______X__X________",
            "X_2_____X_2X____X___",
            "X__XXXXXX__X________",
            "X___1______X________",
            "X____1_____X_______X",
            "XXXXXXXXXXXX________",
            "X___X_______________",
            "X_____________X_____",
            "X_________X_________",
            "X___________________",
            "X___________________",
            "X_______________X___",
            "X_____X_____________",
            "X___________________"],

            // Top middle
            ["XXXXXXXXXXXXXXXXXXXX",
            "______________X____X",
            "X__________X_____X_X",
            "X________X_____X___X",
            "__________2__X_____X",
            "________________X__X",
            "_______X_____X_____X",
            "___________X_______X",
            "____X_______________",
            "_________PPPPPPPPPPP",
            "X____1___P__________",
            "_________P_X____X__X",
            "_________P_________X",
            "___X_____P____X____X",
            "_________P__X___X__X",
            "______X__P_________X",
            "_________P_X_______X",
            "_________P____X____X",
            "_________P_________X",
            "___XXXXX_P_XXXXXXXXX"],

            // Top Right
            ["XXXXXXXXXXXXXXXXXXXX",
            "X_XX_______________X",
            "X__X_2____XX_______X",
            "X____XX____X_______X",
            "X____X____X____XX__X",
            "X__XXX_____________X",
            "X__________XX______X",
            "X__XX___________X__X",
            "______X________X___X",
            "PPPPP_X_____X______X",
            "___PP____________X_X",
            "X__PP____X____XX___X",
            "X__PP_______X____X_X",
            "X__PP___XX__X_X_X__X",
            "X__PP_X_______X_2__X",
            "X__PP_X____XX___X__X",
            "X__PP_X_____X____X_X",
            "X__PP_____X___X____X",
            "X__PP_______X___X__X",
            "XX_PP_XXXXXXXXXXXXXX"],

            // center left
            ["X___________________",
            "X___________________",
            "X___________________",
            "X______X__X_________",
            "X__X________X_______",
            "X____X___X__________",
            "X__M_______________X",
            "X_____X_____G_______",
            "X_________X_________",
            "X____X__X__________X",
            "X_______________X___",
            "X_____________XX____",
            "X__________________X",
            "X_________XX_______X",
            "X_______X___X_______",
            "X____M___X__________",
            "X__X________X______X",
            "X_R_X____G_________X",
            "X__________________X",
            "X_P_XXXXXXXXX___XXXX"],

            // center middle
            ["___XXXXX_P_XXXXXXXXX",
            "_________P_________X",
            "___X___3_P__X_____XX",
            "_________P______X___",
            "______X__P________XX",
            "_________P_____X__XX",
            "X________P______X__X",
            "____X____P_____WWWWW",
            "_________PX____WMPPW",
            "X________P_P_P_MMZPW",
            "_______________WMPPW",
            "_______X_______WWWWW",
            "X___X_____________XX",
            "X_________X_____X__X",
            "___X___X__________XX",
            "___________X______XX",
            "X____X________X___XX",
            "X______X___________X",
            "X________________X_X",
            "XXXXXXXXX___XXXXXXXX"],

            // center right
            ["XX_PP_XXXXXXXXXXXXXX",
            "X__PP______________X",
            "X__PP___1__________X",
            "_X_PP_X____________X",
            "4X_PP_X____________X",
            "RX_PP______________X",
            "X__PP_X____________X",
            "X__PP_XX__XXX___XXXX",
            "X__PP_______________",
            "X__PPPPPPPPPPPPPPPPP",
            "X__PPPPPPPPPPPPPPPPP",
            "X____________R___3__",
            "XXX____XXXXX_____XXX",
            "X______X_______3___X",
            "X___________X______X",
            "X__X__X____________X",
            "X____________XX____X",
            "X__X_X___X_________X",
            "X_1___________X____X",
            "XXXXXXXXX__XXXXXXXXX"],

            // bottom left
            ["X___XXXXXXXXX___XXXX",
            "X_P_XX_____________X",
            "X___XX___X_________X",
            "XX__XX______________",
            "X____X_______X______",
            "X_P__X__X___________",
            "X___X_______X______X",
            "X___X__________X___X",
            "X_P_XX__X_1________X",
            "X_P_X__1___X_______X",
            "X_X_X__X_______XXXXX",
            "X_X_XX____1_X__X3R3_",
            "X_1_XX_1X______XR3R_",
            "X__XXX_RRR_2___X4R4_",
            "X__XXXXXX__XXXXX34XX",
            "X____XXX_XX__XXXXXXX",
            "X_P__X____X_________",
            "X__P_____P_______P__",
            "XX_____X_____XX_____",
            "XXXXXXXXXXXXXXXXXXXX"],

            // bottom center
            ["XXXXXXXXX___XXXXXXXX",
            "X____X_____________X",
            "X_____X___XXX__4__X",
            "_______X___X_2___X_X",
            "____2__X____X_____XX",
            "_______X_____X_____X",
            "X_____X___3__X_____X",
            "X___XX_X______X__1_X",
            "X_______XX____X____X",
            "X_____1_______X_____",
            "X____XXX__XXXXXX____",
            "____XXXXXXX____X___X",
            "___XX_________XX___X",
            "___XX_3___G_X__X___X",
            "XXXXX___X_______XXXX",
            "XXXX____XXX____XXXXX",
            "_X_______XX__4______",
            "__P___P_XXP__X_P___P",
            "___XX___XXX____X__2_",
            "XXXXXXXXXXXXXXXXXXXX"],

            // bottom right
            ["XXXXXXXXX__XXXXXXXXX",
            "X______________XX__X",
            "X__X_____34________X",
            "X______WWWWWW______X",
            "X__________________X",
            "X____W_PPPPPP_W____X",
            "X____W_P____P_W____X",
            "X____W_P_WW_P_W____X",
            "X____W_P_WW_P_W____X",
            "_____W_P_Gj_P_W____X",
            "_____W1PPPPPP_W____X",
            "X_X__2________M_X__X",
            "X______WWWWWW___X__X",
            "X___X______________X",
            "XX_XXXX_X___XXX_XX_X",
            "XXXX__XXXXXXX__X__XX",
            "__________MXX____WWW",
            "_PXX___P_____PPPPDWW",
            "_______XX_M______WWW",
            "XXXXXXXXXXXXXXXXXXXX"]
        ];
        
        let mapIndex = 0;
        let currentMap;
        for (let j = 0; j < this.blocks.length; j++) {
            for (let i = 0; i < this.blocks[j].length; i++) {
                if (!(this.blocks[j][i] === null)) {
                    currentMap = tileMaps[mapIndex++];
                    for (let n = 0; n < currentMap.length; n++) {
                        for (let m = 0; m < currentMap[n].length; m++) {
                            let pos = me.coordToPos(createVector(m, n))
                            switch(currentMap[n][m]) {
                                case 'D':
                                    this.blocks[j][i].addTile(new Door(me.gridPixelDim, m, n, [2, 0], createVector(0, 0), createVector(3, 2)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                case 'X':
                                    this.blocks[j][i].addTile(new JungleTree(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'W':
                                    this.blocks[j][i].addTile(new JungleStoneWall(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '_':
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'R':
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new Ruby(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case '3':
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new HealthPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case '4':
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new ManaPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'P':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case '1':
                                    this.blocks[j][i].addEnemy(new Spider(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '2':
                                    this.blocks[j][i].addEnemy(new RangedSpider(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'G':
                                    this.blocks[j][i].addEnemy(new Gorilla(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'M':
                                    this.blocks[j][i].addEnemy(new Monkey(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // armor
                                case 'Z':
                                    this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new SmallShieldJungle(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // weapon 1
                                case 'j':
                                    if (me.player.getSpecialty() == 'S')
                                    {
                                        this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new JungleSword(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'R')
                                    {
                                        this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new JungleBow(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'W')
                                    {
                                        this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new JungleWand(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    break;
                                // weapon 2
                                case 'J':
                                    if (me.player.getSpecialty() == 'S')
                                    {
                                        this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new JungleHammer(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'R')
                                    {
                                        this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new JungleCrossbow(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'W')
                                    {
                                        this.blocks[j][i].addTile(new JungleFloor(me.gridPixelDim, m, n, new JungleStaff(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
}

/**
 * class: WestZoneDungeon
 * author: Max Stelmack
 * 
 * Manages properties of the west dungeon zone of blocks. Has a jungle theme.
 */
 class WestZoneDungeon extends Zone {
    constructor(me) {
        super();
        this.initTileMaps(me);
        this.currentBlockCoord = createVector(1, 1);
    }

    initTileMaps(me) {
        this.blocks = [[new Block(), new Block()],
                       [new Block(), new Block()]];

        let tileMaps = [
            // Top left
            ["XXXXXXXXXXXXXXXXXXXX",
            "XXX________________X",
            "XXDPPPPPPPPP_______X",
            "XXX________P___XX__X",
            "X____1_____P___XX__X",
            "X__________P_______X",
            "X__________P_______X",
            "X______X___PX__1___X",
            "X__________P_______X",
            "X________XXP________",
            "X________XXPPPPPPPPP",
            "X___________________",
            "X_1____X____X______X",
            "X__________________X",
            "X__________________X",
            "X__XX__________XX__X",
            "X__XX________1_XX__X",
            "X__________________X",
            "X__________________X",
            "XXXXXXXXXXXXXXXXXXXX"],

            // Top Right
            ["XXXXXXXXXXXXXXXXXXXX",
            "X__________________X",
            "X__________________X",
            "X__X__X__X__X__X__XX",
            "X__________________X",
            "X______________X___X",
            "X__________________X",
            "X_XXX__________X___X",
            "X_____________2____X",
            "______X______1_X___X",
            "PPPP__X______1_X___X",
            "___P__X______1_____X",
            "X__P_________1_X___X",
            "X_XPX_________2____X",
            "X__P___________X___X",
            "X__PP______________X",
            "X__XP_X__X__X__X__XX",
            "X___PPPPPPPPPPPPPP_X",
            "X____________3344_P_X",
            "XXXXXXXXXXXXXXXX_P_X"],

            // bottom left
            ["XXXXXXXXXXXXXXXXXXXX",
            "XX________________XX",
            "X_X______________X_X",
            "X__________________X",
            "X___X__________X___X",
            "X____X________X____X",
            "X__________________X",
            "X____B_____________X",
            "X__________________X",
            "X______A____________",
            "X_o_____________PPPP",
            "X______A____________",
            "X__________________X",
            "X____B_____________X",
            "X____X________X____X",
            "X___X__________X___X",
            "X__________________X",
            "X_X______________X_X",
            "XX________________XX",
            "XXXXXXXXXXXXXXXXXXXX"],

            // bottom right
            ["XXXXXXXXXXXXXXXX_P_X",
            "X_______X_____X__P_X",
            "X_______X_____X__P_X",
            "X_______X_____X__P_X",
            "X_________XXX___XPXX",
            "X_____________X__P_X",
            "X______G______X__P_X",
            "X_M___________X__P_X",
            "X_______________XPXX",
            "______________X__P_X",
            "PPPPPPPPPPPPPPPPPP_X",
            "______________X____X",
            "X_______________XXXX",
            "X_____________X____X",
            "X_____________X____X",
            "X_____________X____X",
            "X_______G_______XXXX",
            "X__M__________X____X",
            "X_____________X____X",
            "XXXXXXXXXXXXXXXXXXXX"]
        ];
        
        let mapIndex = 0;
        let currentMap;
        for (let j = 0; j < this.blocks.length; j++) {
            for (let i = 0; i < this.blocks[j].length; i++) {
                if (!(this.blocks[j][i] === null)) {
                    currentMap = tileMaps[mapIndex++];
                    for (let n = 0; n < currentMap.length; n++) {
                        for (let m = 0; m < currentMap[n].length; m++) {
                            let pos = me.coordToPos(createVector(m, n))
                            switch(currentMap[n][m]) {
                                case 'D':
                                    this.blocks[j][i].addTile(new Door(me.gridPixelDim, m, n, [1, 0], createVector(2, 2), createVector(16, 17)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                case 'X':
                                    this.blocks[j][i].addTile(new JungleStoneWall(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '_':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'P':
                                    this.blocks[j][i].addTile(new SandStone(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case '1':
                                    this.blocks[j][i].addEnemy(new Spider(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '2':
                                    this.blocks[j][i].addEnemy(new RangedSpider(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'G':
                                    this.blocks[j][i].addEnemy(new Gorilla(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'M':
                                    this.blocks[j][i].addEnemy(new Monkey(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'A':
                                    this.blocks[j][i].addEnemy(new JungleAssasin(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'B':
                                    this.blocks[j][i].addEnemy(new JungleArcher(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '3':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new HealthPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case '4':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new ManaPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'o':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new Sail(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
}

function getRandomJungleFloorImg() {
    return random([image_jungle_floor_1, image_jungle_floor_1, image_jungle_floor_1, image_jungle_floor_1, image_jungle_floor_1, image_jungle_floor_2, image_jungle_floor_2, image_jungle_floor_2, image_jungle_floor_2, image_jungle_floor_2, image_jungle_floor_3, image_jungle_floor_4])
}

class JungleFloor extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
        this.image = getRandomJungleFloorImg();
    }

    draw() {
        push();
        noStroke();
        image(this.image, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        this.drawItem();
        pop();
    }
}

class JungleTree extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
        this.floorImage = getRandomJungleFloorImg();
    }

    draw() {
        push();
        noStroke();
        image(this.floorImage, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        image(image_jungle_tree, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class JunglePath extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_jungle_dirt_path, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        this.drawItem();
        pop();
    }
}

class JungleStoneWall extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_jungle_stone_wall_1, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

/**
 * class: SpiderWebWeapon
 * author: Max Stelmack
 * 
 * intantiates weapon
 */
class SpiderWebWeapon extends Weapon
{
    /**
    * method: constructor
    * 
    * constructs the health potion and loads image
    * @param {int} middleX: The initial X value 
    * @param {int} middleY: The initial Y value
    * @param {int} width: The width of the bow
    * @param {int} height: The height of the bow
    */
    constructor(middleX, middleY, width, height)
    {
        let name = "Spider Web";
        let image = image_spider_web;
        let damage = 2;
        let range = 4;
        let cost = 0;
        let projectileImage = image_spider_web;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
    }
}

/**
 * class: BananaWeapon
 * author: Max Stelmack
 * 
 * intantiates weapon
 */
class BananaWeapon extends Weapon
{
    /**
    * method: constructor
    * 
    * constructs the health potion and loads image
    * @param {int} middleX: The initial X value 
    * @param {int} middleY: The initial Y value
    * @param {int} width: The width of the bow
    * @param {int} height: The height of the bow
    */
    constructor(middleX, middleY, width, height)
    {
        let name = "Banana";
        let image = image_banana;
        let damage = 2;
        let range = 4;
        let cost = 0;
        let projectileImage = image_banana;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
    }
}


  /**
  * class: Zombie
  * 
  * An Combatant the player can encounter
  */
   class Spider extends Enemy
   {
       /**
        * method: constructor
        * 
        * constructs the combatant and loads the base image
        * @param {int} middleX: The initial X value 
        * @param {int} middleY: The initial Y value
        * @param {int} width: The width of the zombie
        * @param {int} height: The height of the zombie
        */
       constructor(middleX, middleY, width, height)
       {
           let specialty = 'S';
           let health = 15;
           let points = 0;
           let armor = null;
           let money = 1;
           let damage = 2;
           let weapon = new Fists(200, 200, 10, 10, damage);
           let vison = 10;
           super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
           this.image = image_spider;
       }
   }

   /**
    * class: Skeleton
    * 
    * An Combatant the player can encounter
    */
    class RangedSpider extends Enemy
    {
        /**
         * method: constructor
         * 
         * constructs the combatant and loads the base image
         * @param {int} middleX: The initial X value 
         * @param {int} middleY: The initial Y value
         * @param {int} width: The width of the skeleton
         * @param {int} height: The height of the skeleton
         */
        constructor(middleX, middleY, width, height)
        {
           let specialty = 'R';
           let health = 10;
           let points = 0;
           let armor = null;
           let money = 1;
           let weapon = new SpiderWebWeapon(200, 200, 10, 10);
           let vison = 10;
           super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
           this.image = image_ranged_spider;
        }
    }

/**
* class: Gorilla
* 
* An Combatant the player can encounter
*/
class Gorilla extends Enemy
{
    /**
     * method: constructor
     * 
     * constructs the combatant and loads the base image
     * @param {int} middleX: The initial X value 
     * @param {int} middleY: The initial Y value
     * @param {int} width: The width of the zombie
     * @param {int} height: The height of the zombie
     */
    constructor(middleX, middleY, width, height)
    {
        let specialty = 'S';
        let health = 25;
        let points = 0;
        let armor = null;
        let money = 5;
        let damage = 3;
        let weapon = new Fists(200, 200, 10, 10, damage);
        let vison = 10;
        super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
        this.image = image_gorilla;
    }
}

/**
 * class: Monkey
 * 
 * An Combatant the player can encounter
 */
 class Monkey extends Enemy
 {
     /**
      * method: constructor
      * 
      * constructs the combatant and loads the base image
      * @param {int} middleX: The initial X value 
      * @param {int} middleY: The initial Y value
      * @param {int} width: The width of the skeleton
      * @param {int} height: The height of the skeleton
      */
     constructor(middleX, middleY, width, height)
     {
        let specialty = 'R';
        let health = 15;
        let points = 0;
        let armor = null;
        let money = 3;
        let weapon = new BananaWeapon(200, 200, 10, 10);
        let vison = 8;
        super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
        this.image = image_monkey;
     }
 }

 /**
 * class: Gorilla
 * 
 * An Combatant the player can encounter
 */
 class JungleAssasin extends Enemy
 {
     /**
      * method: constructor
      * 
      * constructs the combatant and loads the base image
      * @param {int} middleX: The initial X value 
      * @param {int} middleY: The initial Y value
      * @param {int} width: The width of the zombie
      * @param {int} height: The height of the zombie
      */
     constructor(middleX, middleY, width, height)
     {
         let specialty = 'S';
         let health = 20;
         let points = 0;
         let armor = null;
         let money = 5;
         let damage = 5;
         let weapon = new Fists(200, 200, 10, 10, damage);
         let vison = 12;
         super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
         this.image = image_gorilla;
     }
 }

 /**
 * class: bow
 * author: Cameron Dunning
 * 
 * intantiates bow
 */
  class JungleTempleBow extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the bow
       * @param {int} height: The height of the bow
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Enemy Jungle Bow";
        let image = image_weapon_fireBow;
        let damage = 4;
        let range = 6;
        let cost = 10;
        let projectileImage = image_projectile_jungle_arrow;
        let projectileWidth = 30;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

 /**
  * class: Monkey
  * 
  * An Combatant the player can encounter
  */
  class JungleArcher extends Enemy
  {
      /**
       * method: constructor
       * 
       * constructs the combatant and loads the base image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the skeleton
       * @param {int} height: The height of the skeleton
       */
      constructor(middleX, middleY, width, height)
      {
         let specialty = 'R';
         let health = 10;
         let points = 0;
         let armor = null;
         let money = 3;
         let weapon = new BananaWeapon(200, 200, 10, 10);
         let vison = 8;
         super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
         this.image = image_monkey;
      }
  }