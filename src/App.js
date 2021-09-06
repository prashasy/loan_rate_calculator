import { useState } from 'react';
import './App.css';
import Data from './data/data.json'

const tenureMapping = {
  "ON": 0,
  "1W": 7,
  "2W": 14,
  "1M": 30,
  "2M": 60,
  "3M": 90,
  "6M": 180,
  "9M": 270,
  "1y": 365
}


const App = () => {
  const [breakPoint, setBreakPoint] = useState('ON');
  const [loanTenure, setLoanTenure] = useState('ON');
  const handleLoanTenureChange = (e) => {
    setLoanTenure(e.target.value);
  }
  const handleBreakPointChange = (e) => {
    setBreakPoint(e.target.value);
  }
  const getTotalTenure = () => {
    const totalDays = tenureMapping[loanTenure] + tenureMapping[breakPoint];
    if (totalDays === 0)
      return "ON"
    if (totalDays <= 7)
      return "1W"
    if (totalDays <= 14)
      return "2W"
    if (totalDays <= 30)
      return "1M"
    if (totalDays <= 60)
      return "2M"
    if (totalDays <= 90)
      return "3M"
    if (totalDays <= 180)
      return "6M"
    if (totalDays <= 270)
      return "9M"
    if (totalDays <= 365)
      return "1Y"
  }
  const getEffectiveCost = () => {
    const totalTenure = getTotalTenure();
    const loanCost = Data.rates[totalTenure].loan * (tenureMapping[totalTenure] / 365);
    const depositEarning = Data.rates[breakPoint].deposit * (tenureMapping[breakPoint] / 365);
    return (loanCost - depositEarning).toFixed(2);
  }
  return (
    <div className="container">
      <p>Duration of the loan: </p>
      <select value={loanTenure} onChange={handleLoanTenureChange}>
        <option value="ON">ON</option>
        <option value="1W">1W</option>
        <option value="2W">2W</option>
        <option value="1M">1M</option>
        <option value="2M">2M</option>
        <option value="3M">3M</option>
        <option value="6M">6M</option>
        <option value="9M">9M</option>
        <option value="1Y">1Y</option>
      </select>
      <p>Duration beween now and when the loan is required: </p>
      <select value={breakPoint} onChange={handleBreakPointChange}>
        <option value="ON">ON</option>
        <option value="1W">1W</option>
        <option value="2W">2W</option>
        <option value="1M">1M</option>
        <option value="2M">2M</option>
        <option value="3M">3M</option>
        <option value="6M">6M</option>
        <option value="9M">9M</option>
        <option value="1Y">1Y</option>
      </select>

      <p>
        For a loan of duration <span className="tenureText">{loanTenure}</span><br />
        that starts <span className="tenureText">{breakPoint}</span> from now,<br />
        the cost of the loan would be  <span className="tenureText">{getEffectiveCost()}% </span> of the principal.
      </p>

    </div>
  )
}





export default App;
