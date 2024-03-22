import { GameObjects, Scene } from 'phaser';

import '../../types';
import { UIScene } from '../ui/uiScene';
import { Entity } from './Entity';

export type KeyMap = {
    Up: Phaser.Input.Keyboard.Key;
    Left: Phaser.Input.Keyboard.Key;
    Right: Phaser.Input.Keyboard.Key;
    Down: Phaser.Input.Keyboard.Key;
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
};

export class GameScene extends Scene {
    keymap?: KeyMap;
    gameOverActive: boolean;

    gameTicks = 0;
    score = 0;

    playerVelocity = 2;
    player?: Entity;
    background?: Phaser.GameObjects.Image;

    playerX = 0;
    playerY = 0;

    scoreText?: Phaser.GameObjects.Text;

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        if (!config) {
            config = {};
        }
        config.key = 'GameScene';
        super(config);
        this.gameOverActive = false;
    }

    create() {
        this.score = 0;
        this.sound.pauseOnBlur = false;

        this.player = new Entity(this, 1280/2, 720 - 720/5);

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);
        this.background.setDepth(-1);

        const ui = this.scene.get('UIScene') as UIScene;
        ui.events.emit('reset');

        this.physics.world.setBounds(0, 0, 1280, 720);
        this.keymap = this.input.keyboard?.addKeys(
            'Up,Left,Right,Down,W,A,S,D'
        ) as KeyMap;
        this.gameOverActive = false;
        this.gameTicks = 0;

        this.input.mouse?.disableContextMenu();
        this.input.on('pointermove', (pointer:any) => {
            const x = (pointer.worldX/32)|0;
            const y = (pointer.worldY/32)|0;
            if(pointer.buttons & 1){
                //console.log(pointer);
            }
        }, this);

        //this.cameras.main.setBounds(0, 0, 1280, 720);
        //this.cameras.main.startFollow(this.player, false, 0.1, 0.1, 0, 0);
    }

    update(time: number, delta: number) {
        this.gameTicks += delta;
        let dx = 0;
        let dy = 0;
        if(this.keymap?.A.isDown || this.keymap?.Left.isDown){
            dx += -1;
        }
        if(this.keymap?.D.isDown || this.keymap?.Right.isDown){
            dx += 1;
        }
        if(this.keymap?.W.isDown || this.keymap?.Up.isDown){
            dy += -1;
        }
        if(this.keymap?.S.isDown || this.keymap?.Down.isDown){
            dy += 1;
        }
        this.player?.move(dx,dy);
        const mx = this.game.input.mousePointer?.x || 0;
        const my = this.game.input.mousePointer?.y || 0
        this.player?.lookAt(mx,my);

        if(this.game.input.mousePointer?.leftButtonDown()){
            this.player?.shootAt(mx,my)
        }
        //this.cameras.main.setScroll(this.playerX, this.playerY);
    }
}
