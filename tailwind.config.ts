import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Layouts/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#e0f2f2',
          '100': '#b3e0e0',
          '200': '#80cccc',
          '300': '#4db8b8',
          '400': '#26a5a5',
          '500': '#036666',
          '600': '#035959',
          '700': '#034d4d',
          '800': '#024141',
          '900': '#023535',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          '50': '#e4e9e8',
          '100': '#c0d0cf',
          '200': '#95b3b2',
          '300': '#6a9795',
          '400': '#4b7c79',
          '500': '#4b706d',
          '600': '#436562',
          '700': '#3b5956',
          '800': '#334d4b',
          '900': '#243838',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        tertiary: {
          light: {
            '50': '#fefdfc',
            '100': '#fdfaf7',
            '200': '#faf4ef',
            '300': '#f7eee7',
            '400': '#f5e9e0',
            '500': '#f2efea',
            '600': '#d9d7d2',
            '700': '#bfbeb8',
            '800': '#a6a59f',
            '900': '#8d8c86'
          },
          dark: {
            '50': '#e5e6e6',
            '100': '#bfc2c1',
            '200': '#9a9d9c',
            '300': '#757875',
            '400': '#565d5b',
            '500': '#2c3231',
            '600': '#282d2d',
            '700': '#232827',
            '800': '#1e2222',
            '900': '#171b1b'
          }
        },
        'primary-dark': 'rgba(var(--text-primary-dark), 1)',
        'primary-light': 'rgba(var(--text-primary-light), 1)',
        'secondary-dark': 'rgba(var(--text-secondary-dark), 1)',
        'secondary-light': 'rgba(var(--text-secondary-light), 1)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [tailwindcssAnimate]
}
export default config

