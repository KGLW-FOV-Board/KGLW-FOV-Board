import Navbar from "./Navbar";
import './globals.css'
import {Geist, Geist_Mono} from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='${geistSans.variable} ${geistMono.variable} antialiased'>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <Navbar></Navbar>
        {children}
      </body>
      <GoogleAnalytics gaId="G-MPK9CF123D" />
    </html>
  );
}