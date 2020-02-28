export default class BallShip extends Phaser.GameObjects.Sprite {
    xSpeed: number;
    ySpeed: number;
    spin: number;

    constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, xSpeed: number, ySpeed: number, spin: number) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.spin = spin;
    }
}
