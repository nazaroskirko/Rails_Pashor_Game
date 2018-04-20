var images = {};
var loader = {
  get_image_json: function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/v1/game_images', false); //false is making async false
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.response);
            json = JSON.parse(xhr.response);
            console.log(json);
            images = json;
            preload();
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
  }
}
;
