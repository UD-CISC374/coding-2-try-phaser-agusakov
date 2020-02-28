export default class BallShip extends Phaser.GameObjects.Sprite {
    xSpeed: number;
    ySpeed: number;

    constructor(scene: Phaser.Scene, image: string, x: number, y: number, xSpeed: number, ySpeed: number) {
        super(scene, x, y, image);
        scene.add.existing(this);
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
}
