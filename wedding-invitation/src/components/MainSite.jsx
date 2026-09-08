import { useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeroSection      from './sections/HeroSection'
import DetailsSection   from './sections/DetailsSection'
import CountdownSection from './sections/CountdownSection'
import GallerySection   from './sections/GallerySection'
import GuestbookSection from './sections/GuestbookSection'
import FinalSection     from './sections/FinalSection'

gsap.registerPlugin(ScrollTrigger)

export default function MainSite() {
  useEffect(() => {
    // Global .reveal scroll animations
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    els.forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <HeroSection />
      <DetailsSection />
      <CountdownSection />
      <GallerySection />
      <GuestbookSection />
      <FinalSection />
    </motion.main>
  )
}
