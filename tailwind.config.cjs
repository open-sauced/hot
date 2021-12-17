// tailwind.config.cjs
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "regal-accent": "#faeace",
        "background:": "#fffbf5",
        saucyRed: "#d95c41",
        cheesyYellow: "#f6d809",
        offWhite: "#fbfbfb",
        lightestGrey: "#e6e6e6",
        lighterGrey: "#bcbcbc",
        lightGrey: "#8b8b8b",
        backgroundGrey: "#2F372E",
        grey: "#313d3e",
        darkGrey: "#171c1d",
        darkestGrey: "#2C3137",
        accent: "#FAEACE",
      },
      fontFamily: {
        Poppins: ["Poppins"],
        Righteous: ["Righteous"],
        Roboto: ["Roboto"],
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1124px",
          xl: "1124px",
          "2xl": "1536px",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
