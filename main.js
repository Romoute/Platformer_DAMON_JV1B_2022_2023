import menu from './menu.js';
import scene_1 from './scene_1.js';




// ----- CONFIGURATION INITIALE -----
var config = {
    type: Phaser.AUTO,
    width: 896, height: 448,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },

    // Ajout des differentes scenes dans le jeu (donc la toutes les prochaines scenes que tu fais tu les met la dedans avec une virgule)
    scene: [menu, scene_1],
    fps: {
        target: 60,
        forceSetTimeOut: true
      },
};
var game = new Phaser.Game(config);
game.scene.start("menu");