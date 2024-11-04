import React, { useState } from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import './RegisterPage.css';
import CanvasJSReact from '@canvasjs/react-charts'; 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;






function RegisterPage() {

  axios.post('http://localhost:8080/register',{password:'123',email:'1aaa@gmail.com',firstName:'mike',lastName:'smith'}).then((results) => {
    console.log(results);

  });



  return (
    <p>
     Register
    </p>

    
  );
}

export default RegisterPage;
