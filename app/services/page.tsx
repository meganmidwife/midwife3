import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ServicesContent } from "./ServicesContent";
import { ServicesArticle } from "./ServicesArtical";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("services").catch(() => notFound());
  const articles = await client.getAllByType("service_article").catch(() => notFound());

  return (
    <>
  <Bounded 
      className="relative min-h-screen   bg-logocolor"
  >
          { page.data.image && <FadeIn
            vars={{ scale: 1, opacity: 0.5 }}
            className="absolute inset-0 opacity-0 motion-safe:scale-125"
          >
            <PrismicNextImage
              field={page.data.image}
              alt=""
              priority
              fill
              className="object-cover motion-reduce:opacity-50"
            />
          </FadeIn>}
    {    <div className="relative grid gap-4 pt-5 md:mt-5 grid-cols-1 md:grid-cols-4 justify-center">
     <div className=" col-span-4 md:col-span-3">
           {page.data.heading && <RevealText
              field={page.data.heading}
              id="service-heading"
              className="font-display text-4xl leading-none bg-logocolor  pt-10 pl-6 text-logofontcolor align-middle  md:text-5xl lg:text-6xl"
              staggerAmount={0.2}
              duration={1.7}
              as="h1"
            />}
    
            {page.data.description.length > 1 && <FadeIn
              className="mt-6  translate-y-8 text-lg bg-logocolor p-4 text-gray-900"
              vars={{ delay: 1, duration: 1.3 }}
            >
              <PrismicRichText field={page.data.description} />
            </FadeIn>}
          </div>
          <div className="col-span-4 md:col-span-1">
            <PrismicNextImage field={page.data.image_on_page}/>
          </div>
      </div>}
      <SliceZone slices={page.data.slices} components={components} />
      <div className="grid w-full gap-5  grid-cols-4 pt-10 pb-10">
        <div className="col-span-4 text-3xl text-balance text-center py-5 bg-logohovercolor opacity-100 z-50">
          <h2 className="text-white">Services TEST</h2>
        </div>
        {articles.map((item)=>(<div key={item.id} className="col-span-4 md:col-span-1">
          
          <ServicesArticle key={item.id} id={item.id}/>
        </div>))}
      </div>
  </Bounded>
  
  </>);
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("services").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}