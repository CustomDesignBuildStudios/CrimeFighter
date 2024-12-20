import { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Spinner from "./Spinner";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const areaData = [
  "Central",
  "Rampart",
  "Southwest",
  "Hollenbeck",
  "Harbor",
  "Hollywood",
  "Wilshire",
  "West LA",
  "Van Nuys",
  "West Valley",
  "Northeast",
  "77th Street",
  "Newton",
  "Pacific",
  "N Hollywood",
  "Foothill",
  "Devonshire",
  "Southeast",
  "Mission",
  "Olympic",
  "Topanga",
];
function CrimeAreaTimeQuery() {
  const [crimeData, setCrimeData] = useState([]);
  const [area, setArea] = useState("Central"); // State for selected area
  const [year, setYear] = useState(2020); // State for selected year

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/advance/crime-area-time",
          {
            area: area,
            year: year,
          }
        );

        // Assuming the response returns data in the format of { Month, CrimeCount }

        const formattedData = response.data.map((item) => ({
          label: item.MONTH, // The month as label
          y: item.CRIMECOUNT, // The crime count as the data point
        }));

        setCrimeData(formattedData);

        setCrimeData(formattedData);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      }
    };

    if (area && year) {
      fetchCrimeData();
    }
  }, [area, year]);

  const handleAreaChange = (e) => setArea(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const areaTitle = areaData[area] ? areaData[area].title : ""; // Get area title based on selected area

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: `Crime Count in ${areaTitle} (${year})`,
    },
    axisX: {
      title: "Month",
      interval: 1,
    },
    axisY: {
      title: "Crime Count",
      includeZero: true,
    },
    data: [
      {
        type: "column",
        name: "Crimes",
        dataPoints: crimeData,
      },
    ],
  };

  return (
    <div>
      <h2>Crime Data</h2>

      <div>
        <label htmlFor="area">Select Area: </label>
        <select id="area" value={area} onChange={handleAreaChange}>
          <option value="">Select an Area</option>
          {areaData.map((areaCode, index) => (
            <option key={index} value={areaCode}>
              {areaCode}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="year">Select Year: </label>
        <select id="year" value={year} onChange={handleYearChange}>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div style={{ height: "400px", width: "100%" }}>
        {crimeData.length > 0 ? (
          <CanvasJSChart options={options} />
        ) : (
          <Spinner />
        )}
      </div>
      <p>
        This graph allows users to select an area of Los Angeles and the year.
        The trends that are shown with these graphs shows that in each area and
        each year, the amount of crimes that occur is generally the same.
        Despite the lack of a clear graphical trend, users of our app should
        recognize this as a reason to stay vigilant at any time of the year. A
        trend that could be gotten from these graphs, is the fact that the areas
        of Foothill, Mission, and West LA typically have lower numbers of crime
        whereas Central and 77th Street have the highest number of crimes
        throughout the years.
      </p>
    </div>
  );
}

export default CrimeAreaTimeQuery;
