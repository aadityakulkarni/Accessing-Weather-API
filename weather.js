// Put your Last.fm API key here
/*var api_key = "";

function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
        }
    };
    xhr.send(null);
}*/


var api_key = "498b2a85437fac50ea2c8d3f6142d924";

function sendRequest () {
    document.getElementById("loading-indicator").style.visibility = "visible";
    var xhr = new XMLHttpRequest();
   // var method = "artist.getinfo";
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q="+city+"&appid="+api_key+"&format=json&units=imperial", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            //var str = JSON.stringify(json,undefined,2);
            //document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
            updateUI(json);
        }
    };
    xhr.send(null);
}

function initialize(){
    document.getElementById("output").style.visibility = "hidden";
    document.getElementById("loading-indicator").style.visibility = "hidden";
    
}

function updateUI(json){
    document.getElementById("loading-indicator").style.visibility = "hidden";
    console.log(json);
    
    document.getElementById("output").style.visibility = "visible";
    document.getElementById("name").innerHTML = "<strong>Name:</strong> " + json.name;
    document.getElementById("geo").innerHTML = "<strong>Geo Location - Lat:</strong> " + json.coord.lat + "<sup>o</sup>&nbsp; <strong>Lon:</strong> " + json.coord.lon + "<sup>o</sup>" ;
    document.getElementById("sunrise").innerHTML = "<strong>Sunrise:</strong> " + convertTime(json.sys.sunrise);
    document.getElementById("sunset").innerHTML = "<strong>Sunset:</strong> " + convertTime(json.sys.sunset);
    document.getElementById("pressure").innerHTML = "<strong>Pressure:</strong> " + json.main.pressure + " hPa" ;
    document.getElementById("humidity").innerHTML = "<strong>Humidity:</strong> " + json.main.humidity +" %";
    document.getElementById("temp").innerHTML = "<strong>Temprature:</strong> " + json.main.temp + "<sup>o</sup>F";
    document.getElementById("min_temp").innerHTML = "<strong>Minimum Temprature:</strong> " + json.main.temp_max + "<sup>o</sup>F";
    document.getElementById("max_temp").innerHTML = "<strong>Maximum Temprature:</strong> " + json.main.temp_max + "<sup>o</sup>F";
    //document.getElementById("visibility").innerHTML = "<strong>Visibility:</strong> " + json.weather[0].main;
    document.getElementById("clouds").innerHTML = "<strong>Cloudiness:</strong> " + json.clouds.all + "%";
    document.getElementById("message").innerHTML = "<strong>Weather Summary:</strong> " + showMessage(json.weather[0].id,json.main.temp);
    
}

function convertTime(time){
     var dt = new Date(time*1000);
     return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ' (Central time) ';
     //return dt;
}

function showMessage(id,temp){
    var description = null;
    var visibility = "Good";
    switch(true){
        //Weather condition 2xx - Thunderstorm
        case id>=200 && id<300:
            description = "It\'s thunderstorm out there, Please take shelter and be safe.";
            visibility = "Bad";
            break;
        
        //Weather condition 3xx - Drizzle
        case id>=300 && id<400:
            description = "It\'s drizziling out there, Please take an umbrella with you if you are going out.";
            visibility = "Bad";
            break;
        
        //Weather condition 5xx - Rain
        case id>=500 && id<600:
            description = "It\'s raining out there, Please take an umbrella with you if you are going out.";
            visibility = "Bad";
            break;
        
        //Weather condition 6xx - Snow
        case id>=600 && id<700:
            description = "It\'s snowing out there, Please take a warm coat with you if you are going out.";
            visibility = "Bad";
            break;

        //Weather condition 7xx - Atmosphere
        case id==701:
            description = "It\'s misty out there, be safe.";
            visibility = "Bad";
            break;
        case id==711:
            description = "It\'s smokey out there, be safe.";
            visibility = "Bad";
            break;
        case id==721:
            description = "It\'s haze out there, be safe.";
            visibility = "Bad";
            break;
        case id==731:
            description = "It\'s sand, dust whirls out there, be safe.";
            visibility = "Bad";
            break;
        case id==741:
            description = "It\'s foggy out there, be safe.";
            visibility = "Bad";
            break;
        case id==751:
            description = "It\'s sandy out there, be safe.";
            visibility = "Bad";
            break;
        case id==761:
            description = "It\'s dusty out there, be safe.";
            visibility = "Bad";
            break;
        case id==762:
            description = "It\'s volcanic ash out there, be safe.";
            visibility = "Bad";
            break;
        case id==771:
            description = "It\'s squalls out there, be safe.";
            visibility = "Bad";
            break;
        case id==781:
            description = "It\'s tornado out there, be safe.";
            visibility = "Bad";
            break;

        //Weather condition 800 - Clear    
        case (id==800):
            description = "It\'s clear weather out there, enjoy your day!";
            break;

        //Weather condition 80x - Clouds    
        case id>800 && id<900:
            description = "It\'s cloudy out there, be safe.";
            break;

       //Weather condition 90x - Extreme
        case id>=900 && id<910:
            description = "It\'s extreme atmosphere out there, be safe.";
            break;

        //Weather condition 9xx - Additional
        case id==951:
            description = "It\'s calm out there, enjoy your day!";
            break;
        case id==952:
            description = "It\'s light breeze out there, enjoy your day!";
            break;
        case id==953:
            description = "It\'s gentle breeze out there, enjoy your day!";
            break;
        case id==954:
            description = "It\'s moderate breeze out there, enjoy your day!";
            break;
        case id==955:
            description = "It\'s fresh breeze out there, enjoy your day!";
            break;
        case id==956:
            description = "It\'s strong breeze out there, enjoy your day!";
            break;
        case id==957:
            description = "It\'s high wind, near gale out there, be safe.";
            break;
        case id==958:
            description = "It\'s gale out there, be safe.";
            break;
        case id==959:
            description = "It\'s severe gale out there, be safe.";
            break;
        case id==960:
            description = "It\'s storm out there, take storm shelter and be safe.";
            break;
        case id==961:
            description = "It\'s violent storm out there, take storm shelter and be safe.";
            break;
        case id==962:
            description = "It\'s hurricane out there, take shelter and be safe.";
            break;
       
        //Weather condition unknown     
        default:
            description = "Unknow weather condition, Please check some time later.";
            break;            
    }
    // carry coat if temprature is less than 42 fahrenheit of 10 celsius and not snowing
    if(temp < 42 && !(id>=600 && id<700)){
        description += " Also, the temprature seems to be less so please carry your coat and be warm.";
    }
    document.getElementById("visibility").innerHTML = "<strong>Visibility:</strong> "+ visibility;
    return description;
}