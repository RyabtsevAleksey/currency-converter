import React from "react";
import { Block } from "./Block.jsx";

function App() {
  const [rates, setRates] = React.useState({});

  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");

  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  React.useEffect(() => {
    fetch("https://cdn.cur.su/api/latest.json")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
        console.log(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    // console.log(value)
    setFromPrice(value);
    setToPrice(result);
  };

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value
    setFromPrice(result);
    setToPrice(value);
    // console.log(value)
  };

  return (
    <div className="App">
      <Block
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        value={fromPrice}
        onChangeValue={onChangeFromPrice}
      />
      <Block 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        value={toPrice}
        onChangeValue={onChangeToPrice}
        />
    </div>
  );
}

export default App;
