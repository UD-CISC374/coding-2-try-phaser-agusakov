import ExampleObject from '../objects/exampleObject';
import BallShip from '../objects/ballShip';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.Image;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'MainScene'});
  }

  create() {
    this.background = this.add.image(0,0,"background");
    this.background.setOrigin(0,0);
    this.ship1 = new BallShip(this, this.scale.width / 2 - 50, this.scale.height / 2, 1, 1);
    //this.ship1 = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "ship");
    this.ship2 = this.add.image(this.scale.width / 2, this.scale.height / 2, "ship2");
    this.ship3 = this.add.image(this.scale.width / 2 + 50, this.scale.height / 2, "ship");

  }

  moveShip(ship) {
    ship.x += ship.xSpeed;
    ship.y += ship.ySpeed;
    if ((ship.x == this.scale.width)||(ship.x == 0)) {
      ship.xSpeed = -ship.xSpeed;
    }
    if ((ship.y == this.scale.height)||(ship.y == 0)) {
      ship.ySpeed = -ship.ySpeed;
    }
  }

  collideShip(ship) {

  }

  update() {
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"})
    this.moveShip(this.ship1);
  }
}
