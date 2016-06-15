
//document.addEventListener("DOMContentLoaded", zipCode);
document.addEventListener("DOMContentLoaded", bindButtons);

var appid = "733ba2c7f61fcaa5d887cd466bc1f27b";

function bindButtons()
{
		document.getElementById('wSubmit').addEventListener('click', function (event) {
		document.getElementById('curCity').textContent = "";
        document.getElementById('currentTemp').textContent = "";
        document.getElementById('humidity').textContent = "";
		
		var zipC = document.getElementById('cityZip').value;
        var cityN = document.getElementById('cityName').value;
		
		if(zipC !== "" && cityN === "")
            zipCode(zipC);
        else if(zipC === "" && cityN !== "")
            cityName(cityN);
		event.preventDefault();
		})
}
function zipCode(zipC)
{
	var req = new XMLHttpRequest();
	//document.getElementById('getWeatherName').addEventListener('click', function(event){
    //var req = new XMLHttpRequest();
	var website = "http://api.openweathermap.org/data/2.5/weather?zip=";
    var appid = "733ba2c7f61fcaa5d887cd466bc1f27b";
	//var userInputLocationZip = document.getElementById("userInputLocationZip").value + ",us";
	
	
	//website += userInputLocationZip + '&appid=' + appid;
	
	newWebsite = website + zipC + ",us&APPID=" + appid;
    req.open('GET', newWebsite, true);

    //req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
		   var result = JSON.parse(req.responseText);
        document.getElementById('curCity').textContent = result.name;
        document.getElementById('currentTemp').textContent = result.main.temp;
		document.getElementById('humidity').textContent = result.main.humidity;
      } else {
		 console.log("Error in network request: " + request.statusText);
	}});
    req.send(null);
    //event.preventDefault();
	
	
	
  }
  
  function cityName(cityN)
  {
	  var req = new XMLHttpRequest();
	 // document.getElementById('getWeatherZip').addEventListener('click', function(event){
     //var req = new XMLHttpRequest();
	 var website = "http://api.openweathermap.org/data/2.5/weather?q=";
     var appid = "733ba2c7f61fcaa5d887cd466bc1f27b";
	// var userInputLocationName = document.getElementById("userInputLocationName").value;
	
	//website += userInputLocationName + '&appid=' + appid;
	newWebsite = website + cityN + ",us&APPID=" + appid;
	
    req.open('GET', newWebsite, true);

   // req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
		 
      if(req.status >= 200 && req.status < 400){
		  var result = JSON.parse(req.responseText);
        document.getElementById('curCity').textContent = result.name;
        document.getElementById('currentTemp').textContent = result.main.temp;
		document.getElementById('humidity').textContent = result.main.humidity;
      } else {
        console.log("Error in network request: " + request.statusText);
	}});
    req.send(null);
    //event.preventDefault();
	   
	
  }
