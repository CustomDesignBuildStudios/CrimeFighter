

import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';

function GenderTimeQuery() {
  // Your data
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios.post('http://localhost:8080/advance/gender-time')  // Replace with your actual API endpoint
        .then(response => {
          const data = response.data; // Assuming response.data contains the dataset you showed earlier

          // Extract unique months
          const months = [...new Set(data.map(item => item.MONTH))];

          // Calculate victim counts for each category
          const maleData = months.map(month =>
              data.filter(item => item.MONTH === month && item.SEX === 'M').reduce((acc, curr) => acc + curr.VICTIMCOUNT, 0)
          );

          const femaleData = months.map(month =>
              data.filter(item => item.MONTH === month && item.SEX === 'F').reduce((acc, curr) => acc + curr.VICTIMCOUNT, 0)
          );

          const unknownData = months.map(month =>
              data.filter(item => item.MONTH === month && item.SEX === 'X').reduce((acc, curr) => acc + curr.VICTIMCOUNT, 0)
          );

          // const noneData = months.map(month =>
          //   data.filter(item => item.MONTH === month && item.SEX === 'H').reduce((acc, curr) => acc + curr.VICTIMCOUNT, 0)
          // );

          // Update the chart data state
          setChartData([
            {
              type: "line",
              name: "Male Victims",
              showInLegend: true,
              dataPoints: months.map((month, index) => ({label: month, y: maleData[index]}))
            },
            {
              type: "line",
              name: "Female Victims",
              showInLegend: true,
              dataPoints: months.map((month, index) => ({label: month, y: femaleData[index]}))
            },
            {
              type: "line",
              name: "Unknown Victims",
              showInLegend: true,
              dataPoints: months.map((month, index) => ({label: month, y: unknownData[index]}))
            },
            // {
            //   type: "line",
            //   name: "None Victims",
            //   showInLegend: true,
            //   dataPoints: months.map((month, index) => ({ label: month, y: noneData[index] }))
            // }
          ]);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
  }, []);  // Empty dependency array to run only once on component mount

  // CanvasJS chart options
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Victim Count by Sex"
    },
    axisX: {
      title: "Month",
      valueFormatString: "MMM YYYY",
    },
    axisY: {
      title: "Victim Count",
      includeZero: true
    },
    data: chartData
  };

  return (
      <div>
    <CanvasJSReact.CanvasJSChart options={options} />
    <p>
        This graph shows that on average, throughout the crimes from January 2020, to between April and May of 2024, male
        victims have experienced more crimes against them. The most crimes that occurred against males, was in June 2022,
        at 8309 crimes. The most crimes that occurred against females, was in October 2022, at 7869 crimes. One noticeable
        trend is that during the years 2020 and 2021, the gap between the number of crimes against males and females was
        significant, about 1000 crimes separated the two. During 2022, this gap narrowed and the two were separated by about
        500 crimes at most. In 2023, this gap widened again. The crimes where the sex is unknown is much less than the crimes
        where the sex is known and/or reported. The difference across almost all the months shown for these crimes is
        about 3000-4000 crimes.
    </p>
  </div>
);
};

export default GenderTimeQuery;




// .then(response => {
//   const data = response.data; // Assuming response.data contains the dataset you showed earlier

//   // Extract unique months and age groups
//   const months = [...new Set(data.map(item => item.MONTH))];
//   const ageGroups = [...new Set(data.map(item => item.AGEGROUP))];

//   // Prepare the chart data by grouping by SEX and AGEGROUP
//   const formattedData = ageGroups.map(ageGroup => {
//     const maleData = months.map(month => 
//       data.filter(item => item.MONTH === month && item.SEX === 'M' && item.AGEGROUP === ageGroup)
//           .reduce((acc, curr) => acc + curr.VICTIMCOUNT, 0)
//     );
//     const femaleData = months.map(month => 
//       data.filter(item => item.MONTH === month && item.SEX === 'F' && item.AGEGROUP === ageGroup)
//           .reduce((acc, curr) => acc + curr.VICTIMCOUNT, 0)
//     );
//     const unknownData = months.map(month => 
//       data.filter(item => item.MONTH === month && item.SEX === 'U' && item.AGEGROUP === ageGroup)
//           .reduce((acc, curr) => acc + curr.VICTIMCOUNT, 0)
//     );

//     // Debug: Log the data to see what's being grouped
//     console.log(`Data for ${ageGroup}:`);
//     console.log('Male:', maleData);
//     console.log('Female:', femaleData);
//     console.log('Unknown:', unknownData);

//     return [
//       {
//         type: "line",
//         name: `Male Victims - ${ageGroup}`,
//         showInLegend: true,
//         dataPoints: months.map((month, index) => ({ label: month, y: maleData[index] }))
//       },
//       {
//         type: "line",
//         name: `Female Victims - ${ageGroup}`,
//         showInLegend: true,
//         dataPoints: months.map((month, index) => ({ label: month, y: femaleData[index] }))
//       },
//       {
//         type: "line",
//         name: `Unknown Victims - ${ageGroup}`,
//         showInLegend: true,
//         dataPoints: months.map((month, index) => ({ label: month, y: unknownData[index] }))
//       }
//     ];
//   }).flat();  // Flatten the array to make a single array of all data series

//   // Set the processed data into chartData
//   setChartData(formattedData);
// })
// .catch(error => {
//   console.error("Error fetching data:", error);
// });
// }, []);  // Empty dependency array to run only once on component mount

// // CanvasJS chart options
// const options = {
// animationEnabled: true,
// theme: "light2",
// title: {
// text: "Victim Count by Sex and Age Group"
// },
// axisX: {
// title: "Month",
// valueFormatString: "MMM YYYY",
// },
// axisY: {
// title: "Victim Count",
// includeZero: true
// },
// data: chartData
// };

// return (
// <div>
// <CanvasJSReact.CanvasJSChart options={options} />
// </div>
// );
// };