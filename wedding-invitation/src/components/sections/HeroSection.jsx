import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { weddingImages } from '../../weddingImages'

const ease = [0.76, 0, 0.24, 1]
const HERO_BG = weddingImages.heroBg

export default function HeroSection() {
  const bgRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    if (isMobile) return
    const handle = (e) => {
      if (!bgRef.current) return
      const x = (e.clientX / window.innerWidth  - 0.5) * 14
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [isMobile])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-3%]"
          style={{ transition: 'transform 1.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
          <img src={HERO_BG} alt="" aria-hidden="true"
            className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.42) 0%,rgba(0,0,0,0.15) 45%,rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center,transparent 25%,rgba(0,0,0,0.4) 100%)' }} />
      </div>

      {/* ── Horizontal frame lines ── */}
      <motion.div className="absolute inset-x-8 md:inset-x-14 top-10 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.28),transparent)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5, ease }} />
      <motion.div className="absolute inset-x-8 md:inset-x-14 bottom-10 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.28),transparent)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5, ease }} />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6">

        {/* Eyebrow */}
        <motion.p
          className="text-caption tracking-widest3 mb-10"
          style={{ color: 'rgba(201,169,110,0.62)', letterSpacing: '0.36em' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          You&rsquo;re Invited
        </motion.p>

        {/* Adam */}
        <div className="overflow-hidden">
          <motion.h1 className="font-display text-warm-white"
            style={{ fontSize: 'clamp(3.8rem,12vw,10rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 0.92 }}
            initial={{ y: '106%' }} animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease }}>
            Adam
          </motion.h1>
        </div>

        {/* & */}
        <motion.div className="flex items-center justify-center gap-6 my-3"
          initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.62, ease }}>
          <div style={{ width: 72, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.5))' }} />
          <span className="font-display text-champagne"
            style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 300 }}>&amp;</span>
          <div style={{ width: 72, height: 1, background: 'linear-gradient(90deg,rgba(201,169,110,0.5),transparent)' }} />
        </motion.div>

        {/* Layan */}
        <div className="overflow-hidden">
          <motion.h1 className="font-display text-warm-white"
            style={{ fontSize: 'clamp(3.8rem,12vw,10rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 0.92 }}
            initial={{ y: '106%' }} animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.58, ease }}>
            Layan
          </motion.h1>
        </div>

        {/* Date */}
        <motion.p
          className="text-label mt-9 mb-14 tracking-widest3"
          style={{ color: 'rgba(201,169,110,0.62)', letterSpacing: '0.3em' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.82, ease }}>
          October&ensp;24,&ensp;2026
        </motion.p>

        {/* CTA */}
        <motion.button
          className="btn-luxury"
          onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.98, ease }}>
          <span>Wedding Details</span>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"
            className="relative z-10">
            <path d="M6.5 1v11M2 8l4.5 4.5L11 8"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* Scroll pulse */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}>
        <motion.div
          className="w-px h-11 mx-auto"
          style={{ background: 'linear-gradient(to bottom,rgba(201,169,110,0.45),transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>
    </section>
  )
}
