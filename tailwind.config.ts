import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      colors: {
        blob: {
          pink: '#FFB3C6',
          mint: '#B5EAD7',
          lemon: '#FDEEA3',
          peach: '#FFD4B2',
          lavender: '#C7B8EA',
          sky: '#B3D9FF',
          coral: '#FF9AA2',
        },
      },
      borderRadius: {
        blob: '60% 40% 30% 70% / 60% 30% 70% 40%',
        'blob-2': '40% 60% 70% 30% / 40% 50% 60% 50%',
      },
      animation: {
        'blob-morph': 'blob-morph 6s ease-in-out infinite',
        'blob-morph-2': 'blob-morph-2 8s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.4s ease-in-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'rainbow': 'rainbow 3s linear infinite',
      },
      keyframes: {
        'blob-morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
          '66%': { borderRadius: '30% 60% 40% 70% / 50% 60% 30% 60%' },
        },
        'blob-morph-2': {
          '0%, 100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
          '50%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'wiggle': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'rainbow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
