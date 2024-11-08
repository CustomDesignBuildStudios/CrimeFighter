import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function DataPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setIsMapLoaded(true); // Set to true when the map has loaded
  };


  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: 'Chart', content: 'Content for Tab 1' },
    { id: 'tab2', label: 'List', content: 'Content for Tab 2' },
    { id: 'tab3', label: 'Map', content: 'Content for Tab 3' },
  ];

  let LAAreas = [
    { id: '01', title: 'Central', lat: 34.0495, lng:-118.2477 },
    { id: '02', title: 'Rampart', lat: 34.0690, lng:-118.2734 },
    { id: '03', title: 'Southwest', lat: 34.0226, lng:-118.2887 },
    { id: '04', title: 'Hollenbeck', lat: 34.0430, lng:-118.2112 },
    { id: '05', title: 'Harbor', lat: 33.7397, lng:-118.2912 },
    { id: '06', title: 'Hollywood', lat: 34.1015, lng:-118.3287 },
    { id: '07', title: 'Wilshire', lat: 34.0594, lng:-118.3407 },
    { id: '08', title: 'West Los Angeles', lat: 34.0524, lng:-118.4426 },
    { id: '09', title: 'Van Nuys', lat: 34.1857, lng:-118.4489 },
    { id: '10', title: 'West Valley', lat: 34.2011, lng:-118.5365 },
    { id: '11', title: 'Northeast', lat: 34.1101, lng:-118.2096 },
    { id: '12', title: '77th Street', lat: 33.9592, lng:-118.2915 },
    { id: '13', title: 'Newton', lat: 34.0154, lng:-118.2468 },
    { id: '14', title: 'Pacific', lat: 33.9932, lng:-118.4492 },
    { id: '15', title: 'Narcotics', lat: 34.2011, lng:-118.3992 },
    { id: '16', title: 'Foothill', lat: 34.2582, lng:-118.4196 },
    { id: '17', title: 'Devonshire', lat: 34.2352, lng:-118.5360 },
    { id: '18', title: 'Southeast', lat: 33.9386, lng:-118.2487 },
    { id: '19', title: 'Mission', lat: 34.2723, lng:-118.4686 },
    { id: '20', title: 'Olympic', lat: 34.0560, lng:-118.2970 },
    { id: '21', title: 'Topanga', lat: 34.1926, lng:-118.6021 },
  ];






  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("Title");
  const [chartType, setChartType] = useState("pie");



  //////////////////////////////Options sidebar
  const [startOccurredDate, setStartOccurredDate] = useState(null);
  const [endOccurredDate, setEndOccurredDate] = useState(null);

  const [startReportedDate, setStartReportedDate] = useState(null);
  const [endReportedDate, setEndReportedDate] = useState(null);


  const [selectedDescentOptions, setSelectedDescentOptions] = useState([]);

  const handleSelectDescentChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedDescentOptions(selectedValues);
  };
  const [selectedStatusOptions, setSelectedStatusOptions] = useState([]);
  const handleSelectStatusChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedStatusOptions(selectedValues);
  };

  const [selectedCrimeOptions, setSelectedCrimeOptions] = useState([]);
  const handleSelectCrimeChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCrimeOptions(selectedValues);
  };
  const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
  const handleSelectLocationChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedLocationOptions(selectedValues);
  };

  const [dropdownOption, setDropdownOption] = useState('');
  const [selectedGenderOptions, setSelectedGenderOptions] = useState([]);
  const [radioOption, setRadioOption] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
  });

  const handleMultiSelectChange = (option) => {
    setSelectedGenderOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  //////////////////////////////Google maps
  const containerStyle = {
    width: '100%',
    height: '80vh'
  };

  const center = {
    lat: 34.052235,  // Set your desired latitude
    lng: -118.243683 // Set your desired longitude
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

  const UpdateData = () => {

  }

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
        {/* <button onClick={() => apiCall("SEX")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Victim Sex</button>
        <button onClick={() => apiCall("CRIME")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Line Crime</button>
        <button onClick={() => apiCall("RACE")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Victim Race</button>
        <button onClick={() => apiCall("STATUS")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Status</button> */}
















      {/* Search Bar */}
      {/* <div>
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search..."
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div> */}

      {/* Date Range Picker */}
      <div>
        <label className="text-sm font-medium">Date Crime Reported</label>
        <div className="flex space-x-2 mt-1">
          <DatePicker
            selected={startReportedDate}
            onChange={(date) => setStartReportedDate(date)}
            selectsStart
            startReportedDate={startReportedDate}
            endReportedDate={endReportedDate}
            placeholderText="Start Date"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <DatePicker
            selected={endReportedDate}
            onChange={(date) => setEndReportedDate(date)}
            selectsEnd
            startReportedDate={startReportedDate}
            endReportedDate={endReportedDate}
            placeholderText="End Date"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
      </div>
      {/* Date Range Picker */}
      <div>
        <label className="text-sm font-medium">Date Crime Occurred</label>
        <div className="flex space-x-2 mt-1">
          <DatePicker
            selected={startOccurredDate}
            onChange={(date) => setStartOccurredDate(date)}
            selectsStart
            startOccurredDate={startOccurredDate}
            endOccurredDate={endOccurredDate}
            placeholderText="Start Date"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <DatePicker
            selected={endOccurredDate}
            onChange={(date) => setEndOccurredDate(date)}
            selectsEnd
            startOccurredDate={startOccurredDate}
            endOccurredDate={endOccurredDate}
            placeholderText="End Date"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
      </div>
      {/* Gender Multi-select */}
      <div>
        <label className="text-sm font-medium">Victim Gender</label>
        <div className="flex flex-col mt-1">
          {['Male', 'Female', 'Unknown'].map((option) => (
            <label key={option} className="inline-flex items-center mt-1">
              <input
                type="checkbox"
                className="form-checkbox bg-gray-700 text-white"
                checked={selectedGenderOptions.includes(option)}
                onChange={() => handleMultiSelectChange(option)}
              />
              <span className="ml-2">{option}</span>
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
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="A">Asian</option>
          <option value="B">Black</option>
          <option value="C">Chinese</option>
          <option value="D">Cambodian</option>
          <option value="F">Filipino</option>
          <option value="G">Guamanian</option>
          <option value="H">Hispanic</option>
          <option value="I">American Indian</option>
          <option value="J">Japanese</option>
          <option value="K">Korean</option>
          <option value="L">Laotian</option>
          <option value="O">Other</option>
          <option value="P">Pacific Islander</option>
          <option value="S">Samoan</option>
          <option value="U">Hawaiian</option>
          <option value="V">Vietnamese</option>
          <option value="W">White</option>
          <option value="Z">Asian Indian</option>
          <option value="X">Unknown</option>
          </select>
      </div>
      {/* Status */}
      <div>
        <label className="text-sm font-medium">Status</label>
        <select
          multiple
          value={selectedStatusOptions}
          onChange={handleSelectStatusChange}
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="AA">Adult Arrest</option>
          <option value="IC">Invest Cont</option>
          <option value="AO">Adult Other</option>
        </select>
      </div>
      {/* Premis Type */}
      <div>
        <label className="text-sm font-medium">Crime Location</label>
        <select
          multiple
          value={selectedLocationOptions}
          onChange={handleSelectLocationChange}
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="AA">Adult Arrest</option>
          <option value="IC">Invest Cont</option>
          <option value="AO">Adult Other</option>
        </select>
      </div>
      {/* Crime Type */}
      <div>
        <label className="text-sm font-medium">Crime Type</label>
        <select
          multiple
          value={selectedCrimeOptions}
          onChange={handleSelectCrimeChange}
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="510,480,343,341">Theft</option>
          <option value="330">Burglary</option>
          <option value="624">Simple Assualt</option>
          <option value="821">Sexual Assualt</option>
          <option value="230">Aggravated Assualt</option>
          </select>
      </div>


      
      {/* Dropdown */}
      {/* <div>
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
      </div> */}



      {/* Radio Buttons */}
      {/* <div>
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
      </div> */}

      {/* Checkboxes */}
      {/* <div>
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
      </div> */}











        <button onClick={() => UpdateData()} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Update</button>






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
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 text-gray-700">
        {activeTab === 'tab1' && (
          <div>
            <div className="bg-white p-4 shadow rounded">
                <CanvasJSChart options = {options} 
                      // onRef={ref => this.chart = ref}
                      // containerProps={{ width: '100%', height: '300px' }} 
                    /> 
            </div>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-bold mb-4">Data List</h2>
              <ul className="list-disc pl-5 space-y-2">
                {dataPoints.map((item) => (
                  <li key={item.id} className="border border-gray-300 rounded p-2">
                    <strong>Status:</strong> {item.status}, <strong>Location:</strong> {item.lat}, {item.lng}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
              <LoadScriptNext googleMapsApiKey="AIzaSyD5aQjrqz7O84b1lSmYp0vUdwGfPxOT3kk">
               <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={handleMapLoad} // Ensure map is fully loaded before rendering markers
              >
                
                {
                LAAreas.map((area) => {(
                  <Marker key={area.id} position={{ lat: area.lat, lng: area.lng }} />
                )})
                }
              </GoogleMap>
              </LoadScriptNext>
          </div>
        )}
      </div>
    </div>










 
    </div>
  );
}

export default DataPage;
