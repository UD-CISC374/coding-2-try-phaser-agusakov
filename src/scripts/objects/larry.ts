export default class Larry extends Phaser.GameObjects.Sprite {
    xSpeed: number;
    ySpeed: number;

    constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, xSpeed: number, ySpeed: number) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
}
