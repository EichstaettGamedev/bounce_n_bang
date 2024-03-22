import { Physics } from "phaser";
import { Bullet } from "./Bullet";
import { GameScene } from "../game/gameScene";

export class Entity extends Physics.Arcade.Sprite {
    speed = 4;
    lastShot = -1000;
    shootCooldown = 200;
    moveSound: Phaser.Sound.BaseSound;
    died = false;

    constructor(scene: GameScene, x: number, y: number, tex: string) {
        super(scene, x, y, tex);
        scene.add.existing(this);
        this.moveSound = this.scene.sound.add('move', { loop: true, volume: 0.5 });
        scene.entities.add(this);
    }

    die(){
        if(this.died){
            return;
        }
        this.died = true;
        this.destroy(true);
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
        if(!this.scene){
            return;
        }
        if(this.scene.time.now < (this.lastShot + this.shootCooldown)){
            return;
        }

        this.lastShot = this.scene.time.now;
        const dx = x - this.x;
        const dy = y - this.y;
        const max = Math.max(Math.abs(dx), Math.abs(dy));
        const vx = dx/max;
        const vy = dy/max;
        new Bullet(this.scene as GameScene, this.x + vx * 40, this.y + vy * 40, vx, vy);
        this.scene.sound.play('gunshot');

    }

    lookAt(x: number, y: number){
        const d = Math.atan2(y-this.y, x-this.x);
        this.setRotation(d);
    }

    preUpdate(time: number, delta: number) {

    }
}