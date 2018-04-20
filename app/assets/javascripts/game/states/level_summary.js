//LevelSummary game execution
var LevelSummary = function(game){

}

LevelSummary.prototype = {
//Phaser Core Functions

    // init: function(){
    //     console.log("Init LevelSummary...");
    // },

    preload: function(){

    },

    create: function() {
    //Get Cached JSON to load
        console.log("Creating LevelSummary...");

        console.log("LevelSummary completed");
// var GameData = {
//   levelOneScore: 0,
//   levelTwoScore: 0,
//   levelThreeScore: 0,
//   levelOneTime: 0,
//   levelTwoTime: 0,
//   levelThreeTime: 0,
//   totalScore: 0,
//   version: 1,
//   numberOfCorrect: 0,
//   numberofIncorrect: 0,
//   validUser: true
//


        game.add.text(game.world.centerX - 400, 100, "Lvl 1:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 100, GameData.levelOneScore, {font: "50px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 400, 200, "Lvl 2:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 200, GameData.levelTwoScore, {font: "50px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 400, 300, "Correctly Sorted:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 300, GameData.numberOfCorrect, {font: "50px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 400, 400, "numberofIncorrect:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 400, GameData.numberOfIncorrect, {font: "50px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 400, 500, "Total Points:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 500, GameData.totalScore, {font: "50px Arial", fill: "#fff"});

        var levelOneButtonSprite = game.add.sprite(50,30, "nextButton");

        levelOneButtonSprite.inputEnabled = true;
        levelOneButtonSprite.events.onInputDown.add(this.actionOnClick);
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
        Leaderboard.show(GameData.totalScore);
    },



//Helpers


    loadLevelSummaryItems: function(){
        console.log("Loading Level One Items..");
        //Sortable Item Images
        for (var index in Session.items) {
            console.log("Loading image: " + Session.items[index].name + "\n@" + Session.items[index].image_url.url + "\n");
            game.load.image(Session.items[index].name, Session.items[index].image_url.url);
        }
        //Background Images

    }

}
