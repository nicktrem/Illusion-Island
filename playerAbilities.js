
/**
 * class: Ability
 * 
 * An ability which the player can use as an attack
 * These abilities use up the player's points
 */
class Ability extends Weapon
{
    /**
     * method: constructor
     * 
     * Constructs a new ability for the player to use
     * @param {int} pointsRequired: The amount of mana points required to use the ability
     * @param {int} attackPoints: The attack points inflected by the ability
     * @param {image} projectileImage: The image of the projectile
     * @param {int} projectileWidth: The Width of the projectile
     * @param {int} projectileHeight: The Height of the projectile
     */
    constructor(name, image, pointsRequired, range, attackPoints, projectileImage = null, projectileWidth = 10, projectileHeight = 10)
    {
        super(name, image, 0, 0, 0, 0, attackPoints, range, pointsRequired, projectileImage, projectileWidth, projectileHeight, pointsRequired);
        this.pointsRequired = pointsRequired;
    }

    /**
     * method: IsAbleToUse
     * 
     * Checks to see if the player is able to use
     * this ability
     * @param {int} pointsRemaining: The amount of points
     * remaining by the player
     * @returns: if the player is able to use this ability
     */
    IsAbleToUse(pointsRemaining)
    {
        return pointsRemaining >= this.pointsRequired;
    }

    /**
     * method: GetPointsRequired
     * 
     * gets if the player is able to use this ability
     * @returns: the points required to use this ability
     */
    GetPointsRequired()
    {
        return this.pointsRequired;
    }
}

/**
 * class: MagicMissle
 * An ability which certain player
 * specialties can use to attack
 */
class MagicMissile extends Ability
{
    /**
     * method: contrustor
     * 
     * Constructs a new Magic Missle Ability and holds
     * The point values for this ability
     */
    constructor()
    {
        super("Magic Missle", image_magic_missile, 2, 15, 5, image_magic_missile, 10, 10);
        //^ (points Required, Attack Points)
    }
}

/**
 * class: FireBall
 * An ability which certain player
 * specialties can use to attack
 */
class FireBall extends Ability
{
    /**
     * method: contrustor
     * 
     * Constructs a new Fire Ball Ability and holds
     * The point values for this ability
     */
    constructor()
    {
        super("Fireball", image_fireball, 4, 10, 8, image_fireball, 10, 10);
        //^ (points Required, Attack Points)
    }
}

/**
 * class: IceShard
 * An ability which certain player
 * specialties can use to attack
 */
class IceShard extends Ability
{
    /**
     * method: contrustor
     * 
     * Constructs a new Fire Ball Ability and holds
     * The point values for this ability
     */
    constructor()
    {
        super("Ice Shard", image_ice_shard, 3, 15, 6, image_ice_shard, 10, 10);
        //^ (points Required, Attack Points)
    }
}

/**
 * class: Tackle
 * An ability which certain player
 * specialties can use to attack
 */
class Tackle extends Ability
{
    /**
     * method: contrustor
     * 
     * Constructs a new Tackle Ability and holds
     * The point values for this ability
     */
    constructor()
    {
        super("Tackle", image_tackle, 5, MELEE_RANGE, 10);
        //^ (points Required, Attack Points)
    }
}

/**
 * class: HeavySlam
 * An ability which certain player
 * specialties can use to attack
 */
class HeavySlam extends Ability
{
    /**
     * method: contrustor
     * 
     * Constructs a new Heavy Slam Ability and holds
     * The point values for this ability
     */
    constructor()
    {
        super("Heavy Slam", image_heavy_slam, 4, MELEE_RANGE, 7);
        //^ (points Required, Attack Points)
    }
}

/**
 * class: RushAttack
 * An ability which certain player
 * specialties can use to attack
 */
class RushAttack extends Ability
{
    /**
     * method: contrustor
     * 
     * Constructs a new Rush Attack Ability and holds
     * The point values for this ability
     */
    constructor()
    {
        super("Rush Attack", image_rush_attack, 2, MELEE_RANGE, 5);
        //^ (points Required, Attack Points)
    }
}

/**
 * class: Projectile
 * 
 * Holds all of the necessary components needs for a projectile to travel
 * This class is ment to be further extended for more specific projectiles
 * (such as arrows, magic orbs, etc.)
 */
class Projectile
{
    /**
     * method: Conctructor
     * 
     * Constructs a projectile to be used in the game
     * @param {int} startPos: Vector of where the projectile originates from
     * @param {int} targetPos: Vector of where the projectile is traveling to
     * @param {int} width: The width of the projectile
     * @param {int} height: The height of the projectile
     * @param {int} damageValue: The amount of damage the projectile does if it hits
     * the player or an NPC
     */
    constructor(image, startPos, targetPos, width, height, damageValue = 0, range = 0)
    {
        this.image = image;
        this.startPosition = startPos.copy();
        this.targetPosition = targetPos.copy();

        this.dirVec = p5.Vector.sub(this.targetPosition, this.startPosition).normalize();
        this.angleOfTravel = this.dirVec.heading()
        
        this.currentPosition = startPos.copy();

        this.width = width;
        this.height = height;
        
        this.damageValue = damageValue;
        this.rangeSq = pow(range, 2);
    }

    /**
     * method: getX
     * 
     * Gets the current X-coordinate of the projectile
     * @returns: The current X-coordinate of the projectile
     */
    getX()
    {
        return this.currentPosition.x;
    }

    /**
     * method: getY
     * 
     * Gets the current Y-coordinate of the projectile
     * @returns: The current Y-coordinate of the projectile
     */
    getY()
    {
        return this.currentPosition.y;
    }

    /**
     * 
     * @returns Position of top right corner
     */
    getPosition() {
        return this.currentPosition.copy().sub(createVector(15, 15));
    }

    /**
     * method: getWidth
     * 
     * Gets the width of the projectile
     * @returns: The width of the projectile
     */
    getWidth()
    {
        return this.width;
    }

    /**
     * method: getHeight
     * 
     * Gets the height of the projectile
     * @returns: The height of the projectile
     */
    getHeight()
    {
        return this.height;
    }

    /**
     * method: getAngle
     * 
     * Gets the angle in which the projectile is traveling
     * @returns: the angle in which the projectile is traveling
     */
    getAngle()
    {
        return this.angleOfTravel;
    }

    /**
     * method: getDamageValue
     * 
     * Gets the damage value of this projectile
     * @returns: The damage value of this projectile
     */
    getDamageValue()
    {
        return this.damageValue;
    }

    /**
     * method: isDead
     * 
     * Tests if projectile is beyond range
     * @returns: The damage value of this projectile
     */
    isDead(pixelDim)
    {
        return p5.Vector.sub(this.startPosition, this.currentPosition).div(pixelDim).magSq() >= this.rangeSq;
    }

    /**
     * method: move
     * 
     * Moves the projectile furthur along its trajectory
     * @param {int} pixels: The number of pixels to move it
     */
    move(pixels)
    {
        this.currentPosition.add(p5.Vector.mult(this.dirVec, pixels))
    }

    /**
     * method: draw
     * 
     * draws the arrow moving across the screen
     * NOTE: This uses a rotation matrix to draw it on the map
     */
    draw()
    {
        if (this.image != null) {
            push();

            noStroke();
            angleMode(DEGREES)
            translate(this.getX(), this.getY())
            rotate(this.getAngle() + 180);
            image(this.image, -this.width/2, -this.height/2, this.width, this.height);
    
            pop();
        }
    }
}

/**
 * class: Arrow
 * 
 * An arrow projectile which can be fired by the user
 */
class Arrow extends Projectile
{
    /**
     * method: Conctructor
     * 
     * Constructs a projectile to be used in the game
     * @param {int} startX: The X-coordinate of where the projectile originates from
     * @param {int} startY: The Y-coordinate of where the projectile originiates from
     * @param {int} targetX: The X-coordinate of where the projectile is traveling too
     * @param {int} targetY: The Y-coordinate of where the projectile is traveling too
     * @param {int} width: The width of the projectile
     * @param {int} height: The height of the projectile
     */
    constructor(startPos, targetPos, scaleFactor, damage = 3, range = 5)
    {
        super(startPos, targetPos, 10 * scaleFactor, 5 * scaleFactor, damage, range);
        // The 3 is the damage value of an arrow

        this.image = loadImage("assets/projectiles/projectile_arrow.png");
    }

    /**
     * method: draw
     * 
     * draws the arrow moving across the screen
     * NOTE: This uses a rotation matrix to draw it on the map
     */
    draw()
    {
        push();
        noStroke();

        // rotation matrix
        var x = this.getX()*cos(this.getAngle() * -1) - this.getY()*sin(this.getAngle() * -1);
        var y = this.getX()*sin(this.getAngle() * -1) + this.getY()*cos(this.getAngle() * -1);
        rotate(this.getAngle());
        image(this.image, x, y, this.getWidth(), this.getHeight());

        pop();
    }
}

/**
 * class: MagicOrb
 * 
 * A magic orb projectile which moves across the screen
 */
class MagicOrb extends Projectile
{
    /**
     * method: Conctructor
     * 
     * Constructs a projectile to be used in the game
     * @param {int} startX: The X-coordinate of where the projectile originates from
     * @param {int} startY: The Y-coordinate of where the projectile originiates from
     * @param {int} targetX: The X-coordinate of where the projectile is traveling too
     * @param {int} targetY: The Y-coordinate of where the projectile is traveling too
     * @param {int} width: The width of the projectile
     * @param {int} height: The height of the projectile
     */
    constructor(startPos, targetPos, scaleFactor, damage = 4, range = 3)
    {
        super(startPos, targetPos, 10 * scaleFactor, 10 * scaleFactor, damage, range);
        // The 4 is the damage value of the magic orb

        this.image = loadImage("assets/projectiles/projectile_magicorb.png");
    }

    /**
     * method: draw
     * 
     * draws the magic orb moving across the screen
     * NOTE: This uses a rotation matrix to draw it on the map
     */
    draw()
    {
        push();
        noStroke();

        // rotation matrix
        var x = this.getX()*cos(this.getAngle() * -1) - this.getY()*sin(this.getAngle() * -1);
        var y = this.getX()*sin(this.getAngle() * -1) + this.getY()*cos(this.getAngle() * -1);
        rotate(this.getAngle());
        image(this.image, x, y, this.getWidth(), this.getHeight());

        pop();
    }
}

/**
 * class: SwordStab
 * 
 * A sword "projectile" which moves across the screen
 */
class SwordStab extends Projectile {
    /**
     * method: Conctructor
     * 
     * Constructs a projectile to be used in the game
     * @param {int} startX: The X-coordinate of where the projectile originates from
     * @param {int} startY: The Y-coordinate of where the projectile originiates from
     * @param {int} targetX: The X-coordinate of where the projectile is traveling too
     * @param {int} targetY: The Y-coordinate of where the projectile is traveling too
     * @param {int} width: The width of the projectile
     * @param {int} height: The height of the projectile
     */
    constructor(startPos, targetPos, scaleFactor)
    {
        super(startPos, targetPos, 10 * scaleFactor, 5 * scaleFactor, 10);
    }

    /**
     * method: draw
     * 
     * draws the magic orb moving across the screen
     * NOTE: This uses a rotation matrix to draw it on the map
     */
    draw()
    {
        push();
        noStroke();

        // rotation matrix
        var x = this.getX()*cos(this.getAngle() * -1) - this.getY()*sin(this.getAngle() * -1);
        var y = this.getX()*sin(this.getAngle() * -1) + this.getY()*cos(this.getAngle() * -1);
        rotate(this.getAngle());
        pop();
    }
}

/**
 * class: WebProjectile
 * 
 * A sword "projectile" which moves across the screen
 */
class WebProjectile extends Projectile {
    /**
     * method: Conctructor
     * 
     * Constructs a projectile to be used in the game
     * @param {int} startX: The X-coordinate of where the projectile originates from
     * @param {int} startY: The Y-coordinate of where the projectile originiates from
     * @param {int} targetX: The X-coordinate of where the projectile is traveling too
     * @param {int} targetY: The Y-coordinate of where the projectile is traveling too
     * @param {int} width: The width of the projectile
     * @param {int} height: The height of the projectile
     */
    constructor(startPos, targetPos, scaleFactor)
    {
        super(startPos, targetPos, 10 * scaleFactor, 5 * scaleFactor, 10);

        this.image = image_spider_web
    }

    /**
     * method: draw
     * 
     * draws the magic orb moving across the screen
     * NOTE: This uses a rotation matrix to draw it on the map
     */
    draw()
    {
        push();
        noStroke();

        // rotation matrix
        var x = this.getX()*cos(this.getAngle() * -1) - this.getY()*sin(this.getAngle() * -1);
        var y = this.getX()*sin(this.getAngle() * -1) + this.getY()*cos(this.getAngle() * -1);
        rotate(this.getAngle());
        fill(125)
        rect(x, y, this.getWidth(), this.getHeight());
        image(this.image, x, y, this.getWidth(), this.getHeight());
        pop();
    }
}