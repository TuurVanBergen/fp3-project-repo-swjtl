let filteredPersons =[];
let sortedBirhdates = [];
async function loadJSON() {
    try {
      const response = await fetch('./JSON/Persons.json');
      if (!response.ok) {
        throw new Error(`Failed to load JSON file: ${response.statusText}`);
      }
      const jsonData = await response.json();
        filterBirthdates(jsonData)

    } catch (error) {
      console.error('Error loading JSON file:', error);
    }
  }

  loadJSON();
  function filterBirthdates(data){
    console.log(data)
    for (let i in data) {
        if(data[i].dateOfBirth){
            console.log(data[i].dateOfBirth)
             filteredPersons.push(data[i])
        }
    }

    sortBirthdates(filteredPersons)
    sortBirthdatesZA(filteredPersons)
  }

  function sortBirthdates(data) {
    data.sort((a, b) => a.dateOfBirth - b.dateOfBirth);
  
    console.log('Sorted Birthdates (A to Z):', data);
}
function sortBirthdatesZA(data) {
    data.sort((a, b) => b.dateOfBirth - a.dateOfBirth);
  
    console.log('Sorted Birthdates (Z to A):', data);
}