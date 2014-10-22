var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
		var gameTitle = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .1,"game_title");
		gameTitle.anchor.setTo(0.5,0.5);

                var play = this.create_button(this.game.world.width * 0.5,this.game.world.height * .4,"play_btn","Shuffle");
                var info = this.create_button(this.game.world.width * 0.9,this.game.world.height * .9,"info","info");
                //this.main_title();

                mute = false;
                mute_btn = this.game.add.button(this.game.world.width * 0.9, 10, 'mute', this.mute, this);
                //go full screen on click
                this.game.input.onDown.add(this.fullscreen, this);
	},
        update: function(){
            
        },
        create_button: function(x,y,img,state){
            var btn = this.game.add.button(x,y,img,this.change_state,this);
            btn.state = state;
            btn.anchor.setTo(0.5,0.5);
            btn.events.onInputOver.add(function(_this){
                var tween = _this.game.add.tween(_this.scale)
                    .to({ x: 1.5, y: 1.5 }, 200)
                    .to({ x: 1, y: 1 }, 400)
                    .start();
            });
        },
        change_state: function(_this){
            click.play();
            this.game.state.start(_this.state);            
        },
	playTheGame: function(){
                click.play();
		this.game.state.start("TheGame");
	},
        fullscreen: function(){
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.startFullScreen();
        },

        main_title: function(){
                title = this.game.add.sprite(this.game.world.width * 0.5,this.game.world.height * .5,"main_title");
                title.inputEnabled = true;
                title.events.onInputDown.add(this.krisWeb,this);
                title.anchor.setTo(0.5,0.5);
        },
        mute: function(){
            if(mute == false){
                mute = true;
                music.stop();
                mute_btn.frame = 1;
            }else{
                mute = false;
                music.play();
                mute_btn.frame = 0;
            }
        }
}   
