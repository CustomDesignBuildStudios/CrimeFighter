import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function AdvanceQueryPage() {


  //////////////////////////////Server data
  // const options = {
  //   theme: "light2", // "light1", "light2", "dark1", "dark2"
  //   exportEnabled: true,
  //   animationEnabled: true,
  //   title: {
  //     text: chartTitle
  //   },
  //   data: [{
  //     type: chartType,
  //     startAngle: 25,
  //     toolTipContent: "<b>{label}</b>: {y}%",
  //     showInLegend: "true",
  //     legendText: "{label}",
  //     indexLabelFontSize: 16,
  //     indexLabel: "{label} - {y}%",
  //     dataPoints: chartData
  //   }]
  // };

  



  const LoadChart = () => {

    // let total = 0;
    // let columns = {"M":"Male","F":"Female","X":"Unknown","U":"None"};
    // let columnValues = {};
    // let targetColumn = "VICTSEX";
    // if(chartByType == "GENDER"){
    //   setChartTitle( "Victims By Gender");
    //   setChartType("pie");
    //   targetColumn = "VICTSEX";
    //   columns = genderData;
    // }
    // else if(chartByType == "AGE"){
    //   setChartType("line");
    //   setChartTitle( "Victim by Age");

    //   targetColumn = "VICTAGE";
    //   columns = {"X":"Age","Y":"Number"};
    // }
    // else if(chartByType == "DESCENT"){
    //   setChartType("pie");
    //   setChartTitle( "Victims By Descent");
    //   targetColumn = "VICTDESCENT";
    //   columns = descentData;
    // }
    // else if(chartByType == "STATUS"){
    //   setChartType("pie");
    //   setChartTitle( "Crime Report Status");
    //   targetColumn = "STATUS";
    //   columns = statusData;
    // }
    // else if(chartByType == "CRIME"){
    //   setChartType("line");
    //   setChartTitle( "Line Chart - Crime by year");

    //   targetColumn = "VICTSEX";
    //   columns = {"M":"Male","F":"Female","U":"None","X":"Unknown"};
    // }
    // else if(chartByType == "WEAPON"){
    //   setChartType("bar");
    //   setChartTitle( "Weapons Used");

    //   targetColumn = "WeaponUsedCd";
    //   columns = {"M":"Male","F":"Female","U":"None","X":"Unknown"};
    // }

    // if(chartType == "pie" || chartType == "bar"){
    //   for (let index = 0; index < results.length; index++) {
    //     console.log(results[index]);
    //     if(results[index][targetColumn] == null)results[index][targetColumn] = "U";
  
    //     if (results[index][targetColumn] in columnValues) {
    //       columnValues[results[index][targetColumn]]++;
    //     }else{
    //       columnValues[results[index][targetColumn]]=1;
    //     }
    //     total++;
    //     console.log(results[index][targetColumn]);
    //     console.log(columnValues);
  
    //   }
    //   let data = {};
    //   for (const key in columnValues) {
    //     if (columnValues.hasOwnProperty(key)) { 
    //       data[key] = {y:(columnValues[key]/total) * 100,label:columns[key]}
    //     }
    //   }
    //   setChartData(Object.values(data));
    // }
    // else if(chartType == "line"){
    //   let data = [  { x: 18, y: 5 },
    //     { x: 20, y: 15 },
    //     { x: 22, y: 9 },
    //     { x: 25, y: 12 },
    //     { x: 28, y: 7 },
    //     { x: 30, y: 10 },
    //     { x: 35, y: 20 }];
    //   // for (let index = 0; index < results.length; index++) {

    //   // }
    //   // for (const key in columnValues) {
    //   //   if (columnValues.hasOwnProperty(key)) { 
    //   //     data.push({x:,y:})
    //   //   }
    //   // }
    //   setChartData(Object.values(data));
    // }


  }
  const LoadData = () => {
  
    axios.get('http://localhost:8080/advance/area-density').then((results) => {


      console.log(results.data);
    
     
  
    })
  }
  LoadData();


  return (


    <div>

 
    </div>
  );
}

export default AdvanceQueryPage;
