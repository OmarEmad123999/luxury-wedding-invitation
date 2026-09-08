import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ParticleField from './ParticleField'
import { weddingImages } from '../weddingImages'

const ease = [0.76, 0, 0.24, 1]
const SPLASH_BG = weddingImages.splashBg

export default function SplashScreen({ onOpen }) {
  const [ready, setReady]   = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const layerRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  /* Subtle mouse parallax on background */
  useEffect(() => {
    if (isMobile) return
    const handle = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 18
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      if (layerRef.current) {
        layerRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.06)`
      }
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [isMobile])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-obsidian"
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      {/* ── Background photograph ── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={layerRef}
          className="absolute inset-[-3%] transition-transform"
          style={{ transitionDuration: '1.2s', transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}
        >
          <img
            src={SPLASH_BG}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Multi-layer overlay for cinematic depth */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.65) 100%)'
        }} />
        {/* Warm tint */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 40%, rgba(30,20,10,0.3) 0%, rgba(0,0,0,0.6) 100%)'
        }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.72) 100%)'
        }} />
      </div>

      {/* ── Gold particles ── */}
      <ParticleField count={isMobile ? 35 : 65} className="opacity-70" />

      {/* ── Top & bottom edge lines ── */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: ready ? 1 : 0 }}
        transition={{ duration: 2, delay: 0.8, ease }}
      />
      <motion.div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: ready ? 1 : 0 }}
        transition={{ duration: 2, delay: 0.8, ease }}
      />

      {/* ── Corner ornaments ── */}
      {[
        'top-8 left-8',
        'top-8 right-8',
        'bottom-8 left-8',
        'bottom-8 right-8',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-10 h-10`}
          initial={{ opacity: 0 }} animate={{ opacity: ready ? 0.4 : 0 }}
          transition={{ duration: 1, delay: 1.2 + i * 0.1 }}
        >
          <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-6 h-px bg-champagne`} />
          <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-px h-6 bg-champagne`} />
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

        {/* You Are Invited */}
        <motion.p
          className="text-caption tracking-widest3 mb-10"
          style={{ color: 'rgba(201,169,110,0.75)', letterSpacing: '0.35em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          You Are Invited
        </motion.p>

        {/* Adam */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-warm-white"
            style={{
              fontSize: 'clamp(4rem, 13vw, 10rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: ready ? '0%' : '110%', opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease }}
          >
            Adam
          </motion.h1>
        </div>

        {/* & divider */}
        <motion.div
          className="flex items-center gap-5 my-4 md:my-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.8 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
        >
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6))' }} />
          <span
            className="font-display text-champagne"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 300 }}
          >
            &amp;
          </span>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(201,169,110,0.6), transparent)' }} />
        </motion.div>

        {/* Layan */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-warm-white"
            style={{
              fontSize: 'clamp(4rem, 13vw, 10rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: ready ? '0%' : '110%', opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.1, delay: 0.7, ease }}
          >
            Layan
          </motion.h1>
        </div>

        {/* Date */}
        <motion.p
          className="text-label tracking-widest3 mt-8 mb-14"
          style={{ color: 'rgba(201,169,110,0.65)', letterSpacing: '0.32em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ duration: 1, delay: 0.95, ease }}
        >
          24 &nbsp;·&nbsp; 10 &nbsp;·&nbsp; 2026
        </motion.p>

        {/* Open Invitation CTA */}
        <motion.button
          className="open-invitation-btn group relative overflow-hidden"
          onClick={onOpen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.15, ease }}
          aria-label="Open the wedding invitation"
        >
          <span className="btn-content">
            <span className="btn-text">Open Invitation</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1"
                strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-500 group-hover:translate-x-1" />
            </svg>
          </span>
          <span className="btn-fill" aria-hidden="true" />
        </motion.button>

        {/* Scroll hint */}
        <motion.p
          className="absolute -bottom-16 text-caption"
          style={{ color: 'rgba(201,169,110,0.3)', letterSpacing: '0.25em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
        >
          Scroll to explore
        </motion.p>
      </div>
    </motion.div>
  )
}
