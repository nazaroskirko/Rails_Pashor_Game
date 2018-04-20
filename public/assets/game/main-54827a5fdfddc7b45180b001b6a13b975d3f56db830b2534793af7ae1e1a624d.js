
    //Global Strings
    var resultString = "Drag the image";
    var overlapString = "No objects touching"
    //Global Bins 
    var food_bin;
    var garbage_bin;
    var plastic_bin;
    var recycle_bin;
    //Global Current State Vars
    var items = [];
    var current_item;
    var item_counter = 0;

//Main game execution 
var Main = function(game){

}

Main.prototype = {
//Phaser Core Functions
    init: function(){
        console.log("Init Main...");
    },
    preload: function(){
    //Dynamic Assets - Items from /items 
        console.log("Preloading Main...");
        items = game.cache.getJSON('items');
        console.log(items);
        this.loadGameItems();
    //Static Assets 
        this.loadStaticAssets();
    //States
        this.loadGameStates();
        console.log("Preloading Main Complete");

    },

    create: function() {
    //Get Cached JSON to load 
        console.log("Creating Main...");
        items = game.cache.getJSON('items');
    //Set Game Properties
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#cccfff';
    //Display Static Assets 
        food_bin = game.add.sprite(0,570, "foodScrapsBin");
        garbage_bin = game.add.sprite(300,570, "garbageBin");
        plastic_bin = game.add.sprite(600,570, "paperBin");
        recycle_bin = game.add.sprite(900,570, "recycleBin");
    //Set Groups
        sortable_items_group = game.add.group();
        sortable_items_group.inputEnableChildren = true;
    //Set the first item
        this.setNextItem();
        console.log("Main completed");
    },

    render: function() {
        game.debug.text(resultString, 10, 20);
        game.debug.text(overlapString, 10, 40);

    },
    
    update: function() {
        var collision = this.overlap();

        if (collision)
        {
            overlapString = 'Collided with:' + this.key
        //Increment the counter 
            item_counter++;
            this.setNextItem();
            //game.state.start("menu-state");
            console.log('menu started1');
        }
        else
        {
            overlapString = 'No collision detected';
        }

    },

//Helpers

    loadGameItems: function(){
        //items is a global variable holding the json response from /items endpoint  
        console.log(items);

        for (var index in items) {
            console.log("Loading image: " + items[index].name + "\n@" + items[index].image_url.url + "\n");
            game.load.image(items[index].name, items[index].image_url.url);
        }

    },

    loadStaticAssets: function(){

        //Scoring 
        game.load.image('checkmark', 'checkmark.png');
        //Bins
        game.load.image('foodScrapsBin', 'food_scraps_basket.png');
        game.load.image('garbageBin', 'garbage_basket.png');
        game.load.image('paperBin', 'paper_basket.png');
        game.load.image('recycleBin', 'recyclable_containers_basket.png');
    },

    loadGameStates: function(){
        game.state.add("menu-state", Menu);

    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    setNextItem: function(){
    //Check for Item Validity 
        var tempItem = items[item_counter]
        console.log(tempItem);
    //Add item to sortable group
        current_item = sortable_items_group.create(32, 100, items[item_counter].name);
        current_item.scale.setTo(0.5, 0.5);
        console.log(current_item);
    //Enable Physics for overlap detection
        game.physics.arcade.enable([recycle_bin, current_item]);
        current_item.body.collideWorldBounds = true;
    //Enable drag/drop
        current_item.input.enableDrag();
        current_item.events.onDragStart.add(this.onDragStart, this);
        current_item.events.onDragStop.add(this.onDragStop, this);
    },

    overlap: function() {
        var boundsA = recycle_bin.getBounds();
        var boundsB = current_item.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    },

// Phaser Helpers

    onDragStart: function(sprite, pointer) {

        resultString = "Dragging " + sprite.key;

    },

    onDragStop: function(sprite, pointer) {

        resultString = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;

    }
}

    var game = new Phaser.Game(1250, 750, Phaser.CANVAS, 'game-container')

    game.state.add('Boot', Boot);
    game.state.start('Boot');



