// Move to init?
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
});

/**
  *simple comment
  *@param{string} title - the author of the book
  *
  */
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
    /**
      * Submits data for the level to the server
      *@param{Object} responses
      *
      *@fires Submit#levelresponses
      */
    postResponses: function(responses) {
      $.ajax({
        url: "/allresponses",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'responses': responses}),
        success: function(resp){
           console.log(resp);
           setTimeout(function(){ UIManager.showIncorrectMessage(resp); }, 2000);
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
      /** @constant {number} */
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
