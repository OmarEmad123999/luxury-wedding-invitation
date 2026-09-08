import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { weddingImages } from '../../weddingImages'

const ease = [0.25, 0.46, 0.45, 0.94]

// All photos come from the single central config — never scattered inline
const PHOTOS = weddingImages.gallery

/* ─── Lightbox ─────────────────────────────────────────────── */
function Lightbox({ index, onClose, onPrev, onNext }) {
  const photo = PHOTOS[index]

  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onClose, onPrev, onNext])

  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const delta = touchX.current - e.changedTouches[0].clientX
    if (delta >  48) onNext()
    if (delta < -48) onPrev()
    touchX.current = null
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(4,4,4,0.97)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.32 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={photo.src}
          alt={photo.alt}
          style={{
            maxWidth: '92vw', maxHeight: '90vh',
            objectFit: 'contain', display: 'block', userSelect: 'none',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.32, ease }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </AnimatePresence>

      {/* Dot progress */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        {PHOTOS.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300" style={{
            width: i === index ? 20 : 5, height: 5,
            background: i === index ? 'rgba(201,169,110,0.85)' : 'rgba(255,255,255,0.18)',
          }} />
        ))}
      </div>

      {/* Close */}
      <button
        className="absolute top-5 right-5"
        style={{ color: 'rgba(245,240,232,0.45)', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.45)'}
        onClick={onClose} aria-label="Close"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M17 5L5 17M5 5l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-7 top-1/2 -translate-y-1/2"
        style={{ color: 'rgba(245,240,232,0.35)', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.35)'}
        onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous photo"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M19 6L9 15l10 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-4 md:right-7 top-1/2 -translate-y-1/2"
        style={{ color: 'rgba(245,240,232,0.35)', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.35)'}
        onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next photo"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M11 6l10 9-10 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </motion.div>
  )
}

/* ─── Single image tile ────────────────────────────────────── */
function Tile({ index, inView, onOpen, style }) {
  const p = PHOTOS[index]

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: '#111', ...style }}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay: index * 0.09 + 0.1, ease }}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      aria-label={`View: ${p.alt}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(index)}
    >
      <img
        src={p.src}
        alt={p.alt}
        loading="lazy"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94), filter 1.1s ease',
          filter: 'brightness(0.87) saturate(0.9)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.045)'
          e.currentTarget.style.filter    = 'brightness(1) saturate(1.02)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.filter    = 'brightness(0.87) saturate(0.9)'
        }}
      />
    </motion.div>
  )
}

/* ─── Section ──────────────────────────────────────────────── */
export default function GallerySection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const [lightbox, setLightbox] = useState(null)

  const open  = useCallback((i) => { setLightbox(i); document.body.style.overflow = 'hidden' }, [])
  const close = useCallback(()  => { setLightbox(null); document.body.style.overflow = '' }, [])
  const prev  = useCallback(()  => setLightbox((i) => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const next  = useCallback(()  => setLightbox((i) => (i + 1) % PHOTOS.length), [])

  return (
    <section
      id="gallery"
      ref={ref}
      style={{ background: '#0a0a0a', padding: 'clamp(5rem,11vw,9rem) 0', overflow: 'hidden', position: 'relative' }}
    >
      {/* Top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.12),transparent)',
      }} />

      {/* ── Minimal header ── */}
      <motion.div
        className="text-center"
        style={{ marginBottom: 'clamp(3rem,6vw,5rem)', padding: '0 1.5rem' }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem',
          letterSpacing: '0.36em', textTransform: 'uppercase',
          color: 'rgba(201,169,110,0.42)', marginBottom: '0.75rem',
        }}>
          Photography
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(1.9rem,5vw,3.2rem)',
          fontWeight: 300, fontStyle: 'italic', color: '#f5f0e8',
        }}>
          The Gallery
        </h2>
        <div style={{
          width: 52, height: 1, margin: '1.25rem auto 0',
          background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.4),transparent)',
        }} />
      </motion.div>

      {/*
       * ── DESKTOP EDITORIAL LAYOUT ─────────────────────────────
       *
       *  Row A │ [0] tall featured  │ [1] portrait  │
       *        │                    │ [2] portrait  │
       *  ──────┤────────────────────┴───────────────┤
       *  Row B │ [3] landscape wide  │ [4] square   │
       *  ──────┴─────────────────────────────────────
       *  Row C │ [5] full-width cinematic strip      │
       *
       * ── MOBILE EDITORIAL LAYOUT ──────────────────────────────
       *  [0] full width tall
       *  [1] + [2] side by side, slight offset
       *  [3] full width
       *  [4] inset right (86% wide)
       *  [5] full width strip
       */}

      {/* DESKTOP */}
      <div className="hidden md:block" style={{ padding: '0 clamp(2.5rem,5vw,5.5rem)' }}>

        {/* Row A */}
        <div style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.7rem', alignItems: 'flex-start' }}>
          <Tile index={0} inView={inView} onOpen={open}
            style={{ flex: '0 0 55%', height: 'clamp(360px,44vw,600px)' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <Tile index={1} inView={inView} onOpen={open}
              style={{ width: '100%', height: 'clamp(172px,21vw,290px)' }} />
            <Tile index={2} inView={inView} onOpen={open}
              style={{ width: '100%', height: 'clamp(172px,21vw,290px)' }} />
          </div>
        </div>

        {/* Row B */}
        <div style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.7rem', alignItems: 'flex-start' }}>
          <Tile index={3} inView={inView} onOpen={open}
            style={{ flex: '0 0 38%', height: 'clamp(220px,25vw,360px)' }} />
          <Tile index={4} inView={inView} onOpen={open}
            style={{ flex: 1, height: 'clamp(220px,25vw,360px)', marginTop: '-2rem' }} />
        </div>

        {/* Row C — full-width cinematic strip */}
        <Tile index={5} inView={inView} onOpen={open}
          style={{ width: '100%', height: 'clamp(180px,17vw,270px)' }} />
      </div>

      {/* MOBILE */}
      <div className="md:hidden" style={{ padding: '0 1rem' }}>
        <Tile index={0} inView={inView} onOpen={open}
          style={{ width: '100%', height: '72vw', marginBottom: '0.6rem' }} />
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <Tile index={1} inView={inView} onOpen={open}
            style={{ flex: 1, height: '52vw' }} />
          <Tile index={2} inView={inView} onOpen={open}
            style={{ flex: 1, height: '52vw', marginTop: '1.2rem' }} />
        </div>
        <Tile index={3} inView={inView} onOpen={open}
          style={{ width: '100%', height: '62vw', marginBottom: '0.6rem' }} />
        <Tile index={4} inView={inView} onOpen={open}
          style={{ width: '86%', height: '66vw', marginLeft: 'auto', marginBottom: '0.6rem' }} />
        <Tile index={5} inView={inView} onOpen={open}
          style={{ width: '100%', height: '46vw' }} />
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox index={lightbox} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </section>
  )
}
