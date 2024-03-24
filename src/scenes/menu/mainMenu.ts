import options from '../../options';
import { Scene } from 'phaser';

const introHTML = `<div style="display:block; width:100%; max-width: 800px;"><h1>Bounce 'n' Bang</h1>
<br/>
<p>In "Bounce 'n' Bang" you step into the boots of Clint McBang, a gunslinger with a special revolver: his bullets can bounce! You have only six shots to take down the bandits across the river. Aim carefully so your bullets ricochet off rocks and hit the bandits. Every shot counts, so be like Clint and master the bounce! Good luck!</p>
<p>WASD to look around, Left Mouse button to Shoot</p>
<p>Code: Ben, Graphics: Roland, Design/Sound: Eddy</p>
<p>Sound Assets are from <a target="_blank" href="https://otologic.jp/">otologic.jp</a></p>
</div>`;

const gitHubLink =
    'https://github.com/EichstaettGamedev/bounce_n_bang';
const phaserLink = 'https://phaser.io/';

export class MainMenuScene extends Scene {
    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        if (!config) {
            config = {};
        }
        config.key = 'MainMenuScene';
        super(config);
    }

    startGame() {
        this.scene.run('UIScene');
        this.scene.switch('GameScene');
    }

    addCreditsLinks() {
        const $links = document.createElement('div');
        $links.innerHTML = `<a href="${gitHubLink}" target="_blank" class="github-link" title="Source code available on GitHub"></a>`;
        $links.innerHTML += `<a href="${phaserLink}" target="_blank" class="phaser-link" title="Made with the Phaser framework"></a>`;
        this.add.dom(this.scale.width - 128, this.scale.height - 48, $links);
    }

    create() {
        if (options.skipMenu) {
            this.startGame();
        }
        this.addCreditsLinks();
        this.scene.run('GameScene');

        const buttons = '<br/><br/><button class="green-button">Start</button>';
        const $intro = document.createElement('div');
        $intro.classList.add('main-menu-text');
        $intro.innerHTML = introHTML + buttons;
        this.add.dom(this.scale.width / 2, 96, $intro).setOrigin(0.5, 0);
        const $button = $intro.querySelector(
            'button.green-button'
        ) as HTMLElement;
        if ($button) {
            $button.addEventListener('click', this.startGame.bind(this));
            $button.focus();
        }
    }

    update(time: number, delta: number) {
        const that = this;
        if (this.input.gamepad?.gamepads[0]) {
            const gamepad = this.input.gamepad.gamepads[0];
            if (gamepad.A) {
                that.startGame();
            }
        }
    }
}
