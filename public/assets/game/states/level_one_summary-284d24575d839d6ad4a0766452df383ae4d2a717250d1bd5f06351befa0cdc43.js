//LevelSummary game execution
var LevelOneSummary = function(game){

}

LevelOneSummary.prototype = {
    //
    // preload: function(){
    //
    // },

    create: function() {
        console.log("Creating LevelOneSummary...");
        var sprite = game.add.sprite(420, 10,"levelReview");

        game.add.text(game.world.centerX - 130, 150, "Level :", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX ,  150, "1", {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX + 110, 125, LevelData.numberOfIncorrect, {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 85 , 165, "Incorrect", {font: "17px Arial", fill: "#fff"});


        game.add.text(game.world.centerX - 130, 260, "Level Time(s):", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  260, LevelData.levelTime, {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 130, 360, "Level Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  360, LevelData.totalPoints, {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 130, 460, "Total Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  460, GameData.totalScore, {font: "25px Arial", fill: "#fff"});

        var levelTwoButton = game.add.sprite(game.world.centerX-50,700, "nextButton");

        levelTwoButton.inputEnabled = true;
        levelTwoButton.events.onInputDown.add(this.actionOnClick);

        TOTAL_TIME += LevelData.levelTime;
    },

    render: function() {

    },

    update: function() {
    //Handle Session updates
    //Handle Event Updates

    },

    actionOnClick: function(){
        UIManager.removeIncorrectMessage();
        SessionManager.clearLevelData();
        game.state.start('levelTwoState', Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
    }

}
;
