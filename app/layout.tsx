import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: '--font-primary' });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: '--font-heading' });

export const metadata: Metadata = {
  title: {
    default: "Beautify Hub | Curated Luxury Skincare & Ethical Beauty",
    template: "%s | Beautify Hub"
  },
  description: "Elevating daily rituals with nature-inspired, scientifically-proven skincare. Sustainability meets luxury in every bottle.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import MarketingOverlays from "@/components/MarketingOverlays";
import Providers from "@/components/Providers";
import { ShopProvider } from "@/context/ShopContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bodoni.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={dmSans.className}>
        <Providers>
          <ShopProvider>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
              <BottomNav />
              <MarketingOverlays />
            </AuthProvider>
          </ShopProvider>
        </Providers>
      </body>
    </html>
  );
}
