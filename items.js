/**
 * class: Item
 * author: Cameron Dunning
 * 
 * Implements item instantiation
 */
 class Item {
    /**
     * Method: constructor
     * 
     * defines item name, position, and cost
     */
    constructor(name, middleX, middleY, height, width, type, cost) {
        this.name = name;
        this.position = createVector(middleX, middleY);
        this.cost = cost;
        this.type = type;
        this.width = width;
        this.height = height;
    }

     /**
     * Method: getName
     * 
     * gets the name of the item
     */
    getName(){
        return this.name;
    }

     /**
     * Method: getPosition
     * 
     * gets the position of the item
     */
      getX()
      {
          return this.position.x
      }
  
      /**
       * Method: getY
       * 
       * @returns the Y-position of the item
       */
      getY()
      {
          return this.position.y;
      }
  
      /**
       * Method: getWidth()
       * 
       * @returns the width of the item
       */
      getWidth()
      {
          return this.width;
      }
  
      /**
       * Method: getHeight()
       * 
       * @returns the height of the item
       */
      getHeight()
      {
          return this.height;
      }

     /**
     * Method: setPosition
     * 
     * sets position of item
     */
    setPosition(x, y){
        this.position.x = x;
        this.position.y = y;
    }

     /**
     * Method: getCost
     * 
     * gets the cost of the item from a merchant
     */
    getCost(){
        return this.cost;
    }

     /**
     * Method: setCost
     * 
     * sets cost of item from merchant
     */
    setCost(cost){
        this.cost = cost;
    }

    getType(){
        return this.type;
    }

    draw()
    {
        push();
        noStroke();
        image(this.image, this.getX(), this.getY(), this.getWidth(), this.getHeight());
        pop();
    }
}

class Cargo extends Item
{
    constructor(name, middleX, middleY, height, width)
    {
        super(name, middleX, middleY, height, width, 'C', 0);
    }
}

class LeftOre extends Cargo
{
    constructor(middleX, middleY, height, width)
    {
        super("Left Ore", middleX, middleY, height, width);
        this.image = loadImage("assets/cargo/ore_left.png");
    }
}

class RightOre extends Cargo
{
    constructor(middleX, middleY, height, width)
    {
        super("Right Ore", middleX, middleY, height, width);
        this.image = loadImage("assets/cargo/ore_right.png");
    }
}

class Sail extends Cargo
{
    constructor(middleX, middleY, height, width)
    {
        super("Sail", middleX, middleY, height, width);
        this.image = loadImage("assets/cargo/sail.png");
    }
}

/**
 * class: Armor
 * author: Cameron Dunning
 * 
 * intantiates armor for player
 */
 class Armor extends Item {
    /**
     * Method: constructor
     * 
     * name of armor and amount it protects player
     */
    constructor(name, middleX, middleY, width, height) {
        super(name, middleX, middleY, width, height, 'A');
        this.defencePoints = 0;
    }

     /**
     * Method: getDefensePoints
     * 
     * gets the amount of armor it provides
     */
    getDefensePoints(){
        return this.defencePoints;
    }

     /**
     * Method: setDefensePoints
     * 
     * sets the amount of armor it has
     */
    setDefensePoints(points){
        this.defencePoints = points;
    }
}

class SmallShieldWater extends Armor
{
    /**
     * Method: constructor
     * 
     * name of armor and amount it protects player
     */
     constructor(middleX, middleY, width, height) {
        super("Water Armor",middleX, middleY, width, height);
        this.defencePoints = 1;
        this.cost = 15;
        super.setDefensePoints(this.defencePoints);
        super.setCost(this.cost);
        this.image = loadImage("assets/water_region/items/waterarmor.png");
    }
}

class SmallShieldJungle extends Armor
{
    /**
     * Method: constructor
     * 
     * name of armor and amount it protects player
     */
     constructor(middleX, middleY, width, height) {
        super("Jungle Armor",middleX, middleY, width, height);
        this.defencePoints = 3;
        this.cost = 15;
        super.setDefensePoints(this.defencePoints);
        super.setCost(this.cost);
        this.image = loadImage("assets/jungle_region/items/junglearmor.png");
    }
}

/**
 * class: SmallShield
 * author: Cameron Dunning
 * 
 * intantiates a fire small shield
 */
 class SmallShieldFire extends Armor {
    /**
     * Method: constructor
     * 
     * name of armor and amount it protects player
     */
     constructor(middleX, middleY, width, height) {
        super("Fire Armor",middleX, middleY, width, height);
        this.defencePoints = 2;
        this.cost = 15;
        super.setDefensePoints(this.defencePoints);
        super.setCost(this.cost);
        this.image = loadImage("assets/fire_region/items/firearmor.png");
    }

}

/**
 * class: Potion
 * author: Cameron Dunning
 * 
 * intantiates potion
 */
 class Potion extends Item {
    /**
     * Method: constructor
     * 
     * name of potion, amount of health and mana it provides
     */
     constructor(name, middleX, middleY, width, height) {
        super(name,middleX, middleY, width, height, 'P');
        this.healthPoints = 0;
        this.manaPoints = 0;
    }
     /**
     * Method: getHealthPoints
     * 
     * sets amount of health it provides
     */
    getHealthPoints(){
        return this.healthPoints;
    }

     /**
     * Method: setHealthPoints
     * 
     * sets amount of health potion provides
     */
    setHealthPoints(points){
        this.healthPoints = points;
    }

     /**
     * Method: getManaPoints
     * 
     * gets amount of mana it provides
     */
    getManaPoints(){
        return this.manaPoints;
    }

     /**
     * Method: setManaPoints
     * 
     * sets amount of mana potion provides
     */
    setManaPoints(points){
        this.manaPoints = points;
    }
}

/**
 * class:HealthPotion
 * author: Cameron Dunning
 * 
 * intantiates healthpotion 
 */
class HealthPotion extends Potion
{
    /**
     * method: constructor
     * 
     * constructs the health potion and loads image
     * @param {int} middleX: The initial X value 
     * @param {int} middleY: The initial Y value
     * @param {int} width: The width of the potion
     * @param {int} height: The height of the potion
     */
    constructor(middleX, middleY, width, height)
    {
        super("Health Potion",middleX, middleY, width, height);
        this.addedHealth = 5;
        this.cost = 5;
        super.setHealthPoints(this.addedHealth);
        super.setCost(this.cost);
        this.image = loadImage("assets/potions/health_potion.png");
    }
    
    getAddedHealth(){
        return this.addedHealth;
    }
}

/**
 * class: ManaPotion
 * author: Cameron Dunning
 * 
 * intantiates manapotion
 */
class ManaPotion extends Potion
{
    /**
     * method: constructor
     * 
     * constructs the health potion and loads image
     * @param {int} middleX: The initial X value 
     * @param {int} middleY: The initial Y value
     * @param {int} width: The width of the potion
     * @param {int} height: The height of the potion
     */
    constructor(middleX, middleY, width, height)
    {
        super("Mana Potion", middleX, middleY, width, height);
        this.addedMana = 5;
        this.cost = 5;
        super.setManaPoints(this.addedMana);
        super.setCost(this.cost);
        this.image = loadImage("assets/potions/mana_potion.png");
    }
    
    getAddedMana() {
        return this.addedMana;
    }
}

/**
 * class: Money
 * author: Cameron Dunning
 * 
 * instantiates money
 */

 class Money extends Item {
    /**
     * Method: constructor
     * 
     * money item
     */
     constructor(name, middleX, middleY, width, height) {
        super(name, middleX, middleY, width, height);
        this.amount = 0;
    }
     /**
     * Method: getAmount
     * 
     * gets amount of money
     */
    getAmount() {
        return this.amount;
    }

     /**
     * Method: setAmount
     * 
     * sets amount of money
     */
    setAmount(money){
        this.amount = money;
    }

    setMoneyAmount(amt) {
        this.moneyAmount = amt
    }
}

/**
 * class: Ruby
 * author: Cameron Dunning
 * 
 * intantiates ruby money
 */
 class Ruby extends Money
 {
     /**
      * method: constructor
      * 
      * constructs the health potion and loads image
      * @param {int} middleX: The initial X value 
      * @param {int} middleY: The initial Y value
      * @param {int} width: The width of the ruby
      * @param {int} height: The height of the ruby
      */
     constructor(middleX, middleY, width, height)
     {
         super("Ruby", middleX, middleY, width, height);
         this.moneyAmount = 1;
         super.setAmount(this.moneyAmount);
         this.image = loadImage("assets/money/Ruby.png");
     }
 }

 /**
 * class: Sapphire
 * author: Cameron Dunning
 * 
 * intantiates sapphire money
 */
  class Sapphire extends Money
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the sapphire
       * @param {int} height: The height of the sapphire
       */
      constructor(middleX, middleY, width, height)
      {
          super("Sapphire", middleX, middleY, width, height);
          this.moneyAmount = 5;
          super.setAmount(this.moneyAmount);
          this.image = loadImage("assets/money/Sapphire.png");
      }
  }

  /**
 * class: Emerald
 * author: Cameron Dunning
 * 
 * intantiates emerald money
 */
 class Emerald extends Money
 {
     /**
      * method: constructor
      * 
      * constructs the health potion and loads image
      * @param {int} middleX: The initial X value 
      * @param {int} middleY: The initial Y value
      * @param {int} width: The width of the emerald
      * @param {int} height: The height of the emerald
      */
     constructor(middleX, middleY, width, height)
     {
         super("Emerald", middleX, middleY, width, height);
         this.moneyAmount = 10;
         super.setAmount(this.moneyAmount);
         this.image = loadImage("assets/money/Emerald.png");
     }
 }

/**
 * class: Weapon
 * author: Cameron Dunning
 * 
 * intantiates weapon
 */
 class Weapon extends Item {
    /**
     * Method: constructor
     * 
     * name of weapon, damage and amount of mana it costs to use
     */
     constructor(name, image, middleX, middleY, width, height, damage = 0, range = 0, cost = 0, projectileImage = [], projectileWidth = 10, projectileHeight = 10, manaCost = 0) {
        super(name, middleX, middleY, width, height, 'W');
        this.image = image;
        this.damage = damage;
        this.range = range;
        this.cost = cost;
        this.manaCost = manaCost;
        this.projectileImage = projectileImage;
        this.projectileWidth = projectileWidth;
        this.projectileHeight = projectileHeight;
    }

     /**
     * Method: getDamage
     * 
     * gets damage item outputs
     */
    getDamage(){
        return this.damage;
    }

     /**
     * Method: setDamage
     * 
     * sets damage the weapon outputs
     */
    setDamage(damage){
        this.damage = damage;
    }


     /**
     * Method: getManaCost
     * 
     * gets the amount of mana or energy weapon needs
     */
    
    getManaCost(){
        return this.manaCost;
    }

     /**
     * Method: setManaCost
     * 
     * sets amount of mana or energy weapon needs
     */
    setManaCost(mana){
        this.manaCost = mana;
    }

    setRange(range) {
        this.range = range;
    }

    getRange() {
        return this.range;
    }

    getProjectile(startPos, targetPos) {
        return new Projectile(this.projectileImage, startPos, targetPos, this.projectileWidth, this.projectileHeight, this.damage, this.range)
    }
}

/**
* class: Fists
* author: Cameron Dunning
* 
* intantiates bow
*/
 class Fists extends Weapon
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
     constructor(middleX, middleY, width, height, damage)
     {
       let name = "Fists";
       let image = loadImage("assets/central_region/weapons/fists.png");
       let range = MELEE_RANGE;
       let cost = 0;
       let projectileImage = null;
       let projectileWidth = 10;
       let projectileHeight = 10;
       super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
     }
 }

 /**
 * class: bow
 * author: Cameron Dunning
 * 
 * intantiates bow
 */
  class FireBow extends Weapon
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
        let name = "Bow";
        let image = image_weapon_fireBow;
        let damage = 3;
        let range = 5;
        let cost = 10;
        let projectileImage = image_projectile_arrow;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class Bow extends Weapon
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
        let name = "Bow";
        let image = image_weapon_fireBow;
        let damage = 6;
        let range = 5;
        let cost = 10;
        let projectileImage = image_projectile_arrow;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class WaterBow extends Weapon
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
        let name = "Bow";
        let image = loadImage("assets/water_region/items/waterbow.png");
        let damage = 3;
        let range = 5;
        let cost = 10;
        let projectileImage = loadImage("assets/projectiles/projectile_water_arrow.png");
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class JungleBow extends Weapon
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
        let name = "Bow";
        let image = loadImage("assets/jungle_region/items/junglebow.png");
        let damage = 9;
        let range = 5;
        let cost = 10;
        let projectileImage = loadImage("assets/projectiles/projectile_jungle_arrow.png");
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

 /**
 * class: crossbow
 * author: Cameron Dunning
 * 
 * intantiates bow
 */
  class WaterCrossbow extends Weapon
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
          let name = "Crossbow";
          let image = loadImage("assets/water_region/items/watercrossbow.png");
          let damage = 2;
          let range = 8;
          let cost = 20;
          let projectileImage = loadImage("assets/projectiles/projectile_water_arrow.png");
          let projectileWidth = 25;
          let projectileHeight = 10;
          super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }
  class JungleCrossbow extends Weapon
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
          let name = "Crossbow";
          let image = loadImage("assets/jungle_region/items/junglerossbow.png");
          let damage = 4;
          let range = 8;
          let cost = 20;
          let projectileImage = loadImage("assets/projectiles/projectile_jungle_arrow.png");
          let projectileWidth = 25;
          let projectileHeight = 10;
          super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  /**
 * class: crossbow
 * author: Cameron Dunning
 * 
 * intantiates bow
 */
   class FireCrossbow extends Weapon
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
           let name = "Crossbow";
           let image = loadImage("assets/fire_region/items/firecrossbow.png");
           let damage = 3;
           let range = 8;
           let cost = 20;
           let projectileImage = loadImage("assets/projectiles/projectile_fire_arrow.png");
           let projectileWidth = 25;
           let projectileHeight = 10;
           super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
       }
   }

  
 /**
 * class: hammer
 * author: Cameron Dunning
 * 
 * intantiates hammer
 */
  class FireHammer extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the hammer
       * @param {int} height: The height of the hammer
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Hammer"
        let image = loadImage("assets/fire_region/items/firehammer.png");
        let damage = 10;
        let range = MELEE_RANGE;
        let cost = 25;
        let projectileImage = null;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class WaterHammer extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the hammer
       * @param {int} height: The height of the hammer
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Hammer"
        let image = loadImage("assets/water_region/items/waterhammer.png");
        let damage = 7;
        let range = MELEE_RANGE;
        let cost = 25;
        let projectileImage = null;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class JungleHammer extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the hammer
       * @param {int} height: The height of the hammer
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Hammer"
        let image = loadImage("assets/jungle_region/items/junglehammer.png");
        let damage = 13;
        let range = MELEE_RANGE;
        let cost = 25;
        let projectileImage = null;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }
  
 /**
 * class: Staff
 * author: Cameron Dunning
 * 
 * intantiates staff
 */
  class FireStaff extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the staff
       * @param {int} height: The height of the staff
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Staff"
        let image = loadImage("assets/fire_region/items/firestaff.png");
        let damage = 5;
        let range = 4.75;
        let cost = 15;
        let projectileImage = image_projectile_arrow;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class WaterStaff extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the staff
       * @param {int} height: The height of the staff
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Staff"
        let image = loadImage("assets/water_region/items/waterstaff.png");
        let damage = 3;
        let range = 4.75;
        let cost = 15;
        let projectileImage = image_projectile_magic_missile;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class JungleStaff extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the staff
       * @param {int} height: The height of the staff
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Staff"
        let image = loadImage("assets/jungle_region/items/junglestaff.png");
        let damage = 8;
        let range = 4.75;
        let cost = 15;
        let projectileImage = image_projectile_arrow;
        let projectileWidth = 20;
        let projectileHeight = 5;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  
 /**
 * class: Wand
 * author: Cameron Dunning
 * 
 * intantiates wand
 */
  class FireWand extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the wand
       * @param {int} height: The height of the wand
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Wand"
        let image = image_weapon_fireWand;
        let damage = 7;
        let range = 3;
        let cost = 5;
        let projectileImage = image_projectile_magic_missile;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class WaterWand extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the wand
       * @param {int} height: The height of the wand
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Wand"
        let image = loadImage("assets/water_region/items/waterwand.png");
        let damage = 4;
        let range = 3;
        let cost = 5;
        let projectileImage = image_projectile_magic_missile;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  class JungleWand extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the wand
       * @param {int} height: The height of the wand
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Wand"
        let image = loadImage("assets/jungle_region/items/junglewand.png");
        let damage = 10;
        let range = 3;
        let cost = 5;
        let projectileImage = image_projectile_magic_missile;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }

  
 /**
 * class: Sword
 * author: Cameron Dunning
 * 
 * intantiates sword
 */
  class FireSword extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the sword
       * @param {int} height: The height of the sword
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Sword"
        let image = image_weapon_fireSword;
        let damage = 7;
        let range = 2;
        let cost = 10;
        let projectileImage = null;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  } 
 
  class WaterSword extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the sword
       * @param {int} height: The height of the sword
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Sword"
        let image = loadImage("assets/water_region/items/watersword.png");
        let damage = 5;
        let range = 2;
        let cost = 10;
        let projectileImage = null;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  } 
 
  class JungleSword extends Weapon
  {
      /**
       * method: constructor
       * 
       * constructs the health potion and loads image
       * @param {int} middleX: The initial X value 
       * @param {int} middleY: The initial Y value
       * @param {int} width: The width of the sword
       * @param {int} height: The height of the sword
       */
      constructor(middleX, middleY, width, height)
      {
        let name = "Sword"
        let image = loadImage("assets/jungle_region/items/junglesword.png");
        let damage = 9;
        let range = 2;
        let cost = 10;
        let projectileImage = null;
        let projectileWidth = 10;
        let projectileHeight = 10;
        super(name, image, middleX, middleY, width, height, damage, range, cost, projectileImage, projectileWidth, projectileHeight);
      }
  }