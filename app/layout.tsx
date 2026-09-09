import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Namirembe Cathedral Choir",
  description: "Serving God through music since 1919.",
  icons: {
    icon: "/Namirembe cathedral logo.png",
    shortcut: "/Namirembe cathedral logo.png",
    apple: "/Namirembe cathedral logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
