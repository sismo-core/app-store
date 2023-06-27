'use client'

import colors from "./colors";
import { ThemeProvider } from "styled-components";
import fonts from "./fonts";
import animations from "./animations";

export const theme = {
  colors,
  fonts,
  animations
} as any;

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
