// This is my function to extract from sample data
d3.json("static/data/bears_data.json").then(function(gc_data) {
  console.log(gc_data)

  function malePop(country) {
    found = gc_data.find(c => (c.Country == country && c.Gender == "Male"));
    return found.Count
  };

  console.log(malePop("Mexico"))

  function femalePop(country) {
    found = gc_data.find(c => (c.Country == country && c.Gender == "Female"));
    return found.Count
  };

  console.log(femalePop("Mexico"))

});


///// EVERYTHING BELOW HERE IS WORKING MAP CODE
// Creating the map object
let myMap = L.map("map", {
    center: [40, -75],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Go get the geojson data
  let link = "static/data/countries_narrowed.geojson";
  
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
    else if (country == "United Kingdon") return "brown";
    else if (country == "United States of America") return "blue";
    else return "black";
  }

  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
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
        //// Giving each feature a popup with information that's relevant to it
        
        // Access country_gender_data
        d3.json("static/data/bears_data.json").then(function(gc_data) {
          
          // Define func for extracting male population
          function malePop(country) {
            found = gc_data.find(c => (c.Country == country && c.Gender == "Male"));
            return found.Count
          };
        
          // Define func for extracting female population
          function femalePop(country) {
            found = gc_data.find(c => (c.Country == country && c.Gender == "Female"));
            return found.Count
          };
        
          // The actual popup
          layer.bindPopup(
            "<h1>" + feature.properties.ADMIN + "</h1> \
            <hr> \
            <h2> Male Population: " + malePop(feature.properties.ADMIN) + "</h2> \
            <p> \
            <h2> Female Population: " + femalePop(feature.properties.ADMIN) + "</h2>");
        
        });
      }
    }).addTo(myMap);
  });
  