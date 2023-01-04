import React, { useState, useEffect } from 'react';

const Search = ({ result, back }) => {
  const [term, setTerm] = useState('');
  console.log(result);
  const filteredResult = result.filter(({ name }) =>
    name.common.toLowerCase().includes(term.toLowerCase())
  );
  useEffect(() => {
    back(filteredResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter search term:</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
    </div>
  );
};
export default Search;
