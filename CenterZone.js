/**
 * class: CenterZone
 * author: Max Stelmack
 * 
 * Manages properties of the center zone of blocks. Has a beach/grassy theme.
 */
 class CenterZone extends Zone {
    constructor(me) {
        super();
        this.initTileMaps(me);
        this.currentBlockCoord = createVector(1, 1);
    }

    initTileMaps(me) {
        this.blocks = [[null, new Block(), null],
                [new Block(), new Block(), new Block()]];

        let tileMaps = [
            ["XXXXXXXXBBBBXXXXXXXX",
            "X__________________X",
            "X______X___________X",
            "X__C___C_CCC_CC____X",
            "X__CC_CC_C___C_C___X",
            "X__C_C_C_CCC_C_CX__X",
            "X__C_C_CSC___C_C___X",
            "X__C_C_C_CCC_CC____X",
            "X_____X_____Z______X",
            "X_________B________X",
            "X________BB___X____X",
            "X_________B________X",
            "X____X___B_________X",
            "X______X_BB_Y__X___X",
            "X_________B________X",
            "X______X_BB_Y___X__X",
            "X________BB________X",
            "X______X_BB_Y______X",
            "X___X____BB________X",
            "X_______BBBB_______X"],
            
            ["XXXXXXXXXXXXXXXXXXXX",
            "X_______________X___",
            "X______X_____X______",
            "X___X_______________",
            "X_______________X___",
            "X__X_____X__________",
            "X___S____Z__________",
            "X_C_CXCCC_CCC_CC____",
            "B_C_C_C_C_C_C_CXC__B",
            "B_CCC_CCC_CCC_C_C__B",
            "B_CXC_C_C_CC__C_C__B",
            "B_C_C_C_C_C_C_CC___B",
            "Y________Z_____X____",
            "X___S_X_____________",
            "X_X_________________",
            "X___________________",
            "X____X______________",
            "X___________________",
            "X___________________",
            "WWWWWWWWWWWWWWWWWWWW"],
            
            [
            "XXXXXXXXBBBBYYYYYYYY",
            "X___P__BBBBBBA_____Y",
            "Y_____________A___XX",
            "P___X__AAA__X__CC__Y",
            "X__________________X",
            "Y___A_________P____P",
            "X______X______C____P",
            "PB___C_A___CC_AAA_BX",
            "BB_________A______BB",
            "BB__X___A__A______BB",
            "BB______A____X____BB",
            "BB____P___CC____A_BB",
            "XB________AA______BX",
            "Y___CCC___P_____X__X",
            "X____CC______C_____X",
            "P_C__X__A____C_____P",
            "X______AA__P__AA___X",
            "Y_____________AAA__P",
            "X______C___CCC_____P",
            "WWWWWWWWWWWWWWWWWWWW"],
            
            ["XXXXXXXXXXXXXXXXXXXX",
            "______________X____X",
            "_X________________XX",
            "________X___X______X",
            "________________X__X",
            "___________X__X____X",
            "____X______________X",
            "________________X__X",
            "B___CCC_CCC_CCC_C_CB",
            "B___C___CZC_C___C_CB",
            "B___CCC_CCC_CCC_CCCB",
            "B___C___C_C___C__C_B",
            "____CCC_C_C_CCC__C_X",
            "___________________X",
            "__________AAA____X_X",
            "___________AA______X",
            "____A__________X___X",
            "___AA_______AA_____X",
            "___________________X",
            "WWWWWWWWWWWWWWWWWWWW"]
        ];
        
        let mapIndex = 0;
        let currentMap;
        for (let j = 0; j < this.blocks.length; j++) {
            for (let i = 0; i < this.blocks[j].length; i++) {
                if (!(this.blocks[j][i] === null)) {
                    currentMap = tileMaps[mapIndex++];
                    for (let n = 0; n < currentMap.length; n++) {
                        for (let m = 0; m < currentMap[n].length; m++) {
                            switch(currentMap[n][m]) {
                                case 'X':
                                    this.blocks[j][i].addTile(new LeftPalmTree(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'Y':
                                    this.blocks[j][i].addTile(new LeftPalmTreeCoconuts(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'P':
                                    this.blocks[j][i].addTile(new RightPalmTree(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'W':
                                    this.blocks[j][i].addTile(new OceanBottom(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'M':
                                    this.blocks[j][i].addTile(new OceanTop(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case '_':
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'A':
                                    this.blocks[j][i].addTile(new SandPiles(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'C':
                                    this.blocks[j][i].addTile(new SandDark(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'B':
                                    this.blocks[j][i].addTile(new SandStone(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                case 'Z':
                                    this.blocks[j][i].addEnemy(new Zombie(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'S':
                                    this.blocks[j][i].addEnemy(new Skeleton(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
}

class Sand extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        this.drawItem();
        pop();
    }
}

class SandDark extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand_dark, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        this.drawItem();
        pop();
    }
}

class SandPiles extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand_waves, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        this.drawItem();
        pop();
    }
}

class SandStone extends Floor {
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand_stone, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        this.drawItem();
        pop();
    }
}

class LeftPalmTree extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        image(image_palmtree_left, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class RightPalmTree extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        image(image_palmtree_right, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class LeftPalmTreeCoconuts extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        image(image_palmtree_left_coconuts, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class RightPalmTreeCoconuts extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_sand, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        image(image_palmtree_right_coconuts, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanTop extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border_flipped, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanBottom extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanBorderBottom extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_corner, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanBorderTop extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_corner_flipped, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanCornerRight extends Wall
{
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_corner_right, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanCornerLeft extends Wall
{
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_corner_left, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class Water extends Wall
{
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_water, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanBorderLeft extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border_left, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}



class OceanBorderRight extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border_right, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanBorderTopLeftCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border_top_left, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanBorderTopRightCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border_top_right, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}
class OceanBorderBottomLeftCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border_bottom_left, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}
class OceanBorderBottomRightCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_border_bottom_right, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanWaterBorderTopLeftCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_water_border_top_left, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanWaterBorderTopRightCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_water_border_top_right, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanWaterBorderBottomLeftCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_water_border_bottom_left, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class OceanWaterBorderBottomRightCorner extends Wall {
    constructor(gridStep, x, y) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_ocean_water_border_bottom_right, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class Stone extends Floor
{
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_jungle_stone_wall_1, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class DungeonStone extends Wall
{
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_dungeon_stone, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

class WaterStone extends Floor
{
    constructor(gridStep, x, y, item) {
        let hasItem = item != null;
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, hasItem, item);
        this.drawingCoord = drawingCoord;
    }

    draw() {
        push();
        noStroke();
        image(image_water_stone, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}
