import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { useRef, useState, useEffect } from "react"

import ASCII_PRESETS from "../ascii/asciiPresets"

const AsciiCanvas = ({ effect, custom }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isCustomMode, setIsCustomMode] = useState(false)

    const borderRef = useRef(null)
    const canvasRef = useRef(null)

    // User set a custom Ascii
    useEffect(() => {
        if (custom) {
            setIsCustomMode(true)
        }
    }, [custom])

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
        
        const currentArt = (isCustomMode && custom)
            ? custom.art
            : ASCII_PRESETS[selectedIndex].art 

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
                        x: p.originX + Math.sin(p.originY * 0.05) * 40,
                        scale: () => 1 + Math.cos(p.originY * 0.05) * 0.5,
                        color: effect.color,
                        opacity: () => 0.5 + Math.cos(p.originY * 0.05) * 0.5,
                        duration: 1,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: p.originX * 0.01
                    })
                    break
                case 'sonar': {
                    p.opacity = 0.1
                    const normalizedAngle = (angle + Math.PI) / (Math.PI * 2)
                    gsap.to(p, {
                        scale: 2,
                        opacity: 1,
                        color: effect.color,
                        duration: 0.4,
                        repeat: -1,
                        ease: "power2.out",
                        delay: normalizedAngle * 2.5
                    })
                    break
                }
                case 'vortex':
                    gsap.to(p, {
                        x: p.originX + Math.cos(angle + Math.PI / 2) * 20,
                        y: p.originY + Math.sin(angle + Math.PI / 2) * 20,
                        scale: 1.3,
                        color: effect.color,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: dist * 0.005
                    })
                    break
                case 'shatter': {
                    const maxDist = Math.max(cx, cy)
                    const normalizedDist = dist / maxDist
                    gsap.to(p, {
                        x: p.originX + dx * 0.6,
                        y: p.originY + dy * 0.6,
                        scale: 0.1,
                        opacity: 0,
                        color: effect.color,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "expo.inOut",
                        delay: normalizedDist * 1.5
                    })
                    break
                }
                case 'scanline':
                    p.opacity = 0.2
                    gsap.to(p, {
                        scale: 1.8,
                        opacity: 1,
                        color: effect.color,
                        duration: 0.8,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: p.originY * 0.015
                    })
                    break
                case 'ripple':
                    gsap.to(p, {
                        y: p.originY - 12,
                        scale: 1.5,
                        color: effect.color,
                        duration: 1.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",
                        delay: dist * 0.01
                    })
                    break
                case 'fireflies':
                    gsap.to(p, {
                        x: () => p.originX + (Math.random() - 0.5) * 30,
                        y: () => p.originY + (Math.random() - 0.5) * 30,
                        scale: () => Math.random() * 1.5 + 0.5,
                        color: effect.color,
                        opacity: () => Math.random(),
                        duration: () => Math.random() * 2 + 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: () => Math.random() * 2
                    })
                    break
                case 'chem':
                    gsap.to(p, {
                        x: () => p.originX + (Math.random() - 0.5) * 30,
                        y: () => p.originY + (Math.random() - 0.5) * 30,
                        scale: () => Math.random() * 1.5 + 0.5,
                        color: effect.color,
                        opacity: () => Math.random(),
                        duration: () => Math.random() * 2 + 1.5,
                        repeat: -1,
                    })
                    break
                case 'cyberstorm':
                    gsap.to(p, {
                        x: p.originX + (Math.random() > 0.5 ? 10 : -10),
                        opacity: 0.1,
                        color: effect.color,
                        duration: 0.4,
                        repeat: -1,
                        yoyo: true,
                        ease: "power3.inOut",
                        delay: Math.random() * 0.8
                    })
                    break
                case 'heartbeat':
                    gsap.to(p, {
                        scale: 1.8,
                        color: effect.color,
                        duration: 0.4,
                        repeat: -1,
                        yoyo: true,
                        ease: "back.out(2)",
                        delay: dist * 0.003
                    })
                    break
                case 'blackhole':
                    gsap.to(p, {
                        x: cx,
                        y: cy,
                        scale: 0.1,
                        opacity: 0,
                        color: effect.color,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power4.in",
                        delay: dist * 0.006
                    })
                    break
                case 'driving':
                    p.opacity = 0.1
                    gsap.to(p, {
                        opacity: 1,
                        scale: 1.2,
                        color: effect.color,
                        duration: 0.2,
                        repeat: -1,
                        yoyo: true,
                        repeatDelay: 0.3, 
                        ease: "none",
                        delay: (p.originX * 0.003) + (p.originY * 0.01)
                    })
                    break
                case 'magneto':
                    gsap.to(p, {
                        x: p.originX + (dx > 0 ? 25 : -25),
                        y: p.originY + (dy > 0 ? 15 : -15),
                        opacity: 0.4,
                        color: effect.color,
                        duration: 1.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power2.inOut",
                        delay: Math.abs(dy) * 0.008
                    })
                    break
                case '3d?4d?':
                    gsap.to(p, {
                        y: p.originY + Math.sin(p.originX * 0.015) * 35,
                        x: cx,
                        scale: 1.3,
                        color: effect.color,
                        duration: 2.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: p.originX * 0.004
                    })
                    break
                case 'hypnotic':
                    gsap.to(p, {
                        scale: 1.6,
                        opacity: 0.3,
                        color: effect.color,
                        duration: 1.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: Math.sin(dist * 0.04) * 0.8 
                    })
                    break
                case 'meteor':
                    p.opacity = 0
                    gsap.to(p, {
                        x: p.originX - 40,
                        y: p.originY + 40,
                        opacity: 1,
                        scale: 1.5,
                        color: effect.color,
                        duration: 0.6,
                        repeat: -1,
                        ease: "power1.in",
                        delay: Math.random() * 4 + (p.originX + p.originY) * 0.001
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
    }, {scope: canvasRef, dependencies: [selectedIndex, effect, custom, isCustomMode ]})

    return (
        <div className="relative flex justify-center items-center p-4 sm:p-8 rounded-2xl overflow-hidden">
            <div ref={borderRef} className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_15%,rgba(200,255,255,0.2)_100%)] z-0"/>            
            <div className="absolute inset-[2px] bg-[#161212]/95 rounded-2xl z-0 backdrop-blur-md"/>
            <div className="absolute inset-[10px] bg-[#0e0606]/95 rounded-xl z-0 backdrop-blur-md"/>
            <canvas ref={canvasRef} className="block pointer-events-none relative z-10" />

            <section className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20">
                {custom && isCustomMode && (
                    <button className="px-2 py-1 text-[10px] font-mono tracking-wider rounded border transition-all duration-500 select-none bg-white/15 text-white border-white/40 mb-2">
                        {custom.name}
                    </button>
                )}
                {ASCII_PRESETS.map((preset, index) => (
                    <button key={preset.id} onClick={() => {setSelectedIndex(index), setIsCustomMode(false)}}
                    className={`px-2 py-1 text-[10px] font-mono tracking-wider rounded border transition-all duration-500 select-none
                    ${selectedIndex === index && !isCustomMode ? 'bg-white/15 text-white border-white/40'
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