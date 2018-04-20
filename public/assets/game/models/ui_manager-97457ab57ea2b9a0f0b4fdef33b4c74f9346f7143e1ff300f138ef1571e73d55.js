// Handles all UI states

var UIManager = {

  correctSequence: function(bin_name) {
    this.playSound('correct');
    this.showCorrectCircle(Session.item_counter);
    this.particleBurst(bin_name);
    this.deleteCurrentItem(Session.currentSprite);
  },
  incorrectSequence: function(bin_name) {
    this.playSound('incorrect');
    this.showIncorrectCircle(Session.item_counter);
    this.animateBinReject(Bin.allBins[bin_name].sprite);
    this.resetItem(Session.currentSprite);
  },
  displayEmptyBlueCircles: function () {
    var circle = game.add.sprite(800,30, "emptyBlueCircle");
    var circle = game.add.sprite(850,30, "emptyBlueCircle");
    var circle = game.add.sprite(900,30, "emptyBlueCircle");
    var circle = game.add.sprite(950,30, "emptyBlueCircle");
    var circle = game.add.sprite(1000,30  , "emptyBlueCircle");
  },
  pause: function(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
  },
  createTimer: function() {

    this.timeLabel = game.add.text(488, 35, "00:00", {
      font: "20px Arial",
      fill: "#fff"
    });
    this.timeLabel.align = 'center';

  },
  showIncorrectMessage: function(item) {
    if(item) { // 65 chars
      $('#game-container').append(
        '<div class="incorrect-message alert alert-info" role="alert">' +
          '<strong> Did you know? </strong>' + item.incorrect_message +
        '</div>');
    }
  },
  removeIncorrectMessage: function() {
    $('.incorrect-message').remove();
  },
  particleBurst: function(bin_name) {
    //  Position the emitter where the mouse/touch event was
    emitter.x = Bin.allBins[bin_name].sprite.world.x + 150; // get the middle
    emitter.y = 570;
    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitter.start(true, 2000, null, 5);
  },

  animateBinHover: function(bin) {
    //Will push bin back down after 100ms
    setTimeout(function() {
       var tweenBinDown = game.add.tween(bin).to({ y: 570 }, 100, 'Linear', true, 0);
    }, 100);
    // Will push up bin 50px in 100ms
    var tweenBinUp = game.add.tween(bin).to({ y: 520 }, 100, 'Linear', true, 0);
  },
  //Move side to side
  animateBinReject: function(bin) {
    var initialX = bin.worldPosition.x;
    setTimeout(function() {
      var tweenBinLeft = game.add.tween(bin).to({ x: initialX - 100}, 100, 'Linear', true, 0);
    }, 100);
    setTimeout(function() {
      var tweenBinOriginal = game.add.tween(bin).to({ x: initialX}, 100, 'Linear', true, 0);
    }, 200);
    var tweenBinRight = game.add.tween(bin).to({ x: initialX + 100}, 100, 'Linear', true, 0);
  },
  showCorrectCircle: function(numOfResponses) {
    var base = 800;
    var increment = 50;
    var positionX = 0;
    if(Session.itemAttemps === 0) {
      console.log('Correct Session item attemp === 0' + numOfResponses)
      if (numOfResponses === 0) {
        increment = 0;
      } else {
        numOfResponses -= 1;
      }
      var cross = game.add.sprite(base + increment * numOfResponses, 30, "correctCircleImage");
    }
    Session.itemAttemps = 0;
    if(Session.itemAttemps > 0) {
            console.log('> 1 item attemps correct'+ numOfResponses)
      return;
    }
    console.log('numOfResponses' + numOfResponses);
    console.log('itemAttemps' + Session.itemAttemps);
  },
  showIncorrectCircle: function(numOfResponses) {
    var base = 800;
    var increment = 50;
    var positionX = 0;
    // After first try
    if(Session.itemAttemps > 0 && numOfResponses > 1) {
        console.log('showIncorrectCircle attempt >=0\n numOfResponses:' + numOfResponses + "\nattempts:" + Session.itemAttemps)
        var cross = game.add.sprite(base + (increment * numOfResponses), 30, "incorrectCircleImage");
      return;
    }
    else if(Session.itemAttemps === 0) {
      if(numOfResponses === 1) {
        increment = 0;
      } else {
        console.log('Session.itemAttemps, numOfResponses > 1')
        numOfResponses -= 1;
      }
      console.log('showIncorrectCircle attempt = 0\n numOfResponses:' + numOfResponses + "\nattempts:" + Session.itemAttemps)
      var cross = game.add.sprite(base + (increment * (numOfResponses)), 30, "incorrectCircleImage");
    }
  },
  playSound: function(type) {
    if(audioOn && type === 'correct') {
      soundCorrect.play();
    }
    else if (audioOn && type === 'incorrect') {
      soundIncorrect.play();
    }
  },
  toggleAudio() {
    if(audioOn) {
      audioToggle.tint = 0xFF4500;
      audioOn = false;
    } else {
      audioToggle.tint = 0xffffff;
      audioOn = true;
    }
  },
  deleteCurrentItem: function(itemSprite) {
    itemSprite.kill();
  },

  resetItem: function(itemSprite) {
    itemSprite.body.x = 550;
    itemSprite.body.y = 300;
  }

}
;
