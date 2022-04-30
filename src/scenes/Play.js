class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("platform", './assets/layer.png');
        this.load.atlas("character",'./assets/endless_charac-sheet.png','./assets/endless_charac.json');
        this.load.image('spaceship', './assets/spaceship.png');
        
    }

    create() 
    {
        //this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3,gameOptions.batSpawnRangeY, 'spaceship', 0).setOrigin(0,0);
        //animation for character
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('character', {prefix:"endless_charac ", start: 0, end: 3, zeroPad: 1, suffix: ".png"}),
            duration: 500,
            delayRepeat: 500,
            repeat: -1
        });

        this.anims.create({
            key: 'standing',
            frames: this.anims.generateFrameNames('character', {prefix:"endless_charac ", start: 1, end: 1, zeroPad: 1, suffix: ".png"}),
            duration: 500,
            delayRepeat: 500,
            repeat: -1
        });

        this.score = 0;
        this.scoretext = this.add.text(16, 16, 'Score: ' + this.score, {fontSize: '32px'});

        this.platformGroup = this.add.group({
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // pool
        this.platformPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "character");
        this.player.setGravityY(gameOptions.playerGravity);
 
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);
 
        // checking for input
        this.input.on("pointerdown", this.jump, this);

        cursors = this.input.keyboard.createCursorKeys();
    }
 
    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX) {
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else{
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }

    jump() {
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))
        {
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
        }
    }

    update() 
    {
        if(cursors.left.isDown)
        {
            this.player.setVelocityX(-300);
            this.player.anims.play('running',true);
        }
        else if(cursors.right.isDown)
        {
            this.player.setVelocityX(400);
            this.player.anims.play('running',true);
        }
        else
        {
            if(this.player.body.touching.down)
            {
                this.player.setVelocityX(0);
                this.player.anims.play('standing',true)
            }
        }
        
        // game over12
        if(this.player.y > game.config.height){
            this.scene.start("endScene", {score: this.score});
        }
        if(this.player.x < game.config.width/1280){
            this.scene.start("endScene", {score: this.score});
        }
        
        //this.player.x = gameOptions.playerStartPosition;

        // recycling platformss
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
                this.score += 10;
                this.scoretext.text = 'Score: ' + this.score;
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }
    }   
};

function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}