'use client'

import colors from "./colors";
import { ThemeProvider } from "styled-components";
import fonts from "./fonts";

export const theme = {
  colors,
  fonts,
};

export type ThemeInterface = typeof theme;

export default function Theme({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>;
}
