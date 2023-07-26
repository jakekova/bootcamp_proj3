
// Sample data 
const data = [
  {
    'Age': 25,
    'Device': 'Mobile',
    'MonthlyRevenue': 100,
    'JoinDate': '01-01-22',
    'LastPaymentDate': '15-05-22',
    'SubscriptionType': 'Basic'
  },
  {
    'Age': 25,
    'Device': 'Mobile',
    'MonthlyRevenue': 25,
    'JoinDate': '01-05-22',
    'LastPaymentDate': '15-09-22',
    'SubscriptionType': 'Standard'

  }
  
];


// Function to parse date strings in the format "DD-MM-YY" into Date objects
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('-').map(Number);
  
  return new Date(2000 + year, month - 1, day);
}
// Parse the data and convert date strings to Date objects
data.forEach((row) => {
  row.JoinDate = parseDate(row.JoinDate);
  row.LastPaymentDate = parseDate(row.LastPaymentDate);
});

// Create the subscription type dropdown
const subscriptionTypes = [...new Set(data.map((row) => row.SubscriptionType))];
const dropdown = document.getElementById('subscriptionType');

// Add a default option to the dropdown
const defaultOption = document.createElement('option');
defaultOption.value = 'All';
defaultOption.textContent = 'All Subscription Types';
dropdown.appendChild(defaultOption);

subscriptionTypes.forEach((type) => {
  const option = document.createElement('option');
  option.value = type;
  option.textContent = type;
  dropdown.appendChild(option);
});

// Function to update the line graph when the dropdown selection changes
function updateLineGraph() {
  const selectedType = dropdown.value;

  // Filter the data based on the selected subscription type
  const filteredData = selectedType === 'All' ? data : data.filter((row) => row.SubscriptionType === selectedType);

  // Group the filtered data by month and calculate total revenue for each month
  const monthlyRevenue = {};
  filteredData.forEach((row) => {
    let currentDate = new Date(row.JoinDate);
    const lastPaymentDate = new Date(row.LastPaymentDate);

    while (currentDate <= lastPaymentDate) {
      const monthKey = currentDate.toISOString().slice(0, 7); // Get year-month string (e.g., "2023-07")
      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0;
      }
      monthlyRevenue[monthKey] += row.MonthlyRevenue;

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  });

  // Extract the keys and values from the monthlyRevenue object
  const months = Object.keys(monthlyRevenue);
  const totalRevenues = Object.values(monthlyRevenue);

  // Format the dates to "MM-YYYY" for the x-axis
  const formattedMonths = months.map((month) => {
    const [year, monthNumber] = month.split('-');
    return `${monthNumber}-${year}`;
  });

  // Plotly line graph
  const trace = {
    x: formattedMonths,
    y: totalRevenues,
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: 'blue' },
  };

  const layout = {
    title: selectedType === 'All' ? 'Total Revenue per Month (All Subscription Types)' : `Total Revenue per Month (${selectedType} Subscription)`,
    xaxis: {
      title: 'Month',
      type: 'category',
    },
    yaxis: {
      title: 'Total Revenue',
    },
  };

  // Plot the graph
  Plotly.newPlot('graphDiv', [trace], layout);
}

// Initial call to update the line graph with the default subscription type
updateLineGraph();

// Add event listener to the dropdown to update the line graph when selection changes
dropdown.addEventListener('change', updateLineGraph);


fetch('http://localhost:5000/api/subscription')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      parseDate(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });