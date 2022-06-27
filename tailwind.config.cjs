// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '360px',
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        "regal-accent": "#faeace",
        "background:": "#fffbf5",
        saucyRed: "#d95c41",
        osSauce: "#ED5332",
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
        gray50: "#333333",
        gray100: "#F3F3F3",
        gray120: "#D9D9D9",
        gray150: "#8C8C8C",

      },
      fontFamily: {
        Poppins: ["Poppins"],
        Righteous: ["Righteous"],
        Roboto: ["Roboto"],
        Ubuntu: ["Ubuntu", "sans-serif"],
        Primary: ["Open Sans", "sans-serif"],
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
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-radix")(),
  ],

};
