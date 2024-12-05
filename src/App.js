import './App.css';
import {useEffect} from "react";
import { useState  } from 'react';

function App() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const [selCountry, setSelCountry] =useState("");
  const [selState, setSelState] =useState("");
  const [selCity, setSelCity] =useState("");
  useEffect(
    ()=>{
fetch("https://crio-location-selector.onrender.com/countries").then(res=>res.json()).then(data=>setCountries(data));
    },[]
  );

  useEffect(
    ()=>{
fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/states`).then(res=>res.json()).then(data=>setStates(data));
    },[selCountry]
  );

  useEffect(
    ()=>{
fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`).then(res=>res.json()).then(data=>setCities(data));
    },[selCountry, selState]
  );
  console.log(countries);
  return (
    <div>
     <select name="country" id="country" value={selCountry} onChange={(e)=>setSelCountry(e.target.value)} >
{countries.map((country)=>(<option >{country}</option>))}
     </select>

     <select name="country" id="country" value={selState} onChange={(e)=>setSelState(e.target.value)} >
      <option>Select State</option>
{states.map((country)=>(<option >{country}</option>))}
     </select>

     <select name="country" id="country" value={selCity} onChange={(e)=>setSelCity(e.target.value)} >
      <option>Select City</option>
{cities.map((country)=>(<option >{country}</option>))}
     </select>

    <h1>{`You Selected ${selCity}, ${selState}, ${selCountry}`}</h1>
    </div>
  );
}

export default App;
