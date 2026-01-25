import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import Link from "next/link";



const CapitalizeFirstChar = (wordIn:string) =>{
  
  const word = wordIn;
  
  return word[0].toUpperCase() + word.substring(1);

}

export default async function Page() {
  const client = createClient();
  const page = await client.getAllByType("policy").catch(() => notFound());


  return (
    <Bounded className="py-10 mt-20">
      <div className="grid grid-cols-1 w-full border-2 border-gray-300 bg-gray-300/20">
      {page.map((item)=>(
        
          <Link key={item.id} href={`/policy/${item.uid}`} className="w-full text-center p-5 my-3 border-2 border-gray-300 bg-gray-300/20 hover:bg-gray-300/40">{CapitalizeFirstChar(item.uid)}</Link>
      
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