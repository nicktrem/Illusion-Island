/**
 * class: EastZone
 * author: Nick Tremaroli
 * 
 * Manages properties of the east zone of blocks.
 * Has a water theme, with a waterfall as a key landmark.
 */
 class EastZone extends Zone 
 {
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
           ["WWWWWWWWWLWRXXXXXXXX",
            "WssssssssLWR_______X",
            "WssssssssLWR_______X",
            "WssssssssLWiOOOOOOOO",
            "WssssssssLWWWWWWWWWW",
            "WssssssssITTTTTTTTTT",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WssssssssssssssssssX",
            "WWWWWWWWSSSWWWWWWWWW"],

            // top center
            ["YYYYYYYYYYXXXXXXXXXX",
            "Y____COOOOOOOOG____X",
            "Y____LWWWWWWWWR____X",
            "OOOOOpWcTTTTgWiOOOOO",
            "WWWWWWWRsDdsLWWWWWWW",
            "TTTTTgWRssssLWcTTTTT",
            "YssssLWRssssLWRssssX",
            "YssssLWiGssCpWRssssX",
            "YssssLWWRssLWWRssssX",
            "YssssITTPssITTPssssX",
            "Ysssssssssssssssssss",
            "Ysssssssssssssssssss",
            "YssssssssssssssssssX",
            "YssssssssssssssssssX",
            "YssssssssssssssssssX",
            "YssssssssssssssssssX",
            "YssssssssssssssssssX",
            "YTTTTTTTTTTTTTTTTTTX",
            "YMrrrrrrrrrrrrrrrrHX",
            "YYYYYYYYY___XXXXXXXX"],

            // top right
           ["XXXXXXXXXLWRWWWWWWWW",
            "X__1___2_LWRsssssssW",
            "X_2___1__LWRsssssssW",
            "OOOOOOOOOpWRsssssssW",
            "WWWWWWWWWWWRsssssssW",
            "TTTTTTTTTTTPsssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "sssssssssssssssssssW",
            "sssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "XssssssssssssssssssW",
            "WWWWWWWWssWWWWWWWWWW"],

            // center left
           ["WWWWWWWRSSSLWWWWWWWW",
            "WcTTTTTPSSSITTTTTTgW",
            "WRX_r___SSS___r___IT",
            "WR_Y____SSS_________",
            "WR___H____________CO",
            "WR______n_________LW",
            "WiOOOOOOOOOOOOOOOOpW",
            "TTTTTTTTTTTTTTTTTTgW",
            "__j___2______2____LW",
            "____X__________H__LW",
            "___XX________2____LW",
            "OG_X__b___________LW",
            "WR______111___COOOpW",
            "WR____________LWWWWW",
            "WR_2___2__2___ITTTgW",
            "WR___X____________LW",
            "WR______b_Y_Y_____LW",
            "WR___YY_X______X__LW",
            "WiOOOOOG___COOOOOOpW",
            "WWWWWWWR___LWWWWWWWW"],

            // center middle
           ["WWWWWWWWWSSSWWWWWWWW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "SSSSSSSSSSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSssssssss",
            "WssssssssSSSssssssss",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WssssssssSSSsssssssW",
            "WWWWWWWWWSSSWWWWWWWW"],

            // center right
           ["XXXXXXXXSSXCpWWWWWWW",
            "XJ_r_Y__SSCpWWWWWWWW",
            "X__X___11CpWWWWWWWWW",
            "X__22_11CpWWWWWWWWWW",
            "X__22_1CpWWWWWWWWWWW",
            "X__22_1LWWWWWWWWWWWW",
            "X__22_1LWWWWWWWWWWWW",
            "X_____1LWWWWWWWWWWWW",
            "X__Y_m1LWWWWWWWWWWWW",
            "______1LWWWWWWWWWWWW",
            "_r__m_1LWWWWWWWWWWWW",
            "X___HH1LWWWWWWWWWWWW",
            "OOOOOOOpWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW"],

            // bottom left
           ["WWWWWWWR___LWWWWWWWW",
            "WcTTTTTP___ITTTTTTgW",
            "WR_Y_2____2___X___LW",
            "WR___________2____LW",
            "WR___12___________LW",
            "WR___12____X___2__LW",
            "WR_X__2___________LW",
            "WR____2__22___22__LW",
            "WR_______22_______IT",
            "WR____Y_____n__1____",
            "WR_Y____________n___",
            "WR___1_____Y___2__CO",
            "WR_________M______LW",
            "WiOOOOOG1111COOOOOpW",
            "WWWWWWWR1111LWWWWWWW",
            "WWWWWWWR1111LWWWWWWW",
            "WWWWWWWR1111LWWWWWWW",
            "WWWWWWWR1111LWWWWWWW",
            "WWWWWWWiOOOOpWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW"],

            // bottom middle
           ["WWWWWWWWRSSSLWWWWWWW",
            "WcTTTgWcPSSSITTTTTgW",
            "WRYYYLWRXSSS__r_2_LW",
            "WR___LWRXSSS__11__LW",
            "WR___LWRX_____11__LW",
            "WR___LWRX__1______LW",
            "WR___LWiOOOOOG____LW",
            "WR___LWWWWWWWR____LW",
            "TP___ITTTTTgWR____IT",
            "________211LWR____22",
            "___2_____11LWR____22",
            "OG___COOOOOpWR__1_CO",
            "WR___LWWWWWWWR____LW",
            "WR___ITTTTTgWR1___LW",
            "WR_____X___LWR____LW",
            "WR_________LWR____LW",
            "WR22222222XITP____LW",
            "WR2222222222222X_rLW",
            "WiOOOOOOOOOOOOOOOOpW",
            "WWWWWWWWWWWWWWWWWWWW"],

            // bottom right
           ["WWWWWWWRYYXXLWWWWWWW",
            "WWWWWWWRrrrrLWWWWWWW",
            "TTTTTTTP____ITTTTTTT",
            "YMrr____________rrHX",
            "OOOOOOOG____COOOOOOO",
            "WWWWWWWR____LWWWWWWW",
            "TTTTTTTP____ITTTTTTT",
            "Y___222____________X",
            "Y22________________X",
            "_2_____________11__X",
            "_____11_________1__X",
            "Y_____1____________X",
            "Y__COOOG____COOOG__X",
            "Y__LWWWR_12_LWWWR__X",
            "Y__LWWWR____LWWWR__X",
            "Y__LWWWR_2__LWWWR__X",
            "Y__ITTTP____ITTTP__X",
            "Y______________A___X",
            "Y__Y_r__2222_r___1_X",
            "YYYYYYYYYYXXXXXXXXXX"]
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
                                // left palm tree
                                case 'X':
                                    this.blocks[j][i].addTile(new LeftPalmTree(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // right palm tree
                                case 'Y':
                                    this.blocks[j][i].addTile(new RightPalmTree(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean bottom border
                                case 'O':
                                    this.blocks[j][i].addTile(new OceanBottom(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'T':
                                    this.blocks[j][i].addTile(new OceanTop(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean corner left
                                case 'L':
                                    this.blocks[j][i].addTile(new OceanBorderLeft(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean corner right
                                case 'R':
                                    this.blocks[j][i].addTile(new OceanBorderRight(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // water
                                case 'W':
                                    this.blocks[j][i].addTile(new Water(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border top left corner
                                case 'C':
                                    this.blocks[j][i].addTile(new OceanBorderTopLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border top right corner
                                case 'G':
                                    this.blocks[j][i].addTile(new OceanBorderTopRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border bottom left corner
                                case 'I':
                                    this.blocks[j][i].addTile(new OceanBorderBottomLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border bottom right corner
                                case 'P':
                                    this.blocks[j][i].addTile(new OceanBorderBottomRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border top left corner
                                case 'c':
                                    this.blocks[j][i].addTile(new OceanWaterBorderTopLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border top right corner
                                case 'g':
                                    this.blocks[j][i].addTile(new OceanWaterBorderTopRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border bottom left corner
                                case 'i':
                                    this.blocks[j][i].addTile(new OceanWaterBorderBottomLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border bottom right corner
                                case 'p':
                                    this.blocks[j][i].addTile(new OceanWaterBorderBottomRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // sand block
                                case '_':
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // sand piles
                                case '1':
                                    this.blocks[j][i].addTile(new SandPiles(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // sand dark
                                case '2':
                                    this.blocks[j][i].addTile(new SandDark(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // zombie
                                case 'Z':
                                    this.blocks[j][i].addEnemy(new Zombie(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // water golem
                                case 'w':
                                    this.blocks[j][i].addEnemy(new WaterGolem(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // sand stone
                                case 'S':
                                    this.blocks[j][i].addTile(new SandStone(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // stone
                                case 's':
                                    this.blocks[j][i].addTile(new Stone(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // door
                                case 'D':
                                    this.blocks[j][i].addTile(new Door(me.gridPixelDim, m, n, [2, 2], createVector(0, 0), createVector(9, 17)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                // flipped door
                                case 'd':
                                    this.blocks[j][i].addTile(new FlippedDoor(me.gridPixelDim, m, n, [2, 2], createVector(0, 0), createVector(10, 17)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                // crab
                                case 'b':
                                    this.blocks[j][i].addEnemy(new Crab(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // seagull
                                case 'n':
                                    this.blocks[j][i].addEnemy(new Seagull(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // walking fish
                                case 'm':
                                    this.blocks[j][i].addEnemy(new WalkingFish(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // health potion
                                case 'H':
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new HealthPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // mana potion
                                case 'M':
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new ManaPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // ruby
                                case 'r':
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new Ruby(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // armor
                                case 'A':
                                    this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new SmallShieldWater(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // weapon 1
                                case 'j':
                                    if (me.player.getSpecialty() == 'S')
                                    {
                                        this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new WaterSword(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'R')
                                    {
                                        this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new WaterBow(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'W')
                                    {
                                        this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new WaterWand(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    break;
                                // weapon 2
                                case 'J':
                                    if (me.player.getSpecialty() == 'S')
                                    {
                                        this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new WaterHammer(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'R')
                                    {
                                        this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new WaterCrossbow(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                        this.blocks[j][i].setBlockedTile(0, m, n);
                                    }
                                    else if(me.player.getSpecialty() == 'W')
                                    {
                                        this.blocks[j][i].addTile(new Sand(me.gridPixelDim, m, n, new WaterStaff(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
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

class EastZoneDungeon extends Zone
{
    constructor(me)
    {
        super();
        this.initTileMaps(me)
        this.currentBlockCoord = createVector(1, 1);
    }

    initTileMaps(me)
    {
        this.blocks = [[new Block(), new Block()],
                        [new Block(), new Block()]];
        
        let tileMaps = [

           ["WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWWWWWWWWWWWWWWWWWW",
            "WWWW111111111111WWWW",
            "WWWW1____H_____1WWWW",
            "WWWW1____H_____1WWWW",
            "Q1111__________1111Q",
            "Qz_________________Z",
            "Q___________________",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q_______QDdQ_______Q",
            "QQQQQQQQQQQQQQQQQQQQ"],

           ["QQQQQQQQQQQQQQQQQQQQ",
            "Q______111_________Q",
            "Q_____11W11___11111Q",
            "Q_____1WWW1___1WWWWW",
            "Q_____11W111111WWWWW",
            "Q______1WWWWWWWWWWWW",
            "Q______11111111WWWWW",
            "Q_____________1WWWWW",
            "Q_____________1WWWWW",
            "______________11111Q",
            "___________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q_1111________1111_Q",
            "Q_1WW1________1WW1_Q",
            "Q_1WW1________1WW1_Q",
            "Q_1WW1________1WW1_Q",
            "Q_1111________1111_Q",
            "Q______Z___Z_______Q",
            "WWWWWWWQ___QWWWWWWWW"],


           ["QQQQQQQQQQQQQQQQQQQQ",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q______o_w_________Q",
            "Q__________________Q",
            "Q______111111z_____Q",
            "Q______1WWWW1______Q",
            "Q______1W__W1_______",
            "Q______1W__W1_______",
            "Q______1WWWW1______Q",
            "Q______111111z_____Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "Q__________________Q",
            "QQQQQQQQQQQQQQQQQQQQ"],

           ["WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "QQQQQQQQ___QQQQQQQQQ",
            "_________Z_______rMQ",
            "_________________rMQ",
            "QQQQQQQQ___QQQQQQQQQ",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQ___QWWWWWWWW",
            "WWWWWWWQHHHQWWWWWWWW",
            "WWWWWWWQQQQQWWWWWWWW"]
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
                                // left palm tree
                                case 'X':
                                    this.blocks[j][i].addTile(new JungleStoneWall(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // floor of dungeon
                                case '_':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // door
                                case 'D':
                                    this.blocks[j][i].addTile(new Door(me.gridPixelDim, m, n, [1, 2], createVector(1, 0), createVector(9, 5)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                // flipped door
                                case 'd':
                                    this.blocks[j][i].addTile(new FlippedDoor(me.gridPixelDim, m, n, [1, 2], createVector(1, 0), createVector(10, 5)), m, n);
                                    this.blocks[j][i].setBlockedTile(2, m, n);
                                    break;
                                // ocean bottom border
                                case 'O':
                                    this.blocks[j][i].addTile(new OceanBottom(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                case 'T':
                                    this.blocks[j][i].addTile(new OceanTop(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean corner left
                                case 'L':
                                    this.blocks[j][i].addTile(new OceanBorderLeft(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean corner right
                                case 'R':
                                    this.blocks[j][i].addTile(new OceanBorderRight(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // water
                                case 'W':
                                    this.blocks[j][i].addTile(new Water(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border top left corner
                                case 'C':
                                    this.blocks[j][i].addTile(new OceanBorderTopLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border top right corner
                                case 'G':
                                    this.blocks[j][i].addTile(new OceanBorderTopRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border bottom left corner
                                case 'I':
                                    this.blocks[j][i].addTile(new OceanBorderBottomLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean border bottom right corner
                                case 'P':
                                    this.blocks[j][i].addTile(new OceanBorderBottomRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border top left corner
                                case 'c':
                                    this.blocks[j][i].addTile(new OceanWaterBorderTopLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border top right corner
                                case 'g':
                                    this.blocks[j][i].addTile(new OceanWaterBorderTopRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border bottom left corner
                                case 'i':
                                    this.blocks[j][i].addTile(new OceanWaterBorderBottomLeftCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // ocean water border bottom right corner
                                case 'p':
                                    this.blocks[j][i].addTile(new OceanWaterBorderBottomRightCorner(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // dungeon Stone
                                case 'Q':
                                    this.blocks[j][i].addTile(new DungeonStone(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // water stone
                                case '1':
                                    this.blocks[j][i].addTile(new WaterStone(me.gridPixelDim, m, n), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // water golem
                                case 'w':
                                    this.blocks[j][i].addEnemy(new WaterGolem(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // water dungeon assasin
                                case 'Z':
                                    this.blocks[j][i].addEnemy(new WaterAssasin(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // water dungeon archer
                                case 'z':
                                    this.blocks[j][i].addEnemy(new WaterArcher(m*me.gridPixelDim, n*me.gridPixelDim, me.gridPixelDim, me.gridPixelDim));
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, null), m, n);
                                    this.blocks[j][i].setBlockedTile(1, m, n);
                                    break;
                                // health potion
                                case 'H':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new HealthPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // mana potion
                                case 'M':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new ManaPotion(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // ruby
                                case 'r':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new Ruby(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
                                    this.blocks[j][i].setBlockedTile(0, m, n);
                                    break;
                                // cargo piece
                                case 'o':
                                    this.blocks[j][i].addTile(new JunglePath(me.gridPixelDim, m, n, new LeftOre(pos.x, pos.y, me.gridPixelDim, me.gridPixelDim)), m, n);
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
 * class: WaterAssasin
 * 
 * An Combatant the player can encounter
 */
 class WaterAssasin extends Enemy
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
         this.image = image_water_dungeon_assasin;
     }
 }

 class WaterArcher extends Enemy
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
         let specialty = 'R';
         let health = 15;
         let points = 0;
         let armor = null;
         let money = 5;
         let damage = 5;
         let weapon = new Bow(200, 200, 10, damage);
         let vison = 12;
         super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
         this.image = image_water_dungeon_archer;
     }
 }

 class Crab extends Enemy
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
         let health = 6;
         let points = 0;
         let armor = null;
         let money = 5;
         let damage = 2;
         let weapon = new Fists(200, 200, 10, 10, damage);
         let vison = 6;
         super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
         this.image = image_water_crab;
     }
 }

 class Seagull extends Enemy
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
         let health = 6;
         let points = 0;
         let armor = null;
         let money = 5;
         let damage = 3;
         let weapon = new Fists(200, 200, 10, 10, damage);
         let vison = 6;
         super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
         this.image = image_water_seagull;
     }
 }

 class WalkingFish extends Enemy
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
         let health = 8;
         let points = 0;
         let armor = null;
         let money = 5;
         let damage = 1;
         let weapon = new Fists(200, 200, 10, 10, damage);
         let vison = 6;
         super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
         this.image = image_water_walking_fish;
     }
 }