// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      // no modification on targeted color
      primary: string;
      safe: string;
      background: string;
      test: string;
      success: string;
      error: string;
      warning: string;

      red: string;

      purple0: string;
      purple1: string;
      purple2: string; // Sismo Color
      purple3: string;
      purple4: string;
      purple5: string;
      purple6: string;
      purple7: string;
      purple8: string;

      green0: string;
      green1: string; // Sismo color
      green2: string;
      green3: string;
      green4: string;
      green5: string;
      green6: string;
      green7: string;
      green8: string;

      orange0: string;
      orange1: string;
      orange2: string; // safe & warning
      orange3: string;
      orange4: string;
      orange5: string;
      orange6: string;
      orange7: string;
      orange8: string;

      gray6: string;
      gray7: string;
      gray8: string;
      gray9: string;
      gray95: string;
      gray10: string;
      gray11: string;
      gray12: string;
      gray13: string;
      gray14: string;

      neutral1: string;
      neutral2: string;
      neutral3: string;
      neutral4: string;
      neutral5: string;
      neutral6: string;
      neutral7: string;
      neutral8: string;
      neutral9: string;
      neutral10: string;
      neutral11: string;
      neutral12: string;

      blue0: string;
      blue1: string;
      blue2: string;
      blue3: string;
      blue4: string;
      blue5: string;
      blue6: string;
      blue7: string; // color for disabled
      blue8: string;
      blue9: string;
      blue10: string;
      blue11: string; // Sismo color & background
      blue12: string;
      blueRYB: string;

      // white modified
      white: string;
    };
    fonts: {
      logoRegular: string;
      logo: string;
      light: string;
      regular: string;
      medium: string;
      bold: string;
      semibold: string;
    };
    animations: {
      transition: string;
    };
  }
}
