import ExampleObject from '../objects/exampleObject';
import BallShip from '../objects/ballShip';
import TileSprite from '../objects/tileSprite';
import {Cameras } from 'phaser';
import Larry from '../objects/larry';

/*
robot art from www.amon.co
*/

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  larry: Phaser.Physics.Arcade.Sprite;
  robot: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  left: boolean;
  slash: boolean;
  //left: Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  spacebar: Phaser.Input.Keyboard.Key;
  powerUps: Phaser.Physics.Arcade.Group;
  robots: Phaser.Physics.Arcade.Group;
  score: number = 0; 
  scorelabel; 
  explosionSound;
  pickupSound;
  music;
  //myCam: Phaser.Camera;
  
  constructor() {
    super({ key: 'MainScene'});
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0,0);
    this.background.setScrollFactor(1);

    this.ship1 = new BallShip(this, "ship", this.scale.width / 2 - 50, this.scale.height / 2, -1, 4, 1);
    this.ship2 = new BallShip(this, "ship2", this.scale.width / 2, this.scale.height / 2, 1, 1, 3);
    this.ship3 = new BallShip(this, "ship3", this.scale.width / 2 + 50, this.scale.height / 2, 2, -2, 2);
    this.larry = this.physics.add.sprite(this.scale.width / 2 - 50, this.scale.height, "larry_walkin_left");
    this.robot = this.physics.add.sprite(this.scale.width / 2 + 50, this.scale.height/2, "robot_walkin");
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    //this.cameras.main.startFollow(this.larry);

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship", {start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2", {start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3", {start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 4}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create({
      key: "larry_walkin_left",
      frames: this.anims.generateFrameNumbers("larry_walkin_left", {start: 0, end: 8}),
      frameRate: 13,
      repeat: -1
    });
    this.anims.create({
      key: "larry_standin_left",
      frames: this.anims.generateFrameNumbers("larry_walkin_left", {start: 0, end: 0}),
      frameRate: 13,
      repeat: -1
    });
    this.anims.create({
      key: "larry_walkin_right",
      frames: this.anims.generateFrameNumbers("larry_walkin_right", {start: 0, end: 8}),
      frameRate: 13,
      repeat: -1,
    });
    this.anims.create({
      key: "larry_standin_right",
      frames: this.anims.generateFrameNumbers("larry_walkin_right", {start: 0, end: 0}),
      frameRate: 13,
      repeat: -1,
    });
    this.anims.create({
      key: "larry_slash_left",
      frames: this.anims.generateFrameNumbers("larry_slash_left", {start: 0, end: 5}),
      frameRate: 13,
      repeat: -1,
    });
    this.anims.create({
      key: "larry_slash_right",
      frames: this.anims.generateFrameNumbers("larry_slash_right", {start: 0, end: 5}),
      frameRate: 13,
      repeat: -1,
    });
    this.anims.create({
      key: "robot_walkin",
      frames: this.anims.generateFrameNumbers("robot_walkin", {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1,
    });

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");
    this.larry.play("larry_walkin_left");
    this.robot.play("robot_walkin");

``

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.robot.setInteractive();

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //this.input.on("gameobjectdown", this.destroyRobot, this);
    this.larry.setCollideWorldBounds(true);
    this.robot.setCollideWorldBounds(true);

    //this.physics.add.overlap(this.larry, this.robot);
    //this.physics.add.overlap(this.larry, this.robot);

  }

  pickPowerUp(player, powerUp){
    powerUp.disableBody(true, true);
  }

  moveLarry() {
    if(this.cursorKeys.left?.isDown) {
      this.larry.setVelocityX(-50);
      if (this.left != true) {
        this.larry.play("larry_walkin_left");
        this.left = true;
      }
    }
    else if(this.cursorKeys.right?.isDown) {
      this.larry.setVelocityX(50);
      if (this.left == true) {
        this.larry.play("larry_walkin_right");
        this.left = false;
      }
      this.background.tilePositionX += 5;
    }
    else if (this.spacebar.isDown) {
      if ((this.slash != true)&&(this.left == true)) {
        this.larry.play("larry_slash_left");
        this.slash = true;
      }
      else if ((this.slash != true)&&(this.left != true)) {
        this.larry.play("larry_slash_right");
        this.slash = true;
      }
    }
    else {
      this.larry.setVelocity(0);
      if (this.left == true) {
        this.larry.play("larry_standin_left");
      }
      else {
        this.larry.play("larry_standin_right");
      }
      this.slash = false;
    }
  }

  moveRobot() {
    /*if(this.slash == true) {
      if(this.robot.x == this.larry.x) {
        this.destroyRobot(this.robot);
      }
    }*/
    this.robot.setVelocityX(-50);
  }

  destroyRobot(sprite) {
    sprite.setTexture("explosion");
    sprite.play("explode").scale = 2;
  }

  moveShip(ship) {
    /*if (ship.spin > 0) {
      console.log("clock");
    }
    else {
      console.log("counter");
    }
    ship.angle += ship.spin;*/
    //console.log(ship.rotation);
    ship.x += ship.xSpeed;
    ship.y += ship.ySpeed;
    
    if ((ship.x >= this.scale.width)||(ship.x <= 0)) {
      /*if ((ship.xSpeed > 0)&&(ship.ySpeed > 0)&&(ship.spin > 0)) {
        ship.spin -= ship.xSpeed;
      }
      else if ((ship.xSpeed > 0)&&(ship.ySpeed > 0)&&(ship.spin < 0)) {
        ship.spin -= ship.xSpeed;
      }
      else {
        ship.spin += ship.xSpeed;
      }*/
      ship.xSpeed = -ship.xSpeed;
    }
    if ((ship.y >= this.scale.height)||(ship.y <= 0)) {
      /*if ((ship.xSpeed > 0)&&(ship.ySpeed > 0)&&(ship.spin > 0)) {
        ship.spin += ship.ySpeed;
      }
      else {
        ship.spin -= ship.ySpeed;
      }
      ship.spin += ship.xSpeed + ship.ySpeed;*/
      ship.ySpeed = -ship.ySpeed;
    }
  }

  update() {
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"})
    this.moveShip(this.ship1);
    this.moveShip(this.ship2);
    this.moveShip(this.ship3);
    this.moveLarry();
    this.moveRobot();
  }
}
