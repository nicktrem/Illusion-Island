let gameManager;
let globalScaleFactor = 1;
let font_adventure;
let font_noContinue;
let keyArray = [];
const MELEE_RANGE = 1.45;

/* Colors */
let color_theme = [[32, 0, 61], [60, 9, 108], [123, 44, 191], [169, 101, 226], [199, 125, 255]];
let color_black = [0, 0, 0];
let color_skyBlue = [175, 246, 255];

/* Images */
let image_button;

let image_knight;
let image_ranger;
let image_wizard;

let image_coin;
let image_emerald;
let image_sapphire;
let image_ruby;

let image_heathPotion;
let image_manaPotion;

let image_skeleton;
let image_zombie;

function preload() {
  font_adventure = loadFont('assets/fonts/Adventure.otf');
  font_noContinue = loadFont('assets/fonts/No Continue.ttf');

  /* Animation */
  ani_ocean = loadImage("assets/opening_animation/ocean.png");
  ani_cloud = loadImage("assets/opening_animation/cloud.png");
  ani_island = loadImage("assets/opening_animation/island.png");
  ani_eyes = loadImage("assets/opening_animation/eyes.png");
  ani_ship = loadImage("assets/opening_animation/ship.png");
  ani_ship_dark = loadImage("assets/opening_animation/ship_dark.png");

  image_button = loadImage("button.png")

  /* Player images */
  image_knight = loadImage("assets/player_classes/soldier.png");
  image_ranger = loadImage("assets/player_classes/ranger.png");
  image_wizard = loadImage("assets/player_classes/wizard.png");

  /* Ability images */
  image_magic_missile = loadImage("assets/projectiles/projectile_magic_missile.png");
  image_ice_shard = loadImage("assets/projectiles/projectile_ice_shard.png");
  image_fireball = loadImage("assets/projectiles/projectile_fireball.png");
  image_tackle = loadImage("assets/projectiles/projectile_tackle.png");
  image_rush_attack = loadImage("assets/projectiles/projectile_rush_attack.png");
  image_heavy_slam = loadImage("assets/projectiles/projectile_heavy_slam.png");

  image_coin = loadImage("assets/HUD/coin.png");
  image_emerald = loadImage("assets/money/Emerald.png");
  image_sapphire = loadImage("assets/money/Sapphire.png");
  image_ruby = loadImage("assets/money/Ruby.png");

  image_heathPotion = loadImage("assets/potions/health_potion.png");
  image_manaPotion = loadImage("assets/potions/mana_potion.png");
  
  image_skeleton = loadImage("assets/central_region/enemies/skeleton.png")
  image_zombie = loadImage("assets/central_region/enemies/zombie.png");
  image_water_golem = loadImage("assets/water_region/enemies/water_golem.png");


  image_palmtree_left = loadImage("assets/tiles/palmtree_reversed.png");
  image_palmtree_left_coconuts = loadImage("assets/tiles/palmtree_reversed_coconuts.png");
  image_palmtree_right = loadImage("assets/tiles/palmtree.png");
  image_palmtree_right = loadImage("assets/tiles/palmtree_coconuts.png");

  image_sand = loadImage("assets/tiles/sand_light.png");
  image_sand_dark = loadImage("assets/tiles/sand_dark.png");
  image_sand_waves = loadImage("assets/tiles/sand_piles.png");
  image_sand_stone = loadImage("assets/tiles/sand_stone.png");

  image_ocean_border = loadImage("assets/tiles/ocean_border.png");
  image_ocean_border_flipped = loadImage("assets/tiles/ocean_border_flipped.png");
  image_ocean_border_left = loadImage("assets/tiles/ocean_border_left.png");
  image_ocean_border_right = loadImage("assets/tiles/ocean_border_right.png");
  image_ocean_border_top_left = loadImage("assets/tiles/ocean_border_top_left_corner.png");
  image_ocean_border_top_right = loadImage("assets/tiles/ocean_border_top_right_corner.png");
  image_ocean_border_bottom_left = loadImage("assets/tiles/ocean_border_bottom_left_corner.png");
  image_ocean_border_bottom_right = loadImage("assets/tiles/ocean_border_bottom_right_corner.png");
  image_ocean_water_border_top_left = loadImage("assets/tiles/ocean_water_border_top_left_corner.png");
  image_ocean_water_border_top_right = loadImage("assets/tiles/ocean_water_border_top_right_corner.png");
  image_ocean_water_border_bottom_left = loadImage("assets/tiles/ocean_water_border_bottom_left_corner.png");
  image_ocean_water_border_bottom_right = loadImage("assets/tiles/ocean_water_border_bottom_right_corner.png");

  image_ocean_corner = loadImage("assets/tiles/ocean_corner.png");
  image_ocean_corner_flipped = loadImage("assets/tiles/ocean_corner_flipped.png");
  image_ocean_corner_right = loadImage("assets/tiles/ocean_corner_right.png");
  image_ocean_corner_left = loadImage("assets/tiles/ocean_corner_left.png");
  image_water = loadImage("assets/tiles/water.png");

  image_water_stone = loadImage("assets/tiles/water_stone.png");
  image_dungeon_stone = loadImage("assets/tiles/dungeon_stone_1.png")
  /* Water Enemies */
  image_water_dungeon_assasin = loadImage("assets/water_region/enemies/temple_assasin.png");
  image_water_dungeon_archer = loadImage("assets/water_region/enemies/temple_archer.png");
  image_water_crab = loadImage("assets/water_region/enemies/crab.png");
  image_water_seagull = loadImage("assets/water_region/enemies/seagull.png")
  image_water_walking_fish = loadImage("assets/water_region/enemies/walking_fish.png");

  /* Jungle Tiles */
  image_jungle_floor_1 = loadImage("assets/tiles/jungle_floor_1.png");
  image_jungle_floor_2 = loadImage("assets/tiles/jungle_floor_2.png");
  image_jungle_floor_3 = loadImage("assets/tiles/jungle_floor_3.png");
  image_jungle_floor_4 = loadImage("assets/tiles/jungle_floor_4.png");
  image_jungle_tree = loadImage("assets/tiles/jungle_tree.png");
  image_jungle_dirt_path = loadImage("assets/tiles/jungle_dirt_path.png");
  image_jungle_stone_wall_1 = loadImage("assets/tiles/jungle_stone_wall_1.png");

  /* Jungle Enemies */
  image_spider = loadImage("assets/jungle_region/enemies/spider.png")
  image_ranged_spider = loadImage("assets/jungle_region/enemies/beefy_spider.png")
  image_spider_web = loadImage("assets/jungle_region/enemies/spider_web.png")
  image_gorilla = loadImage("assets/jungle_region/enemies/gorrila.png")
  image_monkey = loadImage("assets/jungle_region/enemies/monkey.png")
  image_banana = loadImage("assets/projectiles/projectile_banana.png")
  image_temple_assasin = loadImage("assets/jungle_region/enemies/temple_assasin.png")
  image_temple_archer = loadImage("assets/jungle_region/enemies/temple_archer.png")

  image_heart_full = loadImage("assets/HUD/heart_full.png");
  image_heart_three_quarters = loadImage("assets/HUD/heart_3-4.png");
  image_heart_half = loadImage("assets/HUD/heart_half.png");
  image_heart_one_quarter = loadImage("assets/HUD/heart_1-4.png");
  image_heart_empty = loadImage("assets/HUD/heart_empty.png");

  image_mana_full = loadImage("assets/HUD/mana_full.png");
  image_mana_three_quarters = loadImage("assets/HUD/mana_3-4.png");
  image_mana_half = loadImage("assets/HUD/mana_half.png");
  image_mana_one_quarter = loadImage("assets/HUD/mana_1-4.png");
  image_mana_empty = loadImage("assets/HUD/mana_empty.png");
  image_hud = loadImage("assets/HUD/HUD.png");
  image_playerHud = loadImage("assets/HUD/playerHud.png");
  image_abilityHud = loadImage("assets/HUD/AbilityHud.png");
  image_loseTitle = loadImage("assets/HUD/LoseHud.png");
  image_winTitle = loadImage("assets/HUD/WinHud.png");
  //image_loseBody = loadImage("assets/HUD/endGameBody.png");


  image_weapon_fireBow = loadImage("assets/fire_region/items/firebow.png");
  image_weapon_fireWand = loadImage("assets/fire_region/items/firewand.png");
  image_weapon_fireSword = loadImage("assets/fire_region/items/firesword.png");

  image_projectile_swordStab = image_weapon_fireSword; // Temporary asset misuse
  image_projectile_arrow = loadImage("assets/projectiles/projectile_arrow.png");
  image_projectile_jungle_arrow = loadImage("assets/projectiles/projectile_jungle_arrow.png");
  image_projectile_fire_arrow = loadImage("assets/projectiles/projectile_fire_arrow.png");
  image_projectile_water_arrow = loadImage("assets/projectiles/projectile_water_arrow.png");
  image_projectile_magic_missile = loadImage("assets/projectiles/projectile_magic_missile.png");
  image_projectile_fireball = loadImage("assets/projectiles/projectile_fireball.png")
  image_projectile_iceshard = loadImage("assets/projectiles/projectile_ice_shard.png");

  image_lava_wall = loadImage("assets/tiles/lava.png");
  image_lava_block = loadImage("assets/tiles/lava_block2.png");
  image_lava_stones = loadImage("assets/tiles/lava_block.png");
  image_lava_rocks = loadImage("assets/tiles/lava_block3.png");

  image_fire_golem = loadImage("assets/fire_region/enemies/fire_golem.png");
  image_dragon = loadImage("assets/fire_region/enemies/BabyRedDragon.png");
  image_fireAssasin = loadImage("assets/fire_region/enemies/fire_assasin.png");
  image_fireBalls = loadImage("assets/fire_region/enemies/fireballs.png");

}

function setup() {

  gameManager = new Manager();
}

function draw() {
  gameManager.update();
  gameManager.draw();
}

/**
 * class: Manager
 * author: Max Stelmack
 * 
 * Responsible for controlling all of the game's software components. Variables that should be known to all game components but should not necessarily de global variable ought to be made fields of this class.
 */
class Manager {
  constructor() {
  this.canvasDim = 600;
  this.hudWidth = 150; // Minimum size: 150
  globalScaleFactor = this.canvasDim/600;
  this.numGridSteps = 20;
  this.mouseState = [0, createVector(0, 0)];
  this.gridPixelDim = this.canvasDim/this.numGridSteps;
  this.gameObj;
  this.playerSpecString = 'S'

  this.stateList = [new OpeningAnimationState(this),
    new MenuState(this),
    new InstructionsState(this),
    new PlayState(this),
    new LoseState(this),
    new WinState(this)];
  this.stateIndex = 0;

  createCanvas(this.canvasDim + this.hudWidth, this.canvasDim);
  }

  setClickState(state) {
    this.mouseState[0] = state;
  }

  update() {
    this.mouseState[1].x = mouseX;
    this.mouseState[1].y = mouseY;
    let oldIndex = this.stateIndex;

    this.stateIndex = this.stateList[this.stateIndex].update(this);

    if (oldIndex != this.stateIndex) {
      this.stateList[this.stateIndex].refresh(this);
    }

    this.mouseState[0] = 0;
  }

  draw() {
    this.stateList[this.stateIndex].draw(this);
  }
}

class ManagerState {
  constructor(me) {}

  update(me) {

  }

  draw(me) {

  }

  refresh() {

  }
}

class OpeningAnimationState extends ManagerState {
  constructor(me) {
    super(me);
    let duration = 12
    this.numFrames = round(duration * 60, 0)
    this.keyFrames = [round(this.numFrames/3, 0), round(4*this.numFrames/5, 0)]
    this.flashes = [new screenFlash(1, this.keyFrames[0]), new screenFlash(1, this.keyFrames[1])]
    this.shipCoords = [createVector(500, 300), createVector(300, 300), createVector(300, 450)]
    this.cloudCoords = [createVector(-1000, 75), createVector(125, 75)];
  }

  update(me) {
    if (frameCount > this.numFrames || keyArray[81]) {
      return 1;
    }
    return 0;
  }

  draw(me) {
    let ship_img;
    let shipCoords;
    let cloudCoord;

    cloudCoord = this.cloudCoords[1].copy();
    if (frameCount < this.keyFrames[0]) {
      cloudCoord = this.cloudCoords[0].copy();
      cloudCoord.lerp(this.cloudCoords[1], frameCount/this.keyFrames[0]);
      shipCoords = this.shipCoords[0].copy();
      shipCoords.lerp(this.shipCoords[1], frameCount/this.keyFrames[0]);
      background(color_skyBlue);
      ship_img = ani_ship;
    } else if (frameCount < this.keyFrames[1]) {
      shipCoords = this.shipCoords[1].copy();
      shipCoords.lerp(this.shipCoords[2], (frameCount-this.keyFrames[0])/(this.keyFrames[1]-this.keyFrames[0]));
      background(150);
      ship_img = ani_ship_dark;
    } else {
      shipCoords = this.shipCoords[2].copy();
      background(150);
      ship_img = ani_ship_dark;
    }

    image(ani_ocean, 0, 0);

    image(ani_cloud, cloudCoord.x, cloudCoord.y)

    // draw ship
    push()
    translate(shipCoords)
    image(ship_img, 0, 0);
    pop()

    if (frameCount >= this.keyFrames[0]) {
      image(ani_island, 0, 0);
    }

    if (frameCount >= this.keyFrames[1]) {
      image(ani_eyes, 0, 0)
    }

    for (let i = 0; i < this.flashes.length; i++) {
      this.flashes[i].draw()
    }

    stroke(0);
    fill(255);
    textAlign(RIGHT, BOTTOM);
    textSize(20);
    textFont(font_noContinue);
    text("Press Q to skip", 740, 590);
  }
}

class screenFlash {
  constructor(duration, startFrame) {
    this.startFrame = startFrame;
    this.numFrames = round(duration * 60, 0);
    this.startingColor = color(255, 255, 255, 255);
    this.endingColor = color(255, 255, 255, 0);
  }

  draw() {
    if (frameCount >= this.startFrame && frameCount <= this.startFrame + this.numFrames) {
      push();
      fill(lerpColor(this.startingColor, this.endingColor, (frameCount - this.startFrame)/this.numFrames));
      noStroke();
      rect(0, 0, 750, 600);
      pop();
    }
  }
}

class MenuState extends ManagerState {
  constructor(me) {
    super(me);
    this.mouseState;

    // Side Margin params
    let sideMargin = 5;
    this.marginRectDims = [me.canvasDim, 0, me.hudWidth, me.canvasDim];

    // Title text params
    this.titleTextDims = [me.canvasDim/2, 1.5 * me.gridPixelDim, 60];

    // Specialty text params
    this.specialtyTextDims = [me.canvasDim + me.hudWidth/2, 2 * me.gridPixelDim, globalScaleFactor * 25];

    // Creator text params
    this.creatorTextDims = [me.canvasDim + me.hudWidth/2, 16 * me.gridPixelDim, globalScaleFactor * 20];

    // Nav button params
    let buttonWidth = 4 * me.gridPixelDim;
    let buttonHeight = 2 * me.gridPixelDim;
    let buttonMargin = 0.5 * me.gridPixelDim;
    let buttonStartHeight = 8 * me.gridPixelDim;
    let buttonTextSize = 38;
    this.playButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2, buttonStartHeight+2*(buttonHeight+buttonMargin)), createVector(buttonWidth, buttonHeight), image_button, "Play", buttonTextSize);
    this.helpButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2, buttonStartHeight+buttonHeight+buttonMargin), createVector(buttonWidth, buttonHeight), image_button, "Help", buttonTextSize);

    // Specialty button params
    buttonWidth = 3 * me.gridPixelDim;
    buttonHeight = 1.5 * me.gridPixelDim;
    buttonTextSize = 23;
    buttonStartHeight = 4 * me.gridPixelDim;
    this.knightButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2, buttonStartHeight), createVector(buttonWidth, buttonHeight), image_button, "Knight", buttonTextSize);
    this.rangerButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2, buttonStartHeight + (buttonHeight+buttonMargin)), createVector(buttonWidth, buttonHeight), image_button, "Ranger", buttonTextSize);
    this.wizardButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2, buttonStartHeight + 2*(buttonHeight+buttonMargin)), createVector(buttonWidth, buttonHeight), image_button, "Wizard", buttonTextSize);

    // Background image params
    this.bg = loadImage("IllusionIsland.png");
    this.bgDims = [0, 0, me.canvasDim, me.canvasDim];

    // Grass params
    this.grasses = [];
    for (let i = 0; i < 90; i++) {
      this.grasses.push(new Grass(random(15, 16.5) * me.gridPixelDim, random(11, 13.2) * me.gridPixelDim, random(0.4, 0.7)));
    }
    for (let i = 0; i < 90; i++) {
      this.grasses.push(new Grass(random(18.5, 20) * me.gridPixelDim, random(11, 13.2) * me.gridPixelDim, random(0.4, 0.7)));
    }

    // Wave params
    let numWavePoints = 80;
    this.waveWidth = me.canvasDim;
    let waveStep = this.waveWidth/(numWavePoints-1);
    this.waterlineY = me.gridPixelDim * (me.numGridSteps - 1);
    this.wavePoints = [];

    for (let i = 0; i < numWavePoints; i++) {
      this.wavePoints.push(createVector(i * waveStep, this.waterlineY));
    }

    // Player params
    this.playerImage = image_knight;
    this.playerWanderLimits = [me.gridPixelDim, me.gridPixelDim * (me.numGridSteps - sideMargin - 2)];
    this.playerPos = createVector(this.playerWanderLimits[0], me.gridPixelDim * (me.numGridSteps - 4.5));
    this.playerTargetPos = createVector(random(this.playerWanderLimits[0], this.playerWanderLimits[1]), me.gridPixelDim * (me.numGridStps - 5));
    this.playerSpeed = 2;
    this.playerVel = this.playerSpeed;

    // Monster params
    this.skeletonImage = image_skeleton;
    this.skeletonPos = createVector(me.gridPixelDim * 1.75, me.gridPixelDim * 12);
    this.zombieImage = image_zombie;
    this.zombiePos = createVector(me.gridPixelDim * 12.37, me.gridPixelDim * 11.5);

    // Money params
    this.coinImage = image_coin;
    this.coinPos = createVector(me.gridPixelDim * 2, me.gridPixelDim * 13);
    this.emeraldImage = image_emerald;
    this.emeraldPos = createVector(me.gridPixelDim * 5, me.gridPixelDim * 13);
    this.sapphireImage = image_sapphire;
    this.sapphirePos = createVector(me.gridPixelDim * 7, me.gridPixelDim * 11);
    this.rubyImage = image_ruby;
    this.rubyPos = createVector(me.gridPixelDim * 13, me.gridPixelDim * 12);

    // Potion params
    this.healthPotionImage = image_heathPotion;
    this.healthPotionPos = createVector(me.gridPixelDim , me.gridPixelDim * 14);
    this.manaPotionImage = image_manaPotion;
    this.manaPotionPos = createVector(me.gridPixelDim * 10, me.gridPixelDim * 14);

    // Zoom timing params
    this.startingFrame = frameCount;
    this.sizeFactor = 0;
    this.threshold = 0.95;
    this.base = 60;
  }

  update(me) {
    this.mouseState = [...me.mouseState];

    if (this.helpButton.update(this.mouseState)) {
      return 2;
    }
    if (this.playButton.update(this.mouseState)) {
      return 3;
    }

    // Specialty buttons
    if (this.knightButton.update(this.mouseState)) {
      this.playerImage = image_knight;
      me.playerSpecString = 'S';
    }
    if (this.rangerButton.update(this.mouseState)) {
      this.playerImage = image_ranger;
      me.playerSpecString = 'R';
    }
    if (this.wizardButton.update(this.mouseState)) {
      this.playerImage = image_wizard;
      me.playerSpecString = 'W';
    }

    if (this.sizeFactor < this.threshold) {
      this.sizeFactor = pow((frameCount - this.startingFrame)/this.base, 8) * globalScaleFactor;
      if (this.sizeFactor >= this.threshold) {
        this.sizeFactor = 1;
      }
    }

    // Grass
    for (let i = 0; i < this.grasses.length; i++) {
      this.grasses[i].update();
    }

    // Wave
    for (let i = 0; i < this.wavePoints.length; i++) {
      this.wavePoints[i].y = this.waterlineY + 3 * sin(frameCount / 126 + i/18) + 5 * sin(frameCount / 105 + i/6) + 5 * sin(frameCount / 25 + i/3);
    }

    // Player
    this.playerPos.x += this.playerVel;
    if (abs(this.playerTargetPos.x - this.playerPos.x) < 10) {
      this.playerTargetPos = createVector(random(this.playerWanderLimits[0], this.playerWanderLimits[1]), me.gridPixelDim * (me.numGridStps - 5));
      this.playerVel = this.playerSpeed * (this.playerTargetPos.x - this.playerPos.x) / abs(this.playerTargetPos.x - this.playerPos.x);
    }

    return 1;
  }

  draw(me) {
    background(color_skyBlue);

    // Island bg
    image(this.bg, this.bgDims[0], this.bgDims[1], this.bgDims[2], this.bgDims[3]);

    // Grasses
    for (let i = 0; i < this.grasses.length; i++) {
      this.grasses[i].draw();
    }

    // Margin rectangle
    noStroke();
    fill(color_theme[0]);
    rect(this.marginRectDims[0], this.marginRectDims[1], this.marginRectDims[2], this.marginRectDims[3]);

    // Specialty Text
    noStroke();
    fill(color_theme[4]);
    textAlign(CENTER, CENTER);
    textSize(this.specialtyTextDims[2]);
    textFont(font_noContinue);
    text("Select\nSpecialty:", this.specialtyTextDims[0], this.specialtyTextDims[1]);

    // Creator Text
    noStroke();
    fill(color_theme[4]);
    textAlign(CENTER, TOP);
    textSize(this.creatorTextDims[2]);
    textFont(font_noContinue);
    text("Creators:\nCam Dunning\nMax Stelmack\nNick Tremaroli", this.creatorTextDims[0], this.creatorTextDims[1]);

    // Title Text
    stroke(color_theme[1]);
    strokeWeight(this.sizeFactor * 5);
    fill(color_theme[3]);
    textAlign(CENTER, CENTER);
    textSize(this.sizeFactor * this.titleTextDims[2]);
    textFont(font_adventure);
    text("Illusion Island", this.titleTextDims[0], this.titleTextDims[1]);

    // Skeleton
    image(this.skeletonImage, this.skeletonPos.x, this.skeletonPos.y, me.gridPixelDim, me.gridPixelDim);

    // Wave
    noStroke();
    fill([0, 0, 200]);
    beginShape();
    vertex(this.waveWidth, height + 2);
    vertex(-2, height + 2);
    for(let i = 0; i < this.wavePoints.length; i++) {
      vertex(this.wavePoints[i].x, this.wavePoints[i].y);
    }
    endShape();

    // Money
    image(this.coinImage, this.coinPos.x, this.coinPos.y, me.gridPixelDim, me.gridPixelDim);
    image(this.emeraldImage, this.emeraldPos.x, this.emeraldPos.y, me.gridPixelDim, me.gridPixelDim);
    image(this.sapphireImage, this.sapphirePos.x, this.sapphirePos.y, me.gridPixelDim, me.gridPixelDim);
    image(this.rubyImage, this.rubyPos.x, this.rubyPos.y, me.gridPixelDim, me.gridPixelDim);

    // Potions
    image(this.healthPotionImage, this.healthPotionPos.x, this.healthPotionPos.y, me.gridPixelDim, me.gridPixelDim);
    image(this.manaPotionImage, this.manaPotionPos.x, this.manaPotionPos.y, me.gridPixelDim, me.gridPixelDim);

    // Player
    image(this.playerImage, this.playerPos.x, this.playerPos.y, me.gridPixelDim, me.gridPixelDim);

    // Zombie
    image(this.zombieImage, this.zombiePos.x, this.zombiePos.y, me.gridPixelDim, me.gridPixelDim);

    // Buttons
    this.helpButton.draw();
    this.playButton.draw();
    this.knightButton.draw();
    this.rangerButton.draw();
    this.wizardButton.draw();
  }

  refresh() {
    this.startingFrame = frameCount;
  }
}

class InstructionsState extends ManagerState {
  constructor(me) {
    super(me);
    this.screens = [new InstructionScreen(me, "You are a sailor. You ran into a storm, your ship washed ashore, and your wares are mysteriously missing. If you don't find them and get on your way, you're out of a job (or possibly dead).\n\nYou anticipate having to fight your way through this island. Choose the knight, ranger, or wizard specialties to suit your style.", [[[image_knight, image_ranger, image_wizard], createVector(0.75 * me.gridPixelDim, 7.5 * me.gridPixelDim), createVector(1.5 * me.gridPixelDim, 1.5 * me.gridPixelDim)]]),
    new InstructionScreen(me, "You will find many things on the island.\n\nThe monsters are very hungry.\n\nGems will give you points.\n\nPotions restore health (green) or mana (blue).\n\nWeapons do damage at a certain range.\n\nArmor reduces the damage you take.", [[[image_skeleton, image_zombie], createVector(0.75 * me.gridPixelDim, 3.25 * me.gridPixelDim), createVector(1.5 * me.gridPixelDim, 1.5 * me.gridPixelDim)], [[image_coin, image_emerald, image_sapphire, image_ruby], createVector(0.75 * me.gridPixelDim, 5.8 * me.gridPixelDim), createVector(1.5 * me.gridPixelDim, 1.5 * me.gridPixelDim)], [[image_heathPotion, image_manaPotion], createVector(0.75 * me.gridPixelDim, 8 * me.gridPixelDim), createVector(1.5 * me.gridPixelDim, 1.5 * me.gridPixelDim)], [[image_weapon_fireSword, image_weapon_fireBow, image_weapon_fireWand], createVector(0.75 * me.gridPixelDim, 10.25 * me.gridPixelDim), createVector(1.5 * me.gridPixelDim, 1.5 * me.gridPixelDim)], [[loadImage("assets/water_region/items/waterarmor.png"), loadImage("assets/fire_region/items/firearmor.png"), loadImage("assets/jungle_region/items/junglearmor.png")], createVector(0.75 * me.gridPixelDim, 12.5 * me.gridPixelDim), createVector(1.5 * me.gridPixelDim, 1.5 * me.gridPixelDim)]]),
    new InstructionScreen(me, "Use the arrow keys to move around the map.\n\nAs you mouse over the map, tiles marked in white are within range. Click any of these tiles to attack it. If your weapon hits an enemy, it will damage the enemy.\n\nThe regions are not all the same difficulty. You should clear the east region first, then the north region, and finally the west.", []),
    new InstructionScreen(me, "The right side of the screen displays your health (hearts), mana (drops), inventory, and abilities. Your health regenerates slowly over time.\n\nClick on a weapon or ability in the inventory to equip it. Note that abilities cost mana and you must have enough to use it. Clicking a potion in your inventory will consume it.", []),
    new InstructionScreen(me, "You win the game when you find all three cargo items. You lose when you have no more health left.", [])];
    this.screensIndex = 0;
  }

  update(me) {
    if (this.screens[this.screensIndex].update(me))
    {
      if (++this.screensIndex === this.screens.length) {
        this.screensIndex = 0;
        return 1;
      }
    }

    return 2;
  }

  draw(me) {
    this.screens[this.screensIndex].draw(me);
  }
}

class PlayState extends ManagerState {
  constructor(me) {
    super(me);
    let buttonWidth = 4 * me.gridPixelDim;
    let buttonHeight = 2 * me.gridPixelDim;
    let buttonMargin = 0.5 * me.gridPixelDim;
    let buttonStartHeight = 8 * me.gridPixelDim;
    let buttonTextSize = 38;
    this.mouseState;
    this.quitButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2, buttonStartHeight+buttonHeight+buttonMargin +205), createVector(buttonWidth, buttonHeight), image_button, "Quit", buttonTextSize);
  }

  update(me) {
    this.mouseState = [...me.mouseState];
    if (this.quitButton.update(this.mouseState)) {
      return 1;
    }

    if(me.gameObj.update([...me.mouseState]) <= 0){
      return 4;
    }

    if(me.gameObj.player.getAmountOfCargo() === 3){
      return 5
    }

    return 3;
  }

  draw(me) {
    me.gameObj.draw([...me.mouseState]);
    this.quitButton.draw();
  }

  refresh(me) {
    me.gameObj = new GameMechanics(me.numGridSteps, me.gridPixelDim, me.playerSpecString);
  }
}

class LoseState extends ManagerState {
  constructor(me, numGridSteps, gridPixelDim) {
    super(numGridSteps, gridPixelDim);
    this.playerScore = 0;
    let buttonWidth = 4 * me.gridPixelDim;
    let buttonHeight = 2 * me.gridPixelDim;
    let buttonMargin = 0.5 * me.gridPixelDim;
    let buttonStartHeight = 8 * me.gridPixelDim;
    let buttonTextSize = 38;
    this.mouseState;
    this.hud = new LoseHud(createVector(100, 125));
    this.quitButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2 - 375, buttonStartHeight+buttonHeight+buttonMargin + 5), createVector(buttonWidth, buttonHeight), image_button, "Menu", buttonTextSize);
  }

  update(me) {
    this.mouseState = [...me.mouseState];
    this.playerScore = me.gameObj.player.getMoney();
    if (this.quitButton.update(this.mouseState)) {
      return 1;
    }
    return 4;
  }

  draw(me) {
    me.gameObj.draw([...me.mouseState]);
    this.hud.draw(this.playerScore);
    this.quitButton.draw();
  }
}

class WinState extends ManagerState {
  constructor(me, numGridSteps, gridPixelDim) {
    super(numGridSteps, gridPixelDim);
    this.playerScore = 0;
    let buttonWidth = 4 * me.gridPixelDim;
    let buttonHeight = 2 * me.gridPixelDim;
    let buttonMargin = 0.5 * me.gridPixelDim;
    let buttonStartHeight = 8 * me.gridPixelDim;
    let buttonTextSize = 38;
    this.mouseState;
    this.hud = new WinHud(createVector(100, 125));
    this.quitButton = new Button(createVector(me.canvasDim + me.hudWidth/2 - buttonWidth/2 - 375, buttonStartHeight+buttonHeight+buttonMargin + 5), createVector(buttonWidth, buttonHeight), image_button, "Menu", buttonTextSize);
  }

  update(me) {
    this.mouseState = [...me.mouseState];
    this.playerScore = me.gameObj.player.getMoney();
    if (this.quitButton.update(this.mouseState)) {
      return 1;
    }
    return 5;
  }

  draw(me) {
    me.gameObj.draw([...me.mouseState]);
    this.hud.draw(this.playerScore);
    this.quitButton.draw();
  }
}

/**
 * class: InstructionScreen
 * author: Max Stelmack
 * 
 * A screen for Instructions. Accepts text and pictures.
 */
class InstructionScreen {
  /**
   * method: constructor
   * 
   * Builds class instances.
   * 
   * @param {*} text Text to display.
   * @param {*} imageInformation Array of images and information in the following format: [[[image1, ...], position as Vector, dimensions as Vector], ...]
   */
  constructor(me, text, imageInformation) {
    this.text = text;
    this.textSize = globalScaleFactor * 28;
    this.mouseState;

    let buttonWidth = 4 * me.gridPixelDim;
    let buttonHeight = 2 * me.gridPixelDim;
    let buttonMargin = 1 * me.gridPixelDim;

    this.button = new Button(createVector(750-(buttonMargin+buttonWidth), me.numGridSteps*me.gridPixelDim-(buttonMargin+buttonHeight)), createVector(buttonWidth, buttonHeight), image_button, "Next", 40);
    this.markedIndeces = [];
    this.indexList = [];

    this.images = imageInformation;
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i][0].length > 1) {
        this.markedIndeces.push(i);
        this.indexList.push(0);
      }
    }
  }

  update(me) {
    this.mouseState = [...me.mouseState];

    if(frameCount % 90 === 0) {
      for (let i = 0; i < this.indexList.length; i ++) {
        if(++this.indexList[i] >= this.images[this.markedIndeces[i]][0].length) {
          this.indexList[i] = 0;
        }
      }
    }

    return this.button.update(this.mouseState);
  }

  draw(me) {
    background(color_theme[0]);
    fill(color_theme[4]);
    textSize(this.textSize);
    textAlign(LEFT, TOP);
    text(this.text, me.gridPixelDim*3, me.gridPixelDim, 750 - me.gridPixelDim*4, me.canvasDim - me.gridPixelDim*4);

    this.button.draw();

    let storedIndex = 0;
    for (let i = 0; i < this.images.length; i++) {
      if (i === this.markedIndeces[storedIndex]) {
        image(this.images[i][0][this.indexList[storedIndex]], this.images[i][1].x, this.images[i][1].y, this.images[i][2].x, this.images[i][2].y);
        storedIndex++;
      } else {
        image(this.images[i][0][0], this.images[i][1].x, this.images[i][1].y, this.images[i][2].x, this.images[i][2].y);
      }
    }
  }
}

/**
 * class: Button
 * author: Max Stelmack
 * 
 * A clickable button. Buttons assume they are not overlapping with other buttons.
 */
class Button {
  /**
   * method: constructor
   * 
   * Builds class instances.
   * 
   * @param {*} gridPixelDim 
   * @param {*} pos 
   * @param {*} dim 
   * @param {*} image 
   * @param {*} text 
   * @param {*} textSize 
   */
  constructor(pos, dim, image, text, textSize) {
    this.image = image;
    this.pos = pos
    this.dim = dim;
    this.center = dim.copy().mult(0.5).add(this.pos);
    this.text = text;
    this.textSize = globalScaleFactor * textSize;
    this.clicked = false;
  }

  /**
   * Method: update()
   * 
   * Executes class's functional logic
   * 
   * @param {*} mouseState Mouse information
   * @returns true if mouse released on this button, false otherwise.
   */
  update(mouseState) {
    if (this.clicked) {
      this.clicked = mouseState[0] != 2;
      return !this.clicked && mouseState[1].x >= this.pos.x && mouseState[1].x <= this.pos.x + this.dim.x && mouseState[1].y >= this.pos.y && mouseState[1].y <= this.pos.y + this.dim.y;;
    } else {
      this.clicked = mouseState[0] === 1 && mouseState[1].x >= this.pos.x && mouseState[1].x <= this.pos.x + this.dim.x && mouseState[1].y >= this.pos.y && mouseState[1].y <= this.pos.y + this.dim.y;
    }
    return false;
  }

  /**
   * Method: draw()
   * 
   * Executes class's graphics
   */
  draw() {
    noStroke();
    if (this.image === null || this.image === "") {
      fill(200);
      rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    } else {
      image(this.image, this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    }
    fill(color_theme[2]);
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    textFont(font_noContinue);
    text(this.text, this.center.x, this.center.y);
    if (this.clicked) {
      fill([50, 50, 50, 100]);
      rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    }
  }
}

/**
 * class: LoseHud
 * author: Cameron Dunning
 * 
 * A clickable button. Buttons assume they are not overlapping with other buttons.
 */
 class LoseHud {
  /**
   * method: constructor
   * 
   * Builds class instances.
   * 
   */
  constructor(pos, score) {
    this.pos = pos;
    this.score = score;
    this.scores = [];
  }

  /**
   * Method: update()
   * 
   * Executes class's functional logic
   * .
   */
  update() {
    
  }

  /**
   * Method: draw()
   * 
   * Executes class's graphics
   */
  draw(score) {
    image(image_loseTitle, this.pos.x, this.pos.y, 400, 500);
    push();
    fill(224, 199, 2);
    textSize(25);
    text("You Lost!", 300, 215);
    text("Better Luck Next Time...", 300, 245);
    text("Score: ", 290, 290);
    text(score, 345, 290);
    pop();
    
  }
}


/**
 * class: WinHud
 * author: Cameron Dunning
 * 
 * A clickable button. Buttons assume they are not overlapping with other buttons.
 */
 class WinHud {
  /**
   * method: constructor
   * 
   * Builds class instances.
   * 
   */
  constructor(pos, score) {
    this.pos = pos;
    this.score = score;
    this.scores = [];
  }

  /**
   * Method: update()
   * 
   * Executes class's functional logic
   * .
   */
  update() {
    
  }

  /**
   * Method: draw()
   * 
   * Executes class's graphics
   */
  draw(score) {
    image(image_winTitle, this.pos.x, this.pos.y, 400, 500);
    push();
    fill(224, 199, 2);
    textSize(25);
    text("Congratulations!", 300, 215);
    text("You Saved All the Cargo", 300, 245);
    text("Score: ", 290, 290);
    text(score, 345, 290);
    pop();
    
  }
}

class Grass {
  constructor(x, y, scale) {
    this.x = x;
    this.y = y;
    this.cPoints = [];
    this.xOffsets = [0, 3, 3, 0];
    for (let i = 0; i < this.xOffsets.length; i++) {
      this.xOffsets[i] = this.xOffsets[i] * scale;
    }
    this.step = 20 * scale;

    for (let i = 0; i < this.xOffsets.length; i++) {
      this.cPoints.push(createVector(this.x, this.y - i * this.step));
    }

    this.scale = scale;

    this.phaseOffset = PI/4;
    this.period = 60;
  }

  update() {
    let swayAmp = 5;
    for (let i = 0; i < this.cPoints.length; i++) {
      this.cPoints[i].x = this.x + i * swayAmp * sin(-frameCount / this.period + this.phaseOffset * i);
    }
  }

  draw() {
    strokeWeight(globalScaleFactor * 2);
    stroke(color('#cbe600'));
    noFill();
    bezier(this.cPoints[0].x, this.cPoints[0].y, this.cPoints[1].x, this.cPoints[1].y, this.cPoints[2].x, this.cPoints[2].y, this.cPoints[3].x, this.cPoints[3].y);
  }
}


/**
 * function: mouseClicked()
 * 
 * Detects mouse clicks and passes information to game manager
 */
function mousePressed() {
  gameManager.setClickState(1);
}

/**
 * function: mouseReleased()
 * 
 * Detects mouse releases and passes information to game manager
 */
function mouseReleased() {
  gameManager.setClickState(2);
}


/*
function: keyPressed()

Tracks keys that are pressed.
*/
function keyPressed() {
  keyArray[keyCode] = 1;
}

/*
function: keyReleased()

Tracks keys that are released.
*/
function keyReleased() {
  keyArray[keyCode] = 0;
}

/**
 * function: manhattanDist
 * auhtor: Max Stelmack
 * 
 * Provides manhattan distance between two vectors
 * 
 * @param {*} vec1 
 * @param {*} vec2 
 * @returns Manhattan distance
 */
function manhattanDist(vec1, vec2) {
  return abs(vec1.x - vec2.x) + abs(vec1.y - vec2.y);
}