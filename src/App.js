import { useState } from 'react';
import './App.css';
import AllCountries from './components/AllCountries';
import SingleCountry from './components/SingleCountry';
function App() {
  const [country, setCountry] = useState();
  const back = () => {
    setCountry(null);
  };
  const onSelectedCountry = (country) => {
    setCountry(country);
  };
  return (
    <div className="App">
      {!country ? (
        <AllCountries selectCountry={onSelectedCountry} />
      ) : (
        <SingleCountry country={country} back={back} />
      )}
    </div>
  );
}

export default App;
