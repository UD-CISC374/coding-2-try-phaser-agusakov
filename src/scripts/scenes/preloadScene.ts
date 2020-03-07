export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.png");
    this.load.spritesheet("ship", "assets/spritesheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("larry_walkin_left", "assets/spritesheets/larry_walkin_left.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("larry_walkin_right", "assets/spritesheets/larry_walkin_right.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("larry_slash_left", "assets/spritesheets/larry_slash_left.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("larry_slash_right", "assets/spritesheets/larry_slash_right.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("robot_walkin", "assets/spritesheets/robot_walkin.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

  
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('MainScene');
  }
}
