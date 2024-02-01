import List from "./lists.js";
let lists;
let arr = [];
let arrEquipment = [];   
let sortedArr = [];
let UrlJson = ['./JSON/updatedPersons.json', './JSON/equipment.json', './JSON/events.json', './JSON/Theatres.json'];
async function loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load JSON file: ${response.statusText}`);
      }
      const jsonData = await response.json();
      for (let i = 0; i < jsonData.length; i++) {
        console.log(url)

        if (jsonData[i].description && jsonData[i].dateOfBirth){
            lists = new List(jsonData[i].name,jsonData[i].description,jsonData[i].qCode, jsonData[i].dateOfBirth, jsonData[i].dateOfDeath, "Person", jsonData[i].imageLink);
            arr.push(lists);
            sortedArr =arr;
        }
        if(jsonData[i].start && jsonData[i].itemLabel){
            lists = new List(jsonData[i].itemLabel,jsonData[i].start.slice(0,4),"unknown",jsonData[i].start.slice(0,4), jsonData[i].start.slice(0,4), "Gear", jsonData[i].img_wik);
            arr.push(lists);
            sortedArr =arr;
        }
        if(jsonData[i].timeline_date && jsonData[i]){
            lists = new List(jsonData[i].itemLabel,jsonData[i].timeline_date.slice(0,4),"unknown",jsonData[i].timeline_date.slice(0,4), jsonData[i].timeline_date.slice(0,4), "Event",jsonData[i].img_wik);
            arr.push(lists);
            sortedArr =arr;
        }
        if(jsonData[i].timeline_date && jsonData[i].itemLabel && url == './JSON/Theatres.json'){
            lists = new List(jsonData[i].itemLabel,jsonData[i].timeline_date.slice(0,4),"unknown",jsonData[i].timeline_date.slice(0,4), jsonData[i].timeline_date.slice(0,4), "Theatre",jsonData[i].img_wik);
            arr.push(lists);
            sortedArr =arr;
        }

    }
    display(arr)
    } catch (error) {
      console.error('Error loading JSON file:', error);
    }
  }

  UrlJson.forEach(element => {
    loadJSON(element);
  });

function display(data) {
    const listContainer = document.querySelector(".container");
    listContainer.innerHTML = " ";
    data.forEach(element => {
        const htmlString = element.htmlString;
        listContainer.insertAdjacentHTML("afterbegin", htmlString); 
    });
}

document.querySelector("#A-Z").addEventListener('click', function(){
    console.log("clicked!! A-Z")
    sortedArr = sortedArr.slice();

    sortedArr.sort((a, b) => {
        const lastNameA = getLastName(a.name);
        const lastNameB = getLastName(b.name);

        return lastNameA.localeCompare(lastNameB);
    });

    console.log('Gesorteerd (A tot Z) op achternaam:', sortedArr);
    display(sortedArr);
});

function getLastName(fullName) {
    const parts = fullName.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : fullName;
}

document.querySelector("#Z-A").addEventListener('click', function(){
    console.log("clicked!! A-Z")
    sortedArr = sortedArr.slice();
    //console.log(sortedArr);
    sortedArr.sort((a, b) => {
        const lastNameA = getLastName(b.name);
        const lastNameB = getLastName(a.name);

        return lastNameA.localeCompare(lastNameB);
    });

    console.log('Gesorteerd (A tot Z) op achternaam:', sortedArr);
    display(sortedArr);
});


const yearElements = document.querySelectorAll(".year");

yearElements.forEach(function(yearElement) {
    yearElement.addEventListener('click', function() {
        const yearValue = yearElement.innerHTML;
        console.log("clicked on year", yearValue);
        let dateOfBirth = yearValue.slice(0,4)
        let dateOfDeath = yearValue.slice(5)
        let yearArray = [];
        arr.forEach(element => {
            if (element.dateOfBirth >= dateOfBirth && element.dateOfDeath <= dateOfDeath) {
               yearArray.push(element)
            }
        });
        sortedArr = yearArray
        console.log(sortedArr)
        display(yearArray)
    });
});


const categoryElements = document.querySelectorAll(".Category");

categoryElements.forEach(function(categoryElement) {
    categoryElement.addEventListener('click', function() {
        const categoryValue = categoryElement.innerHTML;
        console.log("clicked on category", categoryValue)
        let categoryArray = [];

        if(categoryValue == "All Categories"){
            console.log(arr)
            return display(arr)
            }
        arr.forEach(element => {
            if (element.category == categoryValue) {
                categoryArray.push(element)
            }
        });
        sortedArr = categoryArray
        console.log(sortedArr)
        display(categoryArray)
    });
});