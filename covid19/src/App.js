import "./App.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  // useEffect(() => {
  //   const getCountriesData = async () => {
  //     await fetch("https://disease.sh/v3/covid-19/countries")
  //       .then((response) => {
  //         response.json();
  //       })
  //       .then((data) => {
  //         const countries = data.map((country) => ({
  //           name: country.country,
  //           value: country.countryInfo.iso2,
  //         }));

  //         setCountries(countries);
  //       });
  //   };
  //   getCountriesData();
  // }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          // let sortedData = sortData(data);
          setCountries(countries);
          // setMapCountries(data);
          // setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onchangeCountry = (e) => {
    setCountry(e.target.value);
  };
  return (
    <div className="app">
      <div className="app__header"></div>
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onchangeCountry}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
          {/* <MenuItem value="asad">asad</MenuItem>
          <MenuItem value="asadq">asadq</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
