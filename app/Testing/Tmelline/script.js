import formatDate from "./../../Classes/formatDate.js";
import {
	getAllInfo,
	getDeathDate,
	getPersonDate,
	getTheatreInfo,
} from "../QueryTest/script.js";

console.log("timeline test");

let equiment = [];
let persons = [];
let personQcodes = ["Q31755", "Q33985", "Q30628", "Q20679", "Q22453", "Q21163"];
let theatres = [];

let Qlist = ["Q20393", "Q31216", "Q21705", "Q20576", "Q123", "Q266", "Q8754"];

// await getPersonTimelineData();
// await addDeathDates();
// getEquipmentTimelineData();
// console.log(equiment);

// getEventsTimelineData();

// await getTheatreInfo("Q133");
///////////////////////////////////
// getTheatresTimelineData();
////////////////////////////////////
// need to do the same as persons. create new json file for all data

// only use when needing all of the information. goes very slow for all fetches. is pretty fast for just one fetch
async function displayinformation(qCode) {
	// info is object
	let info = await getAllInfo(qCode);

	// values inside object
	console.log(info.label);
	let name = info.label;
	if (!(info.dateOfBirth === undefined)) {
		let dateOfBirth = info.dateOfBirth;
		let dateOfDeath = info.dateOfDeath;
		let currentObject = { dateOfBirth, dateOfDeath, qCode, name };

		return currentObject;
	} else if (!(info.firstUseDate === undefined)) {
		let firstUseDate = info.firstUseDate;
		let currentObject = { firstUseDate, qCode, name };

		return currentObject;
	}
}
let deathDates = [];
let newEquipmentList = [];
await fetch("http://127.0.0.1:5502/app/JSON/equipment.json")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		let currentQList = [];
		for (let info in data) {
			let qCode = data[info].item.lastIndexOf("Q");
			qCode = data[info].item.substring(qCode);

			data[info].qCode = qCode;
		}
		document.getElementById("jsonString").innerHTML = `<p>${JSON.stringify(
			data
		)}</p>`;
	})
	.catch((error) => console.error("Error fetching the file:", error));

// decide what data to use
function getEventsTimelineData() {
	fetch("http://127.0.0.1:5502/app/JSON/Events.json")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			for (let i in data) {
				if (data[i].pLabel === "Canon Event Label") {
					console.log(data[i].itemLabel);
				}
			}
			console.log("---------------------------------------------");
			for (let i in data) {
				if (data[i].pLabel === "point in time") {
					console.log(data[i].itemLabel);
				}
			}

			// let name = data[info].itemLabel;
			// let date =
		});
}

await fetch("http://127.0.0.1:5502/app/JSON/finalPersons.json")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
	})
	.catch((error) => console.error("Error fetching the file:", error));
async function addDeathDates() {
	// save list of people local fetch
	// for every item fetch deathdate
	let dateOfDeathList = [];
	let incompleteList = [];
	let completeList = [];

	await fetch("http://127.0.0.1:5502/app/JSON/updatedPersons.json")
		.then((response) => response.json())
		.then((data) => {
			for (let info in data) {
				let currentObject = {};
				currentObject.name = data[info].name;
				currentObject.qCode = data[info].qCode;
				currentObject.occupationLabel = data[info].occupationLabel;
				currentObject.countryLabel = data[info].countryLabel;
				currentObject.dateOfBirth = data[info].dateOfBirth;
				currentObject.description = data[info].description;
				currentObject.imageLink = data[info].imageLink;

				incompleteList.push(currentObject);
			}

			console.log(incompleteList);
		})
		.catch((error) => console.error("Error fetching the file:", error));

	// persons.deathdate => updatedPersons.deathdate
	await fetch("http://127.0.0.1:5502/app/JSON/Persons.json")
		.then((response) => response.json())
		.then((data) => {
			for (let info in data) {
				let currentObject = {};
				currentObject.name = data[info].name;
				currentObject.qCode = data[info].qCode;
				currentObject.occupationLabel = data[info].occupationLabel;
				currentObject.countryLabel = data[info].countryLabel;
				currentObject.description = data[info].description;
				currentObject.dateOfBirth = data[info].dateOfBirth;
				currentObject.dateOfDeath = data[info].dateOfDeath;

				dateOfDeathList.push(currentObject);
			}
			console.log(dateOfDeathList);
		})
		.then(() => {})
		.catch((error) => console.error("Error fetching the file:", error));

	console.log(dateOfDeathList.length);
	for (let i = 0; i < dateOfDeathList.length; i++) {
		console.log(i);

		incompleteList[i].dateOfDeath = dateOfDeathList[i].dateOfDeath;
	}
	console.log(incompleteList);

	document.getElementById("jsonString").innerHTML = `<p>${JSON.stringify(
		incompleteList
	)}</p>`;
}
async function fetchDeathDates(qCode) {
	let deathDate = await getDeathDate(qCode);
	console.log(deathDate);
	return deathDate;
}

function getPersonTimelineData() {
	fetch("http://127.0.0.1:5502/app/JSON/PersonsByOccupation.json")
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);

			for (let info in data) {
				let name = data[info].personLabel;

				//returns last part of link (Q-code)
				let qCode = data[info].person.lastIndexOf("Q");
				qCode = data[info].person.substring(qCode);

				// console.log(qCode);
				let occupationLabel = data[info].occupationLabel;
				let countryLabel = data[info].countryLabel;
				let cardInfo = { name, qCode, occupationLabel, countryLabel };
				persons.push(cardInfo);
			}

			addDatesToPersons();
		})
		.catch((error) => console.error("Error fetching the file:", error));
}
async function addDatesToPersons() {
	console.log(persons);
	for (let p in persons) {
		let currentObject = await getPersonDate(persons[p].qCode);
		console.log(currentObject);
		persons[p].dateOfBirth = currentObject.dateOfBirth;
		persons[p].dateOfDeath = currentObject.dateOfDeath;
		console.log(persons[p].dateOfDeath);
		persons[p].description = currentObject.description;
		persons[p].imageLink = currentObject.imageLink;

		console.log(persons[p]);
		// document.getElementById(
		// 	"objectMessage"
		// ).innerHTML += `<img src="${persons[p].imageLink}" width="100px"
		// height="100px" alt="">`;
	}
	console.log(persons); // Make Json file from persons
	console.log(JSON.stringify(persons));
	document.getElementById("jsonString").innerText = JSON.stringify(persons);
}

async function getEquipmentTimelineData() {
	await fetch("http://127.0.0.1:5502/app/JSON/equipment.json")
		.then((response) => response.json())
		.then((data) => {
			for (let info in data) {
				if (!(data[info].start === undefined)) {
					let dateString = new formatDate();

					let startDate = dateString.formatTimelineDate(data[info].start);
					console.log(startDate);
					let name = data[info].itemLabel;
					let currentObject = { name, startDate };
					console.log(data[info].item);
					equiment.push(currentObject);
				}
			}
			console.log(equiment);
		})
		.catch((error) => console.error("Error fetching the file:", error));
}

// combines the fetch and the local JSON file into singular objects
async function addDatesToTheatre() {
	// document.getElementById("jsonString").innerText += "[";
	for (let t in theatres) {
		// console.log("THEATRE CALLED");
		let theatreObject = JSON.stringify(theatres[t]);
		theatreObject = JSON.parse(theatreObject);

		let currentObject = await getTheatreInfo(theatres[t].qCode);
		if (!(currentObject.buildingDate === undefined)) {
			theatreObject.buildingDate = currentObject.buildingDate;
		}
		if (!(currentObject.openingDate === undefined)) {
			theatreObject.openingDate = currentObject.openingDate;
		}
		if (!(currentObject.restorationDate === undefined)) {
			theatreObject.restorationDate = currentObject.restorationDate;
		}
		if (!(currentObject.redevelopmentDate === undefined)) {
			theatreObject.redevelopmentDate = currentObject.redevelopmentDate;
		}
		if (!(currentObject.discoveryDate === undefined)) {
			theatreObject.discoveryDate = currentObject.discoveryDate;
		}
		if (!(currentObject.burntDownDate === undefined)) {
			theatreObject.burntDownDate = currentObject.burntDownDate;
		}
		if (!(currentObject.closureDate === undefined)) {
			theatreObject.closureDate = currentObject.closureDate;
		}
		if (!(currentObject.demolishedDate === undefined)) {
			theatreObject.demolishedDate = currentObject.demolishedDate;
		}
		theatreObject.theatreName = currentObject.theatreName;

		// console.log("THEATRE ENDED");
		console.log(theatreObject);
		// console.log(JSON.stringify(theatreObject));
		// document.getElementById("jsonString").innerText +=
		// 	JSON.stringify(theatreObject) + ",";
	}
	// document.getElementById("jsonString").innerText += "]";
	console.log("FETCH DONE ");
	console.log(theatres);
}
async function getTheatresTimelineData() {
	await fetch("http://127.0.0.1:5502/app/JSON/TheatresByLocation.json")
		.then((response) => response.json())
		.then((data) => {
			for (let info in data) {
				let currentObject = {};

				// console.log(data[info]);
				let qCode = data[info].theatre.lastIndexOf("Q");
				qCode = data[info].theatre.substring(qCode);

				currentObject.qCode = qCode;
				// currentObject.oldName = data[info].theatreLabel;
				currentObject.theatreLink = data[info].theatre;
				currentObject.cityLabel = data[info].cityLabel;
				currentObject.city = data[info].city;
				currentObject.continentLabel = data[info].continentLabel;
				currentObject.continent = data[info].continent;
				currentObject.countryLabel = data[info].countryLabel;
				currentObject.country = data[info].country;

				// console.log("DONE");
				theatres.push(currentObject);
			}
			// console.log(theatres);
			addDatesToTheatre();
		})
		.catch((error) => console.error("Error fetching the file:", error));
}
