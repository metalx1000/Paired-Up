var shuffler = function(game){}

shuffler.prototype = {
  	create: function(){
                delay = 0;
                xx = item_x;
                var lr = 0;
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
		var gameTitle = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .1,"game_title");
		gameTitle.anchor.setTo(0.5,0.5);
		var exit_btn = this.game.add.button(this.game.world.width * 0.5,this.game.world.height * .2,"exit",this.exit,this);
		exit_btn.anchor.setTo(0.5,0.5);

                bricks = this.game.add.group();
                bricks.enableBody = true;

                item_group = this.game.add.group();
                item_group.enableBody = true;

                this.load_ground();

                //go full screen on click
                this.game.input.onDown.add(this.fullscreen, this);
	},
        update: function(){
                this.game.physics.arcade.collide(item_group, item_group);
                this.game.physics.arcade.collide(item_group, bricks);
                delay-=1;
                if(delay < 0 && xx > 0){
                    xx-=1;
                    delay = 30;
                    console.log(items[xx]);
                    var item = item_group.create(this.game.world.width * 0.5,-64,items[xx]);
                    if(this.lr == 0){
                        this.lr = 1;
                    }else{
                        this.lr = 0;
                    }
                    item.anchor.setTo(this.lr,this.lr);
                    item.scale.setTo(1.5,1.5);
                    item.body.gravity.y = 500;
                    item.body.mass = 0;
                    item.body.bounce.y = 0.5;
        
                }

        },
	exit: function(){
                click.play();
		this.game.state.start("GameTitle");
	},
        fullscreen: function(){
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.startFullScreen();
        },
        get_items: function(){
            _this = this;
            $.getJSON( "data/items.js", function( data ) {
                //shuffle list
                _this.x = data.length;
                for(var j, x, i = data.length; i; j = Math.floor(Math.random() * i), x = data[--i], data[i] = data[j], data[j] = x);
                items = data;
                for(var z;z<data.length;z++){
                    console.log(data[z]);
                    this.game.load.image(data[z],"res/" + data[z] + ".png");
                }
            });
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
