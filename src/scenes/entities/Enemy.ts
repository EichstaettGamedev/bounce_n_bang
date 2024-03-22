import { Entity } from "./Entity";
import { GameScene } from "../game/gameScene";

export class Enemy extends Entity {
    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "player2");
        scene.add.existing(this);
        scene.enemies.add(this);
    }
}