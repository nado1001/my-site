module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      colors: {
        darkThema01: '#0F0F0F',
        darkThema02: '#212121',
        darkThema03: '#303133',
        darkThema04: '#575757'
      }
    }
  },
  plugins: []
}
