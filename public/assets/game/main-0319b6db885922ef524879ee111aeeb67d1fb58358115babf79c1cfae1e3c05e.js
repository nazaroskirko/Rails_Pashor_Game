window.onload = function() {

    var game = new Phaser.Game(1250, 750, Phaser.CANVAS, 'game-container', 
      { 
        preload: preload, 
        create: create,
        update: update,
        render: render
      });

    loader.get_image_json();

    var result = "Drag the image";
    var overlap = "No objects touching"
    //bins
    var b_fsb;
    var b_gb;
    var b_pb;
    var b_rb;

    var current_item;
    var all_items = [];
    var item_counter = 0;
    var sortable_items_group;
//Phaser Core Functions
    function preload () {
        //loading in all sorting items 
        for (var item in images) {
          if (images.hasOwnProperty(item)) {
            console.log('item' + item)
            console.log('images[item]' + images[item])
            game.load.image(item, images[item]);
            all_items.push(item);
          }
        }
        // game.load.image('logo', 'phaser.png');
        // game.load.image('banana', 'https://sorting-items.s3.amazonaws.com/ubc%20nest/levels/1/phaser.png');
        game.load.image('checkmark', 'checkmark.png');
        game.load.image('foodScrapsBin', 'food_scraps_basket.png');
        game.load.image('garbageBin', 'garbage_basket.png');
        game.load.image('paperBin', 'paper_basket.png');
        game.load.image('recycleBin', 'recyclable_containers_basket.png');
        console.log('phaser loaded from js');

    }

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#cccfff';

        b_fsb = game.add.sprite(0,570, "foodScrapsBin");
        b_gb = game.add.sprite(300,570, "garbageBin");
        b_pb = game.add.sprite(600,570, "paperBin");
        b_rb = game.add.sprite(900,570, "recycleBin");

        sortable_items_group = game.add.group();
        sortable_items_group.inputEnableChildren = true;

        current_item = getNextItem();

    }

    function render() {

        game.debug.text(result, 10, 20);
        game.debug.text(overlap, 10, 40);

    }
    
    function update() {
        var collision = checkOverlap(current_item);

        if (collision)
        {
            overlap = 'Collided with:' + b_rb.key
            getNextItem();
        }
        else
        {
            overlap = 'No collision detected';
        }

    }

//Helpers
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getNextItem(){
        item_counter++;

        if(current_item != null){
            current_item.visible = false;
        }
        
        var random = getRandomInt(0,all_items.length)
        console.log(random);
        current_item = sortable_items_group.create(32, 100, all_items[random]);

        current_item.scale.setTo(0.5, 0.5);

        console.log('cur item' + images['milk']);

        game.physics.arcade.enable([b_rb, current_item]);

        current_item.body.collideWorldBounds = true;

        current_item.input.enableDrag();
        current_item.events.onDragStart.add(onDragStart, this);
        current_item.events.onDragStop.add(onDragStop, this);
        return current_item;
    }

    function checkOverlap(current_item) {

        var boundsA = b_rb.getBounds();
        var boundsB = current_item.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    }

    function onDragStart(sprite, pointer) {

        result = "Dragging " + sprite.key;

    }

    function onDragStop(sprite, pointer) {

        result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;

    }


};
