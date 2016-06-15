var tbl = document.getElementById("workout");

table.addEventListener("submit", function(e){
	e.preventDefault();

	var req = new XMLHttpRequest();
	var string = '/insert';

	var param = "workName=" + table.elements.workName.value+"&reps="+table.elements.reps.value
				+ "&weight="+ table.elements.weight.value + "&date="+table.elements.date.value
				+ "&lbs=" + table.elements.lbs.value;

	req.open("GET", string + "?" + param, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function(){
		if(req.status < 400) {
			console.log('sent');
			var response = JSON.parse(req.responseText);
			var id = response.workout;

			var newTable = document.getElementById("tblWorkout");
			var row = newTable.insertRow(-1);
			var newId = document.createElement('td');
			newId.textContent = id;
			newId.style.display = "nothing";
			row.appendChild(newId);

			var name = document.createElement('td');
			name.textContent = tbl.elements.workName.value;
			row.appendChild(name);
			var reps = document.createElement('td');
			reps.textContent = tbl.elements.reps.value;
			row.appendChild(reps);
			var weight = document.createElement('td');
			weight.textContent = tbl.elements.weight.value;
			row.appendChild(weight);
			var lbs = document.createElement('td');
			lbs.textContent = tbl.elements.lbs.value;
			row.appendChild(lbs);
			var date = document.createElement('td');
                        date.textContent = tbl.elements.date.value;
			row.appendChild(date);
			var edit = document.createElement('td');
                        edit.innerHTML = '<a href="/update?id=' + id + '"><input type= "button" value = "Edit"></a>';
			row.appendChild(edit);

			
			var rDelete =  document.createElement('td');
			rDelete.innerHTML = '<input type="button" value="Delete" onclick = "wDelete(\'tblWorkout\', this, ' + id + ')">';

			
			row.appendChild(rDelete);
}
		else {
		console.log('error');
		}
	});
	req.send(string + "?" + param);
});


function wDelete(newTable, currentRow, rowID){
	var tbl = document.getElementById(newTable);
	var count = tbl.rows.length;
	var req = new XMLHttpRequest();
	var string = '/remove';

	req.open("GET", string + "?id=" + rowID, true);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.addEventListener('load', function(){
		if (req.status < 400) {
			console.log("delete sent");
		}
		else {
			console.log("error");
		}

});

req.send(string + "?id=" + rowID);

	for (var x = 0; x < count; x++)
	{
		var r = tbl.rows[x];
		if (r == currentRow.parentNode.parentNode){
			tbl.deleteRow(i);
	}
	}
}
