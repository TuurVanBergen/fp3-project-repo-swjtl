"use strict";
changeInfo();
function changeInfo(){
    if(1+1 == 2){
        fetchTheaters();
    } else if(1+1 == 34){
        fetchPersons();
    } else {
        alert("The page that you are looking for does not exist.");
    }
}
async function fetchPersons() {
    try {
        const response = await fetch("./JSON/Persons.json");
        if (!response.ok) {
            throw new Error(`Failed to load JSON file: ${response.statusText}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);
        const desiredQCode = "Q20679";
        const personWithQCode = jsonData.find(person => person.qCode === desiredQCode);

        if (personWithQCode) {
            const allInfoText = document.querySelector('.allInfoText');
            allInfoText.innerHTML = `
                <div>
                    <h1>${personWithQCode.dateOfBirth}</h1>
                    <h2>${personWithQCode.name}</h2>
                    <div class="basicInfoText">
                        <h4>${personWithQCode.countryLabel}</h4>
                        <h4>${personWithQCode.dateOfBirth}-${personWithQCode.dateOfDeath}</h4>
                    </div>
                    <p>${personWithQCode.occupationLabel}</p>
                </div>
                <h3>Biography</h3>
                <p>${personWithQCode.description}</p>
            `;
        } else {
            console.log("Wrong qCode");
        }
    } catch (error) {
        console.error(error);
    }
}


async function fetchTheaters() {
    try {
        const response = await fetch("./JSON/TheatresUpdated.json");
        if (!response.ok) {
            throw new Error(`Failed to load JSON file: ${response.statusText}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);

        const theaterQCode = "Q16870";
        const theaterInfo = jsonData.find(theater => theater.qCode === theaterQCode);

        if (ptheaterInfo) {
            const allInfoText = document.querySelector('.allInfoText');
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