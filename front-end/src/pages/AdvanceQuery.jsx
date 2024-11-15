import { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
import GenderTimeQuery from '../Components/GenderTime'
import AreaTimeQuery from '../Components/AreaTime'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function AdvanceQueryPage() {



  return (


    <div>
      <GenderTimeQuery />
      <AreaTimeQuery />
 
    </div>
  );
}

export default AdvanceQueryPage;
