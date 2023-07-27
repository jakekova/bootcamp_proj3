
let link1 = "static/data/naveen_df_final.json"
d3.json(link1).then(function(data) {
  console.log(data)
 
})

// Creating the map object
let myMap = L.map("map", {
    center: [40, -75],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  

  let link2 = "static/data/countries_narrowed.geojson";
  
  // The function that will determine the color of a neighborhood based on the borough that it belongs to
  function chooseColor(country) {
    if (country == "Australia") return "red";
    else if (country == "Brazil") return "orange";
    else if (country == "Canada") return "yellow";
    else if (country == "France") return "green";
    else if (country == "Germany") return "blue";
    else if (country == "Italy") return "purple";
    else if (country == "Mexico") return "pink";
    else if (country == "Spain") return "violet";
    else if (country == "United Kingdom") return "brown";
    else if (country == "United States of America") return "blue";
    else return "black";
  }
  
  // Getting our GeoJSON data
  d3.json(link2).then(function(data) {
    console.log(data)
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature (in this case, a country)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor() function to decide which color to color our country. (The color is based on the country.)
          fillColor: chooseColor(feature.properties.ADMIN),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        // Extract the country name from the feature's properties
        const countryName = feature.properties.ADMIN;
        
     
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (country) is clicked, it enlarges to fit the screen.
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });

        d3.json(link1).then(function(data) {
          // Create an empty object to store the age bins and counts for each country
          const ageBinsAndCountsByCountry = {};
        
          // Loop through the data and group age bins and counts by country
          for (let i = 0; i < data.Country.length; i++) {
            const country = data.Country[i];
            const ageBin = data.Age_Bins[i];
            const count = data.Count[i];
        
            // Add the age bin and count to the array for the corresponding country
            ageBinsAndCountsByCountry[country].push({ ageBin, count });
          }
        
          // Now, ageBinsAndCountsByCountry contains the age bins and counts for each country in an object format
          console.log(ageBinsAndCountsByCountry);
        });

        let popupContent = `<b>Country:</b> ${countryName}<br><b>Age Bins:</b><br>`;
       
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup(popupContent);
  
      }
    }).addTo(myMap);
  });
  