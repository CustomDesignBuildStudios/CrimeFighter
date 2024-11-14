import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
import CrimeModal from '../Components/CrimeModal';
import { useLocation } from 'react-router-dom';
import {MarkerF} from '@react-google-maps/api'


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function DataPage() {
  const location = useLocation();
  const [urlData, setURLData] = useState({type:"none"});

  useEffect(() => {
    // Monitor changes in location.state
    console.log(location.state?.data)
    if (location.state?.data) {
      setURLData(location.state.data);
    }
  }, [location.state]);



  const handleOrderChange = (event) => {
    setOrderBy(event.target.value); // Update state with selected value
  };

  const [options, setOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState("DATERPTD_DESC");
  const [activeTab, setActiveTab] = useState('LIST');
  const [mapData, setMapData] = useState({data:[]});
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("Title");
  const [chartType, setChartType] = useState("pie");
  const [chartByType, setChartByType] = useState("VICTSEX");



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState(null);

  const openModal = (crime) => {
    setSelectedCrime(crime);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCrime(null);
  };

  const handleSave = async (updatedCrime) => {
    // Save updated data (call API)
    await fetch(`/api/updateCrime/${updatedCrime.DR_NO}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCrime),
    });
    closeModal();
  };

  const handleDelete = async (drNo) => {
    // Delete data (call API)
    await fetch(`/api/deleteCrime/${drNo}`, { method: 'DELETE' });
    closeModal();
  };





















  useEffect(() => {
    console.log(listData)
  }, [listData]);
 
  useEffect(() => {
    LoadData();
  }, [activeTab, orderBy, chartByType, urlData]);

  

  const tabs = [
    { id: 'CHART', label: 'Graphs' },
    { id: 'LIST', label: 'List' },
    { id: 'MAP', label: 'Map' },
  ];

  const areaData = {
    '01':{ title: 'Central', lat: 34.0495, lng:-118.2477 },
    '02':{ title: 'Rampart', lat: 34.0690, lng:-118.2734 },
    '03':{ title: 'Southwest', lat: 34.0226, lng:-118.2887 },
    '04':{ title: 'Hollenbeck', lat: 34.0430, lng:-118.2112 },
    '05':{ title: 'Harbor', lat: 33.7397, lng:-118.2912 },
    '06':{ title: 'Hollywood', lat: 34.1015, lng:-118.3287 },
    '07':{ title: 'Wilshire', lat: 34.0594, lng:-118.3407 },
    '08':{ title: 'West Los Angeles', lat: 34.0524, lng:-118.4426 },
    '09':{ title: 'Van Nuys', lat: 34.1857, lng:-118.4489 },
    '10':{ title: 'West Valley', lat: 34.2011, lng:-118.5365 },
    '11':{ title: 'Northeast', lat: 34.1101, lng:-118.2096 },
    '12':{ title: '77th Street', lat: 33.9592, lng:-118.2915 },
    '13':{ title: 'Newton', lat: 34.0154, lng:-118.2468 },
    '14':{ title: 'Pacific', lat: 33.9932, lng:-118.4492 },
    '15':{ title: 'Narcotics', lat: 34.2011, lng:-118.3992 },
    '16':{ title: 'Foothill', lat: 34.2582, lng:-118.4196 },
    '17':{ title: 'Devonshire', lat: 34.2352, lng:-118.5360 },
    '18':{ title: 'Southeast', lat: 33.9386, lng:-118.2487 },
    '19':{ title: 'Mission', lat: 34.2723, lng:-118.4686 },
    '20':{ title: 'Olympic', lat: 34.0560, lng:-118.2970 },
    '21':{ title: 'Topanga', lat: 34.1926, lng:-118.6021 },
};

const descentData = {"A":"Asian","B":"Black","C":"Chinese","D":"Cambodian","F":"Filipino","G":"Guamanian","H":"Hispanic"
  ,"I":"American Indian","J":"Japanese","K":"Korean","L":"Laotian","O":"Other","P":"Pacific Islander"
  ,"S":"Samoan","U":"Hawaiian","V":"Vietnamese","W":"White","X":"Unknown","Z":"Asian Indian"
};
const genderData = {"M":"Male","F":"Female","U":"None","X":"Unknown"};
const ageData = {"0-20":"0-20","21-40":"21-40","41-60":"41-60","61-80":"61-80","81-100":"81-100","100+":"100+"};

const crimeTypeData = {
  'THEFT':'Theft',
  'ASSAULT':'Assault',
  'SEXUAL ASSAULT':'Sexual Assault',
  'EXTORTION':'Extortion',
  'RAPE':'Rape',
  'ARSON':'Arson',
  'OTHER':'Other',
  'THREATS':'Threats',

};

const statusData = {"AA":"Adult Arrest","IC":"Invest Cont","AO":"Adult Other"};
// const weaponsData =     {"105":"GUN","115":"GUN","122":"GUN","125":"GUN","108":"GUN","116":"GUN","120":"GUN","121":"GUN","123":"GUN","111":"GUN","118":"GUN","119":"GUN","117":"GUN","124":"GUN","110":"GUN","103":"GUN","102":"GUN","106":"GUN","104":"GUN","101":"GUN","114":"GUN","109":"GUN",
//   "516":"ANIMAL",
//   "307":"VEHICLE",
//   "400":"PHYSICAL",
//   "505":"EXPLOSIVE",
//   "301":"MELEE","200":"MELEE","305":"MELEE","205":"MELEE","215":"MELEE","223":"MELEE","217":"MELEE","214":"MELEE","209":"MELEE","308":"MELEE","207":"MELEE","211":"MELEE","213":"MELEE","210":"MELEE","219":"MELEE","514":"MELEE","202":"MELEE","221":"MELEE" };

const weaponsData = {
  'GUN':'Firearm',
  'ANIMAL':'Animal',
  'VEHICLE':'Vehicle',
  'PHYSICAL':'Physical Force',
  'EXPLOSIVE':'Explosives',
  'OTHER':'Other',
  'MELEE':'Melee Weapon',

};





  //////////////////////////////Options sidebar
  const [chartLabel, setChartLabel] = useState("{label} - {y}%");
  const [startOccurredDate, setStartOccurredDate] = useState(null);
  const [endOccurredDate, setEndOccurredDate] = useState(null);

  const [startReportedDate, setStartReportedDate] = useState(null);
  const [endReportedDate, setEndReportedDate] = useState(null);


  const [selectedWeaponOptions, setSelectedWeaponOptions] = useState([]);
  const handleSelectWeaponChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedWeaponOptions(selectedValues);
  };
  const [selectedAgeOptions, setSelectedAgeOptions] = useState([]);
  const handleSelectAgeChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedAgeOptions(selectedValues);
  };
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

  const [selectedGenderOptions, setSelectedGenderOptions] = useState([]);
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


 



  //////////////////////////////Server data
 

  useEffect(() => {
    // Update options when any dependencies change
    setOptions({
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: chartTitle
        },
        data: [{
          type: chartType,
          startAngle: 25,
          toolTipContent: chartLabel,
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: chartLabel,
          dataPoints: chartData
        }]
      
      
    });
  }, [chartTitle, chartType, chartLabel, chartData]);



  const LoadChart = (results) => {
    
    let total = 0;
    let columns = {"M":"Male","F":"Female","X":"Unknown","U":"None"};
    let columnValues = {};
    let targetColumn = "VICTSEX";

    if(chartByType == "AREANAME"){
      setChartLabel("{label} - {y}");
    }else{
      setChartLabel("{label} - {y}%");
    }

    if(chartByType == "VICTSEX"){
      setChartTitle( "Victims By Gender");
      setChartType("pie");
      targetColumn = "VICTSEX";
      columns = genderData;
    }
    else if(chartByType == "VICTAGE"){
      setChartType("pie");
      setChartTitle( "Victim by Age");

      targetColumn = "VICTAGE";
      columns = ageData;
    }
    else if(chartByType == "VICTDESCENT"){
      setChartType("pie");
      setChartTitle( "Victims By Descent");
      targetColumn = "VICTDESCENT";
      columns = descentData;
    }
    else if(chartByType == "AREANAME"){
      setChartType("pie");
      setChartTitle( "Crime By Area");
      targetColumn = "AREANAME";
      columns = areaData;
    }
    else if(chartByType == "STATUS"){
      setChartType("pie");
      setChartTitle( "Crime Report Status");
      targetColumn = "STATUS";
      columns = statusData;
    }
    else if(chartByType == "CRMCD"){
      setChartType("pie");
      setChartTitle( "Crime by type");

      targetColumn = "CRMCD";
      columns = crimeTypeData;
    }
    else if(chartByType == "WEAPONUSEDCD"){
      setChartType("pie");
      setChartTitle( "Weapons Used");

      targetColumn = "WEAPONUSEDCD";
      columns = weaponsData;
    }


    if(chartType == "pie"){
      let data = {};
      for (let index = 0; index < results.length; index++) {
        total+= results[index]['COLCOUNT'];
        console.log(results[index]["COLCOUNT"]);
        console.log(results[index]["LABEL"]);
        console.log(total);
      }
      for (let index = 0; index < results.length; index++) {
        data[results[index]['LABEL']] = {y:parseFloat(((results[index]['COLCOUNT']/total) * 100).toFixed(1)),label:columns[results[index]['LABEL']]}
      }
      console.log(data)
      setChartData(Object.values(data));
    }
    else if(chartType == "column"){

      let data = {};
      for (let index = 0; index < results.length; index++) {
        data[results[index]['LABEL']] = {y:results[index]['COLCOUNT'],label:results[index]['LABEL']}
      }
      console.log(results)
      console.log(data)
      setChartData(Object.values(data));

    }
    else if(chartType == "line"){
      let newData = [];
      results.sort((a, b) => a.LABEL - b.LABEL);

      for (let index = 0; index < results.length; index++) {
        newData.push({x:results[index]["LABEL"],y:results[index]["COLCOUNT"]})
      }

      setChartData(Object.values(newData));
    }


  }
  const LoadData = (page) => {
    const data = {
      isUser:urlData['type'],
      orderBy:orderBy,
      groupBy:chartByType,
      type:activeTab,
      page:page,
      amount:20,
      occDateStart:startOccurredDate,
      occDateEnd:endOccurredDate,
      rpDateStart:startReportedDate,
      rpDateEnd:endReportedDate,
      descent:selectedDescentOptions,
      age:selectedAgeOptions,
      weapon:selectedWeaponOptions,
      status:selectedStatusOptions,
      crime:selectedCrimeOptions,
      premis:selectedLocationOptions,
      gender:selectedGenderOptions
    };

    
    axios.post('http://localhost:8080/general-data',data).then((results) => {


      console.log(results.data);
      // let total = 0;
      setListData(results.data['results']);

      if(results.data['type'] == "LIST"){

      }
      else if(results.data['type'] == "MAP"){
        let min = 9999999;
        let max = 0;
        for (let index = 0; index < results.data['results'].length; index++) {
          if(results.data['results'][index]['CRIMECOUNT'] > max){
            max = results.data['results'][index]['CRIMECOUNT'];
          }
          if(results.data['results'][index]['CRIMECOUNT'] < min){
            min = results.data['results'][index]['CRIMECOUNT'];
          }
          
        }
        setMapData({min:min,max:max,data:results.data['results']});

      }
      else if(results.data['type'] == "CHART"){
        LoadChart(results.data['results']);

      }



     
  
    })
  }


  return (


    <div className="flex">
      <div className="w-124 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        {/* <button onClick={() => apiCall("SEX")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Victim Sex</button>
        <button onClick={() => apiCall("CRIME")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Line Crime</button>
        <button onClick={() => apiCall("RACE")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Victim Race</button>
        <button onClick={() => apiCall("STATUS")} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2">Pie Status</button> */}










      {/* Date Crime Reported Range Picker */}
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
      {/* Date Crime Occurred Range Picker */}
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
          {Object.entries(genderData).map(([key, value]) => (
            <label key={key} className="inline-flex items-center mt-1">
              <input
                type="checkbox"
                className="form-checkbox bg-gray-700 text-white"
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
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          {Object.entries(descentData).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
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
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          {Object.entries(ageData).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
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
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          {Object.entries(statusData).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
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
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
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
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          {Object.entries(crimeTypeData).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
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
          className="mt-1 w-full p-2 rounded bg-gray-700 text-white"
        >
          {Object.entries(weaponsData).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
          </select>
      </div>



      {/* Update Filter */}
      <button onClick={() => LoadData(0)} className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 mb-2 mt-2">Update</button>
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
        {activeTab === 'CHART' && (
          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-100 p-4 flex flex-col">
              <h2 className="text-xl font-bold mb-4">Types</h2>
              <button onClick={() => setChartByType("VICTSEX")} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Gender</button>
              <button onClick={() => setChartByType("VICTAGE")} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Age</button>
              <button onClick={() => setChartByType("VICTDESCENT")} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Descent</button>
              <button onClick={() => setChartByType("CRMCD")} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Crime</button>
              <button onClick={() => setChartByType("STATUS")} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Status</button>
              <button onClick={() => setChartByType("AREANAME")} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Area</button>
              <button onClick={() => setChartByType("WEAPONUSEDCD")} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Weapon Used</button>
            </div>

            {/* Chart Container */}
            <div className="w-3/4 p-4 flex flex-col">
              <div className="bg-white p-4 shadow rounded">
                <CanvasJSChart options={options} />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'LIST' && (
          <div>
            <div className="bg-white p-4 shadow rounded">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Data List</h2>
                
                <div className="ml-4 flex items-center">
                  <label htmlFor="orderBy" className="mr-2">Order By:</label>
                  <select 
                    id="orderBy" 
                    value={orderBy} 
                    onChange={handleOrderChange} 
                    className="p-2 border rounded"
                  >
                    <option value="DATERPTD_ASC">Newest First</option>
                    <option value="DATERPTD_DESC">Oldest First</option>
                  </select>
                </div>
              </div>

              <ul className="list-none pl-5 space-y-2">
                {listData.map((item) => (
                  <li key={Math.random()} className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow">

<div>
      <h3 className="text-lg font-semibold">{item['DR_NO']}</h3>
      <p className="text-sm text-gray-600">{item['CRMCDDESC']} | {item['AREANAME']} | {new Date(item['DATETIMEOCC']).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}</p>
    </div>
    <button
                              onClick={() =>
                                openModal(item)
                              }
    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
    View
    </button>
 



                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                {/* <button
                  onClick={() => LoadMoreData()}
                  className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 mb-2 mt-2"
                >
                  Load More
                </button> */}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'MAP' && (
          <div>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              >
                {
                  mapData['data'].map((area) => (
                    <MarkerF 
                      key={area.AREA} 
                      position={{ lat: areaData[area.AREA].lat, lng: areaData[area.AREA].lng }} 
                      icon={{
                        url: './circle.png', // Set the custom icon
                        scaledSize: new window.google.maps.Size(60 * (area.CRIMECOUNT / mapData['max']), 60 * (area.CRIMECOUNT / mapData['max'])) // Resize the icon (optional)
                      }}
                    />
                  ))
                }
              </GoogleMap>
          </div>
        )}
      </div>
    </div>







                        {/* Modal */}
                        {isModalOpen && (
                          <CrimeModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            crimeData={selectedCrime}
                            onSave={handleSave}
                            onDelete={handleDelete}
                          />
                        )}


 
    </div>
  );
}

export default DataPage;
