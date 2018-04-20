//Global Strings
var resultString = "Drag the image";
var overlapString = "No objects touching"
//Global Bins 
var food_bin;
var garbage_bin;
var paper_bin;
var recycle_bin;
var level_score;
//Global Current State - User Session
var timeDifference = 0;


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
      //Scoring 
      game.load.image('checkmark', 'checkmark.png');
      game.load.image('cross', 'cross.png');
      //Bins
      game.load.image('foodScrapsBinImage', 'https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/FoodBin.png');
      game.load.image('garbageBinImage', 'https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/GarbageBin.png');
      game.load.image('paperBinImage', 'https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/PaperBin.png');
      game.load.image('recycleBinImage', 'https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/RecyclableBin.png');
      //Background
      game.load.image("backgroundImage", "https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/BackgroundImage.png");
      //Scoreboard
      game.load.image("correctCircleImage", "https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/CorrectCircle.png");
      game.load.image("incorrectCircleImage", "https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/IncorrectCircle.png")
      //Level Buttons
      game.load.image("levelOneButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/Level1Button.png");
      //Clock
      game.load.image("clock","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/Clock.png");
      //StartScren
      game.load.image("startGameTitle","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/GameTitle.png");
      game.load.image("startButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/StartButton.png");
      // game.load.image("levelOneButton","https://s3.ca-central-1.amazonaws.com/sorting-items/static-assets/Level1Button.png");
    },

    loadJSONAssets: function(){
      game.load.json('items', '/items');
    },

    loadGameStates: function(){
        game.state.add("startState", StartScreen);
        game.state.add("levelOneState", LevelOne);
        game.state.add('levelTwoState', LevelTwo);
        game.state.add("levelSummaryState", LevelSummary);
    },

    createModels: function(){
    //Construct bins from bin model in bin.js. Name is suffixed with image due to Sprite references only having this name. 
        recycle_bin  = new Bin(1, "recycleBinImage");
        garbage_bin  = new Bin(2, "garbageBinImage");
        food_bin  = new Bin(3, "foodScrapsBinImage");
        paper_bin  = new Bin(4, "paperBinImage");
       
        console.log(Bin.allBins); //auto added on bin creation
    }

}

//Initialize 
var game = new Phaser.Game(1250, 750, Phaser.CANVAS, 'game-container')
game.state.add('Boot', Boot);
game.state.start('Boot');
