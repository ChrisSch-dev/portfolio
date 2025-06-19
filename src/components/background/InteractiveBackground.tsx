import type React from 'react'
import {useCallback, useEffect, useRef} from 'react'
import './InteractiveBackground.css'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    baseOpacity: number
}

interface InteractiveBackgroundProps {
    darkMode: boolean
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({darkMode}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({x: 0, y: 0})
    const animationFrameRef = useRef<number>()

    const PARTICLE_COUNT = 80
    const CONNECTION_DISTANCE = 120
    const MOUSE_INFLUENCE_DISTANCE = 150

    // Initialize particles
    const initParticles = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        particlesRef.current = Array.from({length: PARTICLE_COUNT}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            baseOpacity: Math.random() * 0.5 + 0.2,
        }))
    }, [])

    // Handle mouse movement
    const handleMouseMove = useCallback((event: MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
    }, [])

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const particles = particlesRef.current
        const mouse = mouseRef.current

        // Update and draw particles
        particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx
            particle.y += particle.vy

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(canvas.width, particle.x))
            particle.y = Math.max(0, Math.min(canvas.height, particle.y))

            // Mouse interaction
            const dx = mouse.x - particle.x
            const dy = mouse.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < MOUSE_INFLUENCE_DISTANCE) {
                const force = (MOUSE_INFLUENCE_DISTANCE - distance) / MOUSE_INFLUENCE_DISTANCE
                particle.vx += (dx / distance) * force * 0.01
                particle.vy += (dy / distance) * force * 0.01
                particle.opacity = Math.min(1, particle.baseOpacity + force * 0.5)
            } else {
                particle.opacity = particle.baseOpacity
                // Slowly return to normal velocity
                particle.vx *= 0.99
                particle.vy *= 0.99
            }

            // Draw particle
            const particleColor = darkMode
                ? `rgba(96, 165, 250, ${particle.opacity})` // blue-400 for dark mode
                : `rgba(59, 130, 246, ${particle.opacity * 1.5})` // blue-500 for light mode with higher opacity

            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = particleColor
            ctx.fill()

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const otherParticle = particles[j]
                const dx = particle.x - otherParticle.x
                const dy = particle.y - otherParticle.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < CONNECTION_DISTANCE) {
                    const baseOpacity = (CONNECTION_DISTANCE - distance) / CONNECTION_DISTANCE * 0.3
                    const opacity = darkMode ? baseOpacity : baseOpacity * 1.8 // Higher opacity for light mode

                    ctx.strokeStyle = darkMode
                        ? `rgba(148, 163, 184, ${opacity})` // slate-400 for dark mode
                        : `rgba(100, 116, 139, ${opacity})` // slate-500 for light mode
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(particle.x, particle.y)
                    ctx.lineTo(otherParticle.x, otherParticle.y)
                    ctx.stroke()
                }
            }
        })

        animationFrameRef.current = requestAnimationFrame(animate)
    }, [darkMode])

    // Resize canvas
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticles()
    }, [initParticles])

    useEffect(() => {
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('mousemove', handleMouseMove)

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [resizeCanvas, handleMouseMove, animate])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 interactive-bg-canvas"
            style={{
                background: darkMode
                    ? 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.05) 0%, rgba(2, 6, 23, 0.05) 70%)'
                    : 'radial-gradient(ellipse at center, rgba(248, 250, 252, 0.1) 0%, rgba(241, 245, 249, 0.08) 70%)'
            }}
        />
    )
}

export default InteractiveBackground
