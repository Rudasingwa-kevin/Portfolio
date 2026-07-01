import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kevinos.vercel.app"),
  title: "KevinOS | Ishimwe Kevin - Software Engineer",
  description:
    "Interactive digital workspace of Ishimwe Kevin, a software engineer. Explore projects, skills, and experience in an immersive OS-style interface.",
  keywords: [
    "Ishimwe Kevin",
    "software engineer",
    "portfolio",
    "full-stack developer",
    "Genzura",
    "Gisenyi.top",
    "KevinOS",
  ],
  authors: [{ name: "Ishimwe Kevin" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "KevinOS | Ishimwe Kevin - Software Engineer",
    description:
      "Interactive digital workspace of Ishimwe Kevin. Explore projects, skills, and experience.",
    type: "website",
    locale: "en_US",
    images: ["/api/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KevinOS | Ishimwe Kevin",
    description:
      "Interactive digital workspace of Ishimwe Kevin.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
