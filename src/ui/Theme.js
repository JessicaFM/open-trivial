import { extendTheme } from "@chakra-ui/react";

const colors = {
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      red: {
        300: "#FC8181"
      },
      green: {
          200: "#9AE6B4"
      },
      brand: {
        100: "#f7fafc",
        900: "#1a202c",
      },
    },
  }
const theme = extendTheme({
    colors,
  });
  
export default theme
  