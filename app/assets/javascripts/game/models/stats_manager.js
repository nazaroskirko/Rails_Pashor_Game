// var Session = {

//     items : [],

//     currentSprite: null, //Phaser Sprite Object
//     currentItem: null, //JS Object Item

//     levelScore : 0,
//     item_counter : 0,
//     levelCounter: 0,

//     responses: [{
//         item_id: 0,
//         time_taken: 0,
//         attempt_number: 1,
//         correct: false,
//         bin_id: 3
//     }],
//     levelCompleteFlag: false

// }

// var LevelData = {
//     numberOfCorrect: 0,
//     timeSpent: 0,
//     totalPoints: 0,
//     timeBonus: 0
// }
// var GameData = {
//   levelOneScore: 0,
//   levelTwoScore: 0,
//   levelThreeScore: 0,
//   levelOneTime: 0,
//   levelTwoTime: 0,
//   levelThreeTime: 0,
//   totalScore: 0,
//   version: 1,
//   numberOfCorrect: 0,
//   numberofIncorrect: 0,
//   validUser: true
// }

var StatsManager = {

  computeLevelData: function (levelSession) {
    //Get spent on whole level
    LevelData.levelTime = Session.totalTime - Session.currentTime;
    //Calculate correct, incorrect
    levelSession.responses.forEach(function collect(currentResponse, index, array) {
      if(currentResponse.correct)
      {
        LevelData.numberOfCorrect += 1;
      }
      else
      {
        LevelData.numberOfIncorrect += 1;
      }
    });
    GameData.numberOfCorrect += LevelData.numberOfCorrect;
    //Get total points incl. time bonus
    LevelData.totalPoints = this.computeScore(LevelData.numberOfCorrect, LevelData.numberOfIncorrect, 120-LevelData.levelTime);
    //Set Game Data based on level
    switch(Session.levelCounter) {
      case 1:
          GameData.levelOneScore = LevelData.totalPoints;
          GameData.levelOneTime = LevelData.timeSpent;
          break;
      case 2:
          GameData.levelTwoScore = LevelData.totalPoints;
          GameData.levelTwoTime = LevelData.timeSpent;
          break;
      case 3:
          GameData.levelThreeScore = LevelData.totalPoints;
          GameData.levelThreeTime = LevelData.timeSpent;
          break;
      default:
          GameData.levelOneScore = 0;
    }

    GameData.totalScore += LevelData.totalPoints;

  },
  computeScore: function(numCorrect, numIncorrect, timeRemaning){
    LevelData.timeBonus = timeRemaning;
    return Math.round(numCorrect*50 + timeRemaning*1.2);
  }
}
