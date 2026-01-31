import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// --- PRO SEO CONFIGURATION ---
export const metadata = {
  title: {
    default: "Yorker Yard | Premium Cricket Turf in Ludhiana",
    template: "%s | Yorker Yard"
  },
  description: "Book slots at Yorker Yard, Ludhiana's Best box cricket arena. Night matches, coaching, and tournaments available. Reserve your spot now.",

  keywords: [
    "Cricket Turf Ludhiana",
    "Box Cricket Ludhiana",
    "Yorker Yard",
    "Turf Booking",
    "Night Cricket",
    "Cricket Academy Ludhiana",
    "Sports Arena Punjab"
  ],

  authors: [{ name: "Yorker Yard Team" }],
  creator: "Yorker Yard",

  // This makes your link look great when shared on WhatsApp/Instagram
  openGraph: {
    title: "Yorker Yard - The Pitch Is Calling",
    description: "Ludhiana's premium box cricket turf. Book your slot today.",
    url: "https://yorkeryard.com", // Your actual domain
    siteName: "Yorker Yard",
    images: [
      {
        url: "/og-image.jpg", // Create a 1200x630px image and put it in 'public' folder
        width: 1200,
        height: 630,
        alt: "Yorker Yard Turf Night View",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // For Search Engine Crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}