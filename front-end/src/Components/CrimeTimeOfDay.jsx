import { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CrimeTimeOfDayQuery() {
  const [crimeData, setCrimeData] = useState([]);
  const [selectedHour, setSelectedHour] = useState(12); // Default hour set to 12


  const fetchCrimeData = async (hour) => {
    try {
      const response = await axios.post("http://localhost:8080/advance/crime-timeofday", { hour: hour });
      setCrimeData(response.data);
    } catch (error) {
      console.error("Error fetching crime data:", error);
    }
  };


  useEffect(() => {
    fetchCrimeData(selectedHour);
  }, [selectedHour]);

  // Prepare the data for CanvasJS chart
  const chartData = crimeData.map((item) => ({
    label: item.CRIMETYPE,
    y: item.CRIMECOUNT,
  }));

  // CanvasJS chart options
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Crime Count by Type at Hour " + selectedHour,
    },
    axisY: {
      title: "Crime Count",
      includeZero: true,
    },
    data: [
      {
        type: "column",
        showInLegend: true,
        name: "Crime Type",
        dataPoints: chartData,
      },
    ],
  };

  return (
      <div>
        <h2>Crime Statistics for the Hour</h2>

        {/* Dropdown to select hour of the day */}
        <select value={selectedHour} onChange={(e) => setSelectedHour(parseInt(e.target.value))}>
          {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour}:00
              </option>
          ))}
        </select>

        <CanvasJSChart options={options}/>
        <p>
          This graph will show the number of crimes throughout the different times of the day. The most obvious trend is
          that hour 12, or noon, has the most crimes that occur out of any hour of the day. The hours of the day that have the
          least crimes occurring are 2 in the morning, 5 in the morning, and 7 in the morning. The crime that is usually
          the most across the hours of the day is "Vehicle - Stolen". Users of our app should be aware of this trend and
          should be more cautious/aware during this time of the day.
        </p>
      </div>
  );
}

export default CrimeTimeOfDayQuery;