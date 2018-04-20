$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
});


var APIManager = {

    getGameId: function() {
      $.ajax({
        url: "/allresponses",
        type: "GET",
        contentType: 'application/json',
        data: JSON.stringify({'responses': responses}),
        success: function(resp){
           console.log(resp);
        }
      });
    },

    getRankings: function(){
      $.ajax({
        url: "/rankings",
        type: "GET",
        contentType: 'application/json',
        success: function(rankings){
           Leaderboard.showBoard(rankings);
        }
      });
    },
    // if(item) {
    //   $('#game-container').append(
    //     '<div class="incorrect-message alert alert-info" role="alert">' +
    //       '<strong> Did you know? </strong>' + item.name + item.incorrect_message +
    //     '</div>');
    // }
    postResponses: function(responses) {
      $.ajax({
        url: "/allresponses",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'responses': responses}),
        success: function(resp){
           console.log(resp);
           UIManager.showIncorrectMessage(resp);
        }
      });
    },

    postGame: function(score, totalTime){
      var game = {total_time: totalTime, total_points: score, version_id: 1}
      $.ajax({
        url: "/rank",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'game': game}),
        success: function(resp, error){
           console.log(resp);
           console.log(error);
           Leaderboard.showRank(resp);
        }
      });
    },

    createPlayer(email,score,name){
      console.log(email);
      console.log(score);
      console.log(name);
      var player = {email: email, score: score, name: name, game_id: 15}
      $.ajax({
        url: "/players",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'player': player}),
        success: function(resp){
           console.log(resp);
        }
      });
    }

}
;
