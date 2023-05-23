export default class player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        //Clavier 
        
        this.clavier = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('F,Q,D,SPACE');


        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setColliderWorldBounds(true);

    }

    updatePlayer(){
//DÉPLACEMENTS JOUEURS-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Déplacement du Joueur 1 
        if (this.clavier.left.isDown && this.IsOnFirstPlayer == true || this.clavier.Q.isDown && this.IsOnFirstPlayer == true){ 
            this.player.setVelocityX(-160); 
        }
        else if (this.clavier.right.isDown && this.IsOnFirstPlayer == true || this.clavier.D.isDown && this.IsOnFirstPlayer == true){ 
            this.player.setVelocityX(160); 
        }
        else{
            this.player.setVelocityX(0);
        }


        if (this.clavier.up.isDown && this.player.body.onFloor() && this.IsOnFirstPlayer == true || this.clavier.SPACE.isDown && this.player.body.onFloor() && this.IsOnFirstPlayer == true){
            this.player.setVelocityY(-300); 
        }

// Déplacement du Joueur 2
        if (this.clavier.left.isDown && this.PossibiliteDeBougerLeCaillou == true){
            this.SpriteCaillou.setVelocityX(-150);
        }
        else if (this.clavier.right.isDown && this.SpriteCaillouGoToRight == true){
            this.SpriteCaillou.setVelocityX(150);
        }
        if (this.clavier.left.isDown && this.IsOnFirstPlayer == false || this.clavier.Q.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(-160); 
        }
        else if (this.clavier.right.isDown && this.IsOnFirstPlayer == false || this.clavier.D.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(160); 
        }
        else{
            this.playerDeux.setVelocityX(0);
            this.SpriteCaillou.setVelocityX(0);
        }

        if (this.clavier.up.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false || this.clavier.SPACE.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false){
            this.playerDeux.setVelocityY(-300); 
        }

        

   }

//Ici c'est le SWAP entre mes deux renards------------------------------------------------------------------------------------------------------------------------------------
   swapPlayer(player2){


    if (this.clavier.F.isDown){
        if (this.IsOnFirstPlayer == true && this.AttenteF == 40){
            this.IsOnFirstPlayer = false;
            this.LancementAttenteF = true;
            this.cameras.main.startFollow(this.playerDeux);
        }
        else if (this.IsOnFirstPlayer == false && this.AttenteF == 40){
            this.LancementAttenteF = true;
            this.IsOnFirstPlayer = true;
            this.cameras.main.startFollow(this.player);
        }
        
    }

   }
}
