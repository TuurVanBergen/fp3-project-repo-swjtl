document.addEventListener("DOMContentLoaded", (event) => {
	let click = false;

	document.addEventListener("click", function () {
		click = !click;
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
			for (let i = 0; i < pCount; i++) {
				let hoverInfo = document.createElement("div");
				hoverInfo.classList.add("hoverInfo");

				hoverInfo.innerHTML = `
                    <img class="hoverImg" src="./images/theatreBerlin.png" alt="" />
                    <div class="hoverInfoList">
                        <h3 class="titleHover">Royal theater of London</h3>
                        <p class="hoverYear">1423</p>
                        <p class="hoverType">Theater</p>
                        <a href="./objectinfo.html">More</a>
                    </div>
                `;

				// Get the computed style of the .bol element
				let style = window.getComputedStyle(bolElement);
				// Get the background color
				let bgColor = style.backgroundColor;

				// Apply the background color to the border of the hoverInfo element
				hoverInfo.style.border = "5px solid " + bgColor;
				hoverInfo.style.display = "flex";

				// Append the current hoverInfo element to the container
				document.querySelector("#hoverInfoContainer").appendChild(hoverInfo);
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

// document.addEventListener("DOMContentLoaded", (event) => {
// 	document.addEventListener("mouseover", function (event) {
// 		let bolElement = event.target.classList.contains("bol") ? event.target : event.target.closest(".bol");
// 		if (bolElement) {
// 			// Get the first p element within the .bol element
// 			let pElement = bolElement.querySelector("p");
// 			let pCount = pElement ? parseInt(pElement.textContent, 10) : 1;

// 			// Clear the content of #hoverInfoContainer
// 			document.querySelector("#hoverInfoContainer").innerHTML = "";

// 			// Log the text content of the p element and display the hoverInfo
// 			for (let i = 0; i < pCount; i++) {
// 				let hoverInfo = document.createElement("div");
// 				hoverInfo.classList.add("hoverInfo");

// 				hoverInfo.innerHTML = `
//                     <img class="hoverImg" src="./images/theatreBerlin.png" alt="" />
//                     <div class="hoverInfoList">
//                         <h3 class="titleHover">Royal theater of London</h3>
//                         <p class="hoverYear">1423</p>
//                         <p class="hoverType">Theater</p>
//                         <a href="#">More</a>
//                     </div>
//                 `;

// 				// Get the computed style of the .bol element
// 				let style = window.getComputedStyle(bolElement);
// 				// Get the background color
// 				let bgColor = style.backgroundColor;

// 				// Apply the background color to the border of the hoverInfo element
// 				hoverInfo.style.border = "5px solid " + bgColor;
// 				hoverInfo.style.display = "flex";

// 				// Append the current hoverInfo element to the container
// 				document.querySelector("#hoverInfoContainer").appendChild(hoverInfo);
// 			}
// 		}
// 	});

// 	document.addEventListener("mouseout", function (event) {
// 		// Check if the hovered element or its parent has the class 'bol'
// 		if (event.target.classList.contains("bol") || event.target.closest(".bol")) {
// 			document.querySelector("#hoverInfoContainer").innerHTML = "";
// 		}
// 	});
// });
