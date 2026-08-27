import './App.css'
import AsciiCanvas from './components/AsciiCanvas'
import Footer from './components/Footer'

import patternLeft from './assets/images/pattern-left.png'
import patternRight from './assets/images/pattern-right.png'

import bg1 from './assets/images/bg1.jpg'
import bg2 from './assets/images/bg2.jpg'


function App() {

  return (

    <section className='relative w-full min-h-screen px-4 sm:px-8 md:px-12 flex justify-center items-center overflow-hidden flex-col'>
      
      <img src={patternLeft} className='absolute top-0 left-0 h-full max-w-[48%] object-cover object-left opacity-6 -z-10 pointer-events-none mix-blend-plus-lighter'/>
      <img src={patternRight} className="absolute top-0 right-0 h-full max-w-[48%] object-cover object-right opacity-6 -z-10 pointer-events-none mix-blend-plus-lighter"/>
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-25 mix-blend-plus-darker bg-repeat-x bg-right-top bg-[length:auto_100%]"
        style={{ backgroundImage: `url(${bg1})` }} />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-4 mix-blend-plus-darker bg-repeat-x bg-right-top bg-[length:auto_100%]"
        style={{ backgroundImage: `url(${bg2})` }} />

      <header className='flex w-full max-w-4xl flex-row items-center justify-between text-white px-6 py-4'>
        <h1 className="text-white/80 text-sm font-medium uppercase tracking-widest">
          ZACXDROID
        </h1>
        <h1 className="text-6xl font-bold leading-none tracking-tighter">
          ASCII
        </h1>
      </header>

      <main className='w-full max-w-4xl'>
        <AsciiCanvas/>
      </main>

      <Footer/>

    </section>


  )
}

export default App
