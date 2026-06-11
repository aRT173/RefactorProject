import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Manrope";
    src: url("/fonts/manrope/Manrope-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Manrope";
    src: url("/fonts/manrope/Manrope-Medium.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Manrope";
    src: url("/fonts/manrope/Manrope-SemiBold.ttf") format("truetype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Manrope";
    src: url("/fonts/manrope/Manrope-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: ${({ theme }) => theme.homeFontFamily};
  }
`;
