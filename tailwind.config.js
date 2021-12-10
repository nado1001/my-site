module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bg01: '#F8FCFF',
        bg02: '#E9F5FF',
        darkBg01: '#0F0F0F',
        darkBg02: '#212121',
        darkBg03: '#303133',
        darkBg04: '#575757',
        darkHoverBg01: '#414142',
        border01: '#E2E2E2',
        darkBorder01: '#818181',
        text01: '#2E2E2E'
      },
      screens: { sm: { max: '767px' } },
      gridTemplateColumns: {
        article: 'minmax(724px 1fr) minmax(250px 1fr)'
      }
    }
  },
  variants: {},
  plugins: []
}
