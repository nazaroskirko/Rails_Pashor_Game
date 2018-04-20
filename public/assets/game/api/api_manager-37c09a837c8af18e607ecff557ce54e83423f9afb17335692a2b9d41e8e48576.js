$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
});


var APIManager = {

    getGameId: function() {
      console.log(responses)
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

    postResponses: function(responses) {
      console.log(responses)
      $.ajax({
        url: "/allresponses",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'responses': responses}),
        success: function(resp){
           console.log(resp);
        }
      });
    }

}
;
