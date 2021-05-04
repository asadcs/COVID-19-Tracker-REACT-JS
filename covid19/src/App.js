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
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

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
    const url = "https://disease.sh/v3/covid-19/all";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
          setTableData(data);

          console.log("Table Countries data");
          console.table(tableData);
          // setMapCountries(data);
          // setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onchangeCountry = async (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onchangeCountry}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              {/* <MenuItem value="asad">asad</MenuItem>
          <MenuItem value="asadq">asadq</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            // onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            // active={casesType === "cases"}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            // onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            // active={casesType === "recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            // onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            // active={casesType === "deaths"}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map>I am a map</Map>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>

          <Table countries={tableData} />
          <h3>Worldwide new Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
