module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{js,vue}'],
  safelist: [
    'tw-bg-primary',
    'tw-bg-red-700',
  ],
  theme: {
    fontFamily: {
      ubuntu: ['UbuntuLight', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#017AC3',
        platina: '#7E7E7E',
        'gazblue': '#0079c2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
