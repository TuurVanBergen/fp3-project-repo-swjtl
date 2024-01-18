console.log("Testing Time");

console.log("branch test");
console.log("branch test 2");

//https://canonbase.eu/w/api.php?action=wbgetentities&ids=Q33&format=json&origin=*
let name;
let age;
let description;
// fetching json test
fetch("http://127.0.0.1:5500/Testing/JSON/test.json")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);

		for (let i of data) {
			document.getElementById("name").innerText = `${i.name}`;
			document.getElementById("age").innerText = `${i.age}`;
			document.getElementById("description").innerText = `${i.description}`;
		}
	})
	.catch((error) => console.error("Error fetching the file:", error));

// Fetching List  of persons sortes by countries
/*
fetch("http://127.0.0.1:5500/Testing/json/persons-countries.json")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		for (let i of data) {
			while (i < 20) console.log(i.personLabel);
			document.getElementById(
				"canonInfo"
			).innerHTML += `<p><b>person</b> ${i.person}</p>
        <p><b>personLabel</b> ${i.personLabel}</p>
        <p><b>country</b> ${i.country}</p>
        <p><b>countryLabel</b> ${i.countryLabel}</p>
        ----------------------------------------------
        `;
		}
	})
	.catch((error) => console.error("Error fetching the file:", error));
*/

// Fetching list of eqiupment
fetch("http://127.0.0.1:5500/Testing/json/equipment.json")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);

		for (let i = 0; i < data.length - 1500; i++) {
			console.log(data[i.item]);

			document.getElementById("canonInfo").innerHTML += `
				<div class="card">
				<p>"first use date :  ${data[i].propLabel}"</p>
				<p >startDate ${data[i].start}</p>
				<p >itemLabel : ${data[i].itemLabel}</p>
				<p >item : ${data[i].item}</p>
		
				<img src="${data[i].img_wik}" alt="" width="100px" height="100px">
					</div>
					`;
		}
	})
	.catch((error) => console.error("Error fetching the file:", error));
