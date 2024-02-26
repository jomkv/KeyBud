import { createTheme, Button } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    mainBackground: Palette["primary"];
    navBackground: Palette["primary"];
    main: Palette["primary"];
  }

  interface PaletteOptions {
    mainBackground: Palette["primary"];
    navBackground: Palette["primary"];
    main: Palette["primary"];
  }
}

const theme = createTheme({
  palette: {
    main: {
      main: "#8C52FF",
      light: "#CDB1FF", // Lighter version of main
      dark: "#5C36B3", // Darker version of main
      contrastText: "#FFFFFF", // White text against main color
    },
    mainBackground: {
      main: "#D1CDC4",
      light: "#E7E4DB", // Lighter version of mainBackground
      dark: "#A19D95", // Darker version of mainBackground
      contrastText: "#000000", // Black text against mainBackground
    },
    navBackground: {
      main: "#1F1F1F",
      light: "#474747", // Lighter version of navBackground
      dark: "#000000", // Darker version of navBackground
      contrastText: "#FFFFFF", // White text against navBackground
    },
  },
});

export default theme;
