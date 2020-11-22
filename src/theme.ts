import theme from "@chakra-ui/theme";

const customTheme = {
  ...theme,
  config: {
    initialColorMode: "dark",
  },
  colors: {
    ...theme.colors,
  },
  fonts: {
    body: "Formular-Mono",
    heading: "Formular-Mono",
    mono: "Formular-Mono",
  },
};

export default customTheme;
