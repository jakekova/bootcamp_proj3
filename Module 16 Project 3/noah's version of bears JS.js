function processData(data) {
    // Create a dictionary to group data by country and gender
    let groupedData = {};
    data.forEach(entry => {
      const { Gender, Country, Age } = entry;
      if (!groupedData[Country]) {
        groupedData[Country] = { Male: [], Female: [] };
      }
      if (Gender === 'Male') {
        groupedData[Country].Male.push(Age);
      } else if (Gender === 'Female') {
        groupedData[Country].Female.push(Age);
      }
    });
  
    // Calculate average age for each country and gender
    let countryAverages = [];
    for (let country in groupedData) {
      let maleAges = groupedData[country].Male;
      let femaleAges = groupedData[country].Female;
      let maleAverage = maleAges.reduce((sum, age) => sum + age, 0) / maleAges.length;
      let femaleAverage = femaleAges.reduce((sum, age) => sum + age, 0) / femaleAges.length;
  
      countryAverages.push({
        Country: country,
        MaleAverage: maleAverage,
        FemaleAverage: femaleAverage
      });
    }
  
    // Pass the processed data to the mapping function (e.g., Leaflet)
    mapDataWithLeaflet(countryAverages);
  }
  
  function mapDataWithLeaflet(data) {
    // Your Leaflet mapping code here
    // Use the 'data' variable to access the processed data for mapping
    // You can plot the average ages for each country and gender on the map
  }
  
  fetch('http://localhost:5000/api/gender_country')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      processData(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  