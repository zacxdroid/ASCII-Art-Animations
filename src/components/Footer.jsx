import { useState } from 'react'
import PresetOption from './PresetOption'
import iconImport from '../assets/images/icon-import.png'

const PRESETS = [
  { id: 'quart', label: 'quart'},
  { id: 'dna', label: 'DNA  Helix'},
  { id: 'sonar', label: 'Sonar'},
]

const Footer = ({ onSelectEffect, onUploadTxt, onUploadScript}) => {
  const [activePreset, setActivePreset] = useState(PRESETS[0].id)

  const handlePresetClick = (id) => {
    setActivePreset(id)
    if (onSelectEffect) onSelectEffect(id)
  } 

  const handleTxtChange = (e) => {
    const file = e.target.files[0]
    if (file && onUploadTxt) onUploadTxt(file)
  }

  const handleScriptChange = (e) => {
    const file = e.target.files[0]
    if (file && onUploadScript) onUploadScript(file)
  }
  return(
    <footer className='w-full max-w-4xl grid grid-cols-[1fr_3fr] mt-2 bg-[#313131] border border-black overflow-hidden rounded-xl'>
      
      <section className='border-r border-black flex flex-col justify-center items-center gap-3 p-3 bg-[#262626]'>
        <label className='w-full flex items-center justify-between px-4 py-2 bg-[#c6c6c6] text-black text-sm font-bold rounded-sm cursor-pointer hover:bg-[#b0b0b0] transition-colors'>
          <span>.txt</span>
          <img src={iconImport} alt="Import ASCII file" className='h-4 w-4 object-contain opacity-80'/>
          <input type="file" accept='.txt' onChange={handleTxtChange} className='hidden'/>
        </label>

        <label className='w-full flex items-center justify-between px-4 py-2 bg-[#c6c6c6] text-black text-sm font-bold rounded-sm cursor-pointer hover:bg-[#b0b0b0] transition-colors'>
          <span>Your Script</span>
          <img src={iconImport} alt="Import ASCII file" className='h-4 w-4 object-contain opacity-80'/>
          <input type="file" accept='.js,.ts' onChange={handleScriptChange} className='hidden'/>
        </label>
      </section>

      <section className='flex items-center overflow-x-auto p-2 gap-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent'>
        {PRESETS.map((preset) => (
          <PresetOption key={preset.id} label={preset.label} isActive={activePreset === preset.id} onClick={() => handlePresetClick(preset.id)}/>
        ))}
      </section>
    </footer>
  )
}

export default Footer