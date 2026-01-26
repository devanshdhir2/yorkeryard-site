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

export const metadata = {
  title: "Yorker Yard - Premium Cricket Turf",
  description: "Experience professional box cricket.",
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