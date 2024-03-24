import { Physics } from "phaser";
import { Bullet } from "./Bullet";
import { GameScene } from "../game/gameScene";

export class Entity extends Physics.Arcade.Sprite {
    speed = 4;
    lastShot = -1000;
    shootCooldown = 500;
    moveSound: Phaser.Sound.BaseSound;
    died = false;
    dd = 24*24;

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

    shootStraight() {
        const vx = Math.cos(this.rotation) * 100;
        const vy = Math.sin(this.rotation) * 100;
        this.shootAt(this.x + vx, this.y + vy, "enemyBullet", 0.25);
    }

    canShoot():boolean {
        if(this.scene.time.now < (this.lastShot + this.shootCooldown)){
            return false;
        }
        return true;
    }

    onShoot() {
        this.scene.sound.play('gunshot');
    }

    shootAt(x: number, y: number, tex = "bullet", speed = 0.5) {
        if(!this.scene){
            return;
        }
        if(!this.canShoot()){
            return;
        }

        this.lastShot = this.scene.time.now;
        const dx = x - this.x;
        const dy = y - this.y;
        const max = Math.max(Math.abs(dx), Math.abs(dy));
        const vx = dx/max;
        const vy = dy/max;
        new Bullet(this.scene as GameScene, this.x + vx * 40, this.y + vy * 40, vx, vy, tex, speed);
        this.onShoot();
    }

    lookAt(x: number, y: number){
        const d = Math.atan2(y-this.y, x-this.x);
        this.setRotation(d);
    }

    preUpdate(time: number, delta: number) {

    }
}