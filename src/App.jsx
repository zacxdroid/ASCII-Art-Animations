import './App.css'
import AsciiCanvas from './components/AsciiCanvas'

import iconImport from './assets/images/icon-import.png'

function App() {

  return (

    <section className='w-full min-h-screen px-4 sm:px-8 md:px-12 flex justify-center items-center overflow-hidden flex-col'>
      
      <header className='flex w-full max-w-4xl flex-row items-center justify-between text-white px-6 py-4'>
        <h1 className="text-sm font-medium uppercase tracking-widest">
          ZACXDROID
        </h1>
        <h1 className="text-6xl font-bold leading-none tracking-tighter">
          ASCII
        </h1>
      </header>

      <main className='w-full max-w-4xl'>
        <AsciiCanvas/>
      </main>

      <footer className='w-full max-w-4xl grid grid-cols-[1fr_3fr] mt-1.5'>
          <div className='border border-black flex justify-center'>
            <img src={iconImport} className='object-contain cursor-pointer'/>
          </div>

          <p className='border border-black'>lol</p>
      </footer>
    </section>


  )
}

export default App
