import { Physics, Scene } from "phaser";

export class Bullet extends Physics.Arcade.Image {
    speed = 4;

    constructor(scene: Scene, x: number, y: number, dx: number, dy: number) {
        super(scene, x, y, "bullet");
        scene.add.existing(this);
        this.setVelocity(dx * this.speed,dy * this.speed);
    }

    preUpdate(time: number, delta: number) {

    }
}