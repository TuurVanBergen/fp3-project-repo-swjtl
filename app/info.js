document.querySelector("#Drottningholm").addEventListener("click", function () {
	document.querySelector("#centuryInformation").style.display = "none";
	document.querySelector("#info").style.display = "block";
});

document.querySelector("#goBackBtn").addEventListener("click", function () {
	document.querySelector("#centuryInformation").style.display = "block";
	document.querySelector("#info").style.display = "none";
});
