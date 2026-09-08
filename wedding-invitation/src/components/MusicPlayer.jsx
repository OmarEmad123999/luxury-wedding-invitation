import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicContext } from '../App'

export default function MusicPlayer() {
  const { playing, toggleMusic } = useMusicContext()
  const [visible, setVisible]     = useState(false)
  const [label, setLabel]         = useState(false)

  /* Appear after main site fades in */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-7 right-7 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {label && (
              <motion.div
                className="absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-sm whitespace-nowrap"
                style={{
                  background: 'rgba(10,10,10,0.85)',
                  border: '1px solid rgba(201,169,110,0.18)',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-caption text-champagne/70" style={{ letterSpacing: '0.2em' }}>
                  {playing ? 'Pause Music' : 'Play Music'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <button
            onClick={toggleMusic}
            onMouseEnter={() => setLabel(true)}
            onMouseLeave={() => setLabel(false)}
            aria-label={playing ? 'Pause background music' : 'Play background music'}
            className="relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400"
            style={{
              background: 'rgba(201,169,110,0.07)',
              border: '1px solid rgba(201,169,110,0.22)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Pulse ring while playing */}
            {playing && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(201,169,110,0.3)' }}
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            {playing ? (
              /* Pause — two vertical bars */
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <rect x="1.5" y="1" width="3.5" height="11" rx="1" fill="rgba(201,169,110,0.85)" />
                <rect x="8"   y="1" width="3.5" height="11" rx="1" fill="rgba(201,169,110,0.85)" />
              </svg>
            ) : (
              /* Play */
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"
                className="translate-x-px">
                <path d="M2.5 1.5l9 5-9 5V1.5z" fill="rgba(201,169,110,0.85)" />
              </svg>
            )}
          </button>

          {/* Equaliser bars — only while playing */}
          {playing && (
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-[3px] items-end h-3">
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-[2px] rounded-full"
                  style={{ background: 'rgba(201,169,110,0.45)' }}
                  animate={{ height: ['3px', `${8 + i * 2}px`, '3px'] }}
                  transition={{
                    duration: 0.6 + i * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.12,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
