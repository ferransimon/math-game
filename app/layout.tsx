import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import RegisterSW from "@/components/RegisterSW";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["600", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mates",
  description: "Practica sumas, restas y tablas de multiplicar jugando",
  appleWebApp: { capable: true, title: "Mates", statusBarStyle: "default" },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff8f0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-dvh font-sans">
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
