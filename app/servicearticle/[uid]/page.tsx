import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText} from "@prismicio/react";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage} from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("service_article", uid).catch(() => notFound());
  return (
        <Bounded
              className="relative bg-logocolor"
            >
                {
                  page.data.image &&  
              <FadeIn
                vars={{ scale: 1, opacity: 0.5 }}
                className="absolute inset-0 etxt-center opacity-0 motion-safe:scale-125"
              >
                <PrismicNextImage
                  field={page.data.image}
                  alt=""
                  priority
                  fill
                  className="object-cover text-center motion-reduce:opacity-50"
                />
              </FadeIn>
                }
        
              <div className="relative flex pb-5 flex-col text-center justify-center">                <RevealText
                  field={page.data.heading}
                  id="hero-heading"
                  className="bg-logocolor font-display text-center md:max-w-xl pt-5 pl-5 text-4xl leading-none text-logofontcolor  md:text-5xl lg:text-6xl"
                  staggerAmount={0.2}
                  duration={1.7}
                  as="h1"
                />
        
                <FadeIn
                  className="mt-6 w-full translate-y-8 text-lg text-neutral-100"
                  vars={{ delay: 1, duration: 1.3 }}
                >
                  <div className="bg-logocolor p-6 text-gray-900 text-left">
                  <PrismicRichText field={page.data.description} /></div>
                </FadeIn>
        
                 {/* <FadeIn
                  className="mt-8 translate-y-5"
                  vars={{ delay: 1.7, duration: 1.1 }}
                >
                  {page.data.link.map((link) => (
                    <ButtonLink
                      key={link.key}
                      field={link}
                      className={link.variant}
                    >
                      Link
                    </ButtonLink>
                  ))}
                </FadeIn> */}
                <a  href={"/services"} className="w-full border-2 border-logohovercolor bg-logocolor hover:bg-logohovercolor hover:!text-white py-3">Back</a>
              </div>
            </Bounded>
        )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("service_article", uid).catch(() => notFound());

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
  const pages = await client.getAllByType("service_article");

  return pages.map((page) => ({ uid: page.uid }));
}