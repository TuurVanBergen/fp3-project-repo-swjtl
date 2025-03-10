document.addEventListener("DOMContentLoaded", (event) => {
	const iconElements = document.querySelectorAll(".Icon");

	iconElements.forEach((iconElement) => {
		let borderColor;
		let title;

		switch (true) {
			case iconElement.id === "personId":
				borderColor = "#E6BB46";
				title = "Person";
				break;

			case iconElement.id === "theaterId":
				borderColor = "#ff65c1";
				title = "Theater";
				break;

			case iconElement.id === "gearId":
				borderColor = "#ce1644";
				title = "Gear";
				break;

			case iconElement.id === "eventsId":
				borderColor = "#ffcb91";
				title = "Events";
				break;

			default:
				console.log("Using default color");
		}

		iconElement.addEventListener("mouseover", function (event) {
			// Create a new div
			const extraDiv = document.createElement("div");
			extraDiv.classList.add("extraDiv");

			extraDiv.innerHTML = `
			<h3>${title}</h3>
			<p>${title} shows you the most important ${title.toLowerCase()} of each decade</p>
			`;

			extraDiv.style.borderColor = borderColor;

			document.body.appendChild(extraDiv);

			// Set the position of the extra div above the iconElement
			const iconRect = iconElement.getBoundingClientRect();
			extraDiv.style.position = "absolute";
			extraDiv.style.top = iconRect.top + window.scrollY - extraDiv.clientHeight - 20 + "px"; // Adjusted top position
			extraDiv.style.left = iconRect.left + "px";
		});

		iconElement.addEventListener("mouseout", function (event) {
			// Remove the extra div from the document body
			const extraDiv = document.querySelector(".extraDiv");
			if (extraDiv) {
				extraDiv.remove();
			}
		});
	});
});

document.addEventListener("DOMContentLoaded", (event) => {
	let click = false;
	let translateYValue;

	document.addEventListener("click", function () {
		click = !click;
	});

	// Function to log the row index
	function logRowIndex(index) {
		// console.log("Mouse is over row:", index);
	}

	// Add mouseover event listener to each row in the timeline
	document.querySelectorAll("#timeline tr").forEach((row, index) => {
		row.addEventListener("mouseover", () => {
			logRowIndex(index);

			// Update translateY value based on row index
			let hoverInfoContainer = document.querySelector("#hoverInfoContainer");
			if (index == 2) {
				translateYValue = "-25vh";
			} else if (index == 3) {
				translateYValue = "-17vh";
			} else if (index == 4) {
				translateYValue = "-12vh";
			} else if (index == 5) {
				translateYValue = "-5vh";
			} else {
				translateYValue = "0vh";
			}
		});
	});

	document.addEventListener("mouseover", function (event) {
		let bolElement = event.target.classList.contains("bol") ? event.target : event.target.closest(".bol");
		if (bolElement) {

			// Get the first p element within the .bol element
			let pElement = bolElement.querySelector("p");
			let pCount = pElement ? parseInt(pElement.textContent, 10) : 1;

			// Clear the content of #hoverInfoContainer
			document.querySelector("#hoverInfoContainer").innerHTML = "";

			// Log the text content of the p element and display the hoverInfo
			for (let i in bolElement.classList) {
				let personName;
				let personDateOfBrith;
				let PersonDescribsion;

				let hoverInfo = document.createElement("div");
				if (bolElement.classList[i].startsWith("Q")) {

					let qCode = bolElement.classList[i];
					console.log(qCode);
					for (let i = 0; i < filteredPersons.length; i++) {
						hoverInfo.classList.add("hoverInfo");
						if (qCode == filteredPersons[i].qCode) {
							personName = filteredPersons[i].name;
							personDateOfBrith = filteredPersons[i].dateOfBirth;
							PersonDescribsion = filteredPersons[i].description;
						} 
					}

					for (let i = 0; i < filteredTheaters.length; i++) {
						hoverInfo.classList.add("hoverInfo");
						if (qCode == filteredTheaters[i].qCode) {
							personName = filteredTheaters[i].theatreName;
							personDateOfBrith = filteredTheaters[i].openingDate;
							PersonDescribsion = filteredTheaters[i].countryLabel;
						}
					}

					for (let i = 0; i < filteredGear.length; i++) {
						hoverInfo.classList.add("hoverInfo");
						if (qCode == filteredGear[i].qCode) {
							personName = filteredGear[i].itemLabel;
							personDateOfBrith = filteredGear[i].start;
							PersonDescribsion = filteredGear[i].propLabel;
						}
					}

					for (let i = 0; i < filteredEvents.length; i++) {
						hoverInfo.classList.add("hoverInfo");
						if (qCode == filteredEvents[i].qCode) {
							personName = filteredEvents[i].itemLabel;
							personDateOfBrith = filteredEvents[i].timeline_date;
							PersonDescribsion = filteredEvents[i].pLabel;
						}
					}

					
					hoverInfo.innerHTML = `
                    <div class="hoverInfoList">
                        <h3 class="titleHover">${personName}</h3>
                        <p class="hoverYear">${personDateOfBrith}</p>
                        <p class="hoverType">${PersonDescribsion}</p>
                        <a id="${qCode}" href="./objectinfo.html?qCode=${qCode}&category=Person">More</a>
                    </div>
                `;
				}

				// Get the computed style of the .bol element
				let style = window.getComputedStyle(bolElement);
				// Get the background color
				let bgColor = style.backgroundColor;

				// Apply the background color to the border of the hoverInfo element
				hoverInfo.style.border = "5px solid " + bgColor;
				hoverInfo.style.display = "flex";

				// Set the position of the hoverInfo element based on pCount
				if (pCount === 1) {
					let mouseX = event.clientX;
					let ratio = mouseX / window.innerWidth;
					const slope = (700 - -50) / 1; // (y2 - y1) / (x2 - x1)  (100- -50)
					const xIntercept = -400; // y1  -50
					const x = slope * ratio + xIntercept;

					hoverInfo.style.transform = `translateX(${x}%) translateY(${translateYValue})`;
					hoverInfoContainer.style.height = "10px";

					// hoverInfo.style.transform = `translateX(20%) translateY(-20vh)`;
				} else {
					hoverInfo.style.top = bolElement.getBoundingClientRect().top + window.scrollY - hoverInfo.clientHeight + "px";
					hoverInfoContainer.style.height = "min-content";
				}

				// Append the current hoverInfo element to the container
				if (!hoverInfo.innerHTML == "") {
					document.querySelector("#hoverInfoContainer").appendChild(hoverInfo);
				}
			}
		}
	});

	document.addEventListener("mouseout", function (event) {
		// Check if the hovered element or its parent has the class 'bol'
		if (event.target.classList.contains("bol") || event.target.closest(".bol")) {
			if (!click) {
				document.querySelector("#hoverInfoContainer").innerHTML = "";
			}
		}
	});
});
