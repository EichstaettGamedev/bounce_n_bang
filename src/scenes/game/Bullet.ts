import { Physics, Scene } from "phaser";

export class Bullet extends Physics.Arcade.Image {
    speed = 0.5;
    vx = 0;
    vy = 0;

    constructor(scene: Scene, x: number, y: number, vx: number, vy: number) {
        super(scene, x, y, "bullet");
        scene.add.existing(this);
        this.vx = this.speed * vx;
        this.vy = this.speed * vy;
    }

    preUpdate(time: number, delta: number) {
        this.x += this.vx * delta;
        this.y += this.vy * delta;

        if((this.y > 720) || (this.y < 0)){
            this.vy *= -1;
        }
        if((this.x > 1280) || (this.x < 0)){
            this.vx *= -1;
        }
    }
}