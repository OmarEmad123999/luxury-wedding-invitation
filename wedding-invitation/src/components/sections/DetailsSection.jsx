import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { weddingImages } from '../../weddingImages'

const ease = [0.25, 0.46, 0.45, 0.94]
const VENUE_BG = weddingImages.venueBg

const details = [
  { label: 'Date',       value: 'Saturday, 24 October 2026' },
  { label: 'Ceremony',   value: '7:00 PM' },
  { label: 'Reception',  value: '8:00 PM' },
  { label: 'Venue',      value: 'The Grand Palace' },
  { label: 'Location',   value: 'Cairo, Egypt' },
  { label: 'Dress Code', value: 'Black Tie' },
]

export default function DetailsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="details" className="relative bg-obsidian overflow-hidden">

      {/* ── Venue photograph — full bleed ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px,52vw,660px)' }}>
        <img
          src={VENUE_BG}
          alt="The Grand Palace, Cairo"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom,rgba(0,0,0,0.18) 0%,rgba(0,0,0,0.08) 40%,rgba(10,10,10,0.92) 100%)'
        }} />

        {/* Venue name over photo */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          <motion.p
            className="text-caption tracking-widest3 mb-2"
            style={{ color: 'rgba(201,169,110,0.6)', letterSpacing: '0.32em' }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            The Venue
          </motion.p>
          <motion.h2
            className="font-display text-warm-white"
            style={{ fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 300, fontStyle: 'italic' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.22, ease }}
          >
            The Grand Palace
          </motion.h2>
        </div>
      </div>

      {/* ── Details grid ── */}
      <div ref={ref} style={{ padding: 'clamp(4rem,9vw,7rem) clamp(1.5rem,7vw,6rem)' }}>
        <div className="max-w-3xl mx-auto">

          {/* Minimal header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-caption tracking-widest3"
              style={{ color: 'rgba(201,169,110,0.45)', letterSpacing: '0.35em' }}>
              The Wedding
            </p>
          </motion.div>

          {/* Detail rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16">
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                className="py-5 border-b"
                style={{ borderColor: 'rgba(201,169,110,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease }}
              >
                <p className="text-caption mb-1.5 tracking-widest2"
                  style={{ color: 'rgba(201,169,110,0.45)', letterSpacing: '0.24em' }}>
                  {d.label}
                </p>
                <p className="font-display text-warm-white"
                  style={{ fontSize: 'clamp(1.25rem,3vw,1.75rem)', fontWeight: 300, fontStyle: 'italic' }}>
                  {d.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Location button */}
          <motion.div
            className="mt-14 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.75, ease }}
          >
            <a
              href="https://maps.google.com/?q=The+Grand+Palace+Cairo+Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury"
              aria-label="View venue on Google Maps"
            >
              <span>View Location</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="relative z-10" aria-hidden="true">
                <path d="M1.5 9.5L9.5 1.5M9.5 1.5H4.5M9.5 1.5v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
