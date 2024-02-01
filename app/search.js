let UrlJson = ["./JSON/Persons.json", "./JSON/equipment.json", "./JSON/events.json", "./JSON/Theatres.json"];

async function fetchPersons() {
	try {
		const response = await fetch("./JSON/Persons.json");
		if (!response.ok) {
			throw new Error(`Failed to load JSON file: ${response.statusText}`);
		}
		const searchData = await response.json();
		// console.log(searchData);

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

			// Filter the data based on the search term
			const filteredData = searchData.filter((item) => item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm));
			// Display the filtered results
			console.log(filteredData);
			displaySearchResults(filteredData);
		});
	} catch (error) {
		console.error("Error loading JSON file:", error);
	}
}

fetchPersons();

function displaySearchResults(results) {
	// Clear previous search results
	searchResults.innerHTML = "";

	// Display the current search results
	results.forEach((result) => {
		const resultItem = document.createElement("div");
		resultItem.classList.add("search-result-item");

		// Customize the content to display as needed (e.g., name, description, etc.)
		resultItem.innerHTML = `
            <h4>${result.name}</h4>
            <p>${result.description}</p>
            <a href="${result.link}" id="desktop-button">More</a>
        `;

		searchResults.appendChild(resultItem);
	});
}
