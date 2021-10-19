import './App.css';
import Table from './Table';



function Active() {
  function createData(symbol,side,avgPrice,pnl) {
    return { symbol, side, avgPrice, pnl};
  }
  const positions = [
    createData('BANKNIFTY2191836500','Buy',176.4,-242.93),
    createData('BANKNIFTY2291836500','Buy',176.4,-4242.32),
    createData('BANKNIFTY2391836500','Buy',43.4,-42.32),
    createData('BANKNIFTY2491836500','Buy',174.3,-423.32),
    createData('BANKNIFTY2591836500','Sell',176.4,-535.32),
    createData('BANKNIFTY2691836500','Sell',176.4,-424.42),
    createData('BANKNIFTY2791836500','Sell',32.3,-909.53),
    createData('BANKNIFTY2891836500','Sell',176.4,-43.53),
    createData('BANKNIFTY2991836500','Sell',234.4,-794.5),
  ]
  return (
    <div className="Active">
     <Table data={positions} title="hurray got it"/>
     <br/>
    </div>
  );
}

export default Active;
