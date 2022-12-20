/**
 * class: MapElement
 * author: Nick Tremaroli (pid: nicktrem)
 * 
 * An element which is able to present itself on the map.
 * This class is ment to be abstract and overriden by other
 * derived classes and hence does not have an update or function
 */
 class MapElement
 {
    /**
     * Method: constructor
     * 
     * constructs a map element object
     * @param middleX: the middle X-Coordinate of the map element
     * @param middleY: the middle Y-Coordinate of the map element
     * @param width: the width of the map element
     * @param height: the height of the map element
     */
    constructor(middleX, middleY, width, height)
    {
        this.image = []
        this.position = createVector(middleX, middleY);
        this.width = width;
        this.height = height;
    }

    /**
     * Method: move
     * 
     * moves the map element to another location on the map
     * @param {int} middleX 
     * @param {int} middleY 
     */
    move(middleX, middleY)
    {
        this.position.x = middleX;
        this.position.y = middleY
    }

    /**
     * Method: move
     * 
     * moves the map element to another location on the map
     * @param {int} posVec Position vector to move to
     */
    move(posVec)
    {
        this.position = posVec.copy();
    }

    /**
     * Method: moveBy
     * 
     * moves the map element to another location on the map
     * @param {int} vel Velocity vector to adjust position
     */
    moveBy(vel)
    {
        this.position.add(vel);
    }

    /**
     * Method: getX
     * 
     * @returns the X-position of the map element
     */
    getX()
    {
        return this.position.x
    }

    /**
     * Method: getY
     * 
     * @returns the Y-position of the map element
     */
    getY()
    {
        return this.position.y;
    }

    /**
     * Method: getPosition
     * 
     * @returns the position of the map element
     */
    getPosition()
    {
        return this.position.copy();
    }

    /**
     * Method: getWidth()
     * 
     * @returns the width of the map element
     */
    getWidth()
    {
        return this.width;
    }

    /**
     * Method: getHeight()
     * 
     * @returns the height of the map element
     */
    getHeight()
    {
        return this.height;
    }

    update() {}


    /**
     * method: draw
     * 
     * draws the combatant
     */
     draw()
     {
         push();
         noStroke();
         image(this.image, this.getX(), this.getY(), this.getWidth(), this.getHeight());
         pop();
     }
}

/**
 * class: CombatantAnimationsDamage
 * 
 * Manages the damage animations of the combantants
 */
class CombatantAnimationsDamage
{
    /**
     * method: Constructor
     * 
     * constructs a combatant damage animation
     */
    constructor()
    {
        this.startingX = 0;
        this.startingY = 0;

        this.textOffsetX = 20;
        this.textOffsetY = -10;

        // move plus or minus 5 pixels from the starting position
        this.damageAnimationMoveDistance = 5;

        this.currentAnimationX = 0;

        this.damageDone = 0;
        
        this.isDoingDamageAnimation = false;
        // the list of animation states
        this.animationStates = {
            inactive:0,
            started: 1,
            MovingRight: 2,
            MovingLeft: 3,
            MovingBack: 4,
            completed: 5};

        
        this.currentAnimationState = this.animationStates.inactive;
    }

    /**
     * method: startAnimation
     * 
     * Starts the animation of the combatent
     * @param {int} startX: The X-coordinate of the combatant before animation begins
     * @param {int} startY: The Y-coordinate of the combatant before animation begins
     * @param {int} damageDone: The damage influced on the combatant
     * the animation starts
     */
    startAnimation(startX, startY, damageDone)
    {
        this.startingX = startX;
        this.startingY = startY;
        this.damageDone = damageDone;
        this.isDoingDamageAnimation = true;
        this.currentAnimationState = this.animationStates.started;
        this.currentAnimationX = this.startingX
    }

    /**
     * method: getIsDoingInGameAnimation
     * 
     * @returns: if the combatant is currently in the middle
     * of its animation sequence
     */
    getIsDoingInGameAnimation()
    {
        return this.isDoingDamageAnimation;
    }

    /**
     * method isAnimationCompleted
     * 
     * gets if the combatants animations completed
     * @returns: if the combatants animations completed
     */
    isAnimationCompleted()
    {
        return this.currentAnimationState == this.animationStates.completed;
    }

    /**
     * method: checkAndUpdateAnimationState
     * 
     * checks and updates the combatants animation state
     * based on where it is in the animation sequence
     */
    checkAndUpdateAnimationState()
    {
        if(this.currentAnimationState == this.animationStates.started)
            this.currentAnimationState = this.animationStates.MovingRight;

        else if(this.currentAnimationState == this.animationStates.MovingRight &&
                this.currentAnimationX >= this.startingX + this.damageAnimationMoveDistance)
                this.currentAnimationState = this.animationStates.MovingLeft;
        
        else if(this.currentAnimationState == this.animationStates.MovingLeft &&
                this.currentAnimationX <= this.startingX - this.damageAnimationMoveDistance)
                this.currentAnimationState = this.animationStates.MovingBack
        
        else if(this.currentAnimationState == this.animationStates.MovingBack &&
                this.currentAnimationX == this.startingX)
            {
                this.currentAnimationState = this.animationStates.completed;
                this.isDoingDamageAnimation = false;
            }
    }

    drawDamageIndicator()
    {
        if(this.damageDone != undefined) {
            push();
            fill(255, 0, 0);
            stroke(255, 255, 255);
            textSize(20);
            text("-" + this.damageDone, this.startingX + this.textOffsetX, this.startingY + this.textOffsetY);
            pop();
        }
    }

    /**
     * method: doDamageAnimation
     * 
     * Reads the current animation state and executes
     * the combatant movement accordingly
     * @returns: The new X-coordinate to move the combatant to
     */
    doDamageAnimation()
    {
        this.checkAndUpdateAnimationState();
        if(this.currentAnimationState == this.animationStates.MovingRight ||
            this.currentAnimationState == this.animationStates.MovingBack)
            this.currentAnimationX += 1;
        else if(this.currentAnimationState == this.animationStates.MovingLeft)
            this.currentAnimationX -= 1;
        
        return this.currentAnimationX;
    }
}

/**
 * class: Combatant
 * author: Nick Tremaroli (pid: nicktrem)
 * 
 * An abstract base combatant class used to provide base and generic functions
 * This class is ment to be extended furthur to specify which combatant, player or combatant, you are
 * creating
 */
 class Combatant extends MapElement {
    /**
     * Method: constructor
     * 
     * Constructs a base combatant class that is ment to be further
     * extended
     * 
     * @param {*} middleX 
     * @param {*} middleY 
     * @param {*} width 
     * @param {*} height 
     * @param {*} specialty 'S' for soldier/melee, 'R' for ranger, 'W' for wizard/spellcaster
     * @param {*} health 
     * @param {*} points 
     * @param {*} armor
     */
    constructor(middleX, middleY, width, height, specialty, health, points, armor, money, weapon)
    {
        super(middleX, middleY, width, height);
        this.specialty = specialty;
        this.maxHealth = health;
        this.health = health;
        this.maxPoints = points;
        this.points = points;
        this.armor = armor;
        this.money = money;
        this.weapon = weapon;

        // Used for the damage animation of the combatant
        this.damageAnimator = new CombatantAnimationsDamage() 
    }

    getSpecialty()
    {
        return this.specialty;
    }
    /**
     * method: getMaxHealth
     * 
     * gets max health of player
     */
     getMaxHealth()
     {
         return this.maxHealth;
     }

     /**
     * method: getMaxPoints
     * 
     * gets max points
     */
      getMaxPoints()
      {
          return this.maxPoints;
      }
 

    /**
     * method: startDamageAnimation
     * 
     * Starts the damage animation of the combatant
     */
    startDamageAnimation(damageDone)
    {
        this.damageAnimator.startAnimation(this.getX(), this.getY(), damageDone);
    }

    /**
     * method: getIsDamageAnimationRunning
     * 
     * gets if the combatant is currently running a damage animation
     * @returns: if the combatant is currently running a damage animation
     */
    getIsDamageAnimationRunning()
    {
        return this.damageAnimator.getIsDoingInGameAnimation()
    }

    /**
     * method: getIsDamageAnimationCompleted
     * 
     * gets if the combatant completed the damage animation
     * @returns: if the combatant completed the damage animation
     */
    getIsDamageAnimationCompleted()
    {
        return this.damageAnimator.isAnimationCompleted();
    }

    /**
     * method: continueDamageAnimation
     * 
     * continues the combatants execution of the damage animation
     */
    continueDamageAnimation()
    {
        this.move(new p5.Vector(this.damageAnimator.doDamageAnimation(), this.getY()));
    }

    drawDamangeIndicator()
    {
        this.damageAnimator.drawDamageIndicator();
    }

    /**
     * Set the player's health to a new value
     * @param {int} health: the health to set 
     */
    setHealth(health)
    {
        this.health = health;
    }

    /**
     * Get the player's health
     * @returns the players health
     */
    getHealth()
    {
        return this.health;
    }

    addPoints(points) {
        this.points += points;
    }

    /**
     * Sets the player's points
     * @param {int} points: the player's points
     */
    setPoints(points)
    {
        this.points = points;
    }

    /**
     * get the player's points 
     * @returns the players current points
     */
    getPoints()
    {
        return this.points;
    }

    /**
     * method: addMoney
     * 
     * Adjusts the player's amount of money
     * @param {int} money: The money of the player 
     */
    addMoney(money)
    {
        this.money += money;
    }

    /**
     * method: setMoney
     * 
     * Sets the player's amount of money
     * @param {int} money: The money of the player 
     */
    setMoney(money)
    {
        this.money = money;
    }

    /**
     * method: getMoney
     * 
     * Gets the current amount of money from the player
     * @returns: the current amount of money from the player
     */
    getMoney()
    {
        return this.money;
    }

    /**
     * Set the player's armor
     * @param {item} armor: the player's armor to set 
     */
    setArmor(armor)
    {
        this.armor = armor;
    }

    /**
     * Get the player's armor
     * @returns the player's current armor
     */
    getArmor()
    {
        return this.armor;
    }

    /**
     * Set the player's weapon
     * @param {item} weapon: the player's weapon to set 
     */
    setWeapon(weapon)
    {
        this.weapon = weapon;
    }

    /**
     * Get the player's weapon
     * @returns the player's current weapon
     */
    getWeapon()
    {
        return this.weapon;
    }

    /**
     * True if combatant is dead
     * 
     * @returns 
     */
    isDead() {
        return this.health <= 0;
    }

    /**
     * Get the player's range
     * 
     * @returns the player's range
     */
    getRange() {
        return this.weapon.getRange();
    }

    /**
     * Creates projectile based on weapon
     * 
     * @param {*} targetPos Destination of projectile
     * @returns Projectile object
     */
    getProjectile(targetPos) {
        return this.weapon.getProjectile(p5.Vector.add(this.position, createVector(this.width/2, this.height/2)), targetPos);
    }

    drawHealth() {
        push();
        fill(255)
        stroke(0)
        strokeWeight(1)
        textFont(font_noContinue)
        textSize(globalScaleFactor*12)
        textAlign(RIGHT, BOTTOM)
        if(this.health < 0){
            this.health = 0;
        }
        text(this.health, this.getX() + this.getWidth(), this.getY() + this.getHeight())
        pop();
    }

    /**
     * method: draw
     * 
     * draws the combatant
     */
    draw()
    {
        push();
        noStroke();
        image(this.image, this.getX(), this.getY(), this.getWidth(), this.getHeight());
        this.drawHealth();
        pop();
    }
}

/**
 * class: Player
 * author: Nick Tremaroli (pid: nicktrem)
 * 
 * The player character which the user plays as, the player
 * has different abilities based on his/her specialty
 * This is a base class and is ment to be extended furthur
 */
class Player extends Combatant {

    /**
     * Method: constructor
     * 
     * constructs the player
     * @param {int} middleX: the starting X-coordinate of the player
     * @param {int} middleY: the starting Y-coordinate of the player
     * @param {int} width: the width of the player
     * @param {int} height: the height of the player
     */
    constructor(middleX, middleY, width, height, specialty, health, points, abilities)
    {
        super(middleX, middleY, width, height, specialty, health, points, null, 0, null);
        this.abilities = abilities;
        this.cargoElements = [];
        this.cargo = 0;
    }

    
    /**
     * Selects the current inventory item and places it on the player's hot slot
     * @param {int} inventoryIndex: the intex of the item to select
     */
    /*
    setHeldItem(inventoryIndex)
    {
        var tempItem = this.inventory[inventoryIndex];
        this.inventory[inventoryIndex] = this.currentItemHolding;
        this.currentItemHolding = tempItem;
    }*/

    useAbilityandGetDamagePoints(index) {
        if(!this.abilities[index].IsAbleToUse(this.getPoints()))
            return 0;
        
        this.setPoints(this.getPoints() - this.abilities[0].GetPointsRequired())
        return this.abilities[index].GetAttackPointsOfAbility();
    }

    addNewCargoItem()
    {
        this.cargo+= 1;
        //this.cargoElements.append(cargoItem);
    }

    getListOfCargoItems()
    {
        return this.cargoElements;
    }

    getAmountOfCargo(){
        return this.cargo;
    }
}

/**
 * class: Wizard
 * 
 * A player type the user can choose to play as
 */
class Wizard extends Player
{
    /**
     * method: constructor
     * 
     * constructs the wizard and loads the base image
     * @param {int} middleX: The initial X value 
     * @param {int} middleY: The initial Y value
     * @param {int} width: The width of the player
     * @param {int} height: The height of the player
     */
    constructor(middleX, middleY, width, height)
    {
        let maxHealth = 30;
        let maxManaPoints = 30;
        let abilities = [new MagicMissile(), new FireBall(), new IceShard()];

        super(middleX, middleY, width, height, 'W', maxHealth, maxManaPoints, abilities);
        this.image = loadImage("assets/player_classes/wizard.png");
    }
}

/**
 * class: Soldier
 * 
 * A player type the user can choose to play as
 */
class Soldier extends Player
{
    /**
     * method: constructor
     * 
     * constructs the soldier and loads the base image
     * @param {int} middleX: The initial X value 
     * @param {int} middleY: The initial Y value
     * @param {int} width: The width of the player
     * @param {int} height: The height of the player
     */
    constructor(middleX, middleY, width, height)
    {
        let maxHealth = 30;
        let maxManaPoints = 10;
        let abilities = [new Tackle(), new HeavySlam(), new RushAttack()];

        super(middleX, middleY, width, height, 'S', maxHealth, maxManaPoints, abilities);
        this.image = loadImage("assets/player_classes/soldier.png");
    }
}

/**
 * class: Ranger
 * 
 * A player type the user can choose to play as
 */
class Ranger extends Player
{
    /**
     * method: constructor
     * 
     * constructs the ranger and loads the base image
     * @param {int} middleX: The initial X value 
     * @param {int} middleY: The initial Y value
     * @param {int} width: The width of the player
     * @param {int} height: The height of the player
     */
    constructor(middleX, middleY, width, height)
    {
        let maxHealth = 20;
        let maxManaPoints = 20;
        let abilities = [new MagicMissile(), new FireBall(), new RushAttack()];

        super(middleX, middleY, width, height, 'R', maxHealth, maxManaPoints, abilities);
        this.image = loadImage("assets/player_classes/ranger.png");
    }
}

/**
 * class: Enemy
 * 
 * Specifiecs a kind of combatant with limited vision
 */
class Enemy extends Combatant {
    constructor(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vision) {
        super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon)
        this.vision = vision;
    }

    setVision() {
        this.vision = vision;
    }

    getVision() {
        return this.vision;
    }
}

/**
 * class: Skeleton
 * 
 * An Combatant the player can encounter
 */
 class Skeleton extends Enemy
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
        let health = 7;
        let points = 0;
        let armor = null;
        let money = 1;
        let weapon = new FireBow(200, 200, 10, 10);
        weapon.setDamage(1);
        let vison = 10;
        super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
        this.image = loadImage("assets/central_region/enemies/skeleton.png");
     }
 }

 /**
 * class: Zombie
 * 
 * An Combatant the player can encounter
 */
  class Zombie extends Enemy
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
          let money = 1;
          let damage = 1;
          let weapon = new Fists(200, 200, 10, 10, damage);
          let vison = 10;
          super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
          this.image = loadImage("assets/central_region/enemies/zombie.png");
      }
  }

  class WaterGolem extends Enemy
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
          let health = 40;
          let points = 0;
          let armor = null;
          let money = 5;
          let weapon = new Fists(200, 200, 10, 10, 2); // Temporary!
          let vison = 10;
          super(middleX, middleY, width, height, specialty, health, points, armor, money, weapon, vison);
          this.image = loadImage("assets/water_region/enemies/water_golem.png");
      }
  }

/**
 * class: Merchant
 * author: Nick Tremaroli (pid: nicktrem)
 * 
 * A Base merchant class which is ment to be inherited
 * by other derived classes
 */
class Merchant extends MapElement {

    /**
     * Method: constructor
     * 
     * constructs a base merchat
     * @param {int} middleX: the X-coordinate of the merchant
     * @param {int} middleY: the Y-coordinate of the merchant
     * @param {int} width: the width of the merchant
     * @param {int} height: the height of the merchant
     */
    constructor(middleX, middleY, width, height)
    {
        super(middleX, middleY, width, height);
        this.itemsToSell = [];
    }

    /**
     * Method: AddItemToSell
     * 
     * Adds an item cost pair to sell
     * @param {Item} item: the item 
     */
    AddItemToSell(item)
    {
        this.itemsToSell[this.itemsToSell.length] = item;
    }

    /**
     * Method: getCostOfItem
     * 
     * Gets the cost of an item the merchant is selling
     * @param {Item} itemToBuy: the item to buy
     * @returns the cost of the item to buy
     */
    getCostOfItem(itemToBuy)
    {
        for(var i = 0; i < this.itemsToSell.length; i++)
        {
            if(itemToBuy == this.itemsToSell[i])
                return this.itemsToSell[i].getCost();
        }
        return 0;
    }

    /**
     * Method: PurchaseItem
     * 
     * Purchases an item from the merchant and then removes
     * it from the merchants inventory
     * @param {Item} itemToBuy: the item to buy
     * @returns the item the player bought
     */
    PurchaseItem(itemToBuy)
    {
        for(var i = 0; i < this.itemsToSell.length; i++)
        {
            if(itemToBuy == this.itemsToSell[i])
            {
                var boughtItem = this.itemsToSell[i];
                this.itemsToSell.splice(i, 1);
                return boughtItem;
            }
        }
        return 0;
    }
}

/**
 * class: WaterMerchant
 * A merchant which is present in the water region of the map
 */
class WaterMerchant extends Merchant
{
    /**
     * method: constructor
     * 
     * Constructs a water merchant and fills its inventory
     * with water related items
     * @param {int} middleX 
     * @param {int} middleY 
     * @param {int} width 
     * @param {int} height 
     */
    constructor(middleX, middleY, width, height)
    {
        super(middleX, middleY, width, height)

        this.image = loadImage("assets/water_region/merchants/water_merchant.png")
        // TODO:
        // this.addItemToBuy()
        // ^ for items pertaining to the water merchant
    }

    /**
     * method: draw
     * 
     * Draws the merchant
     */
    draw()
    {
        push();
        noStroke();
        image(this.image, this.getX(), this.getY(), this.getWidth(), this.getHeight());
        pop();
    }
}

/**
 * class: FireMerchant
 * A merchant which is present in the fire region of the map
 */
class FireMerchant extends Merchant
{
    /**
     * method: constructor
     * 
     * Constructs a fire merchant and fills its inventory
     * with water related items
     * @param {int} middleX 
     * @param {int} middleY 
     * @param {int} width 
     * @param {int} height 
     */
    constructor(middleX, middleY, width, height)
    {
        super(middleX, middleY, width, height);

        this.image = loadImage("assets/fire_region/merchants/fire_merchant.png");
        // TODO:
        // this.addItemToBuy()
        // ^ for items pertaining to the water merchant
    }

    /**
     * method: draw
     * 
     * Draws the merchant
     */
    draw()
    {
        push();
        noStroke();
        image(this.image, this.getX(), this.getY(), this.getWidth(), this.getHeight());
        pop();
    }
}

/**
 * class: JungleMerchant
 * A merchant which is present in the jungle region of the map
 */
class JungleMerchant extends Merchant
{
    /**
     * method: constructor
     * 
     * Constructs a jungle merchant and fills its inventory
     * with water related items
     * @param {int} middleX 
     * @param {int} middleY 
     * @param {int} width 
     * @param {int} height 
     */
    constructor(middleX, middleY, width, height)
    {
        super(middleX, middleY, width, height);

        this.image = loadImage("assets/earth_region/merchants/jungle_merchant.png");
        // TODO:
        // this.addItemToBuy()
        // ^ for items pertaining to the water merchant
    }

    /**
     * method: draw
     * 
     * Draws the merchant
     */
    draw()
    {
        push();
        noStroke();
        image(this.image, this.getX(), this.getY(), this.getWidth(), this.getHeight());
        pop();
    }
}

/**
 * class: Tile
 * author: Nick Tremaroli (pid: nicktrem)
 * 
 * Any element that is ment for decoration within the map
 * This class is a Base class and it ment to be futhur derived
 */
class Tile extends MapElement {
    /**
     * Method: constructor
     * 
     * Constructs a tile object
     * @param {int} middleX: the X-coordinate of the tile on the map
     * @param {int} middleY: the Y-coordinate of the tile on the map
     * @param {int} width: the width of the tile on the map
     * @param {int} height: the height of the tile on the map
     * @param {bool} isItemOnTile: If an item is resting on the tile
     * @param {bool} interactable: if the user can interact to the tile
     * @param {bool} shootable: if the user can shoot through the tile
     * @param {Item} item: the item resting on the tile (if there is one)
     */
    constructor(middleX, middleY, width, height, isItemOnTile, interactable, shootable, item)
    {
        super(middleX, middleY, width, height);
        this.isItemOnTile = isItemOnTile;
        this.interactable = interactable
        this.shootable = shootable;
        this.item = item;
    }

    /**
     * Method: isItemOnTile
     * 
     * Get if there is an item on the tile
     * @returns if there is an item on the tile
     */
    isAnItemOnTile()
    {
        return this.isItemOnTile;
    }

    /**
     * Method: setItemOnTile
     * 
     * Put an item on the tile
     * @param {Item} item: the item to put on the tile
     */
    setItemOnTile(item)
    {
        if(!this.isItemOnTile)
        {
            this.isItemOnTile = true;
            this.item = item;
        }
    }

    /**
     * Method: collectItemFromTile
     * 
     * Collects the item on the tile
     * @returns the item on the tile
     */
    collectItemFromTile()
    {
        if(this.isItemOnTile)
        {
            this.isItemOnTile = false;
            let result = this.item;
            this.item = null;
            return result;
        }
    }

    /**
     * Method: setIteractable
     * 
     * Set if the tile can be interacable
     * @param {bool} interactable: if the tile can be interacted with
     */
    setInteractable(interactable)
    {
        this.interactable = interactable;
    }

    /**
     * Method: isTileInteractable
     * 
     * Get if the tile can be interacted with
     * @returns if the tile is able to be interacted with
     */
    isTileInteractable()
    {
        return this.interactable;
    }

    /**
     * Method: setShootable
     * 
     * Set if the tile is able to have an item shoot through it
     * @param {bool} shootable: if the tile is able to be shot through
     */
    setShootable(shootable)
    {
        this.shootable = shootable;
    }

    /**
     * Method: isShootable
     * 
     * Get if the tile can be shoot through
     * @returns if the tile can be shot through
     */
    isShootable()
    {
        return this.shootable;
    }

    drawItem() {
        if (this.item != null) {
            this.item.draw()
        }
    }
}

/**
 * class: Floor
 * author: Nick Tremaroli (pid: nicktrem)
 * 
 * A simple flooring for the map. This class is a Base class
 * and is ment to be futher derived
 */
class Floor extends Tile {

    /**
     * Method: constructor
     * 
     * constructs a simple floor
     * @param {int} middleX: The X-coordinate of the floor
     * @param {int} middleY: The Y-coordinate of the floor
     * @param {int} width: The width of the floor
     * @param {int} height: The height of the floor
     * @param {bool} isItemOnFloor: If there is an item on the floor
     * @param {Item} item: The item on the floor (if there is one)
     */
    constructor(middleX, middleY, width, height, isItemOnFloor, item)
    {
        super(middleX, middleY, width, height, isItemOnFloor, true, true, item);
    }
}

/**
 * class: Wall
 * author: Nick Tremaroli (pid: nicktrem)
 * 
 * A simple wall for the map. This class is a Base class
 * and is ment to be furthur derived
 */
class Wall extends Tile
{
    /**
     * Method: constructor
     * 
     * constructs a simple wall
     * @param {int} middleX: The X-coordinate of the wall 
     * @param {int} middleY: The Y-coordinate of the wall 
     * @param {int} width: The width of the wall
     * @param {int} height: The height of the wall
     * @param {bool} isItemOnWall: If there is an item on the wall
     * @param {Item} item: The item on the wall (if there is wall)
     */
    constructor(middleX, middleY, width, height, isItemOnWall, item)
    {
        super(middleX, middleY, width, height, isItemOnWall, false, false, item);
    }
}

/**
 * class: Door
 * author: Max Stelmack (pid: maxs22)
 * 
 * A door, when stepped on, transports the user to another section of the map
 */
class Door extends Floor {

    constructor(gridStep, x, y, landingZoneIndex, landingBlockCoord, landingCoord) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
        this.landingZoneIndex = landingZoneIndex;
        this.landingBlockCoord = landingBlockCoord;
        this.landingCoord = landingCoord;
        this.image = loadImage("assets/tiles/door.png");
    }

    getLandingZoneIndex() {
        return this.landingZoneIndex
    }

    getLandingBlockCoord() {
        return this.landingBlockCoord;
    }

    getLandingCoord() {
        return this.landingCoord;
    }

    draw() {
        push();
        noStroke();
        image(this.image, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}

/**
 * class: FlippedDoor
 * author: Max Stelmack (pid: maxs22)
 * edited by: Nick Tremaroli (pid: nicktrem)
 * 
 * A door, when stepped on, transports the user to another section of the map
 * edit was made to have a door on the right side (just a different image)
 */
class FlippedDoor extends Floor {

    constructor(gridStep, x, y, landingZoneIndex, landingBlockCoord, landingCoord) {
        let drawingCoord = createVector(gridStep*x, gridStep*y)
        super(drawingCoord.x + gridStep/2, drawingCoord.y + gridStep/2, gridStep, gridStep, false, null);
        this.drawingCoord = drawingCoord;
        this.landingZoneIndex = landingZoneIndex;
        this.landingBlockCoord = landingBlockCoord;
        this.landingCoord = landingCoord;
        this.image = loadImage("assets/tiles/door_flipped.png");
    }

    getLandingZoneIndex() {
        return this.landingZoneIndex
    }

    getLandingBlockCoord() {
        return this.landingBlockCoord;
    }

    getLandingCoord() {
        return this.landingCoord;
    }

    draw() {
        push();
        noStroke();
        image(this.image, this.drawingCoord.x, this.drawingCoord.y, this.width, this.height);
        pop();
    }
}