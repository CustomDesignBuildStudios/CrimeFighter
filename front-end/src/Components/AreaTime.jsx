import { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GoogleMap,
  LoadScript,
  Marker,
  LoadScriptNext,
} from "@react-google-maps/api";
import Spinner from "./Spinner";

function AreaTimeQuery() {
  // Your data
  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(2021); // Default year
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = (selectedYear) => {
    setIsLoading(true);

    // Fetch data from your API endpoint
    axios
      .post("http://localhost:8080/advance/area-crime", { year: selectedYear }) // Replace with your actual API endpoint
      .then((response) => {
        const data = response.data; // Assuming response.data contains the dataset

        // Define all months in the year (assuming you're working with a specific year, e.g., 2020)
        const allMonths = [
          `${selectedYear}-01`,
          `${selectedYear}-02`,
          `${selectedYear}-03`,
          `${selectedYear}-04`,
          `${selectedYear}-05`,
          `${selectedYear}-06`,
          `${selectedYear}-07`,
          `${selectedYear}-08`,
          `${selectedYear}-09`,
          `${selectedYear}-10`,
          `${selectedYear}-11`,
          `${selectedYear}-12`,
        ];

        // Get all unique areas
        const areas = [...new Set(data.map((item) => item.AREANAME))];

        // Initialize empty data array for the chart
        const formattedData = areas.map((area) => {
          // Initialize an array with zeroes for each month
          const crimeCounts = allMonths.map((month) => {
            const count = data
              .filter((item) => item.MONTH === month && item.AREANAME === area)
              .reduce((acc, curr) => acc + curr.SEVERECRIMECOUNT, 0);
            return count;
          });

          return {
            type: "line", // Stacked bar chart
            name: area, // Name of the area
            showInLegend: true,
            dataPoints: allMonths.map((month, index) => ({
              label: month,
              y: crimeCounts[index],
            })),
            visible: true, // Default to visible
          };
        });

        // Set the formatted data into the chart data state
        setChartData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData(year);
  }, [year]);

  // CanvasJS chart options
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Severe Crime Count by Area and Month",
    },
    axisX: {
      title: "Month",
      valueFormatString: "MMM YYYY", // Month format for x-axis labels
    },
    axisY: {
      title: "Severe Crime Count",
      includeZero: true, // Start y-axis from zero to make comparisons easier
    },
    legend: {
      cursor: "pointer", // Change cursor to pointer for clickable legend
      itemclick: function (e) {
        // Toggle visibility of the clicked series
        e.dataSeries.visible = !(
          typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible
        );
        e.chart.render(); // Re-render the chart to apply the changes
      },
    },
    data: chartData,
  };

  // Handle year selection
  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="yearSelect">Select Year: </label>
        <select id="yearSelect" value={year} onChange={handleYearChange}>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          {/* Add more years as needed */}
        </select>
      </div>
      {isLoading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <>
          <CanvasJSReact.CanvasJSChart options={options} />
          <p>
            This graph has the option of allowing the user to select a year, and
            also click on the locations at the bottom of the chart. Clicking the
            location will remove the line from the graph and re-clicking it will
            put it back onto the graph. The most obvious trend is that the area
            of 77th street has the highest amounts of severe crimes across
            nearly all years and all months. Some months have the Central area
            as the area with the highest amount of severe crimes, the Southeast
            area is also the highest at some points throughout the years. The
            area with the least amount of severe crimes is the West LA area.
            Users of our app should be especially aware when visiting these
            areas of Los Angeles since they have been shown to have higher
            numbers of more violent and severe crimes.
          </p>
        </>
      )}
    </div>
  );
}

export default AreaTimeQuery;
