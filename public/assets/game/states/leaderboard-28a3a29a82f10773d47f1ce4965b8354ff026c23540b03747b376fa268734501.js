
$( document ).ready(function() {
  console.log('ready');
  $( "#player-submit" ).submit(function( event ) {
    event.preventDefault();
    var first = $('#first-name').val();
    var last = $('#last-name').val();
    var email = $('#email').val();
    var score = $('#score')[0].innerHTML;
    var name = first + ' ' + last
    console.log(email);
    console.log(score);
    console.log(name);
    $("#player-submit").hide();
    $(".player-rank-line").css('background-color', '#30abda');
    $("#player-name")[0].innerHTML = name;
    alert('Your score has been submitted!');
    APIManager.createPlayer(email, score, name);
  });
});

var Leaderboard = {

  show(score, totalTime) {
    APIManager.getRankings();
    $('#game-container').hide();
    $('#leaderboard-container').show('slow', 'swing');
    $('#score').text(score);
    APIManager.postGame(score, totalTime);
  },

  // Callback from APIManager.postGame();
  showRank(rank) {
    $('#rank').text(rank);
  },
  // Callback from APIManager.getRankings();
  // index+1 so 1st place is not 0.
  showBoard(players) {
    console.log(players);
    var score = parseInt($('#score')[0].innerHTML);
    console.log(score);
    var insertedSelf = false;
    players.forEach(function(player, index) {
      var created = new Date(player.created_at);
      var today = new Date();
      var diff = (today - created)/(1000*60*60*24); //ms, s, m, h
      var daysAgo = Math.round(diff);
      console.log(diff);
      if (score <= player.score || insertedSelf) {
        $("#player-list-continer").append("\
          <div class='row rank_line'>\
            <div class='col-sm-3' align='center' style='padding-top: 7px'>" + (index + 1) + "</div>\
            <div class='col-sm-6' style='padding-top: 7px'>" + player.name + "</div>\
            <div class='col-sm-3' align='center' style='padding-top: 7px'>" + player.score + "</div>\
            <div class='col-sm-6 offset-3 tooltip-text' align='center' style='padding-top: 7px'>" + daysAgo + " Days Ago" + "</div>\
          </div>");
      } else if(!insertedSelf){
        $("#player-list-continer").append("\
          <div class='player-rank-line row rank_line'>\
            <div class='col-sm-3' align='center' style='padding-top: 7px'>" + (index + 1) + "</div>\
            <div id='player-name' class='col-sm-6' style='padding-top: 7px'> You </div>\
            <div class='col-sm-3' align='center' style='padding-top: 7px'>" + score + "</div>\
          </div>");
          insertedSelf = true;
      }
    })
  }

}
;
