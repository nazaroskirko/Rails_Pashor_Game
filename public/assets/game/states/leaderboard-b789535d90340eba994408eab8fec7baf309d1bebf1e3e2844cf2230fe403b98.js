
var Leaderboard = {

  show: function(score) {
    $('#game-container').hide();
    $('#leaderboard-container').show();
    $('#score').text(score);
  }
}
;
