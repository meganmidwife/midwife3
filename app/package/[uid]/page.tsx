import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicImage, PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { FaPoundSign } from "react-icons/fa";
import Link from "next/link";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("package", uid).catch(() => notFound());

  return (
        <Bounded
          className="relative   bg-logocolor"
        >
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
          <div className="relative flex md:min-w-max pb-5  flex-col justify-center">
                  <RevealText
                    field={page.data.heading}
                    id="hero-heading"
                    className="bg-logocolor font-display md:max-w-xl pt-5 pl-5 text-4xl leading-none text-logofontcolor  md:text-5xl lg:text-6xl"
                    staggerAmount={0.2}
                    duration={1.7}
                    as="h1"
                  />
          
                  <FadeIn
                    className="mt-6 max-w-xl translate-y-8 text-lg text-neutral-100"
                    vars={{ delay: 1, duration: 1.3 }}
                  >
                    <div className="bg-logocolor p-6 text-gray-900 text-left">
                    <PrismicRichText field={page.data.description} />
                      <div className="min-w-full justify-between  text-logofontcolor  text-center py-2 border-2 border-gray-300 mt-2 bg-gray-300/50">
                        <FaPoundSign className="inline-block"/>{page.data.price?page.data.price:""}
                      </div>
                    </div>

                   
                    <div className="grid grid-cols-2 gap-4  text-center text-balance mt-5">
                      <Link href={"/packages"} className="w-auto border-2 border-logohovercolor bg-logocolor text-logofontcolor">Back</Link>
                      <Link href={"/"} className="w-auto border-2 border-logocolor bg-logocolor text-logofontcolor">Home</Link>
                    </div>
                  </FadeIn>
          
                   
                </div>
        </Bounded>
      )
  ;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("package", uid).catch(() => notFound());

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
  const pages = await client.getAllByType("package");

  return pages.map((page) => ({ uid: page.uid }));
}