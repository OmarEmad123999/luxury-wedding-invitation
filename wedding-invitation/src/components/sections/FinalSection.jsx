import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ParticleField from '../ParticleField'
import { weddingImages } from '../../weddingImages'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function FinalSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section
      id="finale"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#080808',   /* fallback until image loads */
      }}
    >
      {/*
       * ── Background image ────────────────────────────────────
       * Using a positioned <img> instead of CSS background-image
       * so Vite serves the asset correctly and we can confirm
       * loading. z-index: 0. All content sits on z-index: 10+.
       */}
      <img
        src={weddingImages.finalBg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
          display: 'block',
        }}
      />

      {/* ── Cinematic overlay — z-index: 1 ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.82) 100%)',
      }} />

      {/* Vignette — z-index: 2 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background:
          'radial-gradient(ellipse at center, transparent 22%, rgba(0,0,0,0.52) 100%)',
      }} />

      {/* Particles — z-index: 3 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        <ParticleField count={32} className="opacity-35" />
      </div>

      {/* Top edge line — z-index: 4 */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        zIndex: 4,
        background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.22),transparent)',
      }} />

      {/* ── Text content — z-index: 10 ── */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '42rem',
          margin: '0 auto',
        }}
      >
        {/* Top ornament */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease }}
        >
          <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.45))' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,169,110,0.45)' }} />
          <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg,rgba(201,169,110,0.45),transparent)' }} />
        </motion.div>

        {/* Forever */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3rem,11vw,8rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 0.93,
              color: '#f5f0e8',
              textShadow: '0 2px 40px rgba(0,0,0,0.6)',
              display: 'block',
            }}
            initial={{ y: '106%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.15, delay: 0.15, ease }}
          >
            Forever
          </motion.h2>
        </div>

        {/* starts here. */}
        <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
          <motion.h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3rem,11vw,8rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 0.93,
              color: '#f5f0e8',
              textShadow: '0 2px 40px rgba(0,0,0,0.6)',
              display: 'block',
            }}
            initial={{ y: '106%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.15, delay: 0.3, ease }}
          >
            starts here.
          </motion.h2>
        </div>

        {/* Gold divider */}
        <motion.div
          style={{
            width: 80, height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.55),transparent)',
            marginBottom: '2rem',
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.48, ease }}
        />

        {/* Names */}
        <motion.p
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1.1rem,3vw,1.75rem)',
            fontWeight: 300,
            color: 'rgba(201,169,110,0.72)',
            letterSpacing: '0.06em',
            textShadow: '0 1px 20px rgba(0,0,0,0.7)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease }}
        >
          Adam &amp; Layan
        </motion.p>

        {/* Date */}
        <motion.p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.48)',
            marginTop: '0.5rem',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.72, ease }}
        >
          24 &nbsp;&middot;&nbsp; 10 &nbsp;&middot;&nbsp; 2026
        </motion.p>

        {/* Thank you */}
        <motion.p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: '0.875rem',
            color: 'rgba(245,240,232,0.35)',
            lineHeight: 1.9,
            marginTop: '2rem',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.86, ease }}
        >
          Thank you for being part of our special day.
        </motion.p>

        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(201,169,110,0.28)',
            transition: 'color 0.3s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,169,110,0.65)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,169,110,0.28)')}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.05 }}
          aria-label="Back to top"
        >
          <motion.svg
            width="13" height="13" viewBox="0 0 13 13" fill="none"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M6.5 12V1M2 5.5l4.5-4.5 4.5 4.5"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.62rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}>
            Back to top
          </span>
        </motion.button>
      </div>

      {/* Footer — z-index: 10 */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.16em', color: 'rgba(201,169,110,0.18)', textTransform: 'uppercase' }}>
          © 2026 Adam &amp; Layan
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.16em', color: 'rgba(201,169,110,0.18)', textTransform: 'uppercase' }}>
          Cairo, Egypt
        </p>
      </div>
    </section>
  )
}
