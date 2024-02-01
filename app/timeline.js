let filteredPersons = [];
let sortedBirhdates = [];
let filteredTheaters = [];
let filteredGear = [];
let filteredEvents = [];
let rowInput;
let rowId;
let bolInput;
let bolColor;

async function fetchEvents() {
	try {
		const response = await fetch("./JSON/Events.json");
		if (!response.ok) {
			throw new Error(`Failed to load JSON file: ${response.statusText}`);
		}
		const jsonData = await response.json();
		filterEventsDates(jsonData);
	} catch (error) {
		console.error("Error loading JSON file:", error);
	}
}

function filterEventsDates(data) {
	for (let i in data) {
		if (data[i].timeline_date) {
			if (data[i].timeline_date > 1200) {
				data[i].timeline_date = data[i].timeline_date.slice(0, 4);
				filteredEvents.push(data[i]);
			}
		}
	}
}

async function fetchGear() {
	try {
		const response = await fetch("./JSON/equipment.json");
		if (!response.ok) {
			throw new Error(`Failed to load JSON file: ${response.statusText}`);
		}
		const jsonData = await response.json();
		filterGearDates(jsonData);
	} catch (error) {
		console.error("Error loading JSON file:", error);
	}
}

function filterGearDates(data) {
	for (let i in data) {
		if (data[i].start) {
			data[i].start = data[i].start.substring(0, 4);
			if (data[i].start > 1200) {
				filteredGear.push(data[i]);
			}
		}
	}
	console.log(filteredGear);
}

async function fetchTheater() {
	try {
		const response = await fetch("./JSON/TheatresUpdated.json");
		if (!response.ok) {
			throw new Error(`Failed to load JSON file: ${response.statusText}`);
		}
		const jsonData = await response.json();
		filterTheaterDates(jsonData);
	} catch (error) {
		console.error("Error loading JSON file:", error);
	}
}

function filterTheaterDates(data) {
	for (let i in data) {
		if (data[i].openingDate && data[i].continentLabel != "Europe") {
			if (data[i].openingDate > 1200) {
				filteredTheaters.push(data[i]);
			}
		}
	}

}

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
	// console.log(data);
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
	// console.log("Sorted Birthdates (A to Z):", data);
}

function sortBirthdatesZA(data) {
	data.sort((a, b) => b.dateOfBirth - a.dateOfBirth);
	// console.log("Sorted Birthdates (Z to A):", data);
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

async function placeAllBol() {
	let array;
	await fetchPersons();
	await fetchTheater();
	await fetchGear();
	await fetchEvents();

	rowInput = 1;
	for (let i = 0; i < filteredPersons.length; i++) {
		bolInput = roundToDecade(filteredPersons[i].dateOfBirth);
		bolInput = bolInput / 10 - 120;

		if (bolInput < 0 || bolInput > 100) {
			alert("bol input moet tussen 0 en 100 liggen");
			return;
		}

		bolColor = "#E6BB45";
		rowId = _1stRow;

		addBol(rowId, bolInput, bolColor, filteredPersons[i].qCode);
	}

	rowInput = 2;
	for (let i = 0; i < filteredTheaters.length; i++) {
		bolInput = roundToDecade(filteredTheaters[i].openingDate);
		bolInput = bolInput / 10 - 120;

		if (bolInput < 0 || bolInput > 100) {
			alert("bol input moet tussen 0 en 100 liggen");
			return;
		}

		bolColor = "#FF65C1";
		rowId = _2thRow;

		addBol(rowId, bolInput, bolColor, filteredTheaters[i].qCode);
	}

	rowInput = 3;
	for (let i = 0; i < filteredGear.length; i++) {
		bolInput = roundToDecade(filteredGear[i].start);
		bolInput = bolInput / 10 - 120;

		if (bolInput < 0 || bolInput > 100) {
			alert("bol input moet tussen 0 en 100 liggen");
			return;
		}

		bolColor = "#ce1644";
		rowId = _3thRow;

		addBol(rowId, bolInput, bolColor, filteredGear[i].qCode);
	}

	rowInput = 4;
	for (let i = 0; i < filteredEvents.length; i++) {
		bolInput = roundToDecade(filteredEvents[i].timeline_date);
		bolInput = bolInput / 10 - 120;

		if (bolInput < 0 || bolInput > 100) {
			alert("bol input moet tussen 0 en 100 liggen");
			return;
		}

		bolColor = "#ffcb91";
		rowId = _4thRow;

		addBol(rowId, bolInput, bolColor, filteredEvents[i].qCode);
	}
}

placeAllBol();
