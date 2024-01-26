let rowInput;
let rowId;
let bolInput;
let bolColor;

document.querySelector("#testBtn").addEventListener("click", function () {
	rowInput = document.querySelector("#rowInput").value;
	bolInput = document.querySelector("#bolInput").value;

	if (bolInput < 0 || bolInput > 100) {
		alert("bol input moet tussen 0 en 100 liggen");
		return;
	}

	switch (true) {
		case rowInput == 1:
			bolColor = "#E6BB45";
			rowId = _1stRow;
			break;

		case rowInput == 2:
			bolColor = "#FF65C1";
			rowId = _2thRow;
			break;

		case rowInput == 3:
			bolColor = "#CE1644";
			rowId = _3thRow;
			break;

		case rowInput == 4:
			bolColor = "#FFCB91";
			rowId = _4thRow;
			break;

		default:
			console.log("default");
			alert("row input moet 1, 2, 3 of 4 zijn");
	}

	addBol(rowId, bolInput, bolColor);
});

function addBol(row, rowNr, color) {
	const bolInputCorrection = rowNr - 1;
	const tile = row.children[bolInputCorrection];

	if (!tile.classList.contains("bol")) {
		tile.classList.add("bol");
		tile.style.backgroundColor = color;
		tile.eventCounter = 1;
	} else {
		tile.eventCounter += 1;
		tile.classList.add("bigBol");

		// Check if a p element already exists
		const existingPElement = tile.querySelector("p");
		if (existingPElement) {
			tile.removeChild(existingPElement);
		}

		// Now add the new p element
		const pElement = document.createElement("p");
		pElement.textContent = tile.eventCounter;
		tile.appendChild(pElement);
	}
}
