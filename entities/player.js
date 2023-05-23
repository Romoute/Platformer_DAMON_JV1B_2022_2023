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


    this.LancementAttenteF = false
    // Si je veux modifier le temps entre chaque Swap de player
        this.AttenteF = 40;

    //LANCEMENT CHRONO ATTENTE POUR F------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if (this.LancementAttenteF == true){
        this.AttenteF -- ;
        if (this.AttenteF <= 0){
            this.AttenteF = 40;
            this.LancementAttenteF = false;
        }
    }


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




//ICI LE PLAYER2 PEUT BOUGER LE CAILLOU

   caillouBouger(player2){


    this.PossibiliteDeBougerLeCaillou = false;

    this.SpriteHitboxVideGauche = this.physics.add.sprite(0, 0, 'SpriteHitbox').setSize(16, 50);
    this.SpriteHitboxVideGauche.body.allowGravity = false;
    this.PossibiliteDeBougerLaBoxAGauche = false;

    this.SpriteHitboxVideDroite = this.physics.add.sprite(0, 0, 'SpriteHitbox').setSize(16, 50);
    this.SpriteHitboxVideDroite.body.allowGravity = false;
    this.PossibiliteDeBougerLaBoxADroite = false;


    if (this.physics.overlap(this.playerDeux, this.SpriteHitboxVideGauche)){
        this.PossibiliteDeBougerLaBoxADroite = true;
    }
    else if (this.physics.overlap(this.playerDeux, this.SpriteHitboxVideDroite)){
        this.PossibiliteDeBougerLaBoxAGauche = true;
    }
    else{
        this.PossibiliteDeBougerLaBoxADroite = false;
        this.PossibiliteDeBougerLaBoxAGauche = false;
    }

    if(this.clavier.Q.isDown || this.cursors.left.isDown && this.PossibiliteDeBougerLaBoxAGauche == true){
        this.SpriteCaillou.setVelocityX(-140);
    }
    if(this.clavier.D.isDown || this.cursors.right.isDown && this.PossibiliteDeBougerLaBoxADroite == true){
        this.SpriteCaillou.setVelocityX(140);
    }
    

    this.SpriteHitboxVideDroite.x = this.SpriteCaillou.x + 40;
    this.SpriteHitboxVideDroite.y = this.SpriteCaillou.y

    this.SpriteHitboxVideGauche.x = this.SpriteCaillou.x - 40;
    this.SpriteHitboxVideGauche.y = this.SpriteCaillou.y


   }


}
