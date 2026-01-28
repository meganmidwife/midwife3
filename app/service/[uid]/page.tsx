import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText} from "@prismicio/react";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage} from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("service", uid).catch(() => notFound());
  return (
        <Bounded
              
              className="relative min-h-screen  overflow-hidden bg-logocolor"
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
        
              <div className="relative flex h-screen min-w-max flex-col justify-center">
                <RevealText
                  field={page.data.heading}
                  id="hero-heading"
                  className="font-display max-w-xl text-4xl leading-none text-gray-200  md:text-5xl lg:text-6xl"
                  staggerAmount={0.2}
                  duration={1.7}
                  as="h1"
                />
        
                <FadeIn
                  className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
                  vars={{ delay: 1, duration: 1.3 }}
                >
                  <PrismicRichText field={page.data.description} />
                </FadeIn>
        
                 <FadeIn
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
                </FadeIn>
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
  const page = await client.getByUID("service", uid).catch(() => notFound());

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
  const pages = await client.getAllByType("service");

  return pages.map((page) => ({ uid: page.uid }));
}