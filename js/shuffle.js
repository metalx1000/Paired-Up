var shuffler = function(game){}

shuffler.prototype = {
  	create: function(){
                delay = 0;
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
		var gameTitle = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .1,"game_title");
		gameTitle.anchor.setTo(0.5,0.5);
		var exit_btn = this.game.add.button(this.game.world.width * 0.5,this.game.world.height * .2,"exit",this.exit,this);
		exit_btn.anchor.setTo(0.5,0.5);

                bricks = this.game.add.group();
                bricks.enableBody = true;

                this.load_ground();

                //go full screen on click
                this.game.input.onDown.add(this.fullscreen, this);
	},
        update: function(){
                //this.game.physics.arcade.collide(players, bricks);
                delay-=1;
        },
	exit: function(){
                click.play();
		this.game.state.start("GameTitle");
	},
        fullscreen: function(){
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.startFullScreen();
        },

        load_item: function(pl, posx, posy, direction){
            if(delay<1){
                delay = 200;
                //animations
                var player = players.create(posx, posy, pl);
                player.anchor.setTo(0.5,0.5);
                player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
                player.animations.add('right', [11,10,9,8,7,6], 10, true);
                player.body.gravity.y = 500;
                player.body.bounce.y = 0.2;
                player.inputEnabled = true;
                player.events.onInputOver.add(this.player_jump,this);

                if(direction == "right"){
                    player.body.velocity.x = 150;
                    player.animations.play('right');
                }else{
                    player.animations.play('left');
                    player.body.velocity.x = -150;
                }
            }
        },

        load_ground: function(){
            for(var x=1;x<3;x++){
                for(var i=0;i< this.game.world.width;i+=64){
                    var brick = bricks.create(i, this.game.world.height - 32 * x, 'brick');
                    brick.body.immovable = true;                
                }
            }
        }

}   
