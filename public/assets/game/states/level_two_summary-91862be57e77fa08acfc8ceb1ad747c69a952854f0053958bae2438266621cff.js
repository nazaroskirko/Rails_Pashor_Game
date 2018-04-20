//LevelSummary game execution
var LevelTwoSummary = function(game){

}

LevelTwoSummary.prototype = {

    create: function() {
    //Get Cached JSON to load
        console.log("Creating LevelTwoSummary...");

        var sprite = game.add.sprite(420,10,"levelReview");

        // game.add.text(game.world.centerX - 400, 100, "numberOfCorrect", {font: "20px Arial", fill: "#fff"});
        // game.add.text(game.world.centerX, 100, LevelData.numberOfCorrect, {font: "20px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 130, 150, "Level :", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX ,  150, "2", {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX + 110, 125, LevelData.numberOfIncorrect, {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 85 , 165, "Incorrect", {font: "17px Arial", fill: "#fff"});


        game.add.text(game.world.centerX - 130, 260, "Level Time(s):", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  260, LevelData.levelTime, {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 130, 360, "Level Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  360, LevelData.totalPoints, {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 130, 460, "Total Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  460, GameData.totalScore, {font: "25px Arial", fill: "#fff"});

        var levelThreeButton = game.add.sprite(game.world.centerX-50,700, "nextButton");

        levelThreeButton.inputEnabled = true;
        levelThreeButton.events.onInputDown.add(this.actionOnClick);

        TOTAL_TIME += LevelData.levelTime;
    },

    render: function() {

    },

    update: function() {
    //Handle Session updates
    //Handle Event Updates

    },

    actionOnClick: function(){
        console.log("pressed");
        UIManager.removeIncorrectMessage();
        SessionManager.clearLevelData();
        game.state.start('levelThreeState', Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
    }

}
;
