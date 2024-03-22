import { Physics, Scene } from "phaser";
import { Bullet } from "./Bullet";

export class Entity extends Physics.Arcade.Sprite {
    speed = 4;
    lastShot = -1000;
    shootCooldown = 200;

    constructor(scene: Scene, x: number, y: number, tex: string) {
        super(scene, x, y, tex);
        scene.add.existing(this);
    }

    move(dx: number, dy: number) {
        this.x += dx * this.speed;
        this.y += dy * this.speed;
    }

    shootAt(x: number, y: number) {
        if(this.scene.time.now < (this.lastShot + this.shootCooldown)){
            return;
        }

        this.lastShot = this.scene.time.now;
        const dx = x - this.x;
        const dy = y - this.y;
        const max = Math.max(Math.abs(dx), Math.abs(dy));
        const vx = dx/max;
        const vy = dy/max;
        new Bullet(this.scene, this.x + vx * 40, this.y + vy * 40, vx, vy);
    }

    lookAt(x: number, y: number){
        const d = Math.atan2(y-this.y, x-this.x);
        this.setRotation(d);
    }

    preUpdate(time: number, delta: number) {

    }
}