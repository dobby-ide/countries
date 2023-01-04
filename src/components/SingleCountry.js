import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleCountry = ({ country, back }) => {
  const [result, setResult] = useState([]);
  const backButton = () => {
    back();
  };
  console.log(country);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );
      setResult(data);
    })();
  }, [country]);
  console.log(result);
  return (
    <div>
      <button onClick={backButton}>{'<'}</button>
      {result.map((country) => {
        return (
          <div className="single_country_container" key={country.name.common}>
            <div>{country.name.common}</div>
            <div>{country.capital}</div>
            <div>
              <img src={country.flags.png} alt="country flag"></img>
              <div>
                <p>
                  The country belongs to {country.continents} and{' '}
                  {country.subregion} subregion.
                </p>
                <p>
                  Located at the {country.latlng[0]} degree of longitude and{' '}
                  {country.latlng[1]} degree of latitude, this country has a
                  population of {country.population} and it is
                  {country.independent === true
                    ? ' independent'
                    : ' not independent'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SingleCountry;
