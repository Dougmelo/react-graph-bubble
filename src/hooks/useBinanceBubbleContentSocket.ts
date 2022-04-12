import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import axios, { Axios, AxiosResponse } from 'axios';

const lastMessage = await axios.get("https://api.binance.com/api/v3/ticker/price")
export interface Coin {
  price: string;
  symbol: string;
}
interface Ticker {
  price: string
  symbol: string
}
interface BinanceSocket {
  connectionStatus: string;
  coinList: Coin[];
}

const useBinanceBubbleContentSocket = (): BinanceSocket => {

  const socketUrl = "wss://stream.binance.com:9443/ws/!miniTicker@arr"

  const [coinList, setCoinList] = useState<Coin[]>([
    { price: "123456", symbol: 'USDT' },
  ]);

  const { readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {

    const coins: Coin[] = lastMessage.data

    const BTCUSDT: Coin[] = coins.filter(
      coin => coin.symbol == "BTCUSDT"
    );

    const BTCEUR: Coin[] = coins.filter(
      coin => coin.symbol == "BTCEUR"
    );

    const BTCGBP: Coin[] = coins.filter(
      coin => coin.symbol == "BTCGBP"
    );

    const allSymbols: Coin[] = [];

    allSymbols.push(BTCUSDT[0]);
    allSymbols.push(BTCEUR[0]);
    allSymbols.push(BTCGBP[0]);

    setCoinList(allSymbols);
  }, [lastMessage])

  return { connectionStatus, coinList };
}

export default useBinanceBubbleContentSocket;






