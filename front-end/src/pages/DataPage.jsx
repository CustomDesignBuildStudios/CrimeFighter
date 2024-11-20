import { useState, useEffect, useCallback, useRef  } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './dataPage.css';  // Import the CSS file

import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerF,
  LoadScriptNext,
} from "@react-google-maps/api";
import CrimeModal from "../Components/CrimeModal";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import debounce from "lodash.debounce";
import Spinner from "../Components/Spinner.jsx";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DataPage() {
  const location = useLocation();
  const [urlData, setURLData] = useState({ type: "none" });
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setURLData(location.state);
  }, [location.state]);

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value); // Update state with selected value
  };

  const [options, setOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState("DATERPTD_DESC");
  const [activeTab, setActiveTab] = useState("LIST");
  const [mapData, setMapData] = useState({ data: [] });
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("Title");
  const [chartType, setChartType] = useState("pie");
  const [chartByType, setChartByType] = useState("VICTSEX");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState(null);




  // const mapBoundsTemp = useRef(null);


  // const onBoundsChanged = debounce((map) => {
  //   const bounds = map.getBounds();
  //   const currentZoom = map.getZoom(); // Get the current zoom level
  //   mapBoundsTemp.current = {bounds:bounds,currentZoom:currentZoom};
  //   LoadData();

  // }, 500);




  const openModal = (crime) => {
    setSelectedCrime(crime);
    setIsModalOpen(true);
  };
  const createReport = () => {
    setSelectedCrime({
      DR_NO: "NEW REPORT",
      // "DATETIMEOCC": "",
      AREA: "01",
      AREANAME: "Central",
      CRMCD: "946",
      CRMCDDESC: "OTHER MISCELLANEOUS CRIME",
      VICTAGE: "0",
      VICTSEX: "U",
      VICTDESCENT: "U",
      PREMISCD: 710,
      PREMISDESC: "OTHER PREMISE",
      WEAPONUSEDCD: "500",
      WEAPONDESC: "UNKNOWN WEAPON/OTHER WEAPON",
      STATUS: "IC",
      STATUSDESC: "Invest Cont",
      LOC: " ",
      LAT: 34.0677,
      LON: -118.552,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrime(null);
  };

  const handleSave = async (updatedCrime) => {
    LoadData();
    closeModal();
  };

  const handleDelete = async (drNo) => {
    // axios.post('http://localhost:8080/general-data').then((results) => {
    //   closeModal();
    // });
  };

 

  useEffect(() => {
    LoadData();
  }, [activeTab, orderBy, chartByType, urlData]);

  const tabs = [
    { id: "CHART", label: "Graphs" },
    { id: "LIST", label: "List" },
    { id: "MAP", label: "Map" },
  ];

  const areaData = {
    "01": { title: "Central", lat: 34.0495, lng: -118.2477 },
    "02": { title: "Rampart", lat: 34.069, lng: -118.2734 },
    "03": { title: "Southwest", lat: 34.0226, lng: -118.2887 },
    "04": { title: "Hollenbeck", lat: 34.043, lng: -118.2112 },
    "05": { title: "Harbor", lat: 33.7397, lng: -118.2912 },
    "06": { title: "Hollywood", lat: 34.1015, lng: -118.3287 },
    "07": { title: "Wilshire", lat: 34.0594, lng: -118.3407 },
    "08": { title: "West Los Angeles", lat: 34.0524, lng: -118.4426 },
    "09": { title: "Van Nuys", lat: 34.1857, lng: -118.4489 },
    10: { title: "West Valley", lat: 34.2011, lng: -118.5365 },
    11: { title: "Northeast", lat: 34.1101, lng: -118.2096 },
    12: { title: "77th Street", lat: 33.9592, lng: -118.2915 },
    13: { title: "Newton", lat: 34.0154, lng: -118.2468 },
    14: { title: "Pacific", lat: 33.9932, lng: -118.4492 },
    15: { title: "Narcotics", lat: 34.2011, lng: -118.3992 },
    16: { title: "Foothill", lat: 34.2582, lng: -118.4196 },
    17: { title: "Devonshire", lat: 34.2352, lng: -118.536 },
    18: { title: "Southeast", lat: 33.9386, lng: -118.2487 },
    19: { title: "Mission", lat: 34.2723, lng: -118.4686 },
    20: { title: "Olympic", lat: 34.056, lng: -118.297 },
    21: { title: "Topanga", lat: 34.1926, lng: -118.6021 },
  };

  const descentData = {
    A: "Asian",
    B: "Black",
    C: "Chinese",
    D: "Cambodian",
    F: "Filipino",
    G: "Guamanian",
    H: "Hispanic",
    I: "American Indian",
    J: "Japanese",
    K: "Korean",
    L: "Laotian",
    O: "Other",
    P: "Pacific Islander",
    S: "Samoan",
    U: "Hawaiian",
    V: "Vietnamese",
    W: "White",
    X: "Unknown",
    Z: "Asian Indian",
  };
  const genderData = { M: "Male", F: "Female", U: "None", X: "Unknown" };
  const ageData = {
    "0-20": "0-20",
    "21-40": "21-40",
    "41-60": "41-60",
    "61-80": "61-80",
    "81-100": "81-100",
    "100+": "100+",
  };

  const crimeTypeData = {
    THEFT: "Theft",
    ASSAULT: "Assault",
    "SEXUAL ASSAULT": "Sexual Assault",
    EXTORTION: "Extortion",
    RAPE: "Rape",
    ARSON: "Arson",
    OTHER: "Other",
    THREATS: "Threats",
  };
  const basicCrimeTypesData = {
    940: "EXTORTION",
    888: "TRESPASSING",
    910: "KIDNAPPING",
    660: "COUNTERFEIT",
    113: "MANSLAUGHTER, NEGLIGENT",
    648: "ARSON",
    510: "VEHICLE - STOLEN",
    310: "BURGLARY",
    210: "ROBBERY",
    121: "RAPE, FORCIBLE",
  };
  const basicWeaponTypesData = {
    400: "STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)",
    217: "SWORD",
    103: "RIFLE",
    102: "HAND GUN",
    500: "UNKNOWN WEAPON/OTHER WEAPON",
  };
  const statusData = {
    AA: "Adult Arrest",
    IC: "Invest Cont",
    AO: "Adult Other",
    CC: "UNK",
    JO: "Juv Other",
    JA: "Juv Arrest",
  };

  // const weaponsData =     {"105":"GUN","115":"GUN","122":"GUN","125":"GUN","108":"GUN","116":"GUN","120":"GUN","121":"GUN","123":"GUN","111":"GUN","118":"GUN","119":"GUN","117":"GUN","124":"GUN","110":"GUN","103":"GUN","102":"GUN","106":"GUN","104":"GUN","101":"GUN","114":"GUN","109":"GUN",
  //   "516":"ANIMAL",
  //   "307":"VEHICLE",
  //   "400":"PHYSICAL",
  //   "505":"EXPLOSIVE",
  //   "301":"MELEE","200":"MELEE","305":"MELEE","205":"MELEE","215":"MELEE","223":"MELEE","217":"MELEE","214":"MELEE","209":"MELEE","308":"MELEE","207":"MELEE","211":"MELEE","213":"MELEE","210":"MELEE","219":"MELEE","514":"MELEE","202":"MELEE","221":"MELEE" };

  const weaponsData = {
    GUN: "Firearm",
    ANIMAL: "Animal",
    VEHICLE: "Vehicle",
    PHYSICAL: "Physical Force",
    EXPLOSIVE: "Explosives",
    OTHER: "Other",
    MELEE: "Melee Weapon",
  };

  //////////////////////////////Options sidebar



  const [chartLabel, setChartLabel] = useState("{label} - {y}%");
  const [startOccurredDate, setStartOccurredDate] = useState(null);
  const [endOccurredDate, setEndOccurredDate] = useState(null);

  const [startReportedDate, setStartReportedDate] = useState(null);
  const [endReportedDate, setEndReportedDate] = useState(null);

  const [selectedWeaponOptions, setSelectedWeaponOptions] = useState([]);
  const handleSelectWeaponChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedWeaponOptions(selectedValues);
  };
  const [selectedAgeOptions, setSelectedAgeOptions] = useState([]);
  const handleSelectAgeChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedAgeOptions(selectedValues);
  };
  const [selectedDescentOptions, setSelectedDescentOptions] = useState([]);
  const handleSelectDescentChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedDescentOptions(selectedValues);
  };
  const [selectedStatusOptions, setSelectedStatusOptions] = useState([]);
  const handleSelectStatusChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedStatusOptions(selectedValues);
  };

  const [selectedCrimeOptions, setSelectedCrimeOptions] = useState([]);
  const handleSelectCrimeChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCrimeOptions(selectedValues);
  };
  const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
  const handleSelectLocationChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedLocationOptions(selectedValues);
  };

  const [selectedGenderOptions, setSelectedGenderOptions] = useState([]);
  const handleMultiSelectChange = (option) => {
    setSelectedGenderOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  //////////////////////////////Google maps
  const containerStyle = {
    width: "100%",
    height: "80vh",
  };


  //////////////////////////////Server data

  useEffect(() => {
    // Update options when any dependencies change
    setOptions({
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: chartTitle,
      },
      data: [
        {
          type: chartType,
          startAngle: 25,
          toolTipContent: chartLabel,
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: chartLabel,
          dataPoints: chartData,
        },
      ],
    });
  }, [chartTitle, chartType, chartLabel, chartData]);

  const LoadChart = (results) => {
    let total = 0;
    let columns = { M: "Male", F: "Female", X: "Unknown", U: "None" };
    let columnValues = {};
    let targetColumn = "VICTSEX";

    if (chartByType == "AREANAME") {
      setChartLabel("{label} - {y}");
    } else {
      setChartLabel("{label} - {y}%");
    }

    if (chartByType == "VICTSEX") {
      setChartTitle("Victims By Gender");
      setChartType("pie");
      targetColumn = "VICTSEX";
      columns = genderData;
    } else if (chartByType == "VICTAGE") {
      setChartType("pie");
      setChartTitle("Victim by Age");

      targetColumn = "VICTAGE";
      columns = ageData;
    } else if (chartByType == "VICTDESCENT") {
      setChartType("pie");
      setChartTitle("Victims By Descent");
      targetColumn = "VICTDESCENT";
      columns = descentData;
    } else if (chartByType == "AREANAME") {
      setChartType("pie");
      setChartTitle("Crime By Area");
      targetColumn = "AREANAME";
      columns = areaData;
    } else if (chartByType == "STATUS") {
      setChartType("pie");
      setChartTitle("Crime Report Status");
      targetColumn = "STATUS";
      columns = statusData;
    } else if (chartByType == "CRMCD") {
      setChartType("pie");
      setChartTitle("Crime by type");

      targetColumn = "CRMCD";
      columns = crimeTypeData;
    } else if (chartByType == "WEAPONUSEDCD") {
      setChartType("pie");
      setChartTitle("Weapons Used");

      targetColumn = "WEAPONUSEDCD";
      columns = weaponsData;
    }

    if (chartType == "pie") {
      let data = {};
      for (let index = 0; index < results.length; index++) {
        total += results[index]["COLCOUNT"];
      }
      for (let index = 0; index < results.length; index++) {
        let val = columns[results[index]["LABEL"]];

        if (typeof val === "undefined") {
          val = results[index]["LABEL"];
        }

        data[results[index]["LABEL"]] = {
          y: parseFloat(
            ((results[index]["COLCOUNT"] / total) * 100).toFixed(1)
          ),
          label: val,
        };
      }
      console.log(data);
      setChartData(Object.values(data));
    }
    // else if (chartType == "column") {
    //   let data = {};
    //   for (let index = 0; index < results.length; index++) {
    //     data[results[index]["LABEL"]] = {
    //       y: results[index]["COLCOUNT"],
    //       label: results[index]["LABEL"],
    //     };
    //   }
    //   console.log(results);
    //   console.log(data);
    //   setChartData(Object.values(data));
    // } else if (chartType == "line") {
    //   let newData = [];
    //   results.sort((a, b) => a.LABEL - b.LABEL);

    //   for (let index = 0; index < results.length; index++) {
    //     newData.push({
    //       x: results[index]["LABEL"],
    //       y: results[index]["COLCOUNT"],
    //     });
    //   }

    //   setChartData(Object.values(newData));
    // }
  };





  function calculateDistance(lat1, lon1, lat2, lon2) {
    const latDiff = lat2 - lat1;
    const lonDiff = lon2 - lon1;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff); // Euclidean distance
}

// Function to find the closest area to a given point
function getClosestArea(position, areaData) {
    let closestArea = null;
    let closestDistance = Infinity;

    // Iterate over the areaData to find the closest area
    for (const key in areaData) {
        const area = areaData[key];
        const distance = calculateDistance(position.lat, position.lng, area.lat, area.lng);

        // Update closest area if current one is closer
        if (distance < closestDistance) {
            closestDistance = distance;
            closestArea = key;
        }
    }

    return closestArea;
}

function getCenterFromBounds(bounds) {
  const sw = bounds.getSouthWest(); // Southwest corner
  const ne = bounds.getNorthEast(); // Northeast corner

  const lat = (sw.lat() + ne.lat()) / 2; // Average latitude
  const lng = (sw.lng() + ne.lng()) / 2; // Average longitude

  return { lat, lng };
}





  const LoadData = (page) => {
    setIsLoading(true);
    console.log(urlData);
    const data = {
      showUser: urlData,
      user: user,
      orderBy: orderBy,
      groupBy: chartByType,
      type: activeTab,
      page: page,
      amount: 20,
      occDateStart: startOccurredDate,
      occDateEnd: endOccurredDate,
      rpDateStart: startReportedDate,
      rpDateEnd: endReportedDate,
      descent: selectedDescentOptions,
      age: selectedAgeOptions,
      weapon: selectedWeaponOptions,
      status: selectedStatusOptions,
      crime: selectedCrimeOptions,
      premis: selectedLocationOptions,
      gender: selectedGenderOptions,
    };

    // if(mapBoundsTemp && mapBoundsTemp['currentZoom'] > 15){
    //   let area = getClosestArea(getCenterFromBounds(mapBoundsTemp['bounds']),areaData);
    //   data['mapBounds'] = mapBoundsTemp['bounds'];
    //   data['mapArea'] = area;
    // }

    axios.post("http://localhost:8080/general-data", data).then((results) => {
      console.log(results.data);
      // let total = 0;
      setListData(results.data["results"]);

        if (results.data["type"] == "LIST") {
        } else if (results.data["type"] == "MAP") {
          let min = 9999999;
          let max = 0;
          for (let index = 0; index < results.data["results"].length; index++) {
            if (results.data["results"][index]["CRIMECOUNT"] > max) {
              max = results.data["results"][index]["CRIMECOUNT"];
            }
            if (results.data["results"][index]["CRIMECOUNT"] < min) {
              min = results.data["results"][index]["CRIMECOUNT"];
            }
          }
          setMapData({ min: min, max: max, data: results.data["results"] });
        } else if (results.data["type"] === "CHART") {
          LoadChart(results.data["results"]);
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => {
        setIsLoading(false); // End loading, regardless of success or failure
      });
  };

  return (
    <div className="flex">
      {isLoading ? (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <Spinner />
        </div>
      ) : null}

      <div className="flex flex-col p-4 text-white bg-gray-800 w-124">
        <h2 className="mb-4 text-lg font-semibold">Filters</h2>
        {/* <button onClick={() => apiCall("SEX")} className="px-4 py-2 mb-2 bg-gray-700 rounded hover:bg-gray-600">Pie Victim Sex</button>
        <button onClick={() => apiCall("CRIME")} className="px-4 py-2 mb-2 bg-gray-700 rounded hover:bg-gray-600">Line Crime</button>
        <button onClick={() => apiCall("RACE")} className="px-4 py-2 mb-2 bg-gray-700 rounded hover:bg-gray-600">Pie Victim Race</button>
        <button onClick={() => apiCall("STATUS")} className="px-4 py-2 mb-2 bg-gray-700 rounded hover:bg-gray-600">Pie Status</button> */}

        {/* Date Crime Reported Range Picker */}
        <div>
          <label className="text-sm font-medium">Date Crime Reported</label>
          <div className="flex mt-1 space-x-2">
            <DatePicker
              selected={startReportedDate}
              onChange={(date) => setStartReportedDate(date)}
              selectsStart
              startReportedDate={startReportedDate}
              endReportedDate={endReportedDate}
              placeholderText="Start Date"
              className="w-full p-2 text-white bg-gray-700 rounded"
            />
            <DatePicker
              selected={endReportedDate}
              onChange={(date) => setEndReportedDate(date)}
              selectsEnd
              startReportedDate={startReportedDate}
              endReportedDate={endReportedDate}
              placeholderText="End Date"
              className="w-full p-2 text-white bg-gray-700 rounded"
            />
          </div>
        </div>
        {/* Date Crime Occurred Range Picker */}
        <div>
          <label className="text-sm font-medium">Date Crime Occurred</label>
          <div className="flex mt-1 space-x-2">
            <DatePicker
              selected={startOccurredDate}
              onChange={(date) => setStartOccurredDate(date)}
              selectsStart
              startOccurredDate={startOccurredDate}
              endOccurredDate={endOccurredDate}
              placeholderText="Start Date"
              className="w-full p-2 text-white bg-gray-700 rounded"
            />
            <DatePicker
              selected={endOccurredDate}
              onChange={(date) => setEndOccurredDate(date)}
              selectsEnd
              startOccurredDate={startOccurredDate}
              endOccurredDate={endOccurredDate}
              placeholderText="End Date"
              className="w-full p-2 text-white bg-gray-700 rounded"
            />
          </div>
        </div>
        {/* Gender Multi-select */}
        <div>
          <label className="text-sm font-medium">Victim Gender</label>
          <div className="flex flex-col mt-1">
            {Object.entries(genderData).map(([key, value]) => (
              <label key={key} className="inline-flex items-center mt-1">
                <input
                  type="checkbox"
                  className="text-white bg-gray-700 form-checkbox"
                  checked={selectedGenderOptions.includes(key)}
                  onChange={() => handleMultiSelectChange(key)}
                />
                <span className="ml-2">{value}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Victim Descent */}
        <div>
          <label className="text-sm font-medium">Victim Descent</label>
          <select
            multiple
            value={selectedDescentOptions}
            onChange={handleSelectDescentChange}
            className="w-full p-2 mt-1 text-white bg-gray-700 rounded"
          >
            {Object.entries(descentData).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {/* Victim Age */}
        <div>
          <label className="text-sm font-medium">Victim Age Bracket</label>
          <select
            multiple
            value={selectedAgeOptions}
            onChange={handleSelectAgeChange}
            className="w-full p-2 mt-1 text-white bg-gray-700 rounded"
          >
            {Object.entries(ageData).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {/* Status */}
        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            multiple
            value={selectedStatusOptions}
            onChange={handleSelectStatusChange}
            className="w-full p-2 mt-1 text-white bg-gray-700 rounded"
          >
            {Object.entries(statusData).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {/* Premis Type */}
        {/* <div>
        <label className="text-sm font-medium">Crime Location</label>
        <select
          multiple
          value={selectedLocationOptions}
          onChange={handleSelectLocationChange}
          className="w-full p-2 mt-1 text-white bg-gray-700 rounded"
        >
          <option value="602">BANK</option>
          <option value="103">ALLEY</option>
          <option value="301">GAS STATION</option>
        </select>
      </div> */}
        {/* Crime Type */}
        <div>
          <label className="text-sm font-medium">Crime Type</label>
          <select
            multiple
            value={selectedCrimeOptions}
            onChange={handleSelectCrimeChange}
            className="w-full p-2 mt-1 text-white bg-gray-700 rounded"
          >
            {Object.entries(crimeTypeData).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {/* Weapon Type */}
        <div>
          <label className="text-sm font-medium">Weapon Type</label>
          <select
            multiple
            value={selectedWeaponOptions}
            onChange={handleSelectWeaponChange}
            className="w-full p-2 mt-1 text-white bg-gray-700 rounded"
          >
            {Object.entries(weaponsData).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Update Filter */}
        <button
          onClick={() => LoadData(0)}
          className="px-4 py-2 mt-2 mb-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Update
        </button>
      </div>
      <div className="w-full">
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 w-full text-center font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 text-gray-700">
          {activeTab === "CHART" && (
            <div className="flex">
              {/* Sidebar */}
              <div className="flex flex-col w-1/4 p-4 bg-gray-100">
                <h2 className="mb-4 text-xl font-bold">Types</h2>
                <button
                  onClick={() => setChartByType("VICTSEX")}
                  className="block w-full p-2 mb-2 text-white bg-blue-500 rounded"
                >
                  Gender
                </button>
                <button
                  onClick={() => setChartByType("VICTAGE")}
                  className="block w-full p-2 mb-2 text-white bg-blue-500 rounded"
                >
                  Age
                </button>
                <button
                  onClick={() => setChartByType("VICTDESCENT")}
                  className="block w-full p-2 mb-2 text-white bg-blue-500 rounded"
                >
                  Descent
                </button>
                <button
                  onClick={() => setChartByType("CRMCD")}
                  className="block w-full p-2 mb-2 text-white bg-blue-500 rounded"
                >
                  Crime
                </button>
                <button
                  onClick={() => setChartByType("STATUS")}
                  className="block w-full p-2 mb-2 text-white bg-blue-500 rounded"
                >
                  Status
                </button>
                <button
                  onClick={() => setChartByType("AREANAME")}
                  className="block w-full p-2 mb-2 text-white bg-blue-500 rounded"
                >
                  Area
                </button>
                <button
                  onClick={() => setChartByType("WEAPONUSEDCD")}
                  className="block w-full p-2 mb-2 text-white bg-blue-500 rounded"
                >
                  Weapon Used
                </button>
              </div>

              {/* Chart Container */}
              <div className="flex flex-col w-3/4 p-4">
                <div className="p-4 bg-white rounded shadow">
                  <CanvasJSChart options={options} />
                </div>
              </div>
            </div>
          )}
          {activeTab === "LIST" && (
            <div>
              <div className="p-4 bg-white rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    {urlData && urlData["type"] == "user"
                      ? "User Data List"
                      : "Data List"}
                  </h2>

                  <div className="flex items-center ml-4">
                    <label htmlFor="orderBy" className="mr-2">
                      Order By:
                    </label>
                    <select
                      id="orderBy"
                      value={orderBy}
                      onChange={handleOrderChange}
                      className="p-2 border rounded"
                    >
                      <option value="DATERPTD_ASC">Oldest First</option>
                      <option value="DATERPTD_DESC">Newest First</option>
                    </select>
                  </div>
                </div>

                <ul className="pl-5 space-y-2 list-none">
                  {listData.map((item) => (
                    <li
                      key={Math.random()}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item["DR_NO"]}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item["CRMCDDESC"]} | {item["AREANAME"]} |{" "}
                          {new Date(item["DATETIMEOCC"]).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => openModal(item)}
                        className="px-4 py-2 ml-4 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  {/* <button
                  onClick={() => LoadMoreData()}
                  className="px-4 py-2 mt-2 mb-2 text-white bg-gray-700 rounded hover:bg-gray-600"
                >
                  Load More
                </button> */}
                </div>
              </div>
            </div>
          )}
          {activeTab === "MAP" && (
            <div>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{lat: 34.052235, lng: -118.243683}}
                zoom={10}
                // onLoad={(map) => {
                //   map.addListener("bounds_changed", () => onBoundsChanged(map));
                // }}
              >
                {mapData["data"].map((item) => {
                  if (item.CRIMECOUNT != null) {
                  return (
                    <MarkerF
                    key={item.AREA}
                    position={{
                      lat: areaData[item.AREA].lat,
                      lng: areaData[item.AREA].lng,
                    }}
                    icon={{
                      url: "./circle.png", // Set the custom icon
                      scaledSize: new window.google.maps.Size(
                        60 * (item.CRIMECOUNT / mapData["max"]),
                        60 * (item.CRIMECOUNT / mapData["max"])
                      ), // Resize the icon (optional)
                    }}
                  />
                  )
                }else{
                  return (
                    <MarkerF
                    key={item.DR_NO}
                    position={{
                      lat: item.LAT,
                      lng: item.LON,
                    }}
                  />
                  )
                }})}
              
              </GoogleMap>
            </div>
          )}
        </div>

        {user ? (
          <div className="w-full p-2">
            <button
              onClick={() => createReport()}
              className="w-full p-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Report
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <CrimeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={selectedCrime}
          onSave={handleSave}
          onDelete={handleDelete}
          sexData={genderData}
          descentData={descentData}
          weaponData={basicWeaponTypesData}
          crimeData={basicCrimeTypesData}
          areaData={areaData}
          statusData={statusData}
        />
      )}
    </div>
  );
}

export default DataPage;
