import React, { useState } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import './DataPage.css';
import CanvasJSReact from '@canvasjs/react-charts'; 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;






function DataPage() {
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("Title");
  const [chartType, setChartType] = useState("pie");

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
    <div className="App">
      <header className="App-header">

        <button onClick={() => apiCall("SEX")}>Pie Victim Sex</button>
        <button onClick={() => apiCall("CRIME")}>Line Crime</button>
        <button onClick={() => apiCall("RACE")}>Pie Victim Race</button>
        <button onClick={() => apiCall("STATUS")}>Pie Status</button>

        
        
      </header>


      <div>
        <CanvasJSChart options = {options} 
          /* onRef={ref => this.chart = ref} */
          /* containerProps={{ width: '100%', height: '300px' }} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

      </div>


    </div>

    
  );
}

export default DataPage;
