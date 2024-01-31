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
            arr.push(lists);
            sortedArr =arr;
        }
    }
    } catch (error) {
      console.error('Error loading JSON file:', error);
    }
  }