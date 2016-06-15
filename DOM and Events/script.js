
 function buildTable() {
    var table = document.createElement("table");
	table.setAttribute("border", "1");
	
    var rows = document.createElement("tr");
    
	
	for (var x = 1; x < 5; x++)
	{
		var headers = document.createElement("th");
		var textHead = document.createTextNode("Header" + " " + x);
		headers.appendChild(textHead);
		rows.appendChild(headers);
	}
	
	table.appendChild(rows);
	document.body.appendChild(table);
	
	var newrows = document.createElement("tr");
	
	for (var x = 1; x < 4; x++)
	{
		var newrows = document.createElement("tr");
		
		for (var y = 1; y < 5; y++)
		{
			var newcols = document.createElement("td");
			var textLabel = document.createTextNode(y + "," + x);
			newcols.appendChild(textLabel);
			newrows.appendChild(newcols);
		}
	
		table.appendChild(newrows);
	}

 }
function upButton()
{
	var upButton = document.createElement("button");
	var label = document.createTextNode("Up");
	upButton.appendChild(label);
	document.body.appendChild(upButton);
	upButton.id = "up";
}

function downButton()
{
	var downButton = document.createElement("button");
	var label = document.createTextNode("Down");
	downButton.appendChild(label);
	document.body.appendChild(downButton);
	downButton.id = "down";
}

function leftButton()
{
	var leftButton = document.createElement("button");
	var label = document.createTextNode("Left");
	leftButton.appendChild(label);
	document.body.appendChild(leftButton);
	leftButton.id = "left";
}

function rightButton()
{
	var rightButton = document.createElement("button");
	var label = document.createTextNode("Right");
	rightButton.appendChild(label);
	document.body.appendChild(rightButton);
	rightButton.id = "right";
}

function markButton()
{
	var markButton = document.createElement("button");
	var label = document.createTextNode("Mark Cell");
	markButton.appendChild(label);
	document.body.appendChild(markButton);
	markButton.id = "mark";
}

function up()
{
	if (first == 0 || first == 1 || first == 2 || first == 3)
		return;
	current[first].style.border = "1px solid black";
	first -= 4;
	current[first].style.border = "2px solid black";
}

function down()
{
	if (first == 8 || first == 9 || first == 10 || first == 11)
		return;
	current[first].style.border = "1px solid black";
	first += 4;
	current[first].style.border = "2px solid black";
}

function left()
{
	if (first == 0 || first == 4 || first == 8)
		return;
	current[first].style.border = "1px solid black";
	first -= 1;
	current[first].style.border = "2px solid black";
}


function right()
{
	if (first == 3 || first == 7 || first == 11)
		return;
	current[first].style.border = "1px solid black";
	first += 1;
	current[first].style.border = "2px solid black";
}

function mark()
{
	current[first].style.backgroundColor = "yellow";
}

buildTable();
upButton();
downButton();
leftButton();
rightButton();
markButton();


var  first = 0;
var current = document.getElementsByTagName("td");
current[first].id = "0";
document.getElementById("0").style.border = "2px solid black";
document.getElementById("up").addEventListener("click", up);
document.getElementById("down").addEventListener("click", down);
document.getElementById("left").addEventListener("click", left);
document.getElementById("right").addEventListener("click", right);
document.getElementById("mark").addEventListener("click", mark);


