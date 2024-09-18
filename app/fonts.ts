import { Nunito, Montserrat } from "next/font/google";

export const nunito = Nunito({
  weight: ["400", "500", "700"],
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  weight: "700",
  variable: "--font-montserrat",
  subsets: ["latin"],
});
