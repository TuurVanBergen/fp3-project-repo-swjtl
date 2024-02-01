"use strict";
document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);

	const qCode = urlParams.get("qCode");
	const category = urlParams.get("category");

	changeInfo(qCode, category);
});

function changeInfo(qCode, category) {
	console.log(qCode);
	if (category == "Event") {
		fetchTheaters(qCode);
	} else if (category == "Person") {
		fetchPersons(qCode);
	} else {
		console.log("The page that you are looking for does not exist.");
	}
}
async function fetchPersons(qCode) {
	console.log(qCode);
	try {
		const response = await fetch("./JSON/updatedPersons.json");
		if (!response.ok) {
			throw new Error(`Failed to load JSON file: ${response.statusText}`);
		}
		const jsonData = await response.json();
		console.log(jsonData);
		const desiredQCode = qCode;
		const personWithQCode = jsonData.find(
			(person) => person.qCode === desiredQCode
		);

		if (personWithQCode) {
			console.log(personWithQCode);
			window.onload = function () {
				loadInfo();
				function loadInfo() {
					const allInfoText = document.querySelector(".allInfoText");
					allInfoText.innerHTML = `
                            <div>
                                <h1>${personWithQCode.dateOfBirth}</h1>
                                <h2>${personWithQCode.name}</h2>
                                <div class="basicInfoText">
                                    <h4>${personWithQCode.countryLabel}</h4>
                                    
                                </div>
                                <p>${personWithQCode.occupationLabel}</p>
                            </div>
                            <h3>Description</h3>
                            <p>${personWithQCode.description}</p>
                            
                            <div class="image">
                                <img src="${
																	personWithQCode.imageLink ||
																	"images/icon-image-not-found-free-vector.jpg"
																}" alt="" />
                            </div>
                        `;
				}
			};
		} else {
			console.log("Wrong qCode");
		}
	} catch (error) {
		console.error(error);
	}
}

async function fetchTheaters(qCode) {
	console.log(qCode);
	try {
		const response = await fetch("./JSON/TheatresUpdated.json");
		if (!response.ok) {
			throw new Error(`Failed to load JSON file: ${response.statusText}`);
		}
		const jsonData = await response.json();
		console.log(jsonData);

		const theaterQCode = qCode;
		const theaterInfo = jsonData.find(
			(theater) => theater.qCode === theaterQCode
		);

		if (theaterInfo) {
			const allInfoText = document.querySelector(".allInfoText");
			allInfoText.innerHTML = `
                <div>
                    <h1>${theaterInfo.openingDate[0]}</h1>
                    <h2>${theaterInfo.theatreName}</h2>
                    <div class="basicInfoText">
                        <h4>${theaterInfo.countryLabel}</h4>
                        <h4>${theaterInfo.openingDate[0]} - ${theaterInfo.openingDate[1]}</h4>
                    </div>
                    <p></p>
                </div>
                <div>
                    <h3>Theater Information</h3>
                    <p>
                        Theatre Name: ${theaterInfo.theatreName}<br>
                        Location: ${theaterInfo.cityLabel}, ${theaterInfo.countryLabel}<br>
                        Continent: ${theaterInfo.continentLabel}<br>
                        Opening Date: ${theaterInfo.openingDate[0]}
                    </p>
                    <a href="${theaterInfo.theatreLink}" target="_blank">Visit Theater Website</a>
                </div>
            `;
		} else {
			console.log("Wrong qCode");
		}
	} catch (error) {
		console.error(error);
	}
}
