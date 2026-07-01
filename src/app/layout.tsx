import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
