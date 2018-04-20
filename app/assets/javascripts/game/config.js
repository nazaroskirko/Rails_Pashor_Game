var Loader = {

    getJSON: function(url){

        console.log("Executing AJAX...");
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log("AJAX Successful...");
                json = JSON.parse(xhr.response);
                console.log(json); 
                items = json; //global array to store all item data for main
            }
            else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    }

}