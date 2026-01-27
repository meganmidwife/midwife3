
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { PackagesContent } from "./PackagesContent";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import AnimatedContent from "@/components/AnimatedContent";
import clsx from "clsx";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getSingle("packages").catch(() => notFound());
  const pagecontent = await client.getAllByType("package").catch(() => notFound());

  return (

  <div>
    <div className="w-auto text-4xl md:text-5xl lg:text-6xl border-2 text-balance align-middle text-center border-white/55 rounded-md m-4 py-4">
      <PrismicRichText field={page.data.packages} />
    </div>
    <div className="text-balance align-middle text-center border-b-2 border-white/10 pb-3 mb-4"><PrismicRichText field={page.data.description} /></div>
    {pagecontent.map((item, index) => (
        <Bounded
              key={item.id}
              className="relative"
            >
          <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />
          
        
              
              <PackagesContent id={item.id} />
              {/* <ButtonLink field={item.id} className="mt-6">
                {item.data.button_text || "Learn More"}
              </ButtonLink> */}
           
        </Bounded>
    ))}
    
  
  </div>);
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<Params>;
// }): Promise<Metadata> {
//   const { uid } = await params;
//   const client = createClient();
//   const page = await client.getByUID("packages", uid).catch(() => notFound());

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//     openGraph: {
//       images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
//     },
//   };
// }

// export async function generateStaticParams() {
//   const client = createClient();
//   const pages = await client.getAllByType("packages");

//   return pages.map((page) => ({ uid: page.uid }));
// }