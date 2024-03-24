import { Physics } from "phaser";
import { GameScene } from "../game/gameScene";

export class Bullet extends Physics.Arcade.Image {
    vx = 0;
    vy = 0;

    constructor(scene: GameScene, x: number, y: number, vx: number, vy: number, tex = "bullet", public speed = 0.5) {
        super(scene, x, y, tex);
        scene.add.existing(this);
        (scene as GameScene).bullets.add(this);
        this.vx = vx;
        this.vy = vy;
        this.scene = scene;
    }

    preUpdate(time: number, delta: number) {
        this.x += this.vx * delta * this.speed;
        this.y += this.vy * delta * this.speed;

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
            if(dd < e.dd){
                e.die();
            }
        }
        for(const w of scene.walls){
            if(w.isInside(this.x, this.y, 16)){
                this.vx *= -1;
                this.vy *= -1;
            }
        }
    }
}