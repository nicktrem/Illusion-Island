/**
 * class: GameMechanics
 * author: Max Stelmack
 * 
 * Contains all code related to actual gameplay.
 */
class GameMechanics {
    constructor(numGridSteps, gridPixelDim, specialtyString) {
        this.numGridSteps = numGridSteps;
        this.gridPixelDim = gridPixelDim;
        this.halfGridPixelDim = gridPixelDim/2;
        this.playAreaBounds = [0, numGridSteps*gridPixelDim];
        this.click = createVector(0, 0);
        this.userLock = false;
        this.actions = [];
        this.animations = [];
        this.actionLock = false;
        this.movementSpeed = gridPixelDim/7;
        this.enemies = [];
        let startingCoord = createVector(round(numGridSteps/2), round(numGridSteps/2));
        let startingPos = createVector(startingCoord.x * gridPixelDim, startingCoord.y * gridPixelDim);
        this.inventory = new Inventory(610, 160, 4, 3, 30);
        this.playerHud;
        this.turnCount = 0;

        switch (specialtyString) {
            case 'S':
                this.player = new Soldier(startingPos.x, startingPos.y, gridPixelDim, gridPixelDim);
                this.playerHud = new Soldier(656, 448, gridPixelDim, gridPixelDim);
                this.inventory.push(new Fists(200, 200, 10, 10, 3));
                break;
            case 'R':
                this.player = new Ranger(startingPos.x, startingPos.y, gridPixelDim, gridPixelDim);
                this.playerHud = new Ranger(656, 448, gridPixelDim, gridPixelDim);
                this.inventory.push(new Fists(0, 0, 10, 10, 3));
                break;
            case 'W':
                this.player = new Wizard(startingPos.x, startingPos.y, gridPixelDim, gridPixelDim);
                this.playerHud = new Wizard(656, 448, gridPixelDim, gridPixelDim);
                this.inventory.push(new Fists(0, 0, 10, 10, 3));
                break;
        }
        this.abilityBar = new AbilityBar(610, 350, 3, 1, 30,)
        for (let i = 0; i < 3; i++) {
            this.abilityBar.push(this.player.abilities[i]);
        }
        this.player.setWeapon(this.inventory.at(0, 0));
        this.player.setMoney(0);
        this.player.setArmor(null);
        this.hasClicked = false;
        let dmg = this.player.getWeapon();
        this.hud = new HUD(this.player.getHealth(), this.player.getPoints(), this.player.getMaxHealth(), this.player.getMaxPoints(), this.player.getMoney(), this.inventory, this.abilityBar, null, dmg.getDamage(), this.player.getArmor(), this.player.getAmountOfCargo(), this.player, dmg.getName());
        
        this.zones = [[null, new NorthZone(this), null],
        [new WestZone(this), new CenterZone(this), new EastZone(this)],
        [new WestZoneDungeon(this), new NorthZoneDungeon(this), new EastZoneDungeon(this)]];
        this.zoneIndex = [1,1];
    }

    posToCoord(vec) {
        
        return createVector(floor(vec.x/this.gridPixelDim, 0), floor(vec.y/this.gridPixelDim, 0));
    }

    coordToPos(vec) {
        return vec.copy().mult(this.gridPixelDim);
    }

    update(clickState) {
        let arrowPress = (keyArray[LEFT_ARROW] + keyArray[RIGHT_ARROW] + keyArray[UP_ARROW] + keyArray[DOWN_ARROW]) > 0;
        this.enemies = this.zones[this.zoneIndex[0]][this.zoneIndex[1]].getEnemies();
        let zone = this.zones[this.zoneIndex[0]][this.zoneIndex[1]];
        if (clickState[0] === 1) {
            if(clickState[1].x > 600){
                this.click = clickState[1].copy();
            }
        }


        if(this.actions.length) {
            // Update all unfinished actions
            for (let i = 0; i < this.actions.length; i++) {
                this.actions[i].update(this, zone);
                if (this.actions[i].isFinished()) {
                    this.actions.splice(i, 1);
                    i--;
                    continue;
                }
            }
        } else if (this.animations.length) {
            // Update all unfinished animations
            for (let i = 0; i < this.animations.length; i++) {
                this.animations[i].update(this, zone);
                if (this.animations[i].isFinished()) {
                    this.animations.splice(i, 1);
                    i--;
                    continue;
                }
            }
        } else if (!this.actionLock){
            let playerCoord = this.posToCoord(this.player.getPosition());
            let tile = zone.getTile(playerCoord);

            // Pick up items from ground
            if (tile.isItemOnTile && !this.inventory.isFull())
            {
                let item = tile.collectItemFromTile();
                if (item.getName() === "Ruby" || item.getName() === "Sapphire" || item.getName() === "Emerald")
                    this.player.addMoney(item.moneyAmount)
                else if (item.getName() == "Water Armor" || item.getName() == "Jungle Armor" || item.getName() == "Fire Armor")
                {
                    for(var i = 0; i < 3; i++)
                    {
                        for(var j  = 0; j < 4; j++)
                        {
                            if(this.inventory.at(i, j) == null || !this.inventory.at(i, j))
                                continue;
                            let inventoryItem = this.inventory.at(i, j)
                            if(this.inventory.at(i, j).getType() == 'A')
                                this.inventory.removeItem(i, j);
                        }
                    }
                    this.player.setArmor(item);
                    this.inventory.push(item);
                } 
                else if (item.getType() === 'C'){
                    this.player.addNewCargoItem(item);
                }
                else
                    this.inventory.push(item);
            }
            // Read player actions
            if (clickState[0] === 1) {
                let clickedCoord = this.posToCoord(clickState[1]);
                if(clickedCoord.x < 20 && clickedCoord.y < 20) {
                    if (clickedCoord.equals(playerCoord)) {
                        this.actions.push(new GameAction(this.player, 0, this.player.getPosition(), this.movementSpeed));
                    } else {
                        let clickedDistSquared = p5.Vector.sub(clickedCoord, this.posToCoord(this.player.getPosition())).magSq();
                        if (clickedDistSquared <= pow(this.player.getRange(), 2) && this.player.getPoints() >= this.player.getWeapon().getManaCost()) {
                            this.player.addPoints(-this.player.getWeapon().getManaCost())
                            this.actions.push(new GameAction(this.player, 1, this.coordToPos(clickedCoord).add(this.gridPixelDim/2, this.gridPixelDim/2), 0.9*this.movementSpeed));
                        }
                    }
                }
            } else {
                let newCoord = null;
                if (keyArray[LEFT_ARROW]) {
                    newCoord = p5.Vector.add(playerCoord, createVector(-1,  0));
                } else if (keyArray[RIGHT_ARROW]) {
                    newCoord = p5.Vector.add(playerCoord, createVector( 1,  0));
                } else if (keyArray[UP_ARROW]) {
                    newCoord = p5.Vector.add(playerCoord, createVector( 0, -1));
                } else if (keyArray[DOWN_ARROW]) {
                    newCoord = p5.Vector.add(playerCoord, createVector( 0,  1));
                }

                if (newCoord != null) {
                    let blockTrans = false;
                    let newZone = zone;
                    let newZoneIndex = this.zoneIndex;
                    let newBlockCoord = zone.currentBlockCoord.copy();
                    let newPlayerPos = this.player.getPosition();
                    if (newCoord.x < 0) {
                        blockTrans = true;
                        if (zone.currentBlockCoord.x === 0) {
                            newZoneIndex = [this.zoneIndex[0], this.zoneIndex[1] - 1];
                            newZone = this.zones[newZoneIndex[0]][newZoneIndex[1]];
                            newBlockCoord.x = this.zones[newZoneIndex[0]][newZoneIndex[1]].blocks[0].length-1;
                        } else {
                            newBlockCoord.x--;
                        }
                        newPlayerPos = this.coordToPos(createVector(this.numGridSteps-1, playerCoord.y));
                        newCoord = this.posToCoord(newPlayerPos);
                    } else if (newCoord.x >= this.numGridSteps) {
                        blockTrans = true;
                        if (zone.currentBlockCoord.x === zone.blocks[zone.currentBlockCoord.y].length-1) {
                            newZoneIndex = [this.zoneIndex[0], this.zoneIndex[1] + 1];
                            newZone = this.zones[newZoneIndex[0]][newZoneIndex[1]];
                            newBlockCoord.x = 0;
                        } else {
                            newBlockCoord.x++;
                        }
                        newPlayerPos = this.coordToPos(createVector(0, playerCoord.y));
                        newCoord = this.posToCoord(newPlayerPos);
                    } else if (newCoord.y < 0) {
                        blockTrans = true;
                        if (zone.currentBlockCoord.y === 0) {
                            newZoneIndex = [this.zoneIndex[0] - 1, this.zoneIndex[1]];
                            newZone = this.zones[newZoneIndex[0]][newZoneIndex[1]];
                            newBlockCoord.y = this.zones[newZoneIndex[0]][newZoneIndex[1]].blocks.length-1;
                        } else {
                            newBlockCoord.y--;
                        }
                        newPlayerPos = this.coordToPos(createVector(playerCoord.x, this.numGridSteps-1));
                        newCoord = this.posToCoord(newPlayerPos);
                    } else if (newCoord.y >= this.numGridSteps) {
                        blockTrans = true;
                        if (zone.currentBlockCoord.y === zone.blocks.length-1) {
                            newZoneIndex = [this.zoneIndex[0] + 1, this.zoneIndex[1]];
                            newZone = this.zones[newZoneIndex[0]][newZoneIndex[1]];
                            newBlockCoord.y = 0;
                        } else {
                            newBlockCoord.y++;
                        }
                        newPlayerPos = this.coordToPos(createVector(playerCoord.x, 0));
                        newCoord = this.posToCoord(newPlayerPos);
                    }
                    
                    if (newZone.blocks[newBlockCoord.y][newBlockCoord.x].isTileDoor(newCoord.x, newCoord.y)){
                        let door = newZone.getTile(newCoord)
                        this.zoneIndex = door.getLandingZoneIndex();
                        this.zones[this.zoneIndex[0]][this.zoneIndex[1]].currentBlockCoord = door.getLandingBlockCoord();
                        this.player.position = this.coordToPos(door.getLandingCoord())
                    } else if (!newZone.blocks[newBlockCoord.y][newBlockCoord.x].isTileBlocked(newCoord.x, newCoord.y)) {
                        zone.setBlockedTile(0, playerCoord);
                        if (blockTrans) {
                            this.actionLock = true;
                            this.player.move(newPlayerPos);
                            this.zoneIndex = newZoneIndex;
                            this.zones[this.zoneIndex[0]][this.zoneIndex[1]].currentBlockCoord = newBlockCoord;
                        } else {
                            this.actions.push(new GameAction(this.player, 0, this.coordToPos(newCoord), this.movementSpeed));
                        }
                        newZone.setBlockedTile(1, newCoord);
                    }
                }
            }

            // If player action selected and there are enemies present...
            if (this.actions.length) {
                if (this.turnCount++ % 10 == 0 && this.player.health < this.player.maxHealth) {
                    this.player.health++;
                }
                if (this.zones[this.zoneIndex[0]][this.zoneIndex[1]].getNumEnemies()) {
                    let enemy;
                    let distSq;
                    for (let i = 0; i < this.enemies.length; i++) {
                        enemy = this.enemies[i];
                        distSq = p5.Vector.sub(enemy.getPosition(), this.player.getPosition()).magSq() / pow(this.gridPixelDim, 2);
                        // Check if within vision range
                        if (distSq <= pow(enemy.getVision(), 2)) {
                            // Attack if within range
                            if (distSq <= pow(enemy.getRange(), 2)) {
                                this.actions.push(new GameAction(enemy, 1, this.player.getPosition().add(this.gridPixelDim/2, this.gridPixelDim/2), this.movementSpeed));

                            // Otherwise move
                            } else {
                                let enemyCoord = this.posToCoord(enemy.getPosition())
                                let offsetList = [createVector(-1, 0), createVector(1, 0), createVector(0, -1), createVector(0, 1)];
                                let minDist = 9999999;
                                let newDist;
                                let savedIndex = null;
                                for (let j = 0; j < offsetList.length; j++) {
                                    let testVector = p5.Vector.add(enemyCoord, offsetList[j]);
                                    if (testVector.x < 0 || testVector.x >= this.numGridSteps || testVector.y < 0 || testVector.y >= this.numGridSteps || zone.isTileBlocked(testVector)) {
                                        continue;
                                    }
                                    newDist = p5.Vector.add(enemyCoord, offsetList[j]).sub(playerCoord).magSq();
                                    if (newDist < minDist) {
                                        savedIndex = j;
                                        minDist = newDist;
                                    }
                                }

                                if (savedIndex != null) {
                                    let newEnemyCoord = p5.Vector.add(enemyCoord, offsetList[savedIndex]);
                                    zone.setBlockedTile(0, enemyCoord);
                                    zone.setBlockedTile(1, newEnemyCoord);
                                    this.actions.push(new GameAction(enemy, 0, this.coordToPos(newEnemyCoord), this.movementSpeed));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            this.actionLock = arrowPress;
        }

        zone.update(this);
        this.hud.money = this.player.getMoney();
        this.hud.hearts = this.player.getHealth();
        this.hud.mana = this.player.getPoints();
        this.playerHud.setHealth(this.player.getHealth());
        let dmg = this.player.getWeapon();
        this.hud.damage = dmg.getDamage();
        this.hud.armor = this.player.getArmor();
        this.hud.cargo = this.player.getAmountOfCargo();
        this.hud.weaponName = this.player.getWeapon().getName();
        return this.player.getHealth();
    }

    draw(clickState) {
        let mousePos = this.coordToPos(this.posToCoord(clickState[1]));
        this.zones[this.zoneIndex[0]][this.zoneIndex[1]].draw();
        this.player.draw();
        push();
        if (p5.Vector.sub(mousePos, this.player.getPosition()).magSq() / pow(this.gridPixelDim, 2) <= pow(this.player.getRange(), 2)) {
            stroke(255);
        } else {
            stroke([255, 0, 0]);
        }
        noFill();
        strokeWeight(globalScaleFactor * 2);
        rect(mousePos.x, mousePos.y, this.gridPixelDim);
        pop();

        for (let i = 0; i < this.actions.length; i++) {
            this.actions[i].draw(this);
        }
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i].draw(this);
        }

        this.hud.draw();
        this.playerHud.draw();
        //will get item that was clicked
        this.inventory.clickedState(this.click, this.player);
        this.abilityBar.clickedState(this.click, this.player);

    }
}

/**
 * class: HUD
 * author: Cam Dunning
 * 
 * Manages HUD
 */
 class HUD {
    /**
     * Method: constructor
     * 
     */
    constructor(health, mana, maxHealth, maxPoints, money, inventory, abilities, button, damage, armor, cargo, player, weaponName)
    {
        this.hearts = health;
        this.mana = mana;
        this.cargo = cargo;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.armor = armor;
        this.maxPoints = maxPoints;
        this.money = money;
        this.inventory = inventory;
        this.button = button;
        this.player = player;
        this.weaponName = weaponName;
        this.x = 600;
        this.y = 0;
        this.abilitiesBar = abilities;
    }
 
    draw() {
         push();
         //backround
         var time = millis() / 1000;
         var sine = sin(time);
         var mapped_r = map(sine, -1, 1, 100, 170);
         var mapped_b = map(sine, -1, 1, 130, 240);
         fill(mapped_r, 130, mapped_b);
         stroke(0);
         strokeWeight(2);
         rect(600, 0, 149, 599);
         noStroke();
         noFill();

         //player hud
         image(image_playerHud, 640, 435, 60, 60);

         //stats
         fill(0);
         textSize(14);
         text("Weapon Damage: ", 665, 280);
         if(this.damage == null)
            text("0", 725, 280);
         else
            text(this.damage, 725, 280);

         text("Armor: ", 665, 305);
         if(this.armor == null || this.armor == 0)
            text("0", 695, 305);
         else
            text(this.armor.getDefensePoints(), 695, 305);

         text("Cargo: ", 655, 330);
         text(this.cargo, 680, 330);
         text("/ 3", 695, 330);
         noStroke();

         //inventory
         this.inventory.draw();

         
         //abilites
         push()
         textAlign(LEFT, TOP)
         this.abilitiesBar.draw();
         text("Ability: ", 610, 390);
         text("Cost: ", 610, 405);
         for(let i = 0; i < 3; i++) {
             if (this.player.getWeapon().getName() == this.abilitiesBar.at(i, 0).getName()) {
                text(this.player.getWeapon().getName(), 662, 390);
                text(String(this.player.getWeapon().GetPointsRequired()), 651, 405);
                break;
             }
         }
         pop()
 
         //money
         
         image(image_coin, 610, 102, 25, 25);
         fill(0);
         textSize(20);
         text(this.money, 658, 108);
         noStroke();

         //weapon name
         textSize(12);
         text("Weapon: ", 637, 140);
         text(this.weaponName, 695, 140);
         //hearts
         
         let health = this.hearts;
         if(health >= this.maxHealth){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_full, 690, 10, 30, 30);
            image(image_heart_full, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 19/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_full, 690, 10, 30, 30);
            image(image_heart_three_quarters, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 18/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_full, 690, 10, 30, 30);
            image(image_heart_half, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 17/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_full, 690, 10, 30, 30);
            image(image_heart_one_quarter, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 16/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_full, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 110/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_three_quarters, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 14/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_half, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 13/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_one_quarter, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 12/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_full, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 11/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_three_quarters, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 10/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_half, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 9/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_one_quarter, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 8/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_full, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 7/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_three_quarters, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 6/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_half, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 10/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_one_quarter, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 4/20){
            image(image_heart_full, 600, 10, 30, 30);
            image(image_heart_empty, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 3/20){
            image(image_heart_three_quarters, 600, 10, 30, 30);
            image(image_heart_empty, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health >= this.maxHealth * 2/20){
            image(image_heart_half, 600, 10, 30, 30);
            image(image_heart_empty, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health > 0){
            image(image_heart_one_quarter, 600, 10, 30, 30);
            image(image_heart_empty, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         else if (health <= 0){
            image(image_heart_empty, 600, 10, 30, 30);
            image(image_heart_empty, 630, 10, 30, 30);
            image(image_heart_empty, 660, 10, 30, 30);
            image(image_heart_empty, 690, 10, 30, 30);
            image(image_heart_empty, 720, 10, 30, 30);
         }
         
         //mana
         let mana = this.mana;
         if(mana >= this.maxPoints){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_full, 690, 50, 30, 30);
            image(image_mana_full, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 19/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_full, 690, 50, 30, 30);
            image(image_mana_three_quarters, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 18/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_full, 690, 50, 30, 30);
            image(image_mana_half, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 17/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_full, 690, 50, 30, 30);
            image(image_mana_one_quarter, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 16/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_full, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 15/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_three_quarters, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 14/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_half, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 13/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_one_quarter, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 12/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_full, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 11/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_three_quarters, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 10/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_half, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 9/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_one_quarter, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 8/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_full, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 7/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_three_quarters, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 6/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_half, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 5/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_one_quarter, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 4/20){
            image(image_mana_full, 600, 50, 30, 30);
            image(image_mana_empty, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 3/20){
            image(image_mana_three_quarters, 600, 50, 30, 30);
            image(image_mana_empty, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana >= this.maxPoints * 2/20){
            image(image_mana_half, 600, 50, 30, 30);
            image(image_mana_empty, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana > 0){
            image(image_mana_one_quarter, 600, 50, 30, 30);
            image(image_mana_empty, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         else if (mana <= 0){
            image(image_mana_empty, 600, 50, 30, 30);
            image(image_mana_empty, 630, 50, 30, 30);
            image(image_mana_empty, 660, 50, 30, 30);
            image(image_mana_empty, 690, 50, 30, 30);
            image(image_mana_empty, 720, 50, 30, 30);
         }
         
         pop();
         // HUD draws here
    }
 }

/**
 * class: Zone
 * A zone is a group of multiple blocks on the map.
 */
class Zone {
    constructor() {
        this.currentBlockCoord = createVector(0, 0);
        this.blocks = [];
    }

    getTile(coordinate) {
        return this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].getTile(coordinate.x, coordinate.y);
    }

    getEnemies() {
        return this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].getEnemies();
    }

    getNumEnemies() {
        return this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].getNumEnemies();
    }

    setBlockCoord(x, y) {
        this.currentBlockCoord.x = x;
        this.currentBlockCoord.y = y;
    }

    setBlockCoord(vector) {
        this.currentBlockCoord = vector.copy();
    }

    getBlockCoord() {
        return this.currentBlockCoord.copy();
    }

    update(me) {
        this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].update(me);
    }

    draw() {
        this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].draw();
    }

    setBlockedTile(blockedBool, vec) {
        this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].setBlockedTile(blockedBool, vec.x, vec.y);
    }

    isTileBlocked(vec) {
        return this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].isTileBlocked(vec.x, vec.y);
    }

    isTileDoor(vec) {
        return this.blocks[this.currentBlockCoord.y][this.currentBlockCoord.x].isTileDoor(vec.x, vec.y);
    }
}

/**
 * class: Block
 * author: Max Stelmack
 * 
 * A block is a group of tiles that take up the screen
 */
class Block {
    constructor() {
        this.tiles = [];
        this.enemies = [];
        this.blockedTiles = [];
    }

    getTile(x, y) {
        return this.tiles[y][x];
    }

    setBlockedTile(blockedBool, x, y) {
        if (this.blockedTiles[y] === undefined) {
            this.blockedTiles[y] = [];
        }
        this.blockedTiles[y][x] = blockedBool;
    }

    isTileBlocked(x, y) {
        if (this.blockedTiles[y] === undefined) {
            return false;
        }
        return  this.blockedTiles[y][x] === 1;
    }

    isTileDoor(x, y) {
        if (this.blockedTiles[y] === undefined) {
            return false;
        }
        return  this.blockedTiles[y][x] === 2;
    }

    /**
     * Method: addTile()
     * 
     * @param {*} tile: tile object to be stored
     * @param {*} x: grid x-coordinate of tile
     * @param {*} y: gird y-coordinate of tile
     */
    addTile(tile, x, y) {
        if (this.tiles[y] === undefined) {
            this.tiles[y] = [];
        }
        this.tiles[y][x] = tile;
    }

    /**
     * Method: addEnemy()
     * 
     * @param {*} enemy: enemy object to be stored
     * @param {*} x: grid x-coordinate of element
     * @param {*} y: gird y-coordinate of element
     */
    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    /**
     * Method: update()
     * 
     * Executes class's functional logic
     */
    update(me) {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].isDead()) {
                let enemyCoord = me.posToCoord(this.enemies[i].getPosition())
                let moneyItem;
                if (this.enemies[i].money < 5) {
                    moneyItem = new Ruby(this.enemies[i].getPosition().x, this.enemies[i].getPosition().y, me.gridPixelDim, me.gridPixelDim);
                } else if (this.enemies[i].money < 10) {
                    moneyItem = new Sapphire(this.enemies[i].getPosition().x, this.enemies[i].getPosition().y, me.gridPixelDim, me.gridPixelDim);
                } else {
                    moneyItem = new Emerald(this.enemies[i].getPosition().x, this.enemies[i].getPosition().y, me.gridPixelDim, me.gridPixelDim);
                }
                moneyItem.setMoneyAmount(this.enemies[i].money)
                this.tiles[enemyCoord.y][enemyCoord.x].setItemOnTile(moneyItem)
                let clearCoord = me.posToCoord(this.enemies[i].getPosition())
                this.setBlockedTile(0, clearCoord.x, clearCoord.y)
                this.enemies.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Method: draw()
     * 
     * Executes class's graphics
     */
    draw() {

        for (let j = 0; j < this.tiles.length; j++) {
            for (let i = 0; i < this.tiles[j].length; i++) {
                this.tiles[j][i].draw();
            }
        }
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw()
        }
    }

    /**
     * Proivides list of alive enemies
     * 
     * @returns The enemies
     */
    getEnemies() {
        return this.enemies;
    }

    /**
     * Proivides count of alive enemies
     * 
     * @returns The enemies
     */
    getNumEnemies() {
        return this.enemies.length;
    }
}

/**
 * class: Inventory
 * author: Max Stelmack
 * 
 * Two-dimensional container for representing inventories. Most useful for organized drawing.
 */
class Inventory {
    /**
     * 
     * @param {*} x X-coordinate on the screen
     * @param {*} y Y-coordinate on the screen
     * @param {*} xDim X-dimension of the container
     * @param {*} yDim Y-dimension of the container
     * @param {*} boxSize Side length of box, in pixels (for drawing)
     */
    constructor(x, y, xDim, yDim, boxSize) {
        this.pos = createVector(x, y);
        this.gridDim = createVector(xDim, yDim);
        this.boxSize = boxSize;
        this.numItems = 0;
        this.pixelPadding = boxSize/10;
        this.hasClicked = false;
        this.old_i = 0;
        this.old_j = 0;
        this.armor_i = -1;
        this.armor_j = -1;
        this.old_border = false;
        this.old_mouse_pos = createVector(0, 0);
        this.contents = [];
        this.boxImage = image_hud;
        for (let j = 0; j < this.gridDim.y; j++) {
            this.contents[j] = [];
            for (let i = 0; i < this.gridDim.x; i++) {
                this.contents[j][i] = null;
            }
        }
    }

    /**
     * Reports contents at inventory location, whether occupied or not.
     * 
     * @param {*} x X-coordinate of grid
     * @param {*} y Y-coordinate of grid
     * @returns Item if present, null if no item present.
     */
    at(x, y) {
        if (x >= 0 && x < this.gridDim.x && y >= 0 && y < this.gridDim.y) {
            return this.contents[y][x];
        }
        return false;
    }

    /**
     * Adds item to specific spot
     * 
     * @param {*} item Item to add
     * @param {*} x X-coordinate of grid
     * @param {*} y Y-coordinate of grid
     * @retruns True if item added, false invalid coordinates or occupied spot
     */
    addItem(item, x, y) {
        if (this.at(x, y) === null && item != null && !this.isFull()) {
            this.numItems++;
            this.contents[y][x] = item;
            item.setPosition(this.pos.x + x * (this.boxSize + this.pixelPadding), this.pos.y + y * (this.boxSize + this.pixelPadding));
            item.width = this.boxSize -5;
            item.height = this.boxSize -5;
            return true;
        }
        return false;
    }

    /**
     * Removes item from specific spot
     * 
     * @param {*} x X-coordinate of grid
     * @param {*} y Y-coordinate of grid
     * @returns Item if removed, null if nothing to remove
     */
    removeItem(x, y) {
        let item = this.contents[y][x];
        this.contents[y][x] = null;
        this.numItems--;
        return item;
    }

    /**
     * Adds item to end of inventory
     * 
     * @param {*} item Item to be added
     * @returns Boolean "if push is successful"
     */
    push(item) {
        for (let j = 0; j < this.gridDim.y; j++) {
            for (let i = 0; i < this.gridDim.x; i++) {
                if (this.contents[j][i] === null) {
                    return this.addItem(item, i, j);
                }
            }
        }
        return false;
    }

    /**
     * Removes item from end of inventory.
     * 
     * @returns Item if exists, null if no items to remove 
     */
    pop() {
        for (let j = this.gridDim.y - 1; j >= 0; j--) {
            for (let i = this.gridDim.x - 1; i >= 0; i--) {
                if (this.contents[j][i] != null) {
                    return this.removeItem(i, j);
                }
            }
        }
        return null;
    }

    draw() {
        for (let j = 0; j < this.gridDim.y; j++) {
            for (let i = 0; i < this.gridDim.x; i++) {
                image(this.boxImage, this.pos.x + i * (this.boxSize + this.pixelPadding), this.pos.y + j * (this.boxSize + this.pixelPadding), this.boxSize, this.boxSize);
                if (this.contents[j][i] != null) {
                    this.contents[j][i].draw();
                }
            }
        }
    }

    clickedState(mousPos, player){
        if(this.hasClicked === false){
                push();
                noFill();
                stroke(244, 252, 3);
                strokeWeight(2.5);
                rect(this.pos.x + 0 * (this.boxSize + this.pixelPadding) - 2, this.pos.y + 0 * (this.boxSize + this.pixelPadding) -2, this.boxSize +4, this.boxSize +4);
                pop();
        }
        
        for (let j = 0; j < this.gridDim.y; j++) {
            for (let i = 0; i < this.gridDim.x; i++) {
                if((this.pos.x + i * (this.boxSize + this.pixelPadding) < mousPos.x) && (this.pos.y + j * (this.boxSize + this.pixelPadding) < mousPos.y) && (this.pos.x + i * (this.boxSize + this.pixelPadding) + this.boxSize > mousPos.x) && (this.pos.y + j * (this.boxSize + this.pixelPadding) +this.boxSize > mousPos.y)){
                    if(this.at(i, j) != null){
                       
                        this.hasClicked = true;

                        if(this.at(i, j).getType() === 'W'){
                            player.setWeapon(this.at(i, j));
                            push();
                            noFill();
                            stroke(244, 252, 3);
                            strokeWeight(2.5);
                            rect(this.pos.x + i * (this.boxSize + this.pixelPadding) - 2, this.pos.y + j * (this.boxSize + this.pixelPadding) -2, this.boxSize +4, this.boxSize +4);
                            pop();
                            this.old_i = i;
                            this.old_j = j;
                        }
                        else if(this.at(i, j).getType() === 'A'){
                            if(this.old_mouse_pos != mousPos){
                                player.setArmor(this.at(i, j));
                            }
                            push();
                            noFill();
                            stroke(244, 252, 3);
                            strokeWeight(2.5);
                            this.armor_i = i;
                            this.armor_j = j;
                            //rect(this.pos.x + 0 * (this.boxSize + this.pixelPadding) - 2, this.pos.y + 0 * (this.boxSize + this.pixelPadding) -2, this.boxSize +4, this.boxSize +4);
                            pop();
                        }
                        else if(this.at(i, j).getType() === 'P'){
                            if(this.old_mouse_pos != mousPos){
                                if(this.at(i, j).getName() === "Health Potion"){
                                    let new_health = player.getHealth() + this.at(i,j).getAddedHealth();
                                    if(new_health > player.getMaxHealth()){
                                        player.setHealth(player.getMaxHealth());
                                    }
                                    else{
                                        player.setHealth(new_health);
                                    }
                                }
                                else{
                                    let new_mana = player.getPoints() + this.at(i,j).getAddedMana()
                                    if(new_mana > player.getMaxPoints()){
                                        player.setPoints(player.getMaxPoints());
                                    }
                                    else{
                                        player.setPoints(new_mana);
                                    }
                                }
                            
                                 this.removeItem(i, j);
                            }
                            push();
                            noFill();
                            stroke(244, 252, 3);
                            strokeWeight(2.5);
                            rect(this.pos.x + this.old_i * (this.boxSize + this.pixelPadding) - 2, this.pos.y + this.old_j * (this.boxSize + this.pixelPadding) -2, this.boxSize +4, this.boxSize +4);
                            pop();
                           // this.old_i = 0;
                           // this.old_j = 0;
                        }
                    }
                }
                
            }
        }

        push();
        noFill();
        stroke(244, 252, 3);
        strokeWeight(2.5);
        if(this.armor_i != -1){
            rect(this.pos.x + this.armor_i * (this.boxSize + this.pixelPadding) - 2, this.pos.y + this.armor_j * (this.boxSize + this.pixelPadding) -2, this.boxSize +4, this.boxSize +4);
        }
        //if(player.getWeapon().getName() == this.at(this.old_i, this.old_j)) {
            rect(this.pos.x + this.old_i * (this.boxSize + this.pixelPadding) - 2, this.pos.y + this.old_j * (this.boxSize + this.pixelPadding) -2, this.boxSize +4, this.boxSize +4);
       // }     
        pop();
        
        this.old_mouse_pos = mousPos;
    }
    isFull() {
        return this.numItems >= this.gridDim.x * this.gridDim.y;
    }
}

class AbilityBar extends Inventory {
    constructor(x, y, xDim, yDim, boxSize) {
        super(x, y, xDim, yDim, boxSize)
        this.boxImage = image_abilityHud;
        this.pixelPadding = 20;
    }
}

/**
 * class: GameAction
 * author: Max Stelmack
 * 
 * Represents an enemy action. Every action has an ID and a coordinate related to that action. See constructor for details.
 */
class GameAction {
    /**
     * method: constructor
     * 
     * @param {*} entity Player or enemy taking the action
     * @param {*} actionID 0 = move, 1 = attack, 2 = animation
     * @param {*} targetPos pixel position for action. If it is a move action, position represents movement location. If it is an attack action, position is target of melee attack or projectile.
     * @param {*} speed speed in pixels per frame for action. 
     */
    constructor(entity, actionID, targetPos, speed) {
        this.entity = entity;
        this.speed = speed;
        this.firstTime = true;
        this.actionID = actionID;
        this.targetPos = targetPos;
        this.animationCompleted = false;
        switch(actionID) {
            case 0:
                this.speedSq = pow(speed, 2);
                this.vel = p5.Vector.sub(targetPos, entity.getPosition()).normalize().mult(speed);
                break;
            case 1:
                this.vel = speed;
                this.projectile = entity.getProjectile(targetPos);
                break;
            case 2:
                this.entity.startDamageAnimation();
        }
    }

    getActionID() {
        return this.actionID;
    }

    getPos() {
        return this.pos;
    }

    update(me, zone) {
        let firstTime = this.firstTime;
        if (this.firstTime) {
            this.firstTime = false;
        }
        switch(this.actionID) {
            case 0:
                this.entity.moveBy(this.vel);
                break;
            case 1:
                if (this.projectile != null) {
                    this.projectile.move(this.vel);

                    // Range / targeting
                    if (this.projectile.isDead(me.gridPixelDim)) {
                        this.projectile = null;
                        return;
                    }

                    if (this.projectile.getPosition().x >= 585 || this.projectile.getPosition().y >= 585 || this.projectile.getPosition().x < 0 || this.projectile.getPosition().y < 0) {
                        this.projectile = null;
                        return;
                    }
                    // Running into wall
                    if (!zone.getTile(me.posToCoord(this.projectile.getPosition().add(me.halfGridPixelDim, me.halfGridPixelDim))).isShootable()) {
                        this.projectile = null;
                        return;
                    }
                     
                    let entities = [me.player, ...me.enemies]
                    for (let i = 0; i < entities.length; i++) {
                        if(!entities[i].getPosition().equals(this.entity.getPosition())) {
                            // Check collision
                            if (me.posToCoord(this.projectile.getPosition().add(me.halfGridPixelDim, me.halfGridPixelDim)).equals(me.posToCoord(entities[i].getPosition()))) {
                                var projectileDamage = this.projectile.getDamageValue();
                                var entityArmor = entities[i].getArmor();
                                var armorVal = 0;
                                if (entityArmor != null)
                                {
                                    armorVal = entityArmor.getDefensePoints();
                                    if (armorVal >= projectileDamage)
                                        projectileDamage = 1;
                                    else
                                        projectileDamage -= armorVal;
                                }
                                entities[i].health -= projectileDamage;
                                this.projectile = null;
                                if (entities[i].health > 0 && !entities[i].getIsDamageAnimationRunning())
                                {
                                    me.animations.push(new GameAction(entities[i], 2, this.targetPos, projectileDamage))
                                }
                                return;
                            }
                        }
                    }
                }
                break;
            case 2:
                if (firstTime) {
                    this.entity.startDamageAnimation(this.speed);
                }

                let isCompleted = true;
                if(this.entity.getIsDamageAnimationRunning() && this.entity.health > 0)
                {
                    this.entity.continueDamageAnimation();
                    isCompleted = this.entity.getIsDamageAnimationCompleted();
                }

                this.animationCompleted = isCompleted;
        }
    }

    draw(me) {
        switch(this.actionID) {
            case 1:
                if (this.projectile != null) {
                    this.projectile.draw();
                }
                break;
            case 2:
                if(this.entity.getIsDamageAnimationRunning())
                {
                    this.entity.drawDamangeIndicator();
                }
                break;
        }
    }

    isFinished() {
        switch(this.actionID) {
            case 0:
                if (this.entity.getPosition().sub(this.targetPos).magSq() / 2 < this.speedSq) {
                    this.entity.move(this.targetPos);
                    return true;
                }
                return false;
            case 1:
                return this.projectile === null;
            case 2:
                return this.animationCompleted;
            default:
                return true;
        }
    }
}