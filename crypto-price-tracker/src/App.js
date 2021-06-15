 import React , { useEffect  , useState } from 'react';
import axios from 'axios';
import Coin from './Coin';
import './main.css';

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {

const [coins , setCoins ] = useState([]);
const [search , setSearch ] = useState('');


useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  .then((res) => {
    setCoins(res.data);
    console.log(res);
  })
  .catch(err => console.log(err));
}, [])

const handleSearch = (e) => {
  setSearch(e.target.value);
} 

const filteredCoins = coins.filter(coin =>{
   return coin.name.toLowerCase().includes(search.toLowerCase());
}
)


  return (
    <div className="coin-app">
    <div className="coin-search">
    <h1 className="coin-text">Search a CryptoCurrency</h1>
    <form>
      <input placeholder="Search" type="text" className="coin-input" onChange={handleSearch}/>
    </form>
    </div>
    {filteredCoins.map(coin => {
     return <Coin key={coin.id}
      image={coin.image}
      name={coin.name} 
      symbol={coin.symbol}
      marketCap={coin.market_cap}
      price={coin.current_price}
      priceChange={coin.price_change_percentage_24h}
      volume={coin.total_volume} />
    })}
    </div>
  );
}

export default App;