

import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';

function AreaTimeQuery() {
  // Your data
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios.post('http://localhost:8080/advance/area-crime')  // Replace with your actual API endpoint
    .then(response => {
      const data = response.data; // Assuming response.data contains the dataset

      // Define all months in the year (assuming you're working with a specific year, e.g., 2020)
      const allMonths = [
        "2020-01", "2020-02", "2020-03", "2020-04", "2020-05", "2020-06", 
        "2020-07", "2020-08", "2020-09", "2020-10", "2020-11", "2020-12"
      ];

      // Get all unique areas
      const areas = [...new Set(data.map(item => item.AREANAME))];

      // Initialize empty data array for the chart
      const formattedData = areas.map(area => {
        // Initialize an array with zeroes for each month
        const crimeCounts = allMonths.map(month => {
          const count = data.filter(item => item.MONTH === month && item.AREANAME === area)
            .reduce((acc, curr) => acc + curr.SEVERECRIMECOUNT, 0);
          return count;
        });

        return {
          type: "bar",  // Stacked bar chart
          name: area,  // Name of the area
          showInLegend: true,
          dataPoints: allMonths.map((month, index) => ({
            label: month,
            y: crimeCounts[index]
          }))
        };
      });

      // Set the formatted data into the chart data state
      setChartData(formattedData);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}, []);

// CanvasJS chart options
const options = {
  animationEnabled: true,
  theme: "light2",
  title: {
    text: "Severe Crime Count by Area and Month"
  },
  axisX: {
    title: "Month",
    valueFormatString: "MMM YYYY",  // Month format for x-axis labels
  },
  axisY: {
    title: "Severe Crime Count",
    includeZero: true,  // Start y-axis from zero to make comparisons easier
  },
  data: chartData
};

return (
  <div>
    <CanvasJSReact.CanvasJSChart options={options} />
  </div>
);
};

export default AreaTimeQuery;

