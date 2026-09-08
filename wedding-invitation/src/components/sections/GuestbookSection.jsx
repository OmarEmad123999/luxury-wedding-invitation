import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

export default function GuestbookSection() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-10%' })
  const [form, setForm]       = useState({ name: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Please enter your name'
    if (!form.message.trim()) e.message = 'Please write a message'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1400)
  }

  const update = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => { const n = { ...e }; delete n[field]; return n })
  }

  return (
    <section
      id="guestbook"
      className="relative bg-obsidian overflow-hidden"
      style={{ padding: 'clamp(5rem,11vw,9rem) clamp(1.5rem,7vw,6rem)' }}
    >
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.13),transparent)' }} />

      <div ref={ref} className="max-w-lg mx-auto">

        {/* Header — minimal */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <p className="text-caption tracking-widest3 mb-4"
            style={{ color: 'rgba(201,169,110,0.45)', letterSpacing: '0.35em' }}>
            Guestbook
          </p>
          <h2
            className="font-display text-warm-white"
            style={{ fontSize: 'clamp(1.9rem,5vw,3.2rem)', fontWeight: 300, fontStyle: 'italic' }}
          >
            Leave a Message
          </h2>
          <div className="mx-auto mt-5"
            style={{ width: 55, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.45),transparent)' }} />
          <p className="mt-5 font-light text-sm"
            style={{ color: 'rgba(245,240,232,0.38)', lineHeight: 1.8 }}>
            Share your wishes for Adam &amp; Layan.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Sent confirmation ── */}
          {sent && (
            <motion.div
              key="thanks"
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ border: '1px solid rgba(201,169,110,0.22)' }}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: 'backOut' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9l4 4 7-8" stroke="rgba(201,169,110,0.75)" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              <p className="font-display text-warm-white mb-3"
                style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 300, fontStyle: 'italic' }}>
                With Love
              </p>
              <div className="mx-auto my-5"
                style={{ width: 44, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.4),transparent)' }} />
              <p className="font-light text-sm" style={{ color: 'rgba(245,240,232,0.42)', lineHeight: 1.8 }}>
                Your wishes have been received with love.
              </p>
            </motion.div>
          )}

          {/* ── Form ── */}
          {!sent && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.85, delay: 0.35, ease }}
            >
              <div className="space-y-9">

                {/* Name */}
                <div>
                  <label htmlFor="gb-name"
                    className="block text-caption mb-2.5 tracking-widest2"
                    style={{ color: 'rgba(201,169,110,0.42)', letterSpacing: '0.24em' }}>
                    Your Name
                  </label>
                  <input
                    id="gb-name" type="text"
                    className="field-luxury"
                    placeholder="Full name"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-caption mt-1.5"
                      style={{ color: 'rgba(200,80,80,0.65)', letterSpacing: '0.1em' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="gb-msg"
                    className="block text-caption mb-2.5 tracking-widest2"
                    style={{ color: 'rgba(201,169,110,0.42)', letterSpacing: '0.24em' }}>
                    Your Message
                  </label>
                  <textarea
                    id="gb-msg" rows={5}
                    className="w-full bg-transparent outline-none resize-none font-sans font-light text-sm caret-champagne"
                    style={{
                      color: 'rgba(245,240,232,0.75)',
                      borderBottom: '1px solid rgba(201,169,110,0.18)',
                      padding: '0.6rem 0',
                      lineHeight: 1.85,
                      transition: 'border-color 0.3s ease',
                    }}
                    placeholder="Write your wishes…"
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    onFocus={e  => e.target.style.borderBottomColor = 'rgba(201,169,110,0.55)'}
                    onBlur={e   => e.target.style.borderBottomColor = 'rgba(201,169,110,0.18)'}
                  />
                  {errors.message && (
                    <p className="text-caption mt-1.5"
                      style={{ color: 'rgba(200,80,80,0.65)', letterSpacing: '0.1em' }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button type="submit" className="btn-luxury w-full" disabled={sending}>
                  <span>{sending ? 'Sending…' : 'Send Your Wishes'}</span>
                  {!sending && (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                      className="relative z-10" aria-hidden="true">
                      <path d="M1 6.5h11M7 2l4.5 4.5L7 11"
                        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </motion.form>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
