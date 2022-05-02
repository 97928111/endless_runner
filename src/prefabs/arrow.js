class arrow extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add to existing scene
        scene.add.existing(this);
        // pixels per frame
        this.moveSpeed = 10;
    }

    update() {
        // move arrow left
        this.x -= this.moveSpeed;
    }
    // position reset
    reset() {
        this.x = game.config.width;
        this.y = Phaser.Math.Between(gameOptions.batSpawnRangeY[0], gameOptions.batSpawnRangeY[1]);
    }
}