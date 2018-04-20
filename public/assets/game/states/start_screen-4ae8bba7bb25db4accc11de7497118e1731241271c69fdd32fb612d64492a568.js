
var StartScreen = function(game){

}

StartScreen.prototype = {
//Phaser Core Functions

    preload: function(){

    },

    create: function() {
        console.log("Creating Start Screen...");
    //Display Static Assets
        game.add.tileSprite(0, 0, 1250, 750, 'backgroundImage');
        var startTitleSprite = game.add.sprite(350, 200, "startGameTitle");
        var startButtonSprite = game.add.button(500, 500, "startButton");
        music = game.add.audio('themeMusic');
        //music.play();

        startButtonSprite.inputEnabled = true;
        startButtonSprite.events.onInputDown.add(this.actionOnClick);
    },

    render: function() {


    },

    update: function() {

    },

    actionOnClick: function(){
      console.log("game started");
      game.state.start("levelOneState", Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
    }

}
;
