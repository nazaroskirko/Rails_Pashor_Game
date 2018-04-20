
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
        var learnMoreButton = game.add.button(20,690, "learnMoreButton")
        //music = game.add.audio('themeMusic');
        //music.play();

        startButtonSprite.inputEnabled = true;
        startButtonSprite.events.onInputDown.add(this.actionOnClick);

        learnMoreButton.inputEnabled = true;
        learnMoreButton.events.onInputDown.add(this.learnMore);
    },

    render: function() {


    },

    update: function() {

    },

    actionOnClick: function(){
      console.log("game started");
      game.state.start("levelOneState", Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
    },

    learnMore: function(){
      console.log('learnmore');
      $('#game-container').append(`
        <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        `)
    }

}
;
