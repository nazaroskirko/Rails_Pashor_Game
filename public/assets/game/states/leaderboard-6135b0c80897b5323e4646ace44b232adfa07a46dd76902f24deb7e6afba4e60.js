
var Leaderboard = {

  show: function(score, totalTime) {
    $('#game-container').hide();
    $('#leaderboard-container').show();
    $('#score').text(score);

    $.post( "/games", { total_time: totalTime, total_points: score, version_id: 1 })
     .done(function( data ) {
      alert( "Data Loaded: " + data );
    });
  }
}
;
