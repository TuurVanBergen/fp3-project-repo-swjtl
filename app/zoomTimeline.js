const centuryElements = document.querySelectorAll(".century");
let dateOfBirth;
let centuryNr;
let centuryValue;
let qCodesToShow = [];
let personsToShow = [];

centuryElements.forEach(function (centuryElement) {
	centuryElement.addEventListener("click", function () {
		centuryValue = centuryElement.innerHTML;
		if (centuryValue == "all") {
			resetTimeline();
		}
		dateOfBirth = centuryValue.slice(0, 4);
		dateOfDeath = centuryValue.slice(5);
		console.log(dateOfBirth);
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
	}
	console.log("qCodesToShow" + qCodesToShow);
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
	console.log("personToShow: " + personsToShow);
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
}

function placeBol() {
	rowInput = 1;
	clearTimeline(rowId);
	for (let i = 0; i < personsToShow.length; i++) {
		bolInput = personsToShow[i].dateOfBirth - dateOfBirth;

		if (bolInput < 0 || bolInput > 100) {
			console.log("personsToShow dateOfBirth: " + personsToShow[i].dateOfBirth);
			console.log("wrong bolInput" + bolInput);
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
		console.log("bolinput: " + bolInput);
		addBol(rowId, bolInput, bolColor, personsToShow[i].qCode);
	}
}
