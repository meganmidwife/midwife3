import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { asDate } from "@prismicio/client";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import clsx from "clsx";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("blog_post", uid).catch(() => notFound());
  const date = asDate(page.data.publication_date);
  return (
     <Bounded
      className="relative glow min-h-screen overflow-hidden bg-logocolor" >
           <div className="relative flex h-screen flex-col justify-center ">
           <FadeIn
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
           </FadeIn>
             <div className="bg-logocolor   pt-4 px-4 lg:text-6xl z-40">
               <RevealText
                 field={page.data.heading}
                 id="hero-heading"
                 className="font-display text-4xl md:text-7xl lg:text-8xl mt-10  leading-none mb:-10 text-logofontcolor text-center"
                 staggerAmount={0.2}
                 duration={1.7}
                 align="center"
                 as="h1"
               />
     
               <FadeIn
                 className="mb-8 p-4 translate-y-8 text-xl text-center  text-logofontcolor"
                 vars={{ delay: 1, duration: 1.3 }}
               >
                 <PrismicRichText field={page.data.description} />
               </FadeIn>
             </div>
     
              <FadeIn
               className={`grid gird-cols-1 md:grid-cols-4 mt-8 translate-y-5`}
               vars={{ delay: 1.7, duration: 1.1 }}
             >
               {page.data.button_link.map((link) => (
                 <ButtonLink
                   key={link.key}
                   field={link}
                   className={clsx(link.variant, `col-span-1 border-2 mx-1 my-1 bg-logocolor border-logofontcolor `)}
                 />
               ))}
             </FadeIn>
             <p className="mt-10 text-3xl font-light">
              Published:{date?.toLocaleDateString("en-EU")}
            </p>
           </div>
    </Bounded>
    );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("blog_post", uid).catch(() => notFound());

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
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => ({ uid: page.uid }));
}