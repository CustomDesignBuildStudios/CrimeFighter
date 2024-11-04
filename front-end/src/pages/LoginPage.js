import React, { useState } from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import './LoginPage.css';
import CanvasJSReact from '@canvasjs/react-charts'; 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;






function LoginPage() {

  axios.post('http://localhost:8080/login',{password:'123',email:'1aaa@gmail.com'}).then((results) => {
    console.log(results);

  });


  return (
    <p>
     Login
    </p>

    
  );
}

export default LoginPage;
