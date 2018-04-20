$( document ).ready(function() {
    $('#leaderboard-container').hide();
});

//Global Bins
var food_bin;
var garbage_bin;
var paper_bin;
var recycle_bin;
// //Global Current State - User Session
// var timeDifference = 0;


//Boot State to get json files
var Boot = function(game){

}

Boot.prototype = {

//Phaser Core
    preload: function(){
        console.log('Boot State Preload...');
    //JSON Assets
        this.loadJSONAssets();
    //Static Assets
        this.loadStaticAssets();
    //States
        this.loadGameStates();
    //Game Models
        this.createModels();
    },

    create: function(){
        console.log('Boot State Create...');

        game.state.start("startState"); //Switch to Main
    },
//Helpers
    loadStaticAssets: function(){
      //Bins
      game.load.image('foodScrapsBinImage', '/assets/game/static/food_bin.png');
      game.load.image('garbageBinImage', '/assets/game/static/garbage_bin.png');
      game.load.image('paperBinImage', '/assets/game/static/paper_bin.png');
      game.load.image('recycleBinImage', '/assets/game/static/recycle_bin.png');
      //Background
      game.load.image("backgroundImage", "/assets/game/static/background_image.png");
      //Scoreboard
      game.load.image("correctCircleImage", "/assets/game/static/correct_circle.png");
      game.load.image("incorrectCircleImage", "/assets/game/static/incorrect_circle.png");
      game.load.image("emptyBlueCircle", "/assets/game/static/BlueButton.png");
      //Level Buttons
      game.load.image("levelOneButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/Level1Button.png");
      game.load.image("levelTwoButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/Level2Button.png");
      game.load.image("levelThreeButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/Level3Button.png");
      //Clock
      game.load.image("clock","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/Clock.png");
      //StartScren
      game.load.image("startGameTitle","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/GameTitle.png");
      game.load.image("startButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/StartButton.png");

      game.load.image("nextButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/NextButton.png");

      game.load.image("levelReview","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/LevelReview.png");

      game.load.image("learnMoreButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/LearnMore.png");

      game.load.image("timerBarContainer","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/LoadingBar.png");
      game.load.image("redBar", "https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/PlayerRedBar.png");
      game.load.image("star", "https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/star.png");
      //Audio
      game.load.image("audioToggle", "/assets/game/static/SoundToggle.png");
      game.load.audio("correctSound", "/assets/game/static/CorrectSound.mp3");
      game.load.audio("incorrectSound", "/assets/game/static/IncorrectSound.mp3");
    },

    loadJSONAssets: function(){
      var itemsPerLevel = 5;
      game.load.json('levelOneItems', '/items/level?id=1&number=' + itemsPerLevel);
      game.load.json('levelTwoItems', '/items/level?id=2&number=' + itemsPerLevel);
      game.load.json('levelThreeItems', '/items/level?id=3&number=' + itemsPerLevel);
    },

    loadGameStates: function(){
        game.state.add("startState", StartScreen);
        game.state.add("levelOneState", LevelOne);
        game.state.add("levelOneSummary", LevelOneSummary);
        game.state.add('levelTwoState', LevelTwo);
        game.state.add("levelTwoSummary", LevelTwoSummary);
        game.state.add('levelThreeState', LevelThree);
        game.state.add("levelThreeSummary", LevelThreeSummary);

        //game.state.add("levelOneSummary", LevelTwoSummary);
        game.state.add("levelSummaryState", LevelSummary);

    },

    createModels: function(){
    //Construct bins from bin model in bin.js. Name is suffixed with image due to Sprite references only having this name.
        var recycle_bin  = new Bin(2, "recycleBinImage");
        var garbage_bin  = new Bin(1, "garbageBinImage");
        var food_bin  = new Bin(3, "foodScrapsBinImage");
        var paper_bin  = new Bin(4, "paperBinImage");

        console.log(Bin.allBins); //auto added on bin creation
    }

}

//Initialize
var game = new Phaser.Game(1250, 750, Phaser.CANVAS, 'game-container');
//game.stage.scale.startFullScreen();
game.state.add('Boot', Boot);
game.state.start('Boot');
