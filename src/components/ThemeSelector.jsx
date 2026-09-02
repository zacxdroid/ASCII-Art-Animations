
const THEME_COLORS = [
  '#4ade80', //Green
  '#22d3ee', //Cyan
  '#c084fc', //Neon-Purple
  '#f43f5e', //Red
  '#fbbf24', //Warning-Amber
  '#e2e8f0', //Ghost-White
]

const ThemeSelector = ({ effectParams, setEffectParams }) => {
    return (
      <section className="w-full max-w-xl mb-4 p-5 border border-white/5 bg-[#121212]/60 backdrop-blur-md rounded-b-xl flex flex-col gap-6 z-20">
          <div className="flex items-center justify-center gap-4">
            {THEME_COLORS.map((color) => { const isActive = effectParams.color === color
              return (
                <button
                  key={color}
                  onClick={() => setEffectParams(prev => ({ ...prev, color }))}
                  className={`w-6 h-6 rounded-sm transition-all duration-300 ${
                    isActive 
                      ? 'scale-120' 
                      : 'opacity-40 hover:opacity-100 hover:scale-110 cursor-pointer'
                  }`}
                  style={{ 
                    backgroundColor: color,
                    boxShadow: isActive ? `0 0 14px ${color}80` : 'none'
                  }}
                  title={`Select color ${color}`}
                />
              )
            })}
            <button
              onClick={() => setEffectParams(false)}
              className="px-2 py-1 bg-[#121212]/30 text-white/80 rounded-md hover:bg-[#121212]/60 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
      </section>

    )
}

export default ThemeSelector