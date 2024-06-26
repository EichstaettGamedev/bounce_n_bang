import { Scene } from 'phaser';

import '../../types';
import { UIScene } from '../ui/uiScene';
import { Entity } from '../entities/Entity';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Bullet } from '../entities/Bullet';
import { Wall } from '../entities/Wall';

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
    player?: Player;
    enemies = new Set<Enemy>();
    entities = new Set<Entity>();
    bullets = new Set<Bullet>();
    walls = new Set<Wall>();
    background?: Phaser.GameObjects.Image;

    playerX = 0;
    playerY = 0;
    level = 0;

    music?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    scoreText?: Phaser.GameObjects.Text;

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        if (!config) {
            config = {};
        }
        config.key = 'GameScene';
        super(config);
        this.gameOverActive = false;
    }

    addScore(points = 1){
        this.score += points;
    }

    resetPlayer() {
        const px = 1280/2;
        const py = 720 - 720/5;
        this.player = new Player(this, px, py);
        this.player.bulletsLeft = 6;
    }

    spawnEnemy(){
        for(let i=this.level*2;i;i--){
            const x = Math.random() * 1200 + 40;
            const y = Math.random() * 720/4 + 40;
            new Enemy(this, x, y);
        }
    }

    spawnWalls(){
        for(const w of this.walls){
            w.destroy();
        }
        this.walls.clear();
        for(let i=this.level;i;i--){
            const x = Math.random() * 1200 + 40;
            const y = Math.random() * 720/4 + 300;
            const t = Math.random() > 0.7 ? "stoneWall" : "stoneWallSmall";
            const v = (Math.random() * 3)|0;
            const tex = t + (v ? v+1 : "");
            console.log(tex);
            new Wall(this, x, y, tex);
        }
    }

    prepareLevel() {
        this.resetPlayer();
        this.spawnEnemy();
        this.spawnWalls();
    }

    create() {
        if(this.music){
            this.music.destroy();
        }
        this.music = this.sound.add('music');
        this.music.loop = true;
        this.music.play();

        this.score = 0;
        this.level = 0;
        this.sound.pauseOnBlur = false;

        this.prepareLevel();

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
    }

    nextLevel() {
        this.sound.play('winlvl');
        this.level++;
        for(const e of this.entities){
            e.die();
        }
        for(const e of this.bullets){
            e.destroy(true);
        }
        this.enemies.clear();
        this.entities.clear();
        this.bullets.clear();
        this.prepareLevel();
    }

    countLiveEnemies() {
        let c = 0;
        for(const e of this.enemies){
            if(e.died){
                continue;
            }
            if(!e.scene){
                continue;
            }
            c++;
        }
        return c;
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

        if(this.player?.died){
            if(this.scene.manager.isVisible("MainMenuScene")){
                this.nextLevel();
            } else {
                this.music?.destroy();
                this.scene.switch("GameOverScene");
            }
        }
        if(this.countLiveEnemies() <= 0){
            this.nextLevel();
        }
    }
}
