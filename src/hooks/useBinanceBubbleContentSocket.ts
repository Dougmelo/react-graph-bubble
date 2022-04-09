import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export interface Coin {
  id: string;
  value: number;
}

interface Ticker {
  s: string;
  c: string;
  o: string;
}

interface BinanceSocket {
  connectionStatus: string;
  coinList: Coin[];
}



const useBinanceBubbleContentSocket = ():BinanceSocket => {
  const socketUrl = "wss://stream.binance.com:9443/ws/!miniTicker@arr"
  const [coinList, setCoinList] = useState<Coin[]>([
    { id: 'USDT', value: 5 },
  ]);

  const {lastMessage, readyState} = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if(lastMessage !== null){
      const tickers = JSON.parse(lastMessage.data);
      const usdtTickersFiltered = tickers.filter((ticker: Ticker) => 
        ticker.s.endsWith('USDT')
        && !/^.{2,}(DOWNUSDT|UPUSDT)$/.test(ticker.s)
      );
      
      let symbols: any = new Object();

      usdtTickersFiltered.map((ticker: Ticker) => 
        symbols[ticker.s] = (((parseFloat(ticker.c)*100)/parseFloat(ticker.o))-100));
      
      const newArrayCoin = Object.keys(symbols).map((symbol) => {
        return {
          id: symbol.replace('USDT', ''), value: symbols[symbol]
        }
      });

      const newArrayCoinFilteredAndSorted: Coin[] = newArrayCoin.filter(
        coin => Math.abs(coin.value) > 8
      ).sort();
        setCoinList(newArrayCoinFilteredAndSorted);
      }
  },[lastMessage])
 

  return {connectionStatus, coinList};
}

export default useBinanceBubbleContentSocket;