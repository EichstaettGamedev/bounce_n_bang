import { Entity } from "./Entity";
import { GameScene } from "../game/gameScene";

export class Enemy extends Entity {
    shootCooldown = 2000;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "player2");
        scene.add.existing(this);
        scene.enemies.add(this);
        this.rotation = Math.random() * Math.PI;
    }

    die(){
        if(this.scene){
            (this.scene as GameScene).addScore(1);
            this.scene.sound.play('enemydown');
        }
        super.die();
    }

    preUpdate(time: number, delta: number): void {
        this.setRotation(this.rotation + delta * 0.001);
        this.shootStraight();
    }
}