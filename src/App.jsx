import './App.css'
import AsciiCanvas from './components/AsciiCanvas'

function App() {

  return (
    <div className='main-container'>

      <header>
        <div className='flex justify-around text-white'>
          <h3>ZACXDROID</h3>
          <h1>ASCII</h1>
        </div>
      </header>

      <main>
        <AsciiCanvas/>
      </main>

      <footer>
        
      </footer>

    </div>
  )
}

export default App
