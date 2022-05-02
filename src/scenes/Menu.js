class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
    
    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('bgm', './assets/endless_runner.mp3');
        this.load.audio('jump', './assets/Jump.wav');
        this.load.image('menubackground', './assets/menubg.png');
    }
    
    create() {
        let menuConfig = {
            fontFamily: 'Palatino Linotype',
            fontSize: '150px',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //menu background
        this.menubackground = this.add.tileSprite(0, 0, 1280, 960, 'menubackground').setOrigin(0, 0);
        // title text
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'Dungeon Runner', menuConfig).setOrigin(0.5);

        // start button
        menuConfig.fontSize = "100px";
        let start = this.add.text(game.config.width/2, game.config.height/2 + 100, 'Start', menuConfig).setOrigin(0.5);
        start.setInteractive();
        start.on('pointerover', () => {
            start.setScale(1.3);
        })
        start.on('pointerout', () => {
            start.setScale(1);
        }) 
        start.on('pointerdown', () => {
            this.scene.start("playScene");
            this.sound.play('sfx_select');
        })

        //controls text
        let control = this.add.text(game.config.width/2, game.config.height/2 + 250, 'Controls', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '40px';
        this.add.text(game.config.width/2, game.config.height/2 + 320, '↑ to Jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 370, '← for left', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 420, '→ for right', menuConfig).setOrigin(0.5);

        //loop background music
        var music = this.sound.add('bgm');
        music.setLoop(true);
        music.play();
    }
}

class GameMenu extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
    
    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
    }

    init (data) {
        this.finalscore = data.score;
    }
    
    create() {
        let endConfig = {
            fontFamily: 'Palatino Linotype',
            fontSize: '100px',
            color: 'red',
            align: 'center',
        }

        //game over text
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'GAME OVER', endConfig).setOrigin(0.5);

        //restart button
        endConfig.fontSize = "60px";
        this.add.text(game.config.width/2, game.config.height/2 - 100, 'Score: ' + this.finalscore, endConfig).setOrigin(0.5);
        let restart = this.add.text(game.config.width/2, game.config.height/2 + 50, 'RESTART', endConfig).setOrigin(0.5);
        restart.setInteractive();
        restart.on('pointerover', () => {
            restart.setScale(1.3);
        })
        restart.on('pointerout', () => {
            restart.setScale(1);
        }) 
        restart.on('pointerdown', () => {
            this.scene.start("playScene");
            //this.sound.play('sfx_select');
        })

        //return to main menu button
        let main = this.add.text(game.config.width/2, game.config.height/2 + 150, 'MAIN MENU', endConfig).setOrigin(0.5);
        main.setInteractive();
        main.on('pointerover', () => {
            main.setScale(1.3);
        })
        main.on('pointerout', () => {
            main.setScale(1);
        }) 
        main.on('pointerdown', () => {
            this.scene.start("mainScene");
            //this.sound.play('sfx_select');
        })
    }
}
