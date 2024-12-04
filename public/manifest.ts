import { VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  manifest: {
    name: "Penny Track",
    short_name: "Penny Track",
    description: "Track you expenses",
    theme_color: '#5b21b6',
    icons: [
      {
        src: "/icons/android-launchericon-48-48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        "src": "/icons/android-launchericon-72-72.png",
        "sizes": "72x72",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/android-launchericon-96-96.png",
        "sizes": "96x96",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/android-launchericon-144-144.png",
        "sizes": "144x144",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/180.png",
        "sizes": "180x180",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/android-launchericon-192-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/android-launchericon-512-512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any maskable"
      },
    ],
    background_color: "#FFFFFF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait"
  }
}

export default manifestForPlugIn;