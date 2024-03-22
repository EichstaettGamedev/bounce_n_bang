import { Entity } from "./Entity";
import { GameScene } from "../game/gameScene";

export class Player extends Entity {
    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "player1");
        scene.add.existing(this);
    }

    die(){
        if(this.scene){
            (this.scene as GameScene).sound.play('death');
        }
        super.die();
    }

    move(dx: number, dy: number) {
        super.move(dx,dy);
        this.y = Math.min(720-32, Math.max(this.y, 500));
        this.x = Math.min(1280-32, Math.max(this.x, 32));
    }
};
