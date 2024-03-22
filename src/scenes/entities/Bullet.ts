import { Physics } from "phaser";
import { GameScene } from "../game/gameScene";

export class Bullet extends Physics.Arcade.Image {
    speed = 0.5;
    vx = 0;
    vy = 0;

    constructor(scene: GameScene, x: number, y: number, vx: number, vy: number) {
        super(scene, x, y, "bullet");
        scene.add.existing(this);
        this.vx = this.speed * vx;
        this.vy = this.speed * vy;
        this.scene = scene;
    }

    preUpdate(time: number, delta: number) {
        this.x += this.vx * delta;
        this.y += this.vy * delta;

        if((this.y > 720) || (this.y < 0)){
            this.vy *= -1;
            this.scene.sound.play('bounce');
        }
        if((this.x > 1280) || (this.x < 0)){
            this.vx *= -1;
            this.scene.sound.play('bounce');
        }

        const scene = this.scene as GameScene;
        for(const e of scene.entities){
            if(e.died){continue;}
            const dx = this.x - e.x;
            const dy = this.y - e.y;
            const dd = dx*dx + dy*dy;
            if(dd < 24*24){
                e.die();
            }
        }
    }
}