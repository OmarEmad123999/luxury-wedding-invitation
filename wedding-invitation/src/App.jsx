import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import MainSite from './components/MainSite'
import MusicPlayer from './components/MusicPlayer'
import CustomCursor from './components/CustomCursor'

/* ── Music context — shared across entire app ─────────────── */
export const MusicContext = createContext(null)
export const useMusicContext = () => useContext(MusicContext)

const cinematic = [0.76, 0, 0.24, 1]

/*
 * Wedding background music.
 * Using a public-domain / CC0 piano piece hosted on the
 * Internet Archive — no CORS or hotlink restrictions.
 * Replace with any URL that returns audio/mpeg and allows
 * cross-origin requests.
 */
const MUSIC_SRC =
  'https://archive.org/download/relaxing-piano-music_202302/relaxing-piano-music.mp3'

export default function App() {
  const [phase, setPhase]     = useState('splash') // 'splash' | 'transitioning' | 'main'
  const [playing, setPlaying] = useState(false)
  const audioRef  = useRef(null)
  const fadeTimer = useRef(null)

  /* Lock / unlock scroll */
  useEffect(() => {
    document.body.style.overflow = phase === 'main' ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [phase])

  /* Cleanup fade interval on unmount */
  useEffect(() => () => clearInterval(fadeTimer.current), [])

  /* ── Start music with gentle fade-in ── */
  const playMusic = () => {
    const audio = audioRef.current
    if (!audio || playing) return          // already playing — do nothing

    audio.volume = 0
    audio.play()
      .then(() => {
        setPlaying(true)
        clearInterval(fadeTimer.current)
        let vol = 0
        fadeTimer.current = setInterval(() => {
          vol = Math.min(parseFloat((vol + 0.018).toFixed(3)), 0.55)
          if (audioRef.current) audioRef.current.volume = vol
          if (vol >= 0.55) clearInterval(fadeTimer.current)
        }, 80)
      })
      .catch(() => {
        /* Autoplay blocked — music simply won't start.
           The MusicPlayer button lets the user start it manually. */
      })
  }

  /* ── Pause / resume toggle for the floating MusicPlayer ── */
  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }

  /* ── "Open Invitation" click — music starts here ── */
  const handleOpen = () => {
    playMusic()                              // triggered by user gesture — always works
    setPhase('transitioning')
    setTimeout(() => setPhase('main'), 1600)
  }

  return (
    <MusicContext.Provider value={{ playing, toggleMusic }}>
      {/*
       * Single global <audio> — never re-created.
       * Rendered outside AnimatePresence so it survives
       * phase changes without unmounting.
       */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src={MUSIC_SRC}
      />

      <div className="noise">
        <CustomCursor />

        {/* Cinematic curtain */}
        <AnimatePresence>
          {phase === 'transitioning' && (
            <motion.div
              key="curtain"
              className="fixed inset-0 z-[200] pointer-events-none"
              style={{ background: '#0a0a0a' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0] }}
              transition={{ duration: 1.6, times: [0, 0.5, 1], ease: cinematic }}
            />
          )}
        </AnimatePresence>

        {/* Splash screen */}
        <AnimatePresence mode="wait">
          {phase === 'splash' && (
            <SplashScreen key="splash" onOpen={handleOpen} />
          )}
        </AnimatePresence>

        {/* Main site + floating music control */}
        <AnimatePresence>
          {phase !== 'splash' && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'main' ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.6, ease: cinematic }}
            >
              <MainSite />
              <MusicPlayer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MusicContext.Provider>
  )
}
