//Boot State to get json files 
var Boot = function(game){

}
Boot.prototype = {
    preload: function(){
        console.log('Boot State Preload...');
        game.load.json('items', '/items');
        game.state.add("main", Main);
    },
    create: function(){
        console.log('Boot State Create...');
        game.state.start("main");
    }
}
;
