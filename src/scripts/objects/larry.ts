export default class Larry extends Phaser.GameObjects.Sprite {
    speed: number;
    direction: string;

    constructor(scene: Phaser.Scene, sprite: string, x: number, y: number, speed: number) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.speed = speed;
    }

    setSpeed(speed: number) {
        this.speed = speed;
    }
}
