const PresetOption = ({ label, isActive, onClick }) => {
    return(
        <button onClick={onClick} className={`min-w-[120px] h-16 flex-shrink-0 flex items-center justify-center 
        border border-black rounded-md text-sm font-bold uppercase tracking-wider transition-colors duration-150 select-none
        ${isActive ? 'bg-[#c6c6c6] text-black shadow-inner' : 'bg-[#222222] text-[#8e8e8e] hover:bg-[#2a2a2a] hover:text-white'}`}>
            {label}
        </button>
    )
}

export default PresetOption