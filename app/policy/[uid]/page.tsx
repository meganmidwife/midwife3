import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Link from "next/link";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("policy", uid).catch(() => notFound());

  return (
  <div className="mt-32 max-w-full bg-gray-300 text-gray-900 border-2 border-white p-6 m-6 md:p-12 lg:p-20 text-balance">
    <div className="text-3xl md:text-4xl text-center max-w-full">
        <PrismicRichText field={page.data.heading} />
    </div>
    <div>
        <PrismicRichText field={page.data.description} />
    </div>
        <SliceZone slices={page.data.slices} components={components} />
        <div className="mt-7 w-full text-center">
          <Link href={`/legal`} className="text-gray-900 p-5 my-3 border-2 border-gray-800 bg-gray-800/20 hover:bg-gray-500/40 mt-3 w-full">Back</Link>
        </div>
  </div>
)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("policy", uid).catch(() => notFound());

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
  const pages = await client.getAllByType("policy");

  return pages.map((page) => ({ uid: page.uid }));
}