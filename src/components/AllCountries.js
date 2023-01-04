import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VariableSizeList as List } from 'react-window';
import Search from './Search';

const AllCountries = ({ selectCountry }) => {
  const [oldResult, setOldResult] = useState([]);
  const [result, setResult] = useState([]);

  const setChosenCountry = (countryName) => {
    selectCountry(countryName);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://restcountries.com/v3.1/all');
      setResult(data);
      setOldResult(data);
    })();
  }, []);
  const onFilteringResults = (resulting) => {
    setResult(resulting);
  };
  const renderedLanguages = result.map((language) => {
    let officialLanguage = [];
    for (let i in language.languages) {
      officialLanguage.push(language.languages[i]);
    }
    return officialLanguage;
  });
  console.log(renderedLanguages);
  const filteredResult = result.map((res, index) => {
    return (
      <div className="container" key={res.name.official}>
        <div className="image flags">
          <img className="flag" src={res.flags.png} alt="flag" />
        </div>
        <div className="country name">{res.name.common}</div>
        <div className="country region">{res.region}</div>
        <div className="country population">{res.population}</div>
        <div className="country language">
          {renderedLanguages[index].map((lang) => {
            return (
              <div className="languages" key={lang}>
                {lang}
              </div>
            );
          })}
        </div>
        <div className="goto_button">
          <button onClick={() => setChosenCountry(res.name.official)}>
            {'>'}
          </button>
        </div>
      </div>
    );
  });
  const rowHeights = new Array(251).fill(true).map(() => 150);

  const getItemSize = (index) => rowHeights[index];

  const Row = ({ index, style }) => (
    <div style={style}>{filteredResult[index]}</div>
  );

  const Example = () => (
    <List height={1200} itemCount={250} itemSize={getItemSize} width={1400}>
      {Row}
    </List>
  );

  return (
    <div>
      <Search result={oldResult} back={onFilteringResults}></Search>
      <div className="columnames_container">
        <div className="columnames flag">FLAG</div>
        <div className="columnames name">NAME</div>
        <div className="columnames region">REGION</div>
        <div className="columnames population">POPULATION</div>
        <div className="columnames language">LANGUAGE</div>
      </div>
      <Example />
    </div>
  );
};

export default AllCountries;
