import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";



const CapitalizeFirstChar = (wordIn:string) =>{
  
  const word = wordIn;
  
  return word[0].toUpperCase() + word.substring(1);

}

export default async function Page() {
  const client = createClient();
  const page = await client.getAllByType("policy").catch(() => notFound());
  const legal = await client.getSingle("legal").catch(()=> notFound());


  return (
    <Bounded
      className="relative glow min-h-screen overflow-hidden bg-logocolor" >
      <div className="relative flex h-screen flex-col justify-center">

     <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="absolute inset-0 opacity-0 motion-safe:scale-125"
      >
        <PrismicNextImage
          field={legal.data.image}
          alt=""
          priority
          fill
          className="object-cover motion-reduce:opacity-50"
        />
      </FadeIn>
     <div className="bg-logocolor   pt-4 px-4 lg:text-6xl z-40">
      <RevealText
        field={legal.data.heading}
        id="hero-heading"
        className="font-display text-4xl md:text-7xl lg:text-8xl mt-10  leading-none mb:-10 text-logofontcolor text-center"
        staggerAmount={0.2}
        duration={1.7}
        align="center"
        as="h1"
      />
          
      <FadeIn
        className="mb-8 p-4 translate-y-8 text-lg text-center  text-logofontcolor"
        vars={{ delay: 1, duration: 1.3 }}
      >
        <PrismicRichText field={legal.data.description} />
      </FadeIn>
    </div>
      {page.map((item)=>(
        
          <Link key={item.id} href={`/policy/${item.uid}`} className="w-full z-40 text-center p-5 my-3 border-2 border-logofontcolor bg-logocolor hover:bg-logohovercolor text-logofontcolor hover:!text-gray-300">{CapitalizeFirstChar(item.uid)}</Link>
      
        ) )}
      </div>

    </Bounded>
  );
}

export async function generateMetadata({}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("policy").catch(() => notFound());
  const settings = await client.getSingle("settings");

  return {
    title: asText(page.data.heading) + " | " + settings.data.site_title,
    description: `Discover ${asText(page.data.heading)}, the newest policy from Côte Royale Paris.`,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("policy");

  return pages.map((page) => ({ uid: page.uid }));
}