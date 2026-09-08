/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING IMAGES — Single source of truth
 *  All image URLs used across the entire site live here.
 *  Change a URL here once and it updates everywhere.
 * ─────────────────────────────────────────────────────────────
 *
 *  Unsplash delivery params appended per use-case:
 *    ?w=   — max pixel width (responsive)
 *    &q=   — quality 1-100
 *    &auto=format — serve WebP/AVIF where supported
 *    &fit=crop    — crop to fill frame
 */

const BASE = {
  hero:      'https://images.unsplash.com/photo-1519741497674-611481863552',
  couple1:   'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
  couple2:   'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
  venue:     'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
  rings:     'https://images.unsplash.com/photo-1606800052052-a08af7148866',
  flowers:   'https://images.unsplash.com/photo-1523438885200-e635ba2c371e',
  reception: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde',
  romantic:  'https://images.unsplash.com/photo-1519741497674-611481863552',
}

/** Returns a sized Unsplash URL. */
function img(key, width = 1600, quality = 88) {
  return `${BASE[key]}?w=${width}&q=${quality}&auto=format&fit=crop`
}

export const weddingImages = {
  // Full-bleed hero / cinematic backgrounds
  heroBg:        img('hero',      2000, 88),
  finalBg:       img('romantic',  1800, 85),
  venueBg:       img('venue',     1800, 85),

  // Splash screen backdrop
  splashBg:      img('couple2',   1800, 85),

  // Gallery — 6 distinct photos, ordered for editorial layout
  gallery: [
    { src: img('couple1',   1200, 90), alt: 'Couple — ceremony moment',       key: 'couple1'   },
    { src: img('couple2',   1200, 90), alt: 'Couple portrait',                key: 'couple2'   },
    { src: img('venue',     1200, 90), alt: 'The Grand Palace — wedding hall', key: 'venue'     },
    { src: img('rings',     1200, 90), alt: 'Wedding rings detail',            key: 'rings'     },
    { src: img('flowers',   1200, 90), alt: 'Floral arrangements',             key: 'flowers'   },
    { src: img('reception', 1200, 90), alt: 'Wedding reception',               key: 'reception' },
  ],
}
