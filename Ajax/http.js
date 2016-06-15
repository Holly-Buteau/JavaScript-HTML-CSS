document.addEventListener('DOMContentLoaded', bindButtons);
 
function bindButtons()
{	
	var website = "http://httpbin.org/post";
	document.getElementById('inputSubmit').addEventListener('click', function (event) {
 	document.getElementById('response').textContent = "";
	
	var text = document.getElementById("inputField").value;
	var req = new XMLHttpRequest();
	req.open("POST", website, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
     if(req.status >= 200 && req.status < 400){
        var parseIt = JSON.parse(req.responseText);
		var parse2 = JSON.stringify(parseIt.data);
		document.getElementById("response").textContent = parse2;
      } else {
        console.log("Error in network request: " + request.statusText);
	}});
	req.send(text);
	event.preventDefault();
	})
}
