import { Physics, Scene } from "phaser";
import { Bullet } from "./Bullet";

export class Entity extends Physics.Arcade.Sprite {
    speed = 4;
    lastShot = -1000;
    shootCooldown = 200;
    moveSound: Phaser.Sound.BaseSound;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "player");
        scene.add.existing(this);
        this.moveSound = this.scene.sound.add('move', { loop: true, volume: 0.5 });
    }

       move(dx: number, dy: number) {
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        if (!this.moveSound.isPlaying) {
            this.moveSound.play();
        }

    
    }
    stopMoving() {
        this.moveSound.stop();
        this.moveSound.play();
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
        new Bullet(this.scene, this.x, this.y, vx, vy);
    }

    lookAt(x: number, y: number){
        const d = Math.atan2(y-this.y, x-this.x);
        this.setRotation(d);
    }

    preUpdate(time: number, delta: number) {

    }
}