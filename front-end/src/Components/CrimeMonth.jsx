import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CrimeMonthQuery() {
  const [chartData, setChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Months are 0-based
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/advance/crime-month", {
        year,
        month,
      });

      // Prepare data for CanvasJS
      const formattedData = response.data.map((item) => ({
        label: item.CRIMETYPE,
        y: item.CRIMECOUNT,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const options = {
    animationEnabled: true,
    theme: "light2",
    maintainAspectRatio: false,
    aspectRatio: 1,
    title: {
      text: `Crime Trends for ${selectedDate.getFullYear()}-${(
        selectedDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`,
    },
    axisX: {
      title: "Crime Type",
      reversed: true,
    },
    axisY: {
      title: "Number of Crimes",
    },
    data: [
      {
        type: "bar",
        dataPoints: chartData,
      },
    ],
  };

  return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Monthly Crime Trends by Type</h1>
        <div className="mb-4 flex flex-col sm:flex-row items-center">
          <label className="mr-2">Select Month:</label>
          <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM"
              showMonthYearPicker
              className="p-2 border rounded-md"
          />
          <button
              onClick={fetchData}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fetch Data
          </button>
        </div>
        {isLoading ? (
            <p>Loading...</p>
        ) : chartData.length > 0 ? (
            <div className="w-full max-w-4xl h-[800px]">
              <CanvasJSChart height="700px" options={options} className="w-full max-w-4xl h-[800px]"/>
            </div>
        ) : (
            <p>No data available for the selected month.</p>
        )}
        <p>
          These charts show the number of the different types of crimes that occur in a selected month. The exact number of
          each crime is shown when the cursor hovers over a bar on the graph. For the year 2020, the most popular crime in
          every month except January was "Vehicle - Stolen". The top 2 crimes throughout the year 2021 were "Vehicle - Stolen"
          and "Battery - Simple Assault". In 2022, the top 2 crimes in each month were "Vehicle - Stolen" and "Theft of Identity".
          In 2023, the top two crimes in most of the months were "Vehicle - Stolen" and "Battery - Simple Assault". The beginning of
          2024 continues the trends from 2023 until April, where the different types of crimes by month start to deviate from the trends,
          "Vehicle - Stolen" is at the top of the graph for most of the months shown. This should tell users of our app that at any time of
          the year, vehicles being stolen happens most often. To say what month of the year has the most crimes would be difficult,
          the amount of crimes that occur are pretty consistent throughout the year. Although, for some of the years, December seems
           to have a higher amount of crimes than other months.
        </p>
      </div>
  );
}

export default CrimeMonthQuery;