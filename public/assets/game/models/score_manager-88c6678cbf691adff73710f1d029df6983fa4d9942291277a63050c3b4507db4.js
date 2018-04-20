var ScoreManager = {

  addToScore: function(time) {
    Session.levelScore += 5;
  },

  getBonus: function() {
    var timeRemaining = 200 - LevelData.timeSpent;
    var bonus = LevelData.totalPoints * (timeRemaining / 200);
    console.log("BONUS" + bonus);
    return bonus;
  },

  collectResponses: function() {
    console.log("Collecting...");

    var avgTimeTaken = 0;
    var numCorrect = 0;
    var totalItems = Session.responses.length;

    Session.responses.forEach(function callback(response, index, array) {
      if (response.timeTaken) {
        avgTimeTaken += response.timeTaken;
      }
      if (response.correct == true) {
        numCorrect++;
      }
    });
    LevelData.timeSpent = Session.timeElapsed;
    LevelData.totalPoints = Session.levelScore;
    LevelData.numberOfCorrect = numCorrect;
    LevelData.timeBonus = this.getBonus();
    LevelData.avgTimePerItem = avgTimeTaken / totalItems;
    console.log(LevelData);
  }

}
;
