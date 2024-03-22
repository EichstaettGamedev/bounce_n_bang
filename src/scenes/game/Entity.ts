import { Physics, Scene } from "phaser";

export class Entity extends Physics.Arcade.Sprite {
    speed = 4;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "player");
        scene.add.existing(this);
    }

    move(dx: number, dy: number) {
        this.x += dx * this.speed;
        this.y += dy * this.speed;
    }

    lookAt(x: number, y: number){
        const d = Math.atan2(y-this.y, x-this.x);
        this.setRotation(d);
    }

    preUpdate(time: number, delta: number) {

    }
}