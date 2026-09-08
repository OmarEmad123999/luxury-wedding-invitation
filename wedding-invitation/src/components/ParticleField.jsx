import { useRef, useEffect } from 'react'

/**
 * Canvas-based floating particle field.
 * Optimised: runs on a single offscreen canvas, pauses when hidden.
 */
export default function ParticleField({ count = 80, color = '201,169,110', className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = 0, H = 0
    let particles = []

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const spawn = () => {
      particles = Array.from({ length: count }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.4 + 0.3,
        vx:    (Math.random() - 0.5) * 0.25,
        vy:    -Math.random() * 0.3 - 0.05,
        alpha: Math.random() * 0.5 + 0.1,
        life:  Math.random(),
        speed: Math.random() * 0.003 + 0.001,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.life += p.speed
        if (p.life > 1) {
          p.life = 0
          p.x = Math.random() * W
          p.y = H + 10
        }
        const a = Math.sin(p.life * Math.PI) * p.alpha
        ctx.beginPath()
        ctx.arc(p.x + Math.sin(p.life * 6) * 8, p.y - p.life * H * 0.6, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${a.toFixed(3)})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    spawn()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [count, color])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
