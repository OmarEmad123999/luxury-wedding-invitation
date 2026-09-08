import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WEDDING = new Date('2026-10-24T19:00:00')

function getTimeLeft() {
  const diff = WEDDING - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

function Unit({ value, label, delay, inView }) {
  const [prev, setPrev] = useState(value)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (value !== prev) {
      setFlip(true)
      const t = setTimeout(() => { setPrev(value); setFlip(false) }, 360)
      return () => clearTimeout(t)
    }
  }, [value, prev])

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width:  'clamp(66px,14vw,100px)',
          height: 'clamp(74px,16vw,116px)',
          background: 'rgba(255,255,255,0.022)',
          border: '1px solid rgba(201,169,110,0.1)',
          borderRadius: 2,
        }}
      >
        {/* Top sheen */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.22),transparent)' }} />

        <span
          className="font-display select-none"
          style={{
            fontSize: 'clamp(1.9rem,6vw,3.2rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#f5f0e8',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            opacity:   flip ? 0 : 1,
            transform: flip ? 'translateY(-6px) scale(0.95)' : 'none',
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <p
        className="text-caption mt-3 tracking-widest2"
        style={{ color: 'rgba(201,169,110,0.4)', letterSpacing: '0.22em' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

function Sep({ inView, delay }) {
  return (
    <motion.span
      className="font-display self-center mb-6"
      style={{ fontSize: 'clamp(1.2rem,3vw,2rem)', fontWeight: 300, color: 'rgba(201,169,110,0.18)' }}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ delay }}
    >:
    </motion.span>
  )
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft())
  const ref             = useRef(null)
  const inView          = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="relative overflow-hidden"
      style={{ background: '#0e0e0e', padding: 'clamp(5rem,11vw,9rem) clamp(1.5rem,7vw,6rem)' }}
    >
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.12),transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.12),transparent)' }} />

      <div ref={ref} className="max-w-3xl mx-auto text-center">

        <motion.h2
          className="font-display text-warm-white mb-12"
          style={{ fontSize: 'clamp(1.8rem,4.5vw,3rem)', fontWeight: 300, fontStyle: 'italic' }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Counting Down to Forever
        </motion.h2>

        <div className="flex items-start justify-center gap-3 md:gap-5 flex-wrap">
          <Unit value={time.days}    label="Days"    delay={0.2}  inView={inView} />
          <Sep inView={inView} delay={0.28} />
          <Unit value={time.hours}   label="Hours"   delay={0.3}  inView={inView} />
          <Sep inView={inView} delay={0.38} />
          <Unit value={time.minutes} label="Minutes" delay={0.4}  inView={inView} />
          <Sep inView={inView} delay={0.48} />
          <Unit value={time.seconds} label="Seconds" delay={0.5}  inView={inView} />
        </div>

        <motion.p
          className="text-caption mt-12"
          style={{ color: 'rgba(201,169,110,0.28)', letterSpacing: '0.24em' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          October 24, 2026 &nbsp;&middot;&nbsp; Cairo
        </motion.p>
      </div>
    </section>
  )
}
