import { use, useState } from 'react'
import PresetOption from './PresetOption'
import iconImport from '../assets/images/icon-import.png'

import { EFFECT_CONFIGS } from '../constants/effects'

const Footer = ({ onSelectEffect, onUploadTxt, onUploadScript, onExportPNG, onExportWebM, isRecording }) => {
  const [activePreset, setActivePreset] = useState(EFFECT_CONFIGS[0].id)
  const [videoDuration, setVideoDuration] = useState(3)

  const handlePresetClick = (id) => {
    setActivePreset(id)
    if (onSelectEffect) onSelectEffect(id)
  } 

  const handleTxtChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== "text/plain") {
      alert("Please, just upload .txt files")
      return
    }
    if (file && onUploadTxt) onUploadTxt(file)
    e.target.value = null
  }

  const handleScriptChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file && onUploadScript) onUploadScript(file)
    e.target.value = null
  }
  return(
      <footer className='w-full max-w-4xl flex mt-2 bg-[#313131] border border-black overflow-hidden rounded-xl'>
      
      <section className='border-r border-black flex flex-col justify-center items-center gap-3 p-3 bg-[#262626] min-w-[140px]'>
        <label className='w-full flex items-center justify-between px-4 py-2 bg-[#c6c6c6] text-black text-sm font-bold rounded-sm cursor-pointer hover:bg-[#b0b0b0] transition-colors'>
          <span>.txt</span>
          <img src={iconImport} alt="Import ASCII file" className='h-4 w-4 object-contain opacity-80'/>
          <input type="file" accept='.txt' onChange={handleTxtChange} className='hidden'/>
        </label>

        <label className='w-full flex items-center justify-between px-4 py-2 bg-[#c6c6c6] text-black text-sm font-bold rounded-sm cursor-pointer hover:bg-[#b0b0b0] transition-colors'>
          <span>Script</span>
          <img src={iconImport} alt="Import Script file" className='h-4 w-4 object-contain opacity-80'/>
          <input type="file" accept='.js,.ts' onChange={handleScriptChange} className='hidden'/>
        </label>
      </section>

      <section className='flex-1 flex items-center overflow-x-auto p-2 gap-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent'>
        {EFFECT_CONFIGS.map((preset) => (
          <PresetOption key={preset.id} label={preset.label} isActive={activePreset === preset.id} onClick={() => handlePresetClick(preset.id)}/>
        ))}
      </section>

      <section className='border-l border-black flex flex-col justify-center items-center gap-2 p-3 bg-[#262626] min-w-[140px]'>
        <button 
          disabled={isRecording} 
          onClick={onExportPNG} 
          className="w-full flex items-center justify-center px-4 py-1.5 bg-[#c6c6c6] text-black text-xs font-bold rounded-sm hover:bg-[#b0b0b0] transition-colors disabled:cursor-not-allowed">
          PNG
        </button>
        
        <div className="flex w-full gap-1.5 h-[28px]">
          <select 
            disabled={isRecording} 
            value={videoDuration} 
            onChange={(e) => setVideoDuration(Number(e.target.value))} 
            className="bg-[#121212] text-xs font-mono text-white/80 border border-black rounded-sm px-1 outline-none disabled:opacity-50 cursor-pointer">
            <option value={3}>3s</option>
            <option value={5}>5s</option>
            <option value={8}>8s</option>
            <option value={10}>10s</option>
          </select>
          
          <button 
            disabled={isRecording} 
            onClick={() => onExportWebM(videoDuration)} 
            className="flex-1 flex items-center justify-center px-2 py-1 bg-[#c6c6c6] text-black text-xs font-bold rounded-sm hover:bg-[#b0b0b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            WEBM
          </button>
        </div>
      </section>

    </footer>
  )
}

export default Footer