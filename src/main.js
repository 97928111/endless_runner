/*Names: Danny Chung, Hongyi Bai, Jimmy Lu
Game Title:
Date Completed: 5/2/2022
Creative Tilt Justification:
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
