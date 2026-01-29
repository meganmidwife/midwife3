
import { notFound } from "next/navigation";
import { PrismicRichText} from "@prismicio/react";

import { createClient } from "@/prismicio";
import { PackagesContent } from "./PackagesContent";
import { Bounded } from "@/components/Bounded";



export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("packages").catch(() => notFound());
  const pagecontent = await client.getAllByType("package").catch(() => notFound());

  return (

  <div className="text-black bg-logocolor pt-5">
    <div className="w-auto text-logofontcolor text-4xl md:text-5xl lg:text-6xl font-display  border-2 text-balance align-middle text-center border-white/55 rounded-md m-4 py-4">
      <PrismicRichText field={page.data.packages} />
    </div>
    <div className="text-balance align-middle text-center border-b-2 border-white/10 pb-3 mb-4">
      <PrismicRichText field={page.data.description} /></div>
    {pagecontent.map((item) => (
        <Bounded
              key={item.id}
              className="relative"
            >
          <div className="glow absolute -z-10 aspect-square w-full min-w-full rounded-full bg-gray-300/20 blur-3xl filter" />
              <PackagesContent id={item.id} />
             
           
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