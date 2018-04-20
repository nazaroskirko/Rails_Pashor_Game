// Move to init?
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
});
/**
  *This manages all network calls for the game.
  * This includes getting the gameID, Rankings, Responses, etc.
  *  GameID: @see #getGameId
  *  Rankings: @see APIManager#getRankings
  *  @property {function} foo.bar.baz - The baz function
  * @namespace
  */
var APIManager = {
/**
  * This will fetch the game id of a new game.
  * @see #postResponses
  * @link www.google.com
  *
  */

  // Get random incorrect messages between levels.
  // Get a game ID,  Game id: nil, total_time: nil, version_id: nil, total_points: nil,
  // Submit responses to game ID
  // Get player Info, update game with player if submitted.

    postGame: function(score, totalTime){
      var game = {total_time: totalTime, total_points: score, version_id: 1}
      $.ajax({
        url: "/rank",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'game': game}),
        success: function(resp, error){
           // resp = {rank: 1, gameID: 348}
           Leaderboard.showRank(resp.rank);
           APIManager.postResponses(GameData.allResponses, resp.gameID);
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
    postResponses: function(responses, gameID) {
      console.log(responses)
      $.ajax({
        url: "/allresponses",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'responses': responses, 'game_id': gameID}),
        success: function(resp){
           console.log(resp);
           setTimeout(function(){ UIManager.showIncorrectMessage(resp); }, 2000);
        }
      });
    },
    /** Creates a player in the db
      * @memberOf APIManager
    */
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
