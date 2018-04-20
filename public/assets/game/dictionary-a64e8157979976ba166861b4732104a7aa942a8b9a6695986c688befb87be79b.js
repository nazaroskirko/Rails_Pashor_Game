var Dictionary = {

    getBinLocationByKey: function(key){
    var location = [0,0];
    console.log(key);
    switch(key){
        case "recycleBin":
            location = [0,570]
            break;
        case "garbageBin":
            location = [300,570]
            break;
        case "foodScrapsBin":
            location = [600,570]
            break;
        case "paperBin":
            location = [900,570]
            break;
    }

    return location;
    },
    getBinNameByID: function(id){
        var name;

        switch(id){
            case 1:
                name = "Recyling Bin"
                break;
            case 2:
                name = "Garbage Bin"
                break;
            case 3:
                name = "Food & Scraps Bin"
            case 4:
                name = "Paper Bin"
        }

        return name;
    },

    getBinKeyByID: function(id){
        var name;
        console.log("DICT ID GIVEN " + id)
        switch(id){
            case 1:
                name = "recycleBin"
                break;
            case 2:
                name = "garbageBin"
                break;
            case 3:
                name = "foodScrapsBin"
            case 4:
                name = "paperBin"
        }
        console.log("Dictionary:" + name);
        return name;
    }
}
;
