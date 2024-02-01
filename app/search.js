let UrlJson = ['./JSON/finalPersons.json', './JSON/equipment.json', './JSON/events.json', './JSON/Theatres.json'];
 
let arrPersons = [];
let arrEquipment = [];
let arrEvents = [];
let arrTheatres = [];
 
async function fetchPersons(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load JSON file: ${response.statusText}`);
        }
 
        if(url == './JSON/finalPersons.json'){
            arrPersons = await response.json();
            console.log("Persons loaded", arrPersons);
        }else if(url == './JSON/equipment.json'){
            arrEquipment = await response.json();
            console.log("Equipment loaded", arrEquipment);
        }else if(url == './JSON/events.json'){
            arrEvents = await response.json();
            console.log("Events loaded", arrEvents);
        }else if(url == './JSON/Theatres.json'){
            arrTheatres = await response.json();
            console.log("Theatres loaded", arrTheatres);
        }
 
        const searchBar = document.getElementById("searchBar");
        const searchResultsContainer = document.getElementById("searchResults");
        
        // Add an event listener to the search input
        searchBar.addEventListener("input", function () {
            // Get the value of the search input
            const searchTerm = searchBar.value.toLowerCase();
            if (searchTerm.length > 0) {
                searchResultsContainer.style.display = "block";        
            } else {
                    searchResultsContainer.style.display = "none";
                }
 
                const filteredPersons = arrPersons.filter(item => (
                    (item.name && item.name.toLowerCase().includes(searchTerm)) ||
                    (item.description && item.description.toLowerCase().includes(searchTerm))
                ));
                
                const filteredEquipment = arrEquipment.filter(item => (
                    (item.itemLabel && item.itemLabel.toLowerCase().includes(searchTerm)) ||
                    (item.start && item.start.includes(searchTerm))
                ));
                
                const filteredEvents = arrEvents.filter(item => (
                    (item.itemLabel && item.itemLabel.toLowerCase().includes(searchTerm)) ||
                    (item.timeline_date && item.timeline_date.slice(0, 4).includes(searchTerm))
                ));
                
                const filteredTheatres = arrTheatres.filter(item => (
                    (item.itemLabel && item.itemLabel.toLowerCase().includes(searchTerm)) ||
                    (item.timeline_date && item.timeline_date.includes(searchTerm))
                ));
                
let filteredData = [...filteredEquipment, ...filteredEvents, ...filteredTheatres, ...filteredPersons];
console.log(filteredData);
             displaySearchResults(filteredData);
        });
 
    } catch (error) {
        console.error("Error loading JSON file:", error);
    }
}
 
UrlJson.forEach(element => {
    fetchPersons(element);
});
 
 
 
function displaySearchResults(results) {
    searchResults.innerHTML = "";
 
    results.forEach(result => {
        const qCode = result.qCode;
        const resultItem = document.createElement("div");
        resultItem.classList.add("search-result-item");
        if (result.name && result.imageLink){
            resultItem.innerHTML = `
            <img src="${result.imageLink}" alt="">
            <h4>${result.name}</h4>
            <p>${result.description}</p>
            <a id="button" href="./objectinfo.html?qCode=${qCode}&category=Person">More</a>`;
        }else if(result.name && !result.imageLink){
            resultItem.innerHTML = `
            <h4>${result.name}</h4>
            <p>${result.description}</p>
            <a id="button" href="./objectinfo.html?qCode=${qCode}&category=Person">More</a>`;
        }else if(result.start && result.img_wik){
            resultItem.innerHTML = `
            <img src="${result.img_wik}" alt="">
            <h4>${result.itemLabel}</h4>
            <p>${result.start.slice(0,4)}</p>
            <a id="button" href="./objectinfo.html?qCode=${qCode}&category=Equipment">More</a>`;
        }else if(result.start && !result.img_wik){
            resultItem.innerHTML = `
            <h4>${result.itemLabel}</h4>
            <p>${result.description}</p>
            <a id="button" href="./objectinfo.html?qCode=${qCode}&category=Equipment">More</a>`;
        }else if(result.timeline_date && result.img_wik){
            resultItem.innerHTML = `
            <img src="${result.img_wik}" alt="">
            <h4>${result.itemLabel}</h4>
            <p>${result.timeline_date.slice(0,4)}</p>
            <a id="button" href="./objectinfo.html?qCode=${qCode}&category=Event">More</a>`;
        }else if(result.timeline_date && !result.img_wik){
            resultItem.innerHTML = `
            <h4>${result.itemLabel}</h4>
            <p>${result.timeline_date.slice(0,4)}</p>
            <a id="button" href="./objectinfo.html?qCode=${qCode}&category=Event">More</a>`;
        }
 
        searchResults.appendChild(resultItem);
    });
    const middleYearElements = document.querySelectorAll(".search-result-item");
 
    middleYearElements.forEach((element) => {
        if(element.innerHTML == ""){
            element.remove();
        }
    });
}