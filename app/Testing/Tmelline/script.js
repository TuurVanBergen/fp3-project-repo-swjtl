import formatDate from "../../../Classes/formatDate.js";
import { getAllInfo } from "../QueryTest/script.js";

console.log("timeline test");
let equiment = [];
getEquipmentTimelineData();
// displayinformation();

async function displayinformation() {
	return await getAllInfo(`Q31216`);
}

let currentObject = await displayinformation();

document.getElementById("objectMessage").innerHTML += `
<p>${JSON.stringify(currentObject)}</p><br><br>
`;

// displayinformation(`Q21705`);
// getAllInfo(`Q21705`);
// getAllInfo(`Q8876`);
// getAllInfo(`Q20576`);
// getAllInfo(`Q123`);
// getAllInfo(`Q266`);
// getAllInfo(`Q8754`);
// getAllInfo(`Q4251`);
// getAllInfo(`Q12`);
// getAllInfo(`Q577`);
// getAllInfo(`Q8876`);
// getAllInfo(`Q90`);
// getAllInfo(`Q91`);
// getAllInfo(`Q92`);
// getAllInfo(`Q93`);

// console.log(equiment);

// async function getPersonTimelineData() {
// 	await fetch("http://127.0.0.1:5500/JSON/PersonsByOccupation.json")
// 		.then((response) => response.json())
// 		.then((data) => {
// 			console.log(data);

// 			for (let info in data) {
// 				if (!(data[info].start === undefined)) {
// 					let dateString = new formatDate();
// 					// console.log(data[date].start);
// 					let startDate = dateString.formatTimelineDate(data[info].start);
// 					let itemLabel = data[info].itemLabel;
// 					let cardInfo = `${itemLabel} :  ${startDate}`;
// 					equiment.push(cardInfo);
// 					console.log(cardInfo);
// 				}
// 			}
// 		})
// 		.catch((error) => console.error("Error fetching the file:", error));
// }

async function getEquipmentTimelineData() {
	await fetch("http://127.0.0.1:5500/JSON/equipment.json")
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);

			for (let info in data) {
				if (!(data[info].start === undefined)) {
					let dateString = new formatDate();
					// console.log(data[date].start);
					let startDate = dateString.formatTimelineDate(data[info].start);
					let itemLabel = data[info].itemLabel;
					let cardInfo = `${itemLabel} :  ${startDate}`;
					equiment.push(cardInfo);
					// console.log(cardInfo);
				}
			}
		})
		.catch((error) => console.error("Error fetching the file:", error));
}
