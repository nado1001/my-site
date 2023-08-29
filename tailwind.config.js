/** @type {import('tailwindcss').Config} */
 module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        backgroundDark: "#222429",
        headerDark: "#212121",
        cardDark: "#303133",
        cardHeadDark: "#575757",
        tagDark: "#464646",
        tagLight: "#818181",
        borderGray: "#E2E2E2",
        borderGrayDark: "#818181",
        cardHeadLight: "#EFF9FF",
        articleDark: "#212121",
        textDark: "#4e4e4e",
        black: {
          primary: "#222429",
          secondary: "#212121",
          tertiary: "#303133"
        },
        white: {
          primary: "#fff"
        },
        gray: {
          primary: "#E2E2E2",
          secondary: "#818181",
          tertiary: "#575757",
          quaternary: "#464646",
          quinary: "#4e4e4e"
        },
        blue: {
          primary: "#EFF9FF"
        }
      },
      borderRadius: {
        grayLight: {
          color: "#E2E2E2",
          width: 1,
          style: "solid"
        },
        grayDark: {
          color: "#818181",
          width: 1,
          style: "solid"
        }
      }
    },
  },
}