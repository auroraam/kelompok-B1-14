/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        textShadow: {
          'stroke-3': '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black',
        },
        colors: {
          primary: "#2592F2",
          secondary: "#7CCCFE",
        },
      },
    },
    plugins: [
      require("@designbycode/tailwindcss-text-stroke"),
    ],
  };
  