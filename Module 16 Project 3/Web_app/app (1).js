function plotAverageAgeByDevice(data) {
    // Extract unique device values
    let uniqueDevices = [...new Set(data.map(user => user.Device))];
    console.log("Test");
  
    // Calculate average age for each unique device
    let averageAges = uniqueDevices.map(device => {
      let deviceUsers = data.filter(user => user.Device === device);
      let ages = deviceUsers.map(user => user.Age);
      let sumOfAges = ages.reduce((total, age) => total + age, 0);
      let averageAge = sumOfAges / deviceUsers.length;
      return { Device: device, AverageAge: averageAge };
    });
  
    // Sort the average ages by device name
    averageAges.sort((a, b) => a.Device.localeCompare(b.Device));
  
    // Extract device names and average ages for plotting
    let deviceNames = averageAges.map(item => item.Device);
    let averageAgeValues = averageAges.map(item => item.AverageAge);
  
    // Plot the average ages by device
    let trace = {
      x: deviceNames,
      y: averageAgeValues,
      type: 'bar'
    };
  
    let layout = {
      title: 'Average User Age by Device',
      xaxis: {
        title: 'Device'
      },
      yaxis: {
        title: 'Average Age'
      }
    };
  
    Plotly.newPlot('plot', [trace], layout);
  }
  
  fetch('http://localhost:5000/api/users')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      plotAverageAgeByDevice(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  