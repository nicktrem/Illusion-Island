/**
 * class: NorthZone
 * author: Cam Dunning
 * 
 * Manages properties of the north zone of blocks. Has a fire theme, with a volcano as a key landmark.
 */
 class NorthZone extends Zone {
    constructor(me)
    {
        super();
        this.initTileMaps(me);
        this.currentBlockCoord = createVector(2, 1);
    }

    initTileMaps(me)
    {
        this.blocks = [[new Block(), new Block(), new Block()],
                       [new Block(), new Block(), new Block()],
                       [new Block(), new Block(), new Block()]];
        
        let tileMaps = [
            // top left
           ["LLLLLLLLLLLLLLLLLLLL",
            "L__R___R__RR__R_RR_L",
            "LRRR_M__R__M_RRR_H_L",
            "LM___R__MMMR___R_H_L",
            "L_H_R____RMMM__R___L",
            "L_M_R_RR__M_RR__M__L",
            "L_R_R__H_RR__H__R__L",
            "L_R_H_R_H_R___R_RR_L",
            "LLLLLLLLLLLLLLLLLLLL",
            "L_R___RR_SSSSSSSSSSS",
            "L_R__R___SSSSSSSSSSS",
            "L_RR___R_SS__R_____L",
            "L__RRR___SS__J__R__L",
            "L_____RR_SSR____2__L",
            "L__R_____SS__R_____L",
            "L___RR_R_SS________L",
            "LR__M____SS_R___R__L",
            "LRRR___R_SS___R__M_L",
            "L___RR___SSR___R___L",
            "LLLLLLLLSSSSLLLLLLLL"],

            // top center
            ["LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "SSSSSSSSSSSSSSSSSSSS",
            "SSSSSSSSSSSSSSSSSSSS",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLLSSLLLLLLLLL",
            "LLLLLLLLSSSSLLLLLLLL"],

            // top right
            ["LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL",
            "SSSSSSSSSSSSLLLLLLLL",
            "SSSSSSSSSSSSLLLLLLLL",
            "L_R__R____SSLLLLLLLL",
            "L___RR_R__SSLLLLLLLL",
            "L_____R___SSLLLLLLLL",
            "L__RR_2_R_SSLLLLLLLL",
            "L_____R___SSLLLLLLLL",
            "L__RR__R__SSLLLLLLLL",
            "L_H___R___SSLLLLLLLL",
            "L__RR___R_SSLLLLLLLL",
            "LLLLLLLLLSSSSLLLLLLL"],

            // middle left
           ["LLLLLLLLLSSSSLLLLLLL",
            "LRRRRRRRRRRRRRLLLLLL",
            "LRRRRRRRRRRRRRLL___L",
            "LRRRRRRRRRRRLLLL___L",
            "LRRRRRRRLLLLLLL____L",
            "LRRRRLLLLLL________L",
            "LLLLLLL____________L",
            "L__2_______________L",
            "L__________________L",
            "L_________SSSSSSSSSS",
            "L_________SSSSSSSSSS",
            "L_________SS_______L",
            "L_________SS_______L",
            "L_MM______SS_______L",
            "L_MM______SS_____2_L",
            "L_________SS_______L",
            "L___2_____SS_______L",
            "L_________SS_______L",
            "L_________SS_______L",
            "LLLLLLLLLSSSSLLLLLLL"],

            // middle center
           ["LLLLLLLLSSSSLLLLLLLL",
            "L___R____SS__R__R__L",
            "L__R_____SS___R_R__L",
            "L____R1__SS__R_R___L",
            "L___R____SS___R_R__L",
            "L__R__j__SS___R_R__L",
            "L________SS___R__R_L",
            "L___R__R_SS___R____L",
            "L____R___SS__P_R_R_L",
            "SSSSSSSSSSSSSSSSSSSS",
            "SSSSSSSSSSSSSSSSSSSS",
            "L___R__RRSS_P_RR_R_L",
            "L__RRR___SS____RR__L",
            "L__H__RR_SS__R__R__L",
            "L___R___RSS___RRR_RL",
            "L_RRRR___SS_M__R_R_L",
            "L_____RR_SS__1R_R_RL",
            "L__R___R_SS____RR__L",
            "LR_R__RR_SS___R__R_L",
            "LLLLLLLLSSSSLLLLLLLL"],

            // middle right
           ["LLLLLLLLLSSSSLLLLLL",
            "L_R___RR__SS__RR___L",
            "L__R__R___SS_L__LR_L",
            "LRR_______SS_RR__M_L",
            "L__R__RRR_SS_R_L_R_L",
            "L___L__L__SSR__RRR_L",
            "L___R___R_SS__L_L__L",
            "L__M__L___SS_R__R__L",
            "L__L__LL__SSR_LL_R_L",
            "SSSSSSSSSSSSR__LRR_L",
            "SSSSSSSSSSSS__R_R__L",
            "L__R__R___SS_LL__R_L",
            "L____R__R_SS__RRRR_L",
            "L__R___R__SS__LL___L",
            "L_RR__R___SS_R_LRR_L",
            "L__R_H_R2_SS___L_R_L",
            "L____R____SS__R___RL",
            "L__RR__R__SS_LLLLL_L",
            "L_R_R_R___SS_R__R_RL",
            "LLLLLLLLLSSSSLLLLLLL"],

            // bottom left 
           ["LLLLLLLLLSSSSLLLLLLL",
            "LLL___2___SS____H__L",
            "LLL_R___RRSSRR___R__L",
            "LLL__R____SS___R___L",
            "LLLLLLLLL_SSR__R___L",
            "LLL__R__R_SSR_RR_LLL",
            "LLLR__R___SS_M_R___L",
            "LLLLLLLL__SS_LLLLLLL",
            "LLLR__RR__SSRR__R__L",
            "L_____RRRSSSSSSSSSSS",
            "L__RR___RSSSSSSSSSSS",
            "L___A___R_RR_______L",
            "L_______R_RR_______L",
            "L_______R_RR_______L",
            "L___1___R_RR___1___L",
            "L_______R_RR_______L",
            "L_______R_RR_______L",
            "L__M___RR_RRR___P__L",
            "LLLLLLLLLLLLLLLLLLLL",
            "LLLLLLLLLLLLLLLLLLLL"],

            // bottom middle
           ["LLLLLLLLLSSSSLLLLLLL",
            "L__RRR____SSR_RR_R_L",
            "LR1__R_R__SS__RRRR_L",
            "L_RR_R__L_SS_R___R_L",
            "L__R__R_L_SS__M_R__L",
            "LLLLLLLLL_SSR_R_R_RL",
            "LLLLLLLLL_SSR____R_L",
            "LLLLLLLLL_SSRR__RR_L",
            "LLLLLLLLL_SSR_R__R_L",
            "SSSSSSSSSSSSSSSSSSSS",
            "SSSSSSSSSSSSSSSSSSSS",
            "L___R__R__SS___R_R_L",
            "L_R__L_R__SSR_LL_R_L",
            "L_R_LL_R__SS_R_LH_RL",
            "L_R_LLR___SS__R__R_L",
            "L_RRR_MR__SSRR__R__L",
            "LR__RR_2__SSL_R__RRL",
            "L_R_LL__R_SSR__R_LLL",
            "LR_R_LLR__SSRR___LLL",
            "LLLLLLLLLSSSSLLLLLLL"],

            // bottom right
           ["LLLLLLLLLSSSSLLLLLLL",
            "L__________________L",
            "L_H____________H___L",
            "L__________________L",
            "L__2____SSSS___2___L",
            "L______SSSSSS______L",
            "L_M____SRDDRS_J_M__L",
            "L______SSSSSS______L",
            "LLLLLLLLLLLLLLLLLLLL",
            "S_____RRR__R___RR__L",
            "S__RR___R____R__R__L",
            "LLL____________P___L",
            "LLL_R___R__RR___R__L",
            "LLL__R___R_____R___L",
            "LLLLLLLLLLLLR__R___L",
            "LLL__R__RR__R_RR_LLL",
            "LLLR__R____R___R___L",
            "LLLLLLLL_R_R_LLLLLLL",
            "LLLR__RR___RRR__R__L",
            "LLLLLLLLLLLLLLLLLLLL"]
        ]

        let mapIndex = 0;
        let currentMap;
        for (let j = 0; j < this.blocks.length; j++)
        {
            for (let i = 0; i < this.blocks[j].length; i++)
            {
                if (!(this.blocks[j][i] === null))
                {
                    currentMap = tileMaps[mapIndex++];
                    for (let n = 0; n < currentMap.length; n++)
                    {
                        for (let m = 0; m < currentMap[n].length; m++)
                        {
                            let pos = me.coordToPos(createVector(m, n))
                            switch(currentMap[n][m])
                            {
                                case 'D':
                                    this.blocks[j][i].addTile(new Door(me.gridPixelDim, m, n, [2, 1], createVector(0, 0), createVector(3, 2)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                case 'L':
                                    this.blocks[j][i].addTile(new Lava_Wall(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'S':
                                    this.blocks[j][i].addTile(new Lava_Stones(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'R':
                                    this.blocks[j][i].addTile(new Lava_Rocks(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case '_':
                                    this.blocks[j][i].addTile(new Lava_Blocks(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case '1':
                                    this.blocks[j][i].addEnemy(new FireGolem(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Lava_Blocks(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '2':
                                    this.blocks[j][i].addEnemy(new FireAssasin(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Lava_Blocks(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'H':
                                    this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new HealthPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'M':
                                    this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new Ruby(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'P':
                                    this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new ManaPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                    // weapon 1
                                case 'j':
                                    if (me.player.getSpecialty() == 'S')
                                    {
                                        this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new FireSword(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'R')
                                    {
                                        this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new FireBow(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'W')
                                    {
                                        this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new FireWand(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    break;
                                // weapon 2
                                case 'J':
                                    if (me.player.getSpecialty() == 'S')
                                    {
                                        this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new FireHammer(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'R')
                                    {
                                        this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new FireCrossbow(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'W')
                                    {
                                        this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new FireStaff(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    break;
                                case 'A':
                                    this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new SmallShieldFire(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
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



/**
 * class: NorthZoneDungeon
 * author: Cameron Dunning
 * 
 * Manages properties of the west dungeon zone of blocks. Has a jungle theme.
 */
 class NorthZoneDungeon extends Zone {
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
            ["LLLLLLLLLLLLLLLLLLLL",
            "L__________________L",
            "L_D________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L________1_________L",
            "L___________________",
            "L___________________",
            "L________2_________L",
            "L__________________L",
            "L__________________L",
            "L____H_________M___L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L______________P___L",
            "LLLLLLLLL__LLLLLLLLL"],

            // Top Right
            ["LLLLLLLLLLLLLLLLLLLL",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L________2_________L",
            "L__________________L",
            "L__________________L",
            "___________________L",
            "___________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L_________2________L",
            "L__________________L",
            "L__M______H______M_L",
            "L__________________L",
            "LLLLLLLLL__LLLLLLLLL"],

            // bottom left
            ["LLLLLLLLL__LLLLLLLLL",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L_________2________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L_________H________L",
            "L__________________L",
            "L___________________",
            "L___________________",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L____M____M_____M__L",
            "L__________________L",
            "L__________________L",
            "LLLLLLLLLLLLLLLLLLLL"],

            // bottom right
            ["LLLLLLLLL__LLLLLLLLL",
            "L__________________L",
            "L_________2________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L_________2________L",
            "L__________________L",
            "L__________________L",
            "L______P___________L",
            "___________________L",
            "___________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L__________________L",
            "L______________MMMML",
            "L________3_____MMMML",
            "L______________MMoML",
            "LLLLLLLLLLLLLLLLLLLL"],
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
                                    this.blocks[j][i].addTile(new Door(me.gridPixelDim, m, n, [0, 1], createVector(2, 2), createVector(9, 7)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                    
                                case '_':
                                    this.blocks[j][i].addTile(new Lava_Blocks(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'L':
                                    this.blocks[j][i].addTile(new Lava_Wall(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '1':
                                    this.blocks[j][i].addEnemy(new FireGolem(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Lava_Blocks(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '2':
                                    this.blocks[j][i].addEnemy(new FireAssasin(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Lava_Blocks(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '3':
                                    this.blocks[j][i].addEnemy(new FireDragon(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Lava_Blocks(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'H':
                                    this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new HealthPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'M':
                                    this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new Ruby(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'P':
                                    this.blocks[j][i].addTile(new LavaFloor(me.gridPixelDim, m, n, new ManaPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'o':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new RightOre(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
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

class LavaFloor extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_lava_block, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        this.drawItem();
        pop();
    }
}

class Lava_Wall extends Wall {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_lava_wall, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class Lava_Stones extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_lava_stones, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class Lava_Rocks extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_lava_rocks, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class Lava_Blocks extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_lava_block, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

 /**
  * class: FIRE_gOLEM
  * 
  * An Combatant the player can encounter
  */
  class FireGolem extends Enemy
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
          let specialty = 'G';
          let health = 12;
          let points = 0;
          let armor = null;
          let money = 1;
          let damage = 3;
          let weapon = new Fists(200, 200, 10, 10, damage);
          let vison = 10;
          super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
          this.image = image_fire_golem;
      }
  }

  /**
  * class: FIRE_gOLEM
  * 
  * An Combatant the player can encounter
  */
   class FireDragon extends Enemy
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
           let specialty = 'D';
           let health = 15;
           let points = 0;
           let armor = null;
           let money = 1;
           //let damage = 5;
           let weapon = new FireBalls(200, 200, 10, 10);
           let vison = 15;
           super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
           this.image = image_dragon;
       }
   }

   class FireBalls extends Weapon
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
        let name = "FireBall";
        let image = image_banana;
        let damage = 10;
        let range = 4;
        let cost = 0;
        let projectileImage = image_fireBalls;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
    }
}

class FireAssasin extends Enemy
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
         let health = 10;
         let points = 0;
         let armor = null;
         let money = 5;
         let damage = 8;
         let weapon = new Fists(200, 200, 10, 10, damage);
         let vison = 12;
         super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
         this.image = image_fireAssasin;
     }
 }

