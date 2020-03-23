import React from 'react';

const Countrylist = ({countries, setFiltertext}) => {

  const showCountry = (country) => {
    return(() => {
      setFiltertext(country.name)
    })
  }

  if (countries.length > 10) {
    return (
      <div>Too many matches, please specify another filter</div>
    )
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country,i) => {
          return(
            <li key={country.name}>
              {country.name}
              <button onClick={showCountry(country)}>show</button>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.name}>
              <h1>{country.name}</h1>
              <div>capital {country.capital}</div>
              <div>population {country.population}</div>
              <h2>languages</h2>
              <ul>
                {country.languages.map(language => {
                  return (
                    <li key={language.iso639_2}>{language.name}</li>
                  )
                })}
              </ul>
              <img
                src={country.flag}
                alt={country.name}
                style={{maxWidth: 300 + 'px'}}>
              </img>
            </div>
          )
        })}
      </div>
    )
  }


};

export default Countrylist;