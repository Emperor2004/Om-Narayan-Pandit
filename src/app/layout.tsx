import type { Metadata } from "next";
import { Syne, Space_Mono, DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Om Narayan Pandit — AI/ML Engineer",
    template: "%s | Om Narayan Pandit",
  },
  description:
    "B.Tech student and aspiring AI/ML engineer specializing in Deep Learning, Reinforcement Learning, Computer Vision, and NLP for Cybersecurity.",
  keywords: [
    "AI", "ML", "Machine Learning", "Deep Learning", "Reinforcement Learning",
    "Computer Vision", "NLP", "GANs", "Portfolio", "B.Tech", "Research",
  ],
  authors: [{ name: "Om Narayan Pandit" }],
  openGraph: {
    title: "Om Narayan Pandit — AI/ML Engineer",
    description: "Building intelligent systems at the intersection of research and real-world impact.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Narayan Pandit — AI/ML Engineer",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
