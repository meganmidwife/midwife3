import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { TransitionLink } from "@/components/TransitionLink";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import clsx from "clsx";
import { HiPlus } from "react-icons/hi2";

type ServiceDisplayProps = {
  id: string;
};

export const ServiceDisplay = async ({ id }: ServiceDisplayProps) => {
  const client = createClient();
  const service = await client.getByID<Content.ServiceDocument>(id);

  return (
    <Bounded
          className="relative min-h-screen overflow-hidden bg-neutral-950"
        >
          <FadeIn
            vars={{ scale: 1, opacity: 0.5 }}
            className="absolute inset-0 opacity-0 motion-safe:scale-125"
          >
            <PrismicNextImage
              field={service.data.image}
              alt=""
              priority
              fill
              className="object-cover motion-reduce:opacity-50"
            />
          </FadeIn>
    
          <div className="relative flex h-screen flex-col justify-center ">
            <RevealText
              field={service.data.heading}
              id="hero-heading"
              className="font-display max-w-xl text-4xl leading-none text-logofontcolor bg-logocolor rounded-t-md  pt-4 pl-4 md:text-5xl lg:text-6xl"
              staggerAmount={0.2}
              duration={1.7}
              as="h1"
            />
            <FadeIn
              className="mt-6 p-4 max-w-xl translate-y-8 text-lg  bg-logocolor text-gray-900"
              vars={{ delay: 1, duration: 1.3 }}
            >
              <PrismicRichText field={service.data.description} />
            </FadeIn>
          </div>
        </Bounded>
  );
};