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

        game.add.text(game.world.centerX - 400, 100, "Time Spent:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 100, LevelData.timeSpent, {font: "50px Arial", fill: "#fff"}); 

        game.add.text(game.world.centerX - 400, 200, "Raw Points:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 200, LevelData.totalPoints, {font: "50px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 400, 300, "Correctly Sorted:", {font: "50px Arial", fill: "#fff"}); 
        game.add.text(game.world.centerX, 300, LevelData.numberOfCorrect, {font: "50px Arial", fill: "#fff"}); 

        game.add.text(game.world.centerX - 400, 400, "Time Bonus:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 400, LevelData.timeBonus, {font: "50px Arial", fill: "#fff"});

        game.add.text(game.world.centerX - 400, 500, "Total Points:", {font: "50px Arial", fill: "#fff"});
        game.add.text(game.world.centerX, 500, LevelData.totalPoints +  LevelData.timeBonus, {font: "50px Arial", fill: "#fff"});  
    },

    render: function() {

    },
    
    update: function() {
    //Handle Session updates
    //Handle Event Updates

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
