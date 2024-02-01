const centuryElements = document.querySelectorAll(".century");
let dateOfBirth;
let centuryNr;
let centuryValue;
let qCodesToShow = [];
let personsToShow = [];
let theatersToShow = [];
let theatersQCodes = [];

centuryElements.forEach(function (centuryElement) {
	centuryElement.addEventListener("click", function () {
		centuryValue = centuryElement.innerHTML;
		if (centuryValue == "all") {
			resetTimeline();
		}
		dateOfBirth = centuryValue.slice(0, 4);
		dateOfDeath = centuryValue.slice(5);
		determineQCodes(dateOfBirth);
	});
});

function resetTimeline() {
	location.reload();
}

function determineQCodes(dateOfBirth) {
	qCodesToShow = [];
	centuryNr = dateOfBirth / 100;

	let startTile = (centuryNr - 12) * 10;
	let endTile = startTile + 9;

	for (let i = startTile; i < endTile; i++) {
		let row = document.querySelector("#_1stRow");
		let classList = row.children[i].classList;
		for (let j in classList) {
			if (classList[j].toString().startsWith("Q")) {
				qCodesToShow.push(classList[j]);
			}
		}

		let row2 = document.querySelector("#_2thRow");
		let classList2 = row2.children[i].classList;
		for (let j in classList2) {
			if (classList2[j].toString().startsWith("Q")) {
				theatersQCodes.push(classList2[j]);
			}
		}
	}
	determinePersonsToShow();
	placeBol();
}

function determinePersonsToShow() {
	personsToShow = [];
	for (let i = 0; i < filteredPersons.length; i++) {
		if (qCodesToShow.includes(filteredPersons[i].qCode)) {
			personsToShow.push(filteredPersons[i]);
		}
	}
	for (let i = 0; i < filteredTheaters.length; i++) {
		if (theatersQCodes.includes(filteredTheaters[i].qCode)) {
			theatersToShow.push(filteredTheaters[i]);
		}
	}
}

function clearTimeline() {
	const middleYearElements = document.querySelectorAll(".middelYear");

	middleYearElements.forEach((element) => {
		element.innerHTML = "";
	});

	document.querySelector("#startYear").innerHTML = dateOfBirth;
	document.querySelector("#endYear").innerHTML = dateOfDeath;

	document.querySelector("#_1stRow").innerHTML = "";
	for (let i = 0; i < 100; i++) {
		document.querySelector("#_1stRow").insertAdjacentHTML("beforeend", `<div class="grid-tile"></div>`);
	}

	document.querySelector("#_2thRow").innerHTML = "";
	for (let i = 0; i < 100; i++) {
		document.querySelector("#_2thRow").insertAdjacentHTML("beforeend", `<div class="grid-tile"></div>`);
	}

	document.querySelector("#_3thRow").innerHTML = "";
	for (let i = 0; i < 100; i++) {
		document.querySelector("#_3thRow").insertAdjacentHTML("beforeend", `<div class="grid-tile"></div>`);
	}

	document.querySelector("#_4thRow").innerHTML = "";
	for (let i = 0; i < 100; i++) {
		document.querySelector("#_4thRow").insertAdjacentHTML("beforeend", `<div class="grid-tile"></div>`);
	}
}

function placeBol() {
	clearTimeline();

	rowInput = 1;
	for (let i = 0; i < personsToShow.length; i++) {
		bolInput = personsToShow[i].dateOfBirth - dateOfBirth;

		if (bolInput < 0 || bolInput > 100) {
			alert("bol input moet tussen 0 en 100 liggen");
			return;
		}

		bolColor = "#E6BB45";
		rowId = _1stRow;
		
		console.log("bolinput: " + bolInput);
		addBol(rowId, bolInput, bolColor, personsToShow[i].qCode);
	}

	rowInput = 2;
	for (let i = 0; i < theatersToShow.length; i++) {
		bolInput = theatersToShow[i].openingDate - dateOfBirth;

		if (bolInput < 0 || bolInput > 100) {
			alert("bol input moet tussen 0 en 100 liggen");
			return;
		}

		bolColor = "#FF65C1";
		rowId = _2thRow;
		
		console.log("bolinput: " + bolInput);
		addBol(rowId, bolInput, bolColor, personsToShow[i].qCode);
	}
}
