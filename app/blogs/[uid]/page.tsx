import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { ButtonLink } from "@/components/ButtonLink";
import { asDate } from "@prismicio/client";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("blog_post", uid).catch(() => notFound());
  const date = asDate(page.data.publication_date);
  return (
     <Bounded className="py-10">
        <PrismicNextImage field={page.data.background_image} className="absolute inset-0 w-full h-auto opacity-20" />
      <div className="grid grid-cols-1 items-center gap-10 pb-10 lg:grid-cols-2">
        <div className="relative  flex justify-center">
         
          <PrismicNextImage
            field={page.data.image}
            width={600}
            height={600}
            priority
            className="relative"
          />
        </div>
        {/* Product info section */}

        <div className="text-white bg-neutral-600/50 p-6">
          <h1 className="font-display mb-4 border-b border-neutral-700 pb-2 text-4xl md:text-5xl">
            <PrismicText field={page.data.heading} fallback="Fragrance" />
          </h1>

          <div className="space-y-6">
            <p className="text-md font-semibold">Megan&apos;s blog</p>

            <PrismicRichText field={page.data.description} />

           
            <p className="mt-10 text-3xl font-light">
              Published:{date?.toLocaleDateString("en-EU")}
            </p>

           

            
          </div>
        </div>
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