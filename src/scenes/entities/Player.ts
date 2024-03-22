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
};

