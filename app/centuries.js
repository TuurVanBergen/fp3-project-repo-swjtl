let century_15 = document.querySelector("#fifteenth");
let century_16 = document.querySelector("#sixteenth");
let century_17 = document.querySelector("#seventeenth");
let century_18 = document.querySelector("#eightteenth");
let century_19 = document.querySelector("#nineteenth");
let century_20 = document.querySelector("#twentyth");
let century_21 = document.querySelector("#twentyfirst");

let allCenturies = [
	century_15,
	century_16,
	century_17,
	century_18,
	century_19,
	century_20,
	century_21,
];

let centuryInformation = document.querySelector("#centuryInformation");
let centuryClass = document.querySelector(".century");
let body = document.getElementsByTagName("body")[0];

century_15.addEventListener("click", function () {
	openCentury("century_15");
});
century_16.addEventListener("click", function () {
	openCentury("century_16");
});
century_17.addEventListener("click", function () {
	openCentury("century_17");
});
century_18.addEventListener("click", function () {
	openCentury("century_18");
});
century_19.addEventListener("click", function () {
	openCentury("century_19");
});
century_20.addEventListener("click", function () {
	openCentury("century_20");
});
century_21.addEventListener("click", function () {
	openCentury("century_21");
});

function openCentury(century) {
	let centuryNr = century.split("_").slice(-1)[0];
	console.log(centuryNr);

	centuryInformation.style.display = "block";
	body.style.overflowY = "visible";

	if (centuryNr != 21) {
		document.querySelector("#centuriesBtn").style.display = "block";
	}

	for (let i = allCenturies.length - 1; i > centuryNr - 15; i--) {
		console.log(allCenturies[i]);
		allCenturies[i].style.transform = "translateX(9700%)";
	}
}
