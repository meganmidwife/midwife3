import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { PrismicNextImage } from "@prismicio/next";


export default async function Page({   }) {
 
  const client = createClient();
  const page = await client.getSingle("blog").catch(() => notFound());

  return <>
  
        <Bounded
        className="text-gray-800  pb-3 md:pb-0 md:block bg-logocolor pt-15"
        >
        <div className="relative grid gap-4 pt-5 md:mt-5 grid-cols-1 bg-logocolor  md:grid-cols-4 lg:grid-cols-5 justify-center">
         <div className="col-span-4 lg:col-span-5">
            {page.data.heading && <RevealText
              field={page.data.heading}
              id="service-heading"
              className="font-display text-3xl leading-none  pt-10 pl-6 text-logofontcolor align-middle  md:text-5xl"
              staggerAmount={0.2}
              duration={1.7}
              as="h1"
            />}
            </div>
           
       <div className={` col-span-4 ${page.data.image ?"md:col-span-3":"md:col-span-5"} `}>
            {page.data.description && <FadeIn
              className="mt-6  translate-y-8 text-lg bg-logocolor p-4 text-gray-800"
              vars={{ delay: 1, duration: 1.3 }}
            >
              <PrismicRichText field={page.data.description} />
            </FadeIn>}
          </div>
          {page.data.image &&
          <div className="col-span-5 md:col-span-1 lg:col-span-2 mb-4">
            <PrismicNextImage field={page.data.image}/>
          </div>}
      </div>
         <div className="col-span-5 h-3 bg-logohovercolor"></div>
            </Bounded>
            <SliceZone slices={page.data.slices} components={components} />
        </>;
}

 export async function generateMetadata({
  
 }): Promise<Metadata> {
   const client = createClient();
   const page = await client.getSingle("blog").catch(() => notFound());

   return {
     title: page.data.meta_title,
     description: page.data.meta_description,
     openGraph: {
       images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
     },
   };
 }

 export async function generateStaticParams() {
   const client = createClient();
   const pages = await client.getAllByType("blog");

   return pages.map((page) => ({ uid: page.uid }));
 }