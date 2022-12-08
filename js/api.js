// what is an api?

// anatomy of an api request
    // api call
        // request type: GET, POST
        // api url
        // params
        // key
    // api response
        // JSON
        // https://www.google.com/search?q=json&client=firefox-b-1-d&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjSm7-X98H7AhWpLUQIHaqaADQQ_AUoAXoECAIQAw&biw=1536&bih=711&dpr=1.25#imgrc=MQ70IxKRTe-bUM


// example api calls
// 1.) https://openweathermap.org/api
// 2.) https://api.nasa.gov/
// 3.) https://developers.google.com/maps/documentation/javascript/streetview#maps_streetview_simple-javascript
// 5.) https://newsapi.org/


// open weather api demo

// Step 1.) GET API KEY 
        // go to https://openweathermap.org/api and follow sign up instructions
        // Make a new key and head over to the api documentation @ https://openweathermap.org/current
        // add jquery cdn to html file url @ https://cdnjs.com/libraries/jquery
        // load this script into html as well

// Step 2.) Build your paramaters based on the api documentation
        url = "https://api.openweathermap.org/data/2.5/weather?"
        weatherKey = "54730f875ca44704d21c8b73c5e3d366"
        // Get lat and long from google https://www.google.com/search?client=firefox-b-1-d&q=lat+lon+of+chicago
        sessionStorage.setItem("lat", 41.8781);
        sessionStorage.setItem("lon", -87.6298);
        lat = sessionStorage.getItem("lat") 
        lon = sessionStorage.getItem("lon") 

// Step 3.) Build your paramaters based on the api documentation  
    function makeApiCall(lat, lon) {
        weatherParams = {"lat": lat, "lon": lon, "appid": weatherKey}  
        $.ajax({
            url: url,
            type: "GET",
            data: weatherParams,
            success: function(resp){
                console.log(resp);
                changeDisplay(resp);
            },
            error: function(error){
                console.log(error)
            }
        });
    }





// Step 4.) Build a function to parse the response for the data you want     
  

    // url = "https://api.openweathermap.org/data/2.5/weather?"
    // weatherKey = "54730f875ca44704d21c8b73c5e3d366"
    // lat = sessionStorage.getItem("lat") 
    // lon = sessionStorage.getItem("lon") 
    // weatherParams = {"lat": lat,
    //                     "lon": lon,
    //                     "units": "imperial", //units taken from api documentation
    //                     "appid": weatherKey
    //                     }
    
    
    // function parseWeather(resp){
    // // index into the JSON resp as dictionary to get the individual pieces of data 
    //     temp = resp["main"]["temp"]
    //     windSpeed = resp["wind"]["speed"]
    //     main = resp["main"]
    // // make sure the data is a number(type float) not a string
    //     console.log(resp)
    //     // console.log(typeof temp)
    //     // console.log(typeof windSpeed)
    //     // console.log(`temp in farhenheit = ${temp}\n wind speed in mph = ${windSpeed}`)
    // }
    
    
    // function makeApiCall(){
    //     $.ajax({
    //         url: url,
    //         type: "GET",
    //         data: weatherParams,
    //         success: function(resp){
    //             parseWeather(resp);
    //         },
    //         error: function(error){
    //             console.log(error)
    //         }
    //     });
    // }



//Step 5.) Build a function to use the parsed response data in your website     
    // url = "https://api.openweathermap.org/data/2.5/weather?"
    // weatherKey = "54730f875ca44704d21c8b73c5e3d366"
    // lat = sessionStorage.getItem("lat") 
    // lon = sessionStorage.getItem("lon") 
    // weatherParams = {"lat": lat,
    //                     "lon": lon,
    //                     "units": "imperial",
    //                     "appid": weatherKey
    //                     }


    function parseWeather(resp){
        lat = resp["coord"]["lat"]
        lon = resp["coord"]["lon"]
        temp = resp["main"]["temp"]
        feelsLike = resp["main"]["feels_like"]
        hum = resp["main"]["humidity"]
        windSpeed = resp["wind"]["speed"]
        console.log(`temp in farhenheit = ${temp}\n wind speed in mph = ${windSpeed}`)
        //console.log(resp);
        return [lat, lon, temp, feelsLike, windSpeed, hum];
    }

    // // This function takes an input number and an input range and returns the corresponding number mapped to a new range
    function scaleProperly(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function changeDisplay(resp) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');
        let [lat, lon, temp, feelsLike, windSpeed, hum] = parseWeather(resp);

        x = scaleProperly(lat, -90, 90, 0, canvas.width);
        y = scaleProperly(lon, -180, 180, 0, canvas.height);
        r = scaleProperly(temp, 0, 8, 0, 255);
        g = scaleProperly(feelsLike, 0, 323, 0, 255);
        b = scaleProperly(hum, 0, 100, 0, 255);
        R = scaleProperly(windSpeed, 0, 8, 50, 100);

        console.log(`x: ${x}, y: ${y}`)
        
        ctx.globalAlpha = 1.0;
        ctx.beginPath();
        ctx.arc(x, y, R, 0, 2 * Math.PI, false);
        ctx.arc(canvas.width / 2, canvas.height / 2, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = `rgb(${r},${g},${b})`;
        ctx.stroke();

        // if (lat > 0 && lon > 0) {
        //     ctx.moveTo(canvas.width + x, canvas.height * Math.random());
        //     ctx.lineTo(canvas.height + y, canvas.width * Math.random());
        // } else if (lat > 0 && lon < 0) {
        //     ctx.moveTo(canvas.width + x, canvas.height * Math.random());
        //     ctx.lineTo(-y, canvas.width * Math.random());
        // } else if (lat < 0 &&  lon > 0) {
        //     ctx.moveTo(-x, canvas.height * Math.random());
        //     ctx.lineTo(canvas.height + y, canvas.width * Math.random());
        // } else {
        //     ctx.moveTo(-x, canvas.height * Math.random());
        //     ctx.lineTo(-y, canvas.width * Math.random());
        // }

        //document.body.appendChild(canvas);

        // // windSpeed will be related to the height of a rectangle
        // // temp will be the color of that rectangle
        // // to do this we will make a grid element and set the size
        // let newOBJ = document.createElement("div");
        
        // // Call the scaeProperly function to map the range of inputs to the coresponding out put range. 0-255 for color and 0-100 for height. the height was arbitrarly chosen
        // properTemp = scaleProperly(temp, 0, 40, 0, 255); 
        // properWindspeed = scaleProperly(windSpeed,0,8,0,100)
        // newOBJ.style.backgroundColor = `rgb(${properTemp},50,50)`;
        // newOBJ.style.height = `${properWindspeed}px`
        // newOBJ.style.width = '100px'
      
        // const drawingArea = document.getElementById('drawingArea');
        // drawingArea.appendChild(newOBJ);
    }



// Step 6.) Step 5 worked alright but I want more variation in my  output. 

// So I'm going to add a button that will add numbers to the longitude and latitude for the api call
    
    // I will start by initializing an item "lon" & "lat" at my starting point in the session memory
    // and make sure to run that funciton on start up in my index
    // function initializeLonLat(){
    //     startLongitude = -87.6298;
    //     startLattitude = 41.8781;
    //     sessionStorage.setItem("lon", startLongitude); 
    //     sessionStorage.setItem("lat", startLattitude); 
    // }

    // function addLongitude(number){
    //     previousLon = parseFloat(sessionStorage.getItem("lon"))
    //     newLon = previousLon + number;
    //     sessionStorage.setItem("lon", newLon);
    //     console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
    // }

    // function subLongitude(number){
    //     previousLon = parseFloat(sessionStorage.getItem("lon"))
    //     newLon = previousLon - number;
    //     sessionStorage.setItem("lon", newLon);
    //     console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
    // }

    // function addLat(number){
    //     previousLon = parseFloat(sessionStorage.getItem("lat"))
    //     newLat = previousLon + number;
    //     sessionStorage.setItem("lat", newLat);
    //     console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    // }

    // function subLat(number){
    //     previousLon = parseFloat(sessionStorage.getItem("lat"))
    //     newLat = previousLon - number;
    //     sessionStorage.setItem("lat", newLat);
    //     console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    // }





    // function parseWeather(resp){
    //     temp = resp["main"]["temp"]
    //     windSpeed = resp["wind"]["speed"]
    //     //console.log(`temp in farinheight = ${temp}\n wind speed in mph = ${windSpeed}`)
    //     console.log(resp)
    //     return [temp, windSpeed];
    // }

    // function scaleProperly(number, inMin, inMax, outMin, outMax) {
    //     return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    // }

    // function changeDisplay(resp){
    //     let [temp, windSpeed] = parseWeather(resp);

    //     // windSpeed will be related to the height of a rectangle
    //     // temp will be the color of that rectangle
    //     // to do this we will make a grid element and set the size
    //     let newOBJ = document.createElement("div");
        
    //     // Call the scaeProperly function to map the range of inputs to the coresponding out put range. 0-255 for color and 0-100 for height. the height was arbitrarly chosen
    //     properTemp = scaleProperly(temp, 0, 120, 0, 255); 
    //     properWindspeed = scaleProperly(windSpeed,0,8,0,100)

    //     newOBJ.style.backgroundColor = `rgb(${properTemp},50,50)`;
    //     newOBJ.style.height = `${properWindspeed}px`
    //     newOBJ.style.width = '100px'
      
    //     const drawingArea = document.getElementById('drawingArea');
    //     drawingArea.appendChild(newOBJ);

    // }


    // function makeApiCall(){
    //     url = "https://api.openweathermap.org/data/2.5/weather?"
    //     weatherKey = "54730f875ca44704d21c8b73c5e3d366"
    //     lat = sessionStorage.getItem("lat") 
    //     lon = sessionStorage.getItem("lon") 
    //     weatherParams = {"lat": lat,
    //                         "lon": lon,
    //                         "units": "imperial",
    //                         "appid": weatherKey
    //                         }
    //     console.log(weatherParams)


    //     $.ajax({
    //         url: url,
    //         type: "GET",
    //         data: weatherParams,
    //         success: function(resp){
    //             changeDisplay(resp);
    //         },
    //         error: function(error){
    //             console.log(error)
    //         }
    //     });
    // }

