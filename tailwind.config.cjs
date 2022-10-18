// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,svelte,ts,tsx,vue}"],
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
        osGrey: "#11181C",
        osOrange: "#ED5F00",
        lightOrange: "#FFCCA7",
        lightSlate: "#11181C",
        lightSlate11: "#687076",
        lightSlate10: "#7E868C",
        lightSlate06: "#DFE3E6",
        lightSlate01: "#FBFCFD",
        lightSlate09: "#889096",
        lightOrange01: "#FEFCFB",
        gradFirst: "#FF932F",
        gradMiddle: "#FF3C3C",
        gradLast: "#FF3C3C",
        osBackgroundGrey: "#FBFCFD",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Lexend: ["Lexend", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
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
