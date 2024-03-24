import { Physics } from "phaser";
import { Bullet } from "./Bullet";
import { GameScene } from "../game/gameScene";

export class Wall extends Physics.Arcade.Sprite {
    constructor(scene: GameScene, x: number, y: number, public t = "stoneWall") {
        super(scene, x, y, t);
        scene.add.existing(this);
        scene.walls.add(this);
        this.setOrigin(0,0);
    }

    isInside(x:number, y:number, r = 1):boolean {
        return !(((x+r) < this.x) || ((x-r) > this.x + this.width) || ((y+r) < this.y) || ((y-r) > this.y + this.height));
    }

    whichSide(x:number, y:number): number {
        
    }
}