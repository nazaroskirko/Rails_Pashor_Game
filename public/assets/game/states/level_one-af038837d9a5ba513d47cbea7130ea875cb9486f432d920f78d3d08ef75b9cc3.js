//LevelOne game execution 

var curScore;
var stateOne = true;
var LevelOne = function(game){

}

LevelOne.prototype = {
//Phaser Core Functions

    preload: function(){
    //Dynamic Assets - Items from /items 
        console.log("Preloading LevelOne...");
        Session.items = game.cache.getJSON('items');
        this.loadLevelOneItems();
    },

    create: function() {
    //Get Cached JSON to load 
        console.log("Creating LevelOne...");
    //Set Game Properties
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#d1e4c8';
    //Display Static Assets
        game.add.tileSprite(0, 0, 1170, 585, 'backgroundImage');      
        foodBinSprite = game.add.sprite(0,570, "foodScrapsBinImage");
        garbageBinSprite = game.add.sprite(300,570, "garbageBinImage");
        paperBinSprite = game.add.sprite(600,570, "paperBinImage");
        recycleBinSprite = game.add.sprite(900,570, "recycleBinImage");

        game.physics.enable([recycleBinSprite,foodBinSprite,garbageBinSprite,paperBinSprite], Phaser.Physics.ARCADE);

        curScore = game.add.text(700,40, "Score:" , { fontSize: '32px', fill: '#000' });
    //Set Groups
        sortable_items_group = game.add.group();
        sortable_items_group.inputEnableChildren = true;

    //Timer
        Session.startTime = new Date();
        Session.totalTime = 120;
        Session.timeElapsed = 0;
        UIManager.createTimer(); //sets up timer ui

        Session.gameTimer = game.time.events.loop(100, function(){ SessionManager.updateTimer();});
 
    //Set the first item
        SessionManager.setNextItem(this);


        console.log("LevelOne completed");
    },

    render: function() {
        game.debug.text(resultString, 10, 20);
        game.debug.text(overlapString, 10, 40);

    },
    
    update: function() {
    //Handle Session updates
    game.physics.arcade.overlap(Session.currentSprite, [recycleBinSprite,garbageBinSprite,paperBinSprite,recycleBinSprite,foodBinSprite], this.collisionCallback, null, this);
    //Handle Event Updates
    if(Session.levelCompleteFlag == true){
        game.state.start('levelSummaryState');
    }

    },

    collisionCallback: function(obj1, obj2){
        console.log(obj1.key)
        console.log(obj2.key)
        console.log(Session.currentItem)
        Bin.recieveItem(Session.currentItem,obj2.key, this);
    },


//Helpers


    loadLevelOneItems: function(){  
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
