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

      <CanvasJSChart options={options} />
    </div>
  );
}

export default CrimeTimeOfDayQuery;