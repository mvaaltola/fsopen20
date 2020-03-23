import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countrylist from './components/countrylist'

function App() {
  const [filtertext, setFiltertext] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleFiltertextChange = (event) => setFiltertext(event.target.value)

  useEffect(() => {
    let c = countries.filter(country => country.name.toLowerCase().includes(filtertext.toLowerCase()))
    setFilteredCountries(c)
  }, [countries, filtertext])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])
  return (
    <div className="App">
      find countries <input
        value={filtertext}
        onChange={handleFiltertextChange} />
      <Countrylist
        countries={filteredCountries}
        setFiltertext={setFiltertext} />
    </div>
  );
}

export default App;
