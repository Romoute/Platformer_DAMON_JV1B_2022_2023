export default class scene_1 extends Phaser.Scene {

    constructor(){

        super({
            key: "scene_1"
    });
}

//MANQUE : ----------------------------------------------
//CA MARCHE PLUS NIQUE TILED
//MÉCANIQUES : 
//wall jump petit
//baisser petit
//attaque grand
////////////////////
// A MODIFIER 
// saut des 2 renards 
//fluidité des controles 


// ennemis 




    // ----- INITIALISATION DES DONNEES DU JOUEUR -----
    // A chaque fonction changement de scene on donnera des donnees qui seront transmises a la nouvelle scene
    // pour par exemple donner la position du joueur, ses points de vie, les objets qu'il a en sa possession etc
    init(data) {

    // Position du sprite joueur
    //  this.positionX = data.x;
    //  this.positionY = data.y; 
    
    }

    preload(){
        
    //preload assets : barre de vie
        this.load.image('hp1', 'assets/hp1.png');
        this.load.image('hp2', 'assets/hp2.png');
        this.load.image('hp3', 'assets/hp3.png');

        this.load.image('chasseur', 'assets/chasseur.png');
        this.load.image('doggo', 'assets/doggo.png');
       

        this.load.image('SpritePetitRenard', 'assets/SpritePetitRenard.png');
        this.load.image('SpriteGrandRenard', 'assets/SpriteGrandRenard.png');
     

        //Preload de la map
        this.load.image("Tileset", "tileset/tileset_1.png");
        this.load.tilemapTiledJSON("scene_1", 'map/scene_1.json');

        this.load.image('SpriteCaillou', 'assets/SpriteCaillou.png');
        this.load.image('SpriteHitbox', 'assets/SpriteHitbox.png');
        
        

    }
    create(){


    //CA CAILLOU
        this.PossibiliteDeBougerLeCaillou = false;

        this.SpriteHitboxVideGauche = this.physics.add.sprite(0, 0, 'SpriteHitbox').setSize(16, 50);
        this.SpriteHitboxVideGauche.body.allowGravity = false;
        this.PossibiliteDeBougerLaBoxAGauche = false;

        this.SpriteHitboxVideDroite = this.physics.add.sprite(0, 0, 'SpriteHitbox').setSize(16, 50);
        this.SpriteHitboxVideDroite.body.allowGravity = false;
        this.PossibiliteDeBougerLaBoxADroite = false;

    //bouger box

        this.IsOnFirstPlayer = true;
        this.speed = 300; 
        this.direction = "left"; 
        this.hp = 3; 
        this.invincible = false;  
        this.invincibleFrame = 60; 

      //  this.player.wallJumping = true;


        this.LancementAttenteF = false
    // Si je veux modifier le temps entre chaque Swap de player
        this.AttenteF = 40;


        const map = this.add.tilemap("scene_1");

//JEU DE TUILE---------------------------------------------------------------------------------------------------------------------------
        const tileset = map.addTilesetImage(
            "tileset_1", 
            "Tileset"
            );

        const background = map.createLayer(
            "background",
            tileset,
        );
        const sol = map.createLayer(
            "sol",
            tileset,
        );


// CRÉATION OBJETs AVEC TILED-----------------------------------------------------------------------------------------------
 

    //Position box
        this.SpriteCaillou = this.physics.add.sprite(430, 300 , "SpriteCaillou").setImmovable(true);
        

        
    //Position joueur
        this.player = this.physics.add.sprite(350, 300 , "SpritePetitRenard"); // 0, 330, ici je change la position de mes chara
        this.playerDeux = this.physics.add.sprite(230, 300, "SpriteGrandRenard");
        this.cameras.main.startFollow(this.player);
        //this.player.body.setSize(32, 32 , 300, 100);
        

        //this.chasseur = this.physics.add.sprite(500, 250, "chasseur");
        //this.doggo = this.physics.add.sprite(500, 300, "doggo");
    
        //this.SpriteHitboxVide

        //this.physics.add.overlap(this.playerDeux, this.this.SpriteHitboxVide, DeplacementTrue(), null, this);
        this.physics.add.collider(this.player, sol);
        this.physics.add.collider(this.playerDeux, sol);
        this.physics.add.collider(this.chasseur, sol);
        this.physics.add.collider(this.doggo, sol);
        this.physics.add.collider(this.box, sol);
        this.physics.add.collider(this.player, this.playerDeux);
        this.physics.add.collider(this.playerDeux, this.player);
        this.physics.add.collider(this.player, this.box);
        this.physics.add.collider(this.playerDeux, this.box);

        //Collisions
        //sol.setCollisionByProperty({estSolide : true});
        sol.setCollisionByExclusion(-1, true);
        background.setCollisionByExclusion(-1, true);


        this.physics.add.collider(this.SpriteCaillou, sol);
    //collisions renard et box
        this.physics.add.collider(this.player, this.SpriteCaillou);
        this.physics.add.collider(this.playerDeux, this.SpriteCaillou, this.PossibiliteDeBougerLaBox, null, this);
        

    //this.physics.add.collider(this.player, this.loseHp, null, this);
        this.physics.add.overlap(this.player, this.loseHp, null, this);

     

        
        
    //hpUI
        this.hpUI = this.add.image(10,10, "hp3").setOrigin(0,0);
        this.hpUI.setScrollFactor(0);
        
    //Clavier 
        this.clavier = this.input.keyboard.addKeys('F,Q,D,SPACE');
        this.cursors = this.input.keyboard.createCursorKeys();
        



    //Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 896, 448);
        this.cameras.main.setBounds(0, 0, 896, 448);
        
    }


    
//POUVOIR BOUGER BOX------------------------------------------------------------------------------------------------

    update(){ 

        //CA C EST LE CAILLOU
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


//LANCEMENT CHRONO ATTENTE POUR F------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (this.LancementAttenteF == true){
            this.AttenteF -- ;
            if (this.AttenteF <= 0){
                this.AttenteF = 40;
                this.LancementAttenteF = false;
            }
        }
      


//SWAP CHARA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
// Déplacement du Joueur 1 
        if (this.cursors.left.isDown && this.IsOnFirstPlayer == true || this.clavier.Q.isDown && this.IsOnFirstPlayer == true){ 
            this.player.setVelocityX(-160); 
        }
        else if (this.cursors.right.isDown && this.IsOnFirstPlayer == true || this.clavier.D.isDown && this.IsOnFirstPlayer == true){ 
            this.player.setVelocityX(160); 
        }
        else{
            this.player.setVelocityX(0);
        }


        if (this.cursors.up.isDown && this.player.body.onFloor() && this.IsOnFirstPlayer == true || this.clavier.SPACE.isDown && this.player.body.onFloor() && this.IsOnFirstPlayer == true){
            this.player.setVelocityY(-300); 
        }
////////////////////////////////WOOOOOO JE VAIS PETER MON CRANE LA 
/*

        if (this.cursors.up.isDown && this.player.body.blocked.right || this.clavier.SPACE.isDown && this.player.body.blocked.right) {
            if (this.player.wallJumping == true) {

                this.player.wallJumping = false;

                this.time.delayedCall(500, () => {
                    this.cdWallJump(); 
                });
           
                this.player.setVelocityY(-200);
                
                
            }
        }
        
        if (this.cursors.up.isDown && this.player.body.blocked.left || this.clavier.SPACE.isDown && this.player.body.blocked.left) {
            if (this.player.wallJumping == true) {

                this.player.wallJumping = false;

                this.time.delayedCall(500, () => {
                    this.cdWallJump(); 
                });

                this.player.setVelocityY(-200);
               
            }    
        }

        cdWallJump() {
            this.player.wallJumping = true;
        }
    
        */

        


// Déplacement du Joueur 2
        if (this.cursors.left.isDown && this.PossibiliteDeBougerLeCaillou == true){
            this.SpriteCaillou.setVelocityX(-150);
        }
        else if (this.cursors.right.isDown && this.SpriteCaillouGoToRight == true){
            this.SpriteCaillou.setVelocityX(150);
        }
        if (this.cursors.left.isDown && this.IsOnFirstPlayer == false || this.clavier.Q.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(-160); 
        }
        else if (this.cursors.right.isDown && this.IsOnFirstPlayer == false || this.clavier.D.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(160); 
        }
        else{
            this.playerDeux.setVelocityX(0);
            this.SpriteCaillou.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false || this.clavier.SPACE.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false){
            this.playerDeux.setVelocityY(-300); 
        }

        


//INVULNERABLE------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (this.invincible){
            console.log(this.invincibleFrame); 
            this.invincibleFrame-- ;
            if(this.invincibleFrame <= 0){
                    this.invincibleFrame = 60;
                    this.player.setTint(0xffffff);
                    this.invincible = false ;
            }
        }


//UI HP-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       
        if(this.hp == 3){
            this.hpUI.setTexture("hp3");
        }
        if(this.hp == 2){
            this.hpUI.setTexture("hp2");
        }
        if(this.hp  == 1){
            this.hpUI.setTexture("hp1");
            
        }else if(this.hp <= 0){
            this.scene.start("scene_1");
        }
    }


// FONCTION LOSE HP------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    loseHp(){
        if (this.invincible == false){
            console.log("Bonjour");
            this.invincible = true;
            this.hp -= 1;
            this.player.setTint(0xff0000);
            this.player.scene.cameras.main.shake(200, 0.01);
        }
    }


}


