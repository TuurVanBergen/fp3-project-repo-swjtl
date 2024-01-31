import { addBol } from "./timeline.js";

const centuryElements = document.querySelectorAll(".century");
let dateOfBirth;
let centuryNr;
let centuryValue;
let qCodesToShow = [];
let personsToShow = [];
centuryElements.forEach(function (centuryElement) {
	centuryElement.addEventListener("click", function () {
		centuryValue = centuryElement.innerHTML;
		dateOfBirth = centuryValue.slice(0, 4);
		console.log(dateOfBirth);
		determineQCodes(dateOfBirth);
	});
});

function determineQCodes(dateOfBirth) {
	centuryNr = dateOfBirth / 100;

	let startTile = (centuryNr - 12) * 10;
	let endTile = startTile + 10;

	for (let i = startTile; i < endTile; i++) {
		let row = document.querySelector("#_1stRow");
		let classList = row.children[i].classList;
		for (let j in classList) {
			if (classList[j].toString().startsWith("Q")) {
				qCodesToShow.push(classList[j]);
				// classList.remove(classList[j]);
			}
		}
	}
	console.log("qCodesToShow" + qCodesToShow);
	determinePersonsToShow();
	placeBol();
}

function determinePersonsToShow() {
	for (let i = 0; i < filteredPersons.length; i++) {
		if (qCodesToShow.includes(filteredPersons[i].qCode)) {
			personsToShow.push(filteredPersons[i]);
		}
	}
	console.log("personToShow: " + personsToShow);
}

function placeBol() {
	rowInput = 1;
	for (let i = 0; i < personsToShow.length; i++) {
		bolInput = personsToShow[i].dateOfBirth - centuryValue;

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

		addBol(rowId, bolInput, bolColor, personsToShow[i].qCode);
	}
}
