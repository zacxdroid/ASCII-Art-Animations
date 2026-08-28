import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { useRef, useState } from "react"

import ASCII_PRESETS from "../ascii/asciiPresets"

const AsciiCanvas = ({ effect = { id:'quart', color:'#72d07c'} }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const borderRef = useRef(null)
    const canvasRef = useRef(null)

    // Border 
    useGSAP(() => {
        const border = borderRef.current
        if (!border) return

        gsap.to(border, {
            rotation: '+=360',
            duration: 0.5,
            repeat: -1,
            ease: 'none'
        })
    }, {scope: borderRef})

    // Ascii Animations
    useGSAP(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if(!ctx) return

        const currentArt = ASCII_PRESETS[selectedIndex].art 

        const fontSize = 14
        ctx.font = `${fontSize}px monospace`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'

        const asciiLines = currentArt.split('\n')
        const charWidth = ctx.measureText('M').width
        const lineHeight = fontSize * 1.2

        const cols = Math.max(...asciiLines.map(line => line.length))
        const rows = asciiLines.length

        const asciiWidth = cols * charWidth
        const asciiHeight = rows * lineHeight

        canvas.width = asciiWidth
        canvas.height = asciiHeight

        const cx = asciiWidth / 2
        const cy = asciiHeight / 2

        const particles = []

        asciiLines.forEach((row, rowIndex) => {
            for(let colIndex = 0; colIndex < row.length; colIndex++) {
                const char = row[colIndex]
                if ( char !== ' ') {
                    const originX = colIndex * charWidth + charWidth / 2
                    const originY = rowIndex * lineHeight + lineHeight / 2

                    particles.push({
                        char, 
                        x: originX,
                        y: originY,
                        originX,
                        originY, 
                        scale: 1,
                        color: '#bbbbbb',
                        opacity: 1
                    })
                }
            }
        })

        gsap.killTweensOf(particles)

        particles.forEach((p) => {
            const dx = p.originX - cx
            const dy = p.originY - cy
            const dist = Math.sqrt(dx * dx + dy * dy)
            const angle = Math.atan2(dy, dx)

            switch(effect.id) {
                case 'quart': 
                    gsap.to(p, {
                        x: p.originX + (dx > 0 ? 10 : -10),
                        y: p.originY + (dy > 0 ? 10 : -10),
                        scale: 1,
                        color: effect.color,
                        duration: 1,
                        repeat: -1,
                        yoyo: true,
                        ease: "back.inOut(1.5)",
                        delay: (Math.abs(dx) * Math.abs(dy)) * 0.00008
                    })
                    break
                case 'dna':
                    gsap.to(p, {
                        x: p.originX + Math.sin(p.originY * 0.05) * 20,
                        scale: () => 1 + Math.cos(p.originY * 0.05) * 0.5,
                        color: effect.color,
                        opacity: () => 0.5 + Math.cos(p.originY * 0.05) * 0.5,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: p.originX * 0.01
                    })
                    break
                default:
                    break
            }
        })

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach((p) => {
                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.scale(p.scale, p.scale)
                ctx.globalAlpha = p.opacity
                ctx.fillStyle = p.color
                ctx.fillText(p.char, 0, 0)
                ctx.restore()
            })
        }
        gsap.ticker.add(render)

        return () => {
            gsap.ticker.remove(render)
            gsap.killTweensOf(particles)
        }
    }, {scope: canvasRef, dependencies: [selectedIndex, effect]})

    return (
        <div className="relative flex justify-center items-center p-4 sm:p-8 rounded-2xl overflow-hidden">
            <div ref={borderRef} className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_15%,rgba(200,255,255,0.2)_100%)] z-0"/>            
            <div className="absolute inset-[2px] bg-[#161212]/95 rounded-2xl z-0 backdrop-blur-md"/>
            <div className="absolute inset-[10px] bg-[#0e0606]/95 rounded-xl z-0 backdrop-blur-md"/>
            <canvas ref={canvasRef} className="block pointer-events-none relative z-10" />

            <section className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20">
                {ASCII_PRESETS.map((preset, index) => (
                    <button key={preset.id} onClick={() => setSelectedIndex(index)}
                    className={`px-2 py-1 text-[10px] font-mono tracking-wider rounded border transition-all duration-500 select-none
                    ${selectedIndex === index ? 'bg-white/15 text-white border-white/40'
                        : 'bg-[#121212]/60 text-[#777777] border-white/5 hover:bg-white/10 hover:text-white'
                    }`}>
                        {preset.name}
                    </button>
                ))}
            </section>
        </div>
    )
}

export default AsciiCanvas