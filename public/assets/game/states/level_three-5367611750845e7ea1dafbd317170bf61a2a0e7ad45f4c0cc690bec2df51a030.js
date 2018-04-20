//LevelThree game execution 

var curScore;
var stateThree = true;
var LevelThree = function(game){

}

LevelThree.prototype = {
//Phaser Core Functions

    preload: function(){
    //Dynamic Assets - Items from /items 
        console.log("Preloading LevelThree...");
        Session.items = game.cache.getJSON('levelThreeItems');
        this.loadLevelThreeItems();
    },

    create: function() {
    //Get Cached JSON to load 
        console.log("Creating LevelThree...");
    //Set Game Properties
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#d1e4c8';
    //Display Static Assets
        game.add.tileSprite(0, 0, 1250, 750, 'backgroundImage');      
        foodBinSprite = game.add.sprite(30,570, "foodScrapsBinImage");
        garbageBinSprite = game.add.sprite(330,570, "garbageBinImage");
        paperBinSprite = game.add.sprite(630,570, "paperBinImage");
        recycleBinSprite = game.add.sprite(930,570, "recycleBinImage");
        clockSprite = game.add.sprite(200,20, "clock");
        levelThreeButtonSprite = game.add.sprite(50,30, "levelThreeButton");

        game.physics.enable([recycleBinSprite,foodBinSprite,garbageBinSprite,paperBinSprite], Phaser.Physics.ARCADE);

    //Set Groups
        sortable_items_group = game.add.group();
        sortable_items_group.inputEnableChildren = true;

    //Timer
        Session.startTime = new Date();
        Session.startItemTime = 120; //set for the first item 
        Session.totalTime = 120; //Defines how long the game is 
        Session.timeElapsed = 0;
        Session.levelCounter = 1;
        UIManager.createTimer(); //sets up timer ui

        Session.gameTimer = game.time.events.loop(100, function(){ SessionManager.updateTimer()});
    
    //Set the first item
        SessionManager.setNextItem(this);


        console.log("LevelThree completed");
    },

    render: function() {
        

    },
    
    update: function() {
    //Handle Session updates
    game.physics.arcade.overlap(Session.currentSprite, [recycleBinSprite,garbageBinSprite,paperBinSprite,recycleBinSprite,foodBinSprite], this.collisionCallback, null, this);
    //Handle Event Updates
    if(Session.levelCompleteFlag == true){
        StatsManager.computeLevelData(Session);
        APIManager.postResponses(Session.responses)
        SessionManager.clearSession();
        game.state.start('levelThreeSummary');

    }

    },
    //Callback on overlap, checked on update()
    collisionCallback: function(obj1, obj2){
        console.log(obj1.key)
        console.log(obj2.key)
        console.log(Session.currentItem)
        Bin.recieveItem(Session.currentItem,obj2.key, this);
    },

//Helpers
    loadLevelThreeItems: function(){  
        console.log("Loading Level Three Items..");
        //Sortable Item Images
        for (var index in Session.items) {
            console.log("Loading image: " + Session.items[index].name + "\n@" + Session.items[index].image_url.url + "\n");
            game.load.image(Session.items[index].name, Session.items[index].image_url.url);
        }
        //Background Images

    }

}




;
