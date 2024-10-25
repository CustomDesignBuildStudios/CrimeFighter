import React, { useState } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import './DataPage.css';
import CanvasJSReact from '@canvasjs/react-charts'; 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;






function DataPage() {
  const [chartData, setChartData] = useState([]);
  const options = {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Crime By Victim Gender"
    },
    data: [{
      type: "pie",
      startAngle: 25,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: chartData
    }]
  };



  const apiCall = () => {
    axios.get('http://localhost:8080').then((results) => {
  
      let female = 0;
      let male = 0;
      let unknown = 0;
  
      for (let index = 0; index < results.data.length; index++) {
        const element = results.data[index];
        if(element['VICTSEX'] == 'M')male++;
        else if(element['VICTSEX'] == 'F')female++;
        else unknown++;
      }
      let total = female + male + unknown;
  
 
  
      setChartData([
        { y: (female / total) * 100, label: "Female" },
        { y: (male / total) * 100, label: "Male" },
        { y: (unknown / total) * 100, label: "Unknown" }
      ]);
  
    })
  }




  return (
    <div className="App">
      <header className="App-header">

        <button onClick={apiCall}>Make API Call 2</button>

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
