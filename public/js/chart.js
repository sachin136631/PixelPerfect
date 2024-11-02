// charts.js
// Sample data for click ratios and conversion rates
const dataContainer = document.getElementById('data-container');

// Parse the data-mydata attribute
const myData = JSON.parse(dataContainer.getAttribute('data'));

console.log(myData);
const clickRatioData = {
    labels: ['Regular Clicks'], // Example buttons
    datasets: [
      {
        label: 'Version A',
        data: [myData.dataClickA], // Example click counts for Group A
        backgroundColor: 'rgba(65, 105, 225, 1)', // Royal blue
      },
      {
        label: 'version B',
        data: [myData.dataClickB], // Example click counts for Group B
        backgroundColor: 'rgba(232, 222, 248, 1)', // Light lavender
      },
    ],
  };
  
  const conversionRateData = {
    labels: ['Call To Action'], // Example main buttons
    datasets: [
      {
        label: 'Version A',
        data: [myData.dataActionA], // Example conversion counts for Group A
        backgroundColor: 'rgba(65, 105, 225, 1)', // Royal blue
      },
      {
        label: 'Version B',
        data: [myData.dataActionB], // Example conversion counts for Group B
        backgroundColor: 'rgba(232, 222, 248, 1)', // Light lavender
      },
    ],
  };
  
  const timeSpentData = {
    labels: ['Version A', 'Version B'], // Avg time spent
    datasets: [
      {
        label: 'Avg Time Spent (in mins)',
        data: [5, 3], // Example average time spent in minutes
        backgroundColor: [
          'rgba(65, 105, 225, 1)', // Royal blue
          'rgba(232, 222, 248, 1)', // Light lavender
        ],
      },
    ],
  };
  
  // Configuration for the bar chart
  const barConfig = {
    type: 'bar',
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#fff', // White labels for legend
          },
        },
      },
      scales: {
        x: {
          ticks: { color: '#fff' }, // White labels for x-axis
          grid: { display: false },
        },
        y: {
          ticks: { color: '#fff' }, // White labels for y-axis
          grid: { color: '#444' }, // Gray color for grid lines
        },
      },
    },
  };
  
  // Function to render bar charts
  function renderBarChart(ctx, data) {
    const config = { ...barConfig, data: data };
    new Chart(ctx, config);
  }
  
  // Function to render pie chart
  function renderPieChart(ctx, data) {
    const pieConfig = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#fff', // White labels for legend
            },
          },
        },
      },
    };
    new Chart(ctx, pieConfig);
  }
  
  // Get contexts and render charts
  const clickRatioCtx = document.getElementById('clickRatioChart').getContext('2d');
  renderBarChart(clickRatioCtx, clickRatioData);
  
  const conversionRateCtx = document.getElementById('conversionRateChart').getContext('2d');
  renderBarChart(conversionRateCtx, conversionRateData);
  
  const timeSpentCtx = document.getElementById('timeSpentChart').getContext('2d');
  renderPieChart(timeSpentCtx, timeSpentData);
  