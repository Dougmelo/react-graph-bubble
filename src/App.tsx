import './App.css'
import BubbleChartComponent from './components/BubbleChartComponent'
import useBinanceBubbleContentSocket from './hooks/useBinanceBubbleContentSocket'


function App() {
  const { connectionStatus, coinList } = useBinanceBubbleContentSocket()
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grafico de bolhas com websocket - Cryptodev</h1>
        <div>
          <BubbleChartComponent data={coinList} />
        </div>
        <p>the connection is {connectionStatus}</p>
      </header>
    </div>
  )
  console.log("app: " + coinList)
}
console.log("saiuuuuuu: ")
export default App
