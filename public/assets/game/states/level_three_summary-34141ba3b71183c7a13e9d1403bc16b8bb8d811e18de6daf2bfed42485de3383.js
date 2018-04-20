//LevelSummary game execution 
var LevelThreeSummary = function(game){

}

LevelThreeSummary.prototype = {
//Phaser Core Functions

    // init: function(){
    //     console.log("Init LevelSummary...");
    // },

    preload: function(){

    },

    create: function() {
    //Get Cached JSON to load 
        console.log("Creating LevelThreeSummary...");
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

        var sprite = game.add.sprite(420,100,"levelReview");

        // game.add.text(game.world.centerX - 400, 100, "numberOfCorrect", {font: "20px Arial", fill: "#fff"});
        // game.add.text(game.world.centerX, 100, LevelData.numberOfCorrect, {font: "20px Arial", fill: "#fff"}); 

        game.add.text(game.world.centerX - 130, 240, "Level :", {font: "25px Arial", fill: "#fff"}); 
        game.add.text(game.world.centerX ,  240, "3", {font: "25px Arial", fill: "#fff"}); 

        game.add.text(game.world.centerX + 110, 250, LevelData.numberOfIncorrect, {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 85 , 230, "Incorrect", {font: "17px Arial", fill: "#fff"});
       

        game.add.text(game.world.centerX - 130, 350, "Level Time(s):", {font: "25px Arial", fill: "#fff"}); 
        game.add.text(game.world.centerX + 80,  350, LevelData.levelTime, {font: "25px Arial", fill: "#fff"}); 

        game.add.text(game.world.centerX - 130, 450, "Level Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  450, LevelData.totalPoints, {font: "25px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 130, 550, "Total Points:", {font: "25px Arial", fill: "#fff"});
        game.add.text(game.world.centerX + 80,  550, GameData.totalScore, {font: "25px Arial", fill: "#fff"}); 

        var levelEndButton = game.add.sprite(game.world.centerX-50,700, "nextButton");

        levelEndButton.inputEnabled = true;
        levelEndButton.events.onInputDown.add(this.actionOnClick);

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
        Leaderboard.show(GameData.totalScore,TOTAL_TIME);
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
