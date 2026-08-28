import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Counter from './Counter'
import './App.css'

function App() {
  return (
    <main>
      <div className="hero">
        <img src={viteLogo} className="vite" alt="Vite logo" />
        <img src={reactLogo} className="framework" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <Counter />
      <p>
        Edit <code>src/Counter.jsx</code> and save to test HMR
      </p>
    </main>
  )
}

export default App
