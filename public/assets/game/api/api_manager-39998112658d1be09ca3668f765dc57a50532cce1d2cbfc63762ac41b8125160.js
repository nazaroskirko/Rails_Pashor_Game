$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
});


var APIManager = {

    postResponses: function(responses){
    $.post("/allresponses",
      {
          response: JSON.stringify(responses)
      },
      function(data, status){
          console.log("Data: " + data + "\nStatus: " + status);
      });
    }

}
;
