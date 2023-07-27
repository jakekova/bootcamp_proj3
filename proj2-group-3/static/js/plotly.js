let link1 = "static/data/naveen_df_final.json"
d3.json(link1).then(function(data) {
  console.log(data)
  plotData(data)
})

function plotData(data) {
  // Extract the data from the JSON
  let countries = Object.values(data.Country);
  let ageBins = Object.values(data.Age_Bins);
  let counts = Object.values(data.Count);

  // Get unique age bins and countries for grouping
  let uniqueAgeBins = [...new Set(ageBins)];
  let uniqueCountries = [...new Set(countries)];

  // trace
  let traces = uniqueAgeBins.map(ageBin => ({
    x: uniqueCountries,
    y: counts.filter((count, i) => ageBins[i] === ageBin),
    name: ageBin,
    type: 'bar'
  }));

  // layout
  let layout = {
    title: 'Age Distribution by Country',
    xaxis: {
      title: 'Country'
    },
    yaxis: {
      title: 'Count'
    },
    barmode: 'group' 
  };

  // plot
  Plotly.newPlot('plot', traces, layout);
}