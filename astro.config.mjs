// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Arboria",
      cssVariable: "--font-arboria",
      options: {
        variants: [
          {
            style: "normal",
            src: ["./src/assets/fonts/Arboria.woff2"],
            display: "block",
          },
        ],
      },
    },
  ],
});
