import React, {useState} from 'react'
import {weatherApp} from './Api'


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const getDate1 = (d) => {
    const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshaba']
    const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];

    const day = days[d.getDay()-1];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const date = d.getDate();

    return `${day} ${date} ${month} ${year} `
  }

  const search = async (e) =>{
    if(e.key === 'Enter'){
      const data = await weatherApp(query)
      setWeather(data)
      setQuery('')
      console.log(data);
    }
  }


  return (
    <div className={weather.main && weather.main.temp > 10 ?
     weather.main.temp > 10 && weather.main.temp < 20 ? 'app could': 
     weather.main.temp > 20 && weather.main.temp < 30? 'app cool' : 
     weather.main.temp > 30 && weather.main.temp < 35? 'app son' :
     weather.main.temp > 35 && weather.main.temp < 40? 'app quyosh':"app sovuq":'app'}>
      <div className="input-box">
        <input 
            value={query}
            onChange={e=>setQuery(e.target.value)}
            onKeyPress={search}
            placeholder="Search..."
             type="text"
              className="input"/>
      </div>
      {
        weather.main &&       <div className="content">
          <div className="date">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <h3>{getDate1(new Date())}</h3>
          </div>
          <div className="temp-card">
            <h1>{Math.round(weather.main.temp)} <sup>&deg;</sup> C</h1>
          </div>
          <h2>{weather.weather[0].description}</h2>
        </div>
      }

    </div>
  );
}

export default App;
