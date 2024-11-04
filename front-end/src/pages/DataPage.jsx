import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function DataPage() {
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("Title");
  const [chartType, setChartType] = useState("pie");



  //////////////////////////////Options sidebar
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropdownOption, setDropdownOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [radioOption, setRadioOption] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
  });

  const handleMultiSelectChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  //////////////////////////////Google maps
  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: 37.7749,  // Set your desired latitude
    lng: -122.4194 // Set your desired longitude
  };

  const dataPoints = [
    { id: 1, lat: 37.7749, lng: -122.4194, status: 'active' },
    { id: 2, lat: 37.8044, lng: -122.2711, status: 'inactive' },
    { id: 3, lat: 37.6879, lng: -122.4702, status: 'pending' },
    // Add more data points as needed
  ];
  const getMarkerIcon = (status) => {
    switch (status) {
      case 'active':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'inactive':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      case 'pending':
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      default:
        return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
  };



  //////////////////////////////Server data
  const options = {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: chartTitle
    },
    data: [{
      type: chartType,
      startAngle: 25,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: chartData
    }]
  };



  const apiCall = (type) => {
    const data = {
      
    };

    
    axios.post('http://localhost:8080/data',data).then((results) => {
      let columns = {"M":"Male","F":"Female","U":"Unknown"};
      let columnValues = {};
      let targetColumn = "VICTSEX";
      if(type == "SEX"){
        setChartTitle( "Pie Chart - Crime By Victim Sex");
        setChartType("pie");
        targetColumn = "VICTSEX";
        columns = {"M":"Male","F":"Female","U":"None","X":"Unknown"};
      }
      else if(type == "CRIME"){
        setChartType("line");
        setChartTitle( "Line Chart - Crime by year");

        targetColumn = "VICTSEX";
        columns = {"M":"Male","F":"Female","U":"None","X":"Unknown"};
      }
      else if(type == "RACE"){
        setChartType("pie");
        setChartTitle( "Pie Chart - Crime By Victim Race");
        targetColumn = "VICTDESCENT";
        columns = {"A":"Asian","B":"Black","C":"Chinese","D":"Cambodian","F":"Filipino","G":"Guamanian","H":"Hispanic"
          ,"I":"American Indian","J":"Japanese","K":"Korean","L":"Laotian","O":"Other","P":"Pacific Islander"
          ,"S":"Samoan","U":"Hawaiian","V":"Vietnamese","W":"White","X":"Unknown","Z":"Asian Indian"
        };
      }
      else if(type == "STATUS"){
        setChartType("pie");
        setChartTitle( "Pie Chart - Status");
        targetColumn = "STATUS";
        columns = {"AA":"Adult Arrest","IC":"Invest Cont","AO":"Adult Other"
        };
      }


      let total = 0;
      console.log(results.data);
  
      for (let index = 0; index < results.data.length; index++) {
        console.log(results.data[index]);
        if(results.data[index][targetColumn] == null)results.data[index][targetColumn] = "U";

        if (results.data[index][targetColumn] in columnValues) {
          columnValues[results.data[index][targetColumn]]++;
        }else{
          columnValues[results.data[index][targetColumn]]=1;
        }
        total++;
        console.log(results.data[index][targetColumn]);
        console.log(columnValues);

      }
      console.log(total);
      let data = {};
      for (const key in columnValues) {
        if (columnValues.hasOwnProperty(key)) { 
          data[key] = {y:(columnValues[key]/total) * 100,label:columns[key]}
        }
      }

      setChartData(Object.values(data));
  
    })
  }


  return (


    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <button onClick={() => apiCall("SEX")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Victim Sex</button>
        <button onClick={() => apiCall("CRIME")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Line Crime</button>
        <button onClick={() => apiCall("RACE")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Victim Race</button>
        <button onClick={() => apiCall("STATUS")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Status</button>
















      {/* Search Bar */}
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search..."
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>

      {/* Date Range Picker */}
      <div>
        <label className="text-sm font-medium">Date Range</label>
        <div className="flex space-x-2 mt-1">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
      </div>

      {/* Dropdown */}
      <div>
        <label className="text-sm font-medium">Category</label>
        <select
          value={dropdownOption}
          onChange={(e) => setDropdownOption(e.target.value)}
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Select a category</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      {/* Multi-select */}
      <div>
        <label className="text-sm font-medium">Multi-Select</label>
        <div className="flex flex-col mt-1">
          {['Option A', 'Option B', 'Option C'].map((option) => (
            <label key={option} className="inline-flex items-center mt-1">
              <input
                type="checkbox"
                className="form-checkbox bg-gray-700 text-white"
                checked={selectedOptions.includes(option)}
                onChange={() => handleMultiSelectChange(option)}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Radio Buttons */}
      <div>
        <label className="text-sm font-medium">Select Type</label>
        <div className="flex flex-col mt-1">
          {['Type 1', 'Type 2', 'Type 3'].map((type) => (
            <label key={type} className="inline-flex items-center mt-1">
              <input
                type="radio"
                name="type"
                value={type}
                className="form-radio bg-gray-700 text-white"
                checked={radioOption === type}
                onChange={() => setRadioOption(type)}
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div>
        <label className="text-sm font-medium">Options</label>
        <div className="flex flex-col mt-1">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox bg-gray-700 text-white"
              checked={checkboxes.option1}
              onChange={() =>
                setCheckboxes((prev) => ({ ...prev, option1: !prev.option1 }))
              }
            />
            <span className="ml-2">Option 1</span>
          </label>
          <label className="inline-flex items-center mt-1">
            <input
              type="checkbox"
              className="form-checkbox bg-gray-700 text-white"
              checked={checkboxes.option2}
              onChange={() =>
                setCheckboxes((prev) => ({ ...prev, option2: !prev.option2 }))
              }
            />
            <span className="ml-2">Option 2</span>
          </label>
        </div>
      </div>

















      </div>























      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white p-4 shadow rounded">
            <CanvasJSChart options = {options} 
                  /* onRef={ref => this.chart = ref} */
                  /* containerProps={{ width: '100%', height: '300px' }} */
                /> 
        </div>


        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Data List</h2>
          <ul className="list-disc pl-5 space-y-2">
            {dataPoints.map((item) => (
              <li key={item.id} className="border border-gray-300 rounded p-2">
                <strong>Status:</strong> {item.status}, <strong>Location:</strong> {item.lat}, {item.lng}
              </li>
            ))}
          </ul>
        </div>

        <LoadScript googleMapsApiKey="AIzaSyD5aQjrqz7O84b1lSmYp0vUdwGfPxOT3kk">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
  
          </GoogleMap>
        </LoadScript>
      </div>
 
    </div>
  );
}

export default DataPage;
