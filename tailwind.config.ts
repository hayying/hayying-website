import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        orange: {
          "50": "#fffaec",
          "100": "#fff5d3",
          "200": "#ffe7a5",
          "300": "#ffd46d",
          "400": "#ffb632",
          "500": "#ff9d0a",
          "600": "#ff8500",
          "700": "#cc6102",
          "800": "#a14b0b",
          "900": "#823f0c",
          "950": "#461e04",
        },
      },
    },
  },
};
