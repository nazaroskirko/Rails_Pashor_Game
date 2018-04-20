window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-container', { preload: preload, create: create });


    function preload () {

        game.load.image('logo', 'phaser.png');
        game.load.image('banana', 'banana.png');
        game.load.image('checkmark', 'checkmark.png');
        game.load.image('foodScrapsBin', 'food_scraps_basket.png');
        game.load.image('garbageBin', 'garbage_basket.png');
        game.load.image('paperBin', 'paper_basket.png');
        console.log('phaser loaded from js');

    }

    function create () {

        var logo = game.add.sprite(0, 0, 'logo');
        var foodScrapsBin = game.add.sprite(100, 200, 'foodScrapsBin');
        var garbageBin = game.add.sprite(300, 400, 'garbageBin');
        var banana = game.add.sprite(400, 500, 'banana');
        var checkmark = game.add.sprite(600, 500, 'checkmark');
        logo.anchor.setTo(0.5, 0.5);
    }

};
