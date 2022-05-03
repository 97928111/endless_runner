/*Names: Danny Chung, Hongyi Bai, Jimmy Lu
Game Title: Dungeon Runner
Date Completed: 5/2/2022
Creative Tilt Justification: For the technique part, we are really pround of the
                             double jump and the random spawn error.(5)
                             For the visual style, we are really proud of the music and the background art
                             that really fit the idea of dungeon. We are trying to give the player a creepy
                             feeling when they play the game.(5)
Basic code idea from:
https://www.emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/
*/

let game;
 
// global game options
let gameOptions = {
    platformStartSpeed: 350,
    batSpawnRangeY:[300,740],
    spawnRange: [100, 350],
    platformSizeRange: [100, 250],
    playerGravity: 900,
    jumpForce: 500,
    playerStartPosition: 300,
    jumps: 2
}
 
window.onload = function() {
 
    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1280,
        height: 960,
        scene: [MainMenu, Play, GameMenu],
        backgroundColor: 0x444444,
 
        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

var cursors;
let keyUP;
