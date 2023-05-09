import localfont from "next/font/local";

const charcuterie = localfont({ src: "./assets/Charcuterie.woff" });

const roboto = localfont({
  src: [
    {
      path: "./assets/Roboto/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/Roboto/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/Roboto/Roboto-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./assets/Roboto/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const inter = localfont({
  src: [
    {
      path: "./assets/Inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/Inter/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/Inter/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./assets/Inter/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const sarala = localfont({ src: "./assets/Sarala-Regular.ttf" });

const bebasNeue = localfont({
  src: [
    {
      path: "./assets/BebasNeuePro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/BebasNeuePro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const fonts = {
  roboto,
  inter,
  charcuterie,
  sarala,
  bebasNeue,
};

export default fonts;
