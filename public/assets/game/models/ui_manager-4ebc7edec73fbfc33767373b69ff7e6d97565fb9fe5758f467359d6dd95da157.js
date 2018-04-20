// Handles all UI states

var UIManager = {

  displayCorrectResponse: function(binKey) {
    this.showCheckmark(binKey);
  },

  displayIncorrectResponse: function(errorMessage, binKey) {
    this.showCross(binKey);
  },

  pause: function(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
  },

  createTimer: function() {

    this.timeLabel = game.add.text(290, 10, "00:00", {
      font: "20px Arial",
      fill: "#000"
    });
    this.timeLabel.align = 'center';

  },

  particleBurst: function(bin_name) {

    console.log(Bin.allBins[bin_name]);
    //  Position the emitter where the mouse/touch event was
    emitter.x = Bin.allBins[bin_name].sprite.world.x + 150; // get the middle
    emitter.y = 570;
    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitter.start(true, 2000, null, 5);
  },

  showCross: function(binKey) {
    var location = Dictionary.getBinLocationByKey(binKey);
    console.log(location);
    var cross = game.add.sprite(location[0], location[1], "cross");
    cross.scale.setTo(0.25, 0.25);
    setTimeout(function() {
      cross.kill();
    }, 1000);
  },

  showCorrectCircle: function(numOfResponses) {
    var base = 900;
    var increment = 50;
    console.log("Base")
    console.log(numOfResponses);
    var cross = game.add.sprite(base + increment * numOfResponses, 50, "correctCircleImage");
  },

  showIncorrectCircle: function(numOfResponses) {
    var base = 900;
    var increment = 50;
    console.log("Base")
    console.log(numOfResponses);
    var cross = game.add.sprite(base + increment * numOfResponses, 50, "incorrectCircleImage");
  },

  deleteCurrentItem: function(itemSprite) {
    itemSprite.kill();
  },

  resetItem: function(itemSprite) {
    itemSprite.body.x = 600;
    itemSprite.body.y = 100;
  }

}
;
