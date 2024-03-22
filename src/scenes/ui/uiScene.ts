import { Scene } from 'phaser';
import { GameScene } from '../game/gameScene';

export class UIScene extends Scene {
    public score = 0;
    public node?:HTMLElement;

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        if (!config) {
            config = {};
        }
        config.key = 'UIScene';
        super(config);
    }

    create() {
        this.score = 0;

        const node = document.createElement("div");
        node.innerText = "Score: ";
        node.style.color = "#fff";
        node.style.textShadow = "0px 0px 4px #000";
        this.node = node;
        const scoreText = this.add.dom(32, 16, node);
        scoreText.setDepth(1000);
    }

    update(time: number, delta: number) {
        const game = this.scene.get('GameScene') as GameScene;
        if(this.node){
            //this.node.innerHTML = `Score: ${this.score}<br/>Bunnies alive: ${this.bunnies}`;
        }
    }
}
