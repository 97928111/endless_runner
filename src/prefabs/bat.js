class bat extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        // add to existing scene
        scene.add.existing(this);
        // pixels per frame
        this.moveSpeed = 8;
    }

    update()
    {
        // move spaceship left
        this.x -= this.moveSpeed;

        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width)
        {
            this.reset();
        }

    }
    // position reset
    reset()
    {
        this.x = game.config.width;
        this.y = Phaser.Math.Between(gameOptions.batSpawnRangeY[0], gameOptions.batSpawnRangeY[1]);
    }
}