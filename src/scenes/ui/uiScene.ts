import { Scene } from 'phaser';
import { GameScene } from '../game/gameScene';

export class UIScene extends Scene {
    public score = 0;
    public scoreElement?:HTMLElement;
    public ammoElement?:HTMLElement;

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
        this.scoreElement = node;
        const scoreText = this.add.dom(32, 16, node);
        scoreText.setDepth(1000);

        const ammo = document.createElement("div");
        ammo.innerText = "Score: ";
        ammo.style.color = "#fff";
        ammo.style.textShadow = "0px 0px 4px #000";
        this.ammoElement = ammo;
        const ammoText = this.add.dom(32, 720-16, ammo);
        ammoText.setDepth(1000);
    }

    update(time: number, delta: number) {
        const game = this.scene.get('GameScene') as GameScene;
        if(this.scoreElement){
            this.scoreElement.innerHTML = `Score: ${game.score}<br/>Level: ${game.level + 1}`;
        }
        if(this.ammoElement){
            this.ammoElement.innerHTML = `Bullets left: ${game.player?.bulletsLeft || 0}`;
        }
    }
}
