
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CYZ Studio | Estrategia y Social Media",
  metadataBase: new URL("https://cyzstudio.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "CYZ Studio | Estrategia y Social Media",
    description: "Estrategia creativa, gestión de comunidades y contenido multiplataforma.",
    url: "https://cyzstudio.vercel.app",
    siteName: "CYZ Studio",
    locale: "es_AR",
    type: "website",
  },
  description:
    "Estrategia creativa, gestión de comunidades y contenido multiplataforma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
