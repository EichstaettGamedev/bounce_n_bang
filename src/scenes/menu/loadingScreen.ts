import options from '../../options';
import { GameObjects, Scene } from 'phaser';

export class LoadingScreenScene extends Scene {
    progressBar?: GameObjects.Graphics;
    progressBox?: GameObjects.Graphics;
    progressText?: GameObjects.Text;
    loadingText?: GameObjects.Text;
    loadingFileText?: GameObjects.Text;

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        if (!config) {
            config = {};
        }
        config.key = 'LoadingScreenScene';
        super(config);
    }

    initLoadScreen() {
        const that = this;
        this.progressBox = this.add.graphics();
        this.progressBox.setPosition(
            this.scale.width / 2 - 160,
            this.scale.height / 2 - 32
        );
        this.progressBox.fillStyle(0x081122, 0.8);
        this.progressBox.fillRoundedRect(0, 0, 320, 64, 8);

        this.progressBar = this.add.graphics();
        this.progressBar.setPosition(
            this.scale.width / 2 - 160,
            this.scale.height / 2 - 32
        );

        this.loadingText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 - 48,
            'Loading...',
            {
                fontFamily: 'monospace',
                fontSize: '20px',
                color: '#ffffff',
            }
        );
        this.loadingText.setOrigin(0.5, 0.5);

        this.progressText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            '0%',
            {
                fontFamily: 'monospace',
                fontSize: '20px',
                color: '#ffffff',
            }
        );
        this.progressText.setOrigin(0.5, 0.5);

        this.loadingFileText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 48,
            '0%',
            {
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#ffffff',
            }
        );
        this.loadingFileText.setOrigin(0.5, 0.5);

        this.load.on('progress', (percentage_done: number) => {
            if (that.progressBar) {
                that.progressBar.clear();
                that.progressBar.fillStyle(0x334488, 1);
                that.progressBar.fillRoundedRect(
                    8,
                    8,
                    304 * percentage_done,
                    48,
                    8
                );
                that.progressText?.setText(((percentage_done * 100) | 0) + '%');
            }
        });

        this.load.on('fileprogress', (file: any) => {
            that.loadingFileText?.setText(`${file.src}`);
        });
        this.load.on('complete', () => {
            that.dropLoadScreen();
        });
    }

    dropLoadScreen() {
        this.progressBar?.destroy();
        this.progressBox?.destroy();
        this.progressText?.destroy();
        this.loadingText?.destroy();
        this.loadingFileText?.destroy();
    }

    preload() {
        this.initLoadScreen();
        //this.load.multiatlas('packed', 'gfx/packed.json', 'gfx');
        this.load.image('player1', 'unpacked_gfx/player1.png');
        this.load.image('player2', 'unpacked_gfx/player2.png');
        this.load.image('background', 'unpacked_gfx/background.png');
        this.load.image('bullet', 'unpacked_gfx/bullet.png');
        this.load.image('enemyBullet', 'unpacked_gfx/bulletEnemy.png');
        this.load.image('stoneWall', 'unpacked_gfx/stoneWall.png');
        this.load.image('stoneWallSmall', 'unpacked_gfx/stoneWallSmall.png');
        this.load.image('stoneWall2', 'unpacked_gfx/stoneWall2.png');
        this.load.image('stoneWallSmall2', 'unpacked_gfx/stoneWallSmall2.png');
        this.load.image('stoneWall3', 'unpacked_gfx/stoneWall3.png');
        this.load.image('stoneWallSmall3', 'unpacked_gfx/stoneWallSmall3.png');

        this.load.audio('bounce', 'sfx/bounce.mp3');
        this.load.audio('death', 'sfx/death.mp3');
        this.load.audio('enemydown', 'sfx/enemydown.mp3');
        this.load.audio('gunshot', 'sfx/gunshot.mp3');
        this.load.audio('winlvl', 'sfx/winlvl.mp3');
        this.load.audio('move', 'sfx/move.mp3');
        this.load.audio('music', 'sfx/music.mp3')

    }

    create() {
        this.scene.switch('MainMenuScene');
    }
}
