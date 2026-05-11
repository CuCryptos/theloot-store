import type { Config } from 'tailwindcss'

/**
 * Urban Yogi — Direction B (Aesop Quiet).
 * Lower contrast, warmer base, no saturated accent.
 * Restraint is the brand.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surface — softer than Direction A
        cream:    '#F5F1EB', // primary bg, warmer ivory
        bone:     '#EFE9DD', // section divider
        paper:    '#FAF7F1', // lightest, for cards on cream
        // Type
        ink:      '#1F1C18', // primary, slightly softer than pure charcoal
        smoke:    '#4A453E', // secondary
        mist:     '#A39C8E', // labels, hairlines
        // The single accent — a warm taupe, never saturated
        clay:     '#9C8869', // for hover states, underlines, the rare flourish
        clayDeep: '#6F5E45',
        // 2.AG-tier dark editorial accents
        accent:      '#1F2A28',
        accentLight: '#2D3F3A',
        signal:      '#7FA89A',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '-0.025em',
        wide:       '0.04em',
      },
    },
  },
}

export default config
