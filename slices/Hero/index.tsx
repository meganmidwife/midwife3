import { FC } from "react";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";
import { TransitionLink } from "@/components/TransitionLink";
import clsx from "clsx";

gsap.registerPlugin(useGSAP);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  const numOfLinks = "grid-cols-"+slice.primary.button_link.length;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="absolute inset-0 opacity-0 motion-safe:scale-125"
      >
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover motion-reduce:opacity-50"
        />
      </FadeIn>

      <div className="relative flex h-screen flex-col justify-center ">
        <RevealText
          field={slice.primary.heading}
          id="hero-heading"
          className="font-display max-w-xl text-4xl leading-none text-logofontcolor bg-logocolor rounded-t-md  pt-4 pl-4 md:text-5xl lg:text-6xl"
          staggerAmount={0.2}
          duration={1.7}
          as="h1"
        />

        <FadeIn
          className="mt-6 p-4 max-w-xl translate-y-8 text-lg font-bold bg-logocolor text-black"
          vars={{ delay: 1, duration: 1.3 }}
        >
          <PrismicRichText field={slice.primary.description} />
        </FadeIn>

         <FadeIn
          className={`grid grid-cols-1 md:${numOfLinks} mt-8 translate-y-5 max-w-xl  bg-logocolor`}
          vars={{ delay: 1.7, duration: 1.1 }}
        >
          {slice.primary.button_link.map((link) => (
            <ButtonLink
              key={link.key}
              field={link}
              className={clsx(link.variant, `col-span-(${numOfLinks}) md:col-span-1 border-2 border-logofontcolor `)}
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;