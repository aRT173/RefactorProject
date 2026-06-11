const palette =  {
  redMain: "#ef5448",

  blueMain: "#0055a6",
  blackMain: "#2a2b2c",

  blue700: "#034186",
  blue800: "#03366f",

  grayMain: "#e6eef6",
  gray700: "#d7dee5",
  gray900: "#7a8a99"
}

const colors = {
  textPrimary: palette.blackMain,
  textSecondary: palette.gray900,

  bgSecondary: palette.grayMain,

  checkboxPrimary: palette.blueMain,
  checkboxActive: palette.blue800,
  checkboxDesibled: palette.grayMain,
  checkboxHover: palette.blue700,

  iconsWarning: palette.redMain,

  strokeSecondary: palette.gray700,
  strokeAccent: palette.blueMain,
  strokeWarning: palette.redMain,
  strokePrimary: palette.grayMain,
}

const typography = {
  homeFontFamily: "'Manrope', sans-serif"
}

export const theme = {
  ...typography,
  ...palette,
  ...colors
}