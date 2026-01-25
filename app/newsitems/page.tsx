import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";

import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { ButtonLink } from "@/components/ButtonLink";
import { RevealText } from "@/components/RevealText";
import { PrismicRichText } from "@prismicio/react";
import { Link } from "next-view-transitions";



const CapitalizeFirstChar = (wordIn:string) =>{
  
  const word = wordIn;
  
  return word[0].toUpperCase() + word.substring(1);

}

export default async function Page() {
  const client = createClient();
  const page = await client.getAllByType("blog_post").catch(() => notFound());


  return (

    
      
    
      page.map((item)=>(
          <Bounded
            key={item.id}
                className="relative min-h-screen overflow-hidden bg-neutral-950"
              >
                    <FadeIn
                    
                      vars={{ scale: 1, opacity: 0.5 }}
                      className="absolute inset-0 opacity-0 motion-safe:scale-125"
                    >
                      <PrismicNextImage
                        field={item.data.background_image}
                        alt=""
                        priority
                        fill
                        className="object-cover motion-reduce:opacity-50"
                      />
                    </FadeIn>
                    <div className="relative flex h-screen flex-col justify-center">
                    <RevealText
                      field={item.data.heading}
                      id="hero-heading"
                      className="font-display max-w-xl text-4xl leading-none text-gray-200  md:text-5xl lg:text-6xl"
                      staggerAmount={0.2}
                      duration={1.7}
                      as="h1"
                    />
                  <FadeIn
                    className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
                    vars={{ delay: 1, duration: 1.3 }}
                  >
                    {/* <PrismicRichText field={item.data.description} /> */}
                    <p className="">{asText(item.data.description).substring(0,150) + ' ...'}</p>
                  </FadeIn>
                  <Link href={`/blogs/${item.uid}`} className="w-full text-center border-2 text-white border-gray-500 bg-gray-500/40 hover:bg-gray-500/60 mt-10" >More</Link>

            
          </div>
             </Bounded>
        ) ))
  
}

export async function generateMetadata({}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("blog_post").catch(() => notFound());
  const settings = await client.getSingle("settings");

  return {
    title: asText(page.data.heading) + " | " + settings.data.site_title,
    description: `Discover ${asText(page.data.heading)}, the newest blog_post from Côte Royale Paris.`,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => ({ uid: page.uid }));
}