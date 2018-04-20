//LevelSummary game execution 
var LevelOneSummary = function(game){

}

LevelOneSummary.prototype = {
//Phaser Core Functions

    // init: function(){
    //     console.log("Init LevelSummary...");
    // },

    preload: function(){

    },

    create: function() {
    //Get Cached JSON to load 
        console.log("Creating LevelOneSummary...");
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
// var LevelData = {
//     numberOfCorrect: 0,
//     numberOfIncorrect: 0,
//     levelTime: 0,
//     totalPoints: 0,
//     timeBonus: 0
// }    

        var sprite = game.add.sprite(300,100,"levelReview");

        // game.add.text(game.world.centerX - 400, 100, "numberOfCorrect", {font: "20px Arial", fill: "#fff"});
        // game.add.text(game.world.centerX, 100, LevelData.numberOfCorrect, {font: "20px Arial", fill: "#fff"}); 

        game.add.text(game.world.centerX - 300, 300, "# Incorrect", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 300, LevelData.numberOfIncorrect, {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 300, 400, "Level Time(s):", {font: "25px Arial", fill: "#fff"}); 
        game.add.text(game.world.centerX, 400, LevelData.levelTime, {font: "25px Arial", fill: "#fff"}); 

        game.add.text(game.world.centerX - 300, 500, "Level Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 500, LevelData.totalPoints, {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 300, 600, "Total Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 600, GameData.totalScore, {font: "25px Arial", fill: "#fff"}); 

        var levelTwoButton = game.add.sprite(470,700, "nextButton");

        levelTwoButton.inputEnabled = true;
        levelTwoButton.events.onInputDown.add(this.actionOnClick);
    },

    render: function() {

    },
    
    update: function() {
    //Handle Session updates
    //Handle Event Updates

    },

    actionOnClick: function(){
        console.log("pressed");
        SessionManager.clearLevelData();
        game.state.start('levelTwoState');
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




;
