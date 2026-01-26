import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";
import { NavBar } from "@/components/Navbar"
import "./globals.css";
import { Footer } from "@/components/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const gambarino = localFont({
  src: "./gambarino.woff2",
  display: "swap",
  variable: "--font-gambarino",
});

export async function generateMetdata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Megan The Midwife",
    description:
      settings.data.meta_description ||
      "Personal midwifery care tailored to your unique journey.",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : [""],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${raleway.variable} ${gambarino.variable} antialiased`}
      >
        <body className="bg-neutral-900 text-white pt-0 md:pt-40">
          <NavBar settings={settings} />
          <main className="">{children}</main>
          <Footer settings={settings} />
        </body>
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    </ViewTransitions>
  );
}