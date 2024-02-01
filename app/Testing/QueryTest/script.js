import formatDate from "./../../Classes/formatDate.js";

console.log("Querytest");
// `https://canonbase.eu/w/api.php?action=wbgetentities&ids=Q31216&languages=en%7Cde%7Cfr&format=json&origin=*`

// getAllInfo(qCode);
// getPersonDate("Q31755");

// returns only dateofbirth and dateofdeath of person

export async function getDeathDate(Qcode) {}

export async function getPersonDate(qCode) {
	let personDates = {};
	try {
		const response = await fetch(setUrl(qCode));
		const data = await response.json();

		try {
			let dateOfBirth = eval(
				`data.entities.` +
					qCode +
					`.claims.P30[0].mainsnak.datavalue.value.time`
			);

			let dateString = new formatDate();
			dateOfBirth = dateString.formatYear(dateOfBirth);

			personDates.dateOfBirth = dateOfBirth;
		} catch {
			console.log("dateOfBirth undefined");
		}

		try {
			let dateOfDeath = eval(
				`data.entities.` +
					qCode +
					`.claims.P31[0].mainsnak.datavalue.value.time`
			);
			dateOfDeath = dateString.formatYear(dateOfDeath);
			console.log(dateOfDeath);

			personDates.dateOfDeath = dateOfDeath;
		} catch {
			console.log("dateOfDeath undefined");
		}

		try {
			let description = eval(
				`data.entities.` + qCode + `.descriptions.en.value`
			);
			personDates.description = description;
		} catch {
			console.log("description undefined");
		}

		try {
			let imgPath = eval(
				`data.entities.` + qCode + `.claims.P2[0].mainsnak.datavalue.value`
			);

			let imageLink = `http://commons.wikimedia.org/wiki/Special:FilePath/${imgPath}`;

			personDates.imageLink = imageLink;
		} catch {
			console.log("imageLink undefined");
		}
	} catch {
		console.error("No Date Found");
	}
	console.log(personDates);

	return personDates;
}

export async function getTheatreInfo(qCode) {
	console.log("CALLED");
	let currentObject = {};
	// ---- Pvalues for Dates ------
	// P101 buildingDate
	// P102 openingDate
	// P103 restorationDate
	// P104 redevelopmentDate
	// P105 discoveryDate
	// P106 burntDownDate
	// P107 closureDate
	// P108 demolishedDate
	try {
		//fetch data
		const response = await fetch(setUrl(qCode));
		const data = await response.json();

		// list op Pvalues linked to qCode
		let properties = Object.keys(eval(`data.entities.` + qCode + `.claims`));

		// defines name and removes brackets
		let theatreName = eval(
			`data.entities.` + qCode + `.labels.en.value`
		).replace(/\[.*?\]/g, "");
		currentObject.theatreName = theatreName;
		console.log(theatreName);

		for (let p in properties) {
			let info;
			let length;
			switch (properties[p]) {
				case "P101":
					// console.log("P101 buildingDate FOUND");
					let buildingDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P101`)) {
						buildingDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P101[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						buildingDate[i] = info.formatYear(buildingDate[i]);
					}

					currentObject.buildingDate = buildingDate;
					// console.log(currentObject.buildingDate);

					break;
				case "P102":
					// console.log("P102 openingDate FOUND");
					let openingDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P102`)) {
						openingDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P102[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						openingDate[i] = info.formatYear(openingDate[i]);
					}

					currentObject.openingDate = openingDate;
					// console.log(currentObject.openingDate);

					break;
				case "P103":
					// console.log("P103 restorationDate FOUND");
					let restorationDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P103`)) {
						restorationDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P103[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						restorationDate[i] = info.formatYear(restorationDate[i]);
					}

					currentObject.restorationDate = restorationDate;
					// console.log(currentObject.restorationDate);

					break;
				case "P104":
					// console.log("P104 redevelopmentDate FOUND");
					let redevelopmentDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P104`)) {
						redevelopmentDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P104[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						redevelopmentDate[i] = info.formatYear(redevelopmentDate[i]);
					}

					currentObject.redevelopmentDate = redevelopmentDate;
					// console.log(currentObject.redevelopmentDate);

					break;
				case "P105":
					// console.log("P105 discoveryDate FOUND");
					let discoveryDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P105`)) {
						discoveryDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P105[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						discoveryDate[i] = info.formatYear(discoveryDate[i]);
					}

					currentObject.discoveryDate = discoveryDate;
					// console.log(currentObject.discoveryDate);

					break;
				case "P106":
					// console.log("P106 burntDownDate FOUND");
					let burntDownDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P106`)) {
						burntDownDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P106[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						burntDownDate[i] = info.formatYear(burntDownDate[i]);
					}

					currentObject.burntDownDate = burntDownDate;
					// console.log(currentObject.burntDownDate);

					break;
				case "P107":
					// console.log("P107 closureDate FOUND");
					let closureDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P107`)) {
						closureDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P107[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						closureDate[i] = info.formatYear(closureDate[i]);
					}

					currentObject.closureDate = closureDate;
					// console.log(currentObject.closureDate);

					break;
				case "P108":
					// console.log("P108 demolishedDate FOUND");
					let demolishedDate = [];
					for (let i in eval(`data.entities.` + qCode + `.claims.P108`)) {
						demolishedDate[i] = eval(
							`data.entities.` +
								qCode +
								`.claims.P108[${i}].mainsnak.datavalue.value.time`
						);
						info = new formatDate();
						demolishedDate[i] = info.formatYear(demolishedDate[i]);
					}

					currentObject.demolishedDate = demolishedDate;
					// console.log(currentObject.demolishedDate);

					break;
				case "P2":
					// console.log("P2 Found!");

					// console.log(properties[p]);
					console.log(
						eval(
							`data.entities.` +
								qCode +
								`.claims.` +
								properties[p] +
								`[0].mainsnak.datavalue.value`
						)
					);
					let imgPath = eval(
						`data.entities.` +
							qCode +
							`.claims.` +
							properties[p] +
							`[0].mainsnak.datavalue.value`
					);
					// console.log(imgPath);

					let imageLink = `http://commons.wikimedia.org/wiki/Special:FilePath/${imgPath.replace(
						/\s/g,
						""
					)}`;

					currentObject.imageLink = imageLink;
					break;
			}
		}
		// console.log(currentObject);
		return currentObject;
	} catch {
		console.error("No Date Found", error);
	}
	console.log("ENDED");
}
console.log(await getAllInfo("Q20812"));

export async function getAllInfo(qCode) {
	console.log(`fetching from ${qCode}`);
	let currentObject;
	try {
		const response = await fetch(setUrl(qCode));
		const data = await response.json();

		let label;
		let description;

		if (
			eval(`data.entities.` + qCode + `.descriptions.en.value`) === undefined
		) {
			label = eval(`data.entities.` + qCode + `.labels.en.value`);
			description = undefined;
		} else {
			label = eval(`data.entities.` + qCode + `.labels.en.value`);
			description = eval(`data.entities.` + qCode + `.descriptions.en.value`);
		}

		// returns all properties linked to Q31216
		let properties = Object.keys(eval(`data.entities.` + qCode + `.claims`));

		//Second api call
		currentObject = await fetchInfo(properties, data, qCode);

		currentObject.label = label;
		if (!(description === undefined)) {
			currentObject.description = description;
		}
	} catch (error) {
		console.error("Error fetching the file:", error);
	}

	for (let i in Object.keys(currentObject)) {
		console.log(i);
		let currentProperty;
		console.log(currentObject);

		console.log(currentObject.label);
		currentProperty = Object.keys(currentObject)[i];
		console.log(currentProperty);
	}
	console.log(Object.keys(currentObject));
	return currentObject;
}

function setUrl(qCode) {
	let url = `https://canonbase.eu/w/api.php?action=wbgetentities&ids=${qCode}&languages=en%7Cde%7Cfr&format=json&origin=*`;
	return url;
}
async function fetchInfo(properties, data, qCode) {
	console.log("fetchinfo called");
	let i = 0;
	let temp = qCode;
	let currentObject = {};

	let imageTest = `imageTest : `;
	let descriptionTest = `descriptionTest : `;
	let LabelTest = `LabelTest : `;
	let wikidataTest = `wikidataTest : `;
	let FirstusedateTest = `FirstusedateTest : `;
	let OpeningDateTest = `OpeningDateTest : `;
	let DateofBirthTest = `DateofBirthTest : `;
	let DateofDeathTest = `DateofDeathTest : `;

	for (let property of properties) {
		qCode = temp;
		i++;

		// adds properties to object;
		if (property === "P2") {
			// image
			console.log("image");
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value`;

			// console.log(`Corresponding Q : ` + eval(currentProperty));

			currentObject.img = `http://commons.wikimedia.org/wiki/Special:FilePath/${eval(
				`data.entities.` +
					qCode +
					`.claims.` +
					property +
					`[0].mainsnak.datavalue.value`
			)}`;
		} else if (property === "P16") {
			console.log("wikidata found");
			// Wikidata source
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value`;

			currentObject.wikiDataSource = `https://www.wikidata.org/wiki/${eval(
				currentProperty
			)}`;
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

			// console.log(eval(currentProperty));
			let info = new formatDate();
			currentProperty = info.formatYear(eval(currentProperty));

			switch (property) {
				case "P111":
					console.log("First use date found");
					// First use date
					currentObject.firstUseDate = currentProperty;

					break;
				case "P102":
					console.log("Opening Date found");
					// Opening Date
					currentObject.openingDate = currentProperty;

					break;
				case "P30":
					console.log("Date of Birth found");
					// Date of Birth
					currentObject.dateOfBirth = currentProperty;

					break;
				case "P31":
					console.log("Date of Death found");
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
		} else if (property === "P164") {
			// Adress
			let currentProperty =
				`data.entities.` +
				qCode +
				`.claims.` +
				property +
				`[0].mainsnak.datavalue.value`;
			currentObject.adress = eval(currentProperty);
		}

		// Defines the new Qcode for value fetch
		qCode = eval(
			`data.entities.${qCode}.claims.${property}[0].mainsnak.datavalue.value.id`
		);
		// console.log("new Qcode : " + qCode);

		// append Property value (general case)
		await fetch(setUrl(property))
			.then((response) => response.json())
			.then((data) => {
				let pName = eval(`data.entities.${property}.labels.en.value`);
			})
			.catch((error) => console.error("Error fetching the file:", error));

		// Append Statement value

		await fetch(setUrl(qCode))
			.then((response) => response.json())
			.then((data) => {
				// console.log(`Appending ${qCode} statement to html `);
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
			})
			.catch((error) => console.error("Error fetching the file:", error));
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
