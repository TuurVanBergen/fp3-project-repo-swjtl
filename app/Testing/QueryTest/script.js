import formatDate from "../../../Classes/formatDate.js";

console.log("test");
// `https://canonbase.eu/w/api.php?action=wbgetentities&ids=Q31216&languages=en%7Cde%7Cfr&format=json&origin=*`
// let qCode = `Q31216`;
// let qCode = `Q21705`;
// let qCode = `Q20576`;
// let qCode = `Q123`;
// let qCode = `Q266`;
// let qCode = `Q8754`;
// let qCode = `Q4251`;
// let qCode = `Q12`;
// let qCode = `Q577`;
// let qCode = `Q8876`;
// let qCode = `Q90`;
// let qCode = `Q91`;
// let qCode = `Q92`;
// let qCode = `Q93`;

// getAllInfo(qCode);

export async function getAllInfo(qCode) {
	console.log(`fetching from ${qCode}`);
	let currentObject;
	try {
		const response = await fetch(setUrl(qCode));
		const data = await response.json();

		let label = eval(`data.entities.` + qCode + `.labels.en.value`);
		let description = eval(`data.entities.` + qCode + `.descriptions.en.value`);

		console.log(label);
		console.log(description);

		// document.getElementById("label").innerText = label;
		// document.getElementById("description").innerText = description;

		// returns all properties linked to Q31216
		let properties = Object.keys(eval(`data.entities.` + qCode + `.claims`));
		// adds all info to currentObject

		//Second api call
		currentObject = await fetchInfo(properties, data, qCode);
		currentObject.label = label;
		currentObject.description = description;
		// console.log(currentObject);
		// document.getElementById("section").innerHTML = `<p>${toString(
		// 	response2
		// )}</p>`;
		// console.log(currentObject);
	} catch (error) {
		console.error("Error fetching the file:", error);
	}

	return currentObject;
}

function setUrl(qCode) {
	let url = `https://canonbase.eu/w/api.php?action=wbgetentities&ids=${qCode}&languages=en%7Cde%7Cfr&format=json&origin=*`;
	return url;
}
async function fetchInfo(properties, data, qCode) {
	let i = 0;
	let temp = qCode;
	let currentObject = {};
	for (let property of properties) {
		qCode = temp;
		i++;

		// console.log(`current containerNr :  ${i}`);
		// console.log("Q code : " + qCode);
		// console.log(`Property :  ` + property);

		/*
		document.getElementById("section").innerHTML += `
		<div class="container" id="container${i}">${i}
		
		</div>
		`;
		*/

		// adds properties to object;
		if (property === "P2") {
			// image
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value`;

			console.log(`Corresponding Q : ` + eval(currentProperty));

			currentObject.img = `http://commons.wikimedia.org/wiki/Special:FilePath/${eval(
				`data.entities.` +
					qCode +
					`.claims.` +
					property +
					`[0].mainsnak.datavalue.value`
			)}`;

			// document.getElementById(`container${i}`).innerHTML += `<p id="fieldValue" ><img id="linkedImg" src="${currentObject.img}"></img></p>`;
		} else if (property === "P16") {
			// Wikidata source
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value`;
			console.log(eval(currentProperty));
			currentObject.wikiDataSource = `https://www.wikidata.org/wiki/${eval(
				currentProperty
			)}`;

			/*
			document.getElementById(
				`container${i}`
			).innerHTML += `<p id="fieldValue" ><a target="_blank" id="pageLink" href="https://www.wikidata.org/wiki/${eval(
				`data.entities.` +
					qCode +
					`.claims.` +
					property +
					`[0].mainsnak.datavalue.value`
			)}">https://www.wikidata.org/wiki/${eval(
				`data.entities.` +
					qCode +
					`.claims.` +
					property +
					`[0].mainsnak.datavalue.value`
			)}</a></p>`;

			console.log(`Corresponding Q : ` + eval(currentProperty));*/
		} else if (
			property === "P111" ||
			property === "P102" ||
			property === "P30" ||
			property === "P31"
		) {
			// Date
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value.time`;

			console.log(eval(currentProperty));
			let info = new formatDate();
			currentProperty = info.formatYear(eval(currentProperty));

			switch (property) {
				case "P111":
					// First use date
					currentObject.firstUseDate = currentProperty;

					break;
				case "P102":
					// Opening Date
					currentObject.openingDate = currentProperty;

					break;
				case "P30":
					// Date of Birth
					currentObject.dateOfBirth = currentProperty;

					break;
				case "P31":
					// Date of Death
					currentObject.dateOfDeath = currentProperty;

					break;
				// Add more cases as needed
				default:
					// Default case (optional): Handle the case when property doesn't match any of the specified values
					break;
			}

			/*
			document.getElementById(
				`container${i}`
			).innerHTML += `<p id="fieldValue">${currentProperty}</p>`;*/
		} else if (property === "P64") {
			// source url
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value`;
			currentObject.sourceUrl = eval(currentProperty);

			/*
			document.getElementById(
				`container${i}`
			).innerHTML += `<p id="fieldValue"><a target="_blank" id="pageLink" href="${eval(
				currentProperty
			)}">${eval(currentProperty)}</a></p>`;*/
		} else if (property === "P164") {
			// Adress
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value`;
			currentObject.adress = eval(currentProperty);

			/*
			document.getElementById(
				`container${i}`
			).innerHTML += `<p id="fieldValue">${eval(currentProperty)}</p>`;*/
		}

		// Defines the new Qcode for value fetch
		qCode = eval(
			`data.entities.${qCode}.claims.${property}[0].mainsnak.datavalue.value.id`
		);
		console.log("new Qcode : " + qCode);

		// append Property value (general case)
		await fetch(setUrl(property))
			.then((response) => response.json())
			.then((data) => {
				console.log(`Appending ${qCode} property to html  `);

				let pName = eval(`data.entities.${property}.labels.en.value`);
				/*
				document.getElementById(
					`container${i}`
				).innerHTML += `<p id="fieldName">${pName}</p>`;*/
			})
			.catch((error) => console.error("Error fetching the file:", error));

		// Append Statement value

		await fetch(setUrl(qCode))
			.then((response) => response.json())
			.then((data) => {
				console.log(`Appending ${qCode} statement to html `);
				let pValue = eval(`data.entities.${qCode}.labels.en.value`);

				if (property === "P11") {
					//type of information
					currentObject.typeOfInformation = pValue;
				} else if (property === "P19") {
					// Field
					currentObject.field = pValue;
				} else if (property === "P33") {
					//subclass of
					currentObject.subclassOf = pValue;
				}
				/*
				document.getElementById(
					`container${i}`
				).innerHTML += `<p id="fieldValue">${pValue}</p>`;*/
			})
			.catch((error) => console.error("Error fetching the file:", error));

		console.log("Finished " + property);
		console.log("___________________________________");
	}
	// console.log(currentObject);
	return currentObject;
}

// ----------------------------------------------------------

/*



    
// function for formatting date from querry format taken from chatgpt

function formatDate(inputDate) {
	const match = /^(\+\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}Z$/.exec(inputDate);

	if (!match) {
		// Handle invalid date format
		return "Invalid Date";
	}

	const dateString = match[1];
	const dateObject = new Date(dateString);
	const options = { day: "numeric", month: "long", year: "numeric" };

	return dateObject.toLocaleDateString("en-US", options);
}

// Example usage
const inputDate = "+1932-01-19T00:00:00Z";
const formattedDate = formatDate(inputDate);
console.log(formattedDate); // Output: January 19, 1932
*/

/* 
Old Image generation code, could be usefull if the new system fails

	// fetch to deterimine field
			let type;
			await fetch(setUrl(`P11`))
				.then((response) => response.json())
				.then((data) => {
					type = eval(`data.entities.${`P11`}.labels.en.value`);
				})
				.catch((error) => console.error("Error fetching the file:", error));

			if (type === `Type of information`) {
				await fetch("http://127.0.0.1:5500/json/Theatres.json")
					.then((response) => response.json())
					.then((data) => {
						for (let imgLink in data) {
							if (data[imgLink].item == `http://canonbase.eu/entity/${qCode}`) {
								// document.getElementById(
								// 	`container${i}`
								// ).innerHTML += `<p id="fieldValue" ><img id="linkedImg" src="${data[imgLink].img_wik}"></img></p>`;
							}
						}
					})
					.catch((error) => console.error("Error fetching the file:", error));
			} else {
				await fetch("http://127.0.0.1:5500/json/equipment.json")
					.then((response) => response.json())
					.then((data) => {
						for (let imgLink in data) {
							if (data[imgLink].item == `http://canonbase.eu/entity/${qCode}`) {
								document.getElementById(
									`container${i}`
								).innerHTML += `<p id="fieldValue" ><img id="linkedImg" src="${data[imgLink].img_wik}"></img></p>`;
							}
						}
					})
					.catch((error) => console.error("Error fetching the file:", error));
			}
*/
