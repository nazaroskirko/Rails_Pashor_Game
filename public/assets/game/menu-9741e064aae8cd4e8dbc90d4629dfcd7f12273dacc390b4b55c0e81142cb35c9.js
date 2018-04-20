var Menu = function (game) {
    console.log('reached here');
};

Menu.prototype = {
//Phaser Core Functions
    preload: function() {

    },

    create: function(){
        var text = this.game.add.text(32, 32, 'hi', { font: "15px Arial", fill: "#19de65" });
    },

    render: function() {
        
    },
    
    update: function(){

    }


} 
 
;
