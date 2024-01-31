let filteredPersons = [];
let sortedBirhdates = [];
let rowInput;
let rowId;
let bolInput;
let bolColor;

async function fetchPersons() {
	try {
		const response = await fetch("./JSON/Persons.json");
		if (!response.ok) {
			throw new Error(`Failed to load JSON file: ${response.statusText}`);
		}
		const jsonData = await response.json();
		filterBirthdates(jsonData);
	} catch (error) {
		console.error("Error loading JSON file:", error);
	}
}

function filterBirthdates(data) {
	console.log(data);
	for (let i in data) {
		if (data[i].dateOfBirth) {
			if (data[i].dateOfBirth > 1200) {
				filteredPersons.push(data[i]);
			}
		}
	}

	sortBirthdates(filteredPersons);
	sortedBirhdates.push(data);
	sortBirthdatesZA([...filteredPersons]);
}

function sortBirthdates(data) {
	data.sort((a, b) => a.dateOfBirth - b.dateOfBirth);
	console.log("Sorted Birthdates (A to Z):", data);
}

function sortBirthdatesZA(data) {
	data.sort((a, b) => b.dateOfBirth - a.dateOfBirth);
	console.log("Sorted Birthdates (Z to A):", data);
}

function addBol(row, rowNr, color, qCode) {
	const bolInputCorrection = rowNr - 1;
	const tile = row.children[bolInputCorrection];

	if (!tile.classList.contains("bol")) {
		tile.classList.add("bol");
		tile.classList.add(qCode);
		tile.style.backgroundColor = color;
		tile.eventCounter = 1;
	} else {
		tile.eventCounter += 1;
		tile.classList.add("bigBol");
		tile.classList.add(qCode);

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

function roundToDecade(year) {
	return Math.round(year / 10) * 10;
}

async function placeBol() {
	await fetchPersons();

	rowInput = 1;
	for (let i = 0; i < filteredPersons.length; i++) {
		bolInput = roundToDecade(filteredPersons[i].dateOfBirth);
		bolInput = bolInput / 10 - 120;

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

		addBol(rowId, bolInput, bolColor, filteredPersons[i].qCode);
	}
}

placeBol();
