console.log("Testing Time");

console.log("branch test");
console.log("branch test 2");

//https://canonbase.eu/w/api.php?action=wbgetentities&ids=Q33&format=json&origin=*
let name;
let age;
let description;
// fetching json test

fetch("http://127.0.0.1:5500/CanonBase2SWTJL/Testing/JSON/test.json")
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
fetch("http://127.0.0.1:5500/CanonBase2SWTJL/Testing/JSON/equipment.json")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);

		for (let i = 0; i < data.length - 1500; i++) {
			console.log(data[i.item]);
			/*
			document.getElementById("canonInfo").innerHTML += `
			<a href="${data[i].item}">
			<div class="card">
			<p>"first use date :  ${data[i].propLabel}"</p>
			<p >startDate ${data[i].start}</p>
			<p >itemLabel : ${data[i].itemLabel}</p>
			<p >item : ${data[i].item}</p>
			
			<img src="${data[i].img_wik}" alt="" width="100px" height="100px">
			</div>
			</a>	
			`;
			*/
			let startdate = data[i].start;

			console.log(startdate);
			if (data[i].img_wik === undefined && data[i].start === undefined) {
				document.getElementById("canonInfo").innerHTML += `
				<a href="${data[i].item}">
				<div class="card">
					<h2>${data[i].itemLabel}</h2>
					<div class="infoContainer">
						<h3></h3>
					</div>
				</div>
				</a>
				`;
			} else if (data[i].img_wik === undefined) {
				document.getElementById("canonInfo").innerHTML += `
			<a href="${data[i].item}">
            <div class="card">
                <h2>${data[i].itemLabel}</h2>
                <div class="infoContainer">
                    <h3>${data[i].start.slice(0, 4)}</h3>
                </div>
            </div>
        </a>
			`;
			} else {
				document.getElementById("canonInfo").innerHTML += `
				<a href="${data[i].item}">
				<div class="card">
                <h2>${data[i].itemLabel}</h2>
                <div class="infoContainer">
				<h3>${data[i].start.slice(0, 4)}</h3>
				
				<img src="${data[i].img_wik}"
				alt="" width="125px" height="125px">
                </div>
				</div>
				</a>
				`;
			}
		}
	})
	.catch((error) => console.error("Error fetching the file:", error));
