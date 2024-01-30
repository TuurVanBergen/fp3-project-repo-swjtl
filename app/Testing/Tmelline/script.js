import formatDate from "./../../Classes/formatDate.js";
import {
	getAllInfo,
	getPersonDate,
	getTheatreInfo,
} from "../QueryTest/script.js";

console.log("timeline test");

let equiment = [];
let persons = [];
let personQcodes = ["Q31755", "Q33985", "Q30628", "Q20679", "Q22453", "Q21163"];

let Qlist = ["Q20393", "Q31216", "Q21705", "Q20576", "Q123", "Q266", "Q8754"];

// await getPersonTimelineData();

// getEquipmentTimelineData();
// console.log(equiment);

// getEventsTimelineData();
await getTheatreInfo("Q133");
// getTheatresTimelineData();
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
			// add birth and death data to persons objects
			// returns birth an death of person with q code

			addDatesToPersons();
		})
		.catch((error) => console.error("Error fetching the file:", error));
}
async function addDatesToPersons() {
	for (let p in persons) {
		let currentObject = await getPersonDate(persons[p].qCode);
		console.log(currentObject.dateOfBirth);
		console.log(currentObject.dateOfDeath);
		console.log(currentObject.description);
		persons[p].dateOfBirth = currentObject.dateOfBirth;
		persons[p].dateOfDeath = currentObject.dateOfDeath;
		persons[p].description = currentObject.description;
		console.log(persons[p]);
	}
	console.log(persons); // Make Json file from persons
	console.log(JSON.stringify(persons));
	document.getElementById("jsonString").innerText = JSON.stringify(persons);
}

// gets all equipment with an identified date

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

async function getTheatresTimelineData() {
	await fetch("http://127.0.0.1:5502/app/JSON/TheatresByLocation.json")
		.then((response) => response.json())
		.then((data) => {
			for (let info in data) {
				console.log(data[info]);
				//returns last part of link (Q-code)
				let theatreLink = data[info].theatre;

				let qCode = data[info].theatre.lastIndexOf("Q");
				qCode = data[info].theatre.substring(qCode);
			}
		})
		.catch((error) => console.error("Error fetching the file:", error));
}
