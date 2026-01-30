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

  const mdnumOfLinks = "md:grid-cols-"+slice.primary.button_link.length;
   const numOfLinks = "grid-cols-1";
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative glow min-h-screen overflow-hidden bg-neutral-950"
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
        <div className="bg-logocolor rounded-t-md  pt-4 pl-4 lg:text-6xl">
          <RevealText
            field={slice.primary.heading}
            id="hero-heading"
            className="font-display text-4xl md:text-7xl lg:text-8xl mt-10  leading-none mb:-10 text-logofontcolor text-center"
            staggerAmount={0.2}
            duration={1.7}
            align="center"
            as="h1"
          />

          <FadeIn
            className="mb-8 p-4 translate-y-8 text-xl text-center font-bold bg-logocolor text-logofontcolor"
            vars={{ delay: 1, duration: 1.3 }}
          >
            <PrismicRichText field={slice.primary.description} />
          </FadeIn>
        </div>

         <FadeIn
          className={`grid gird-cols-1 md:grid-cols-4 mt-8 translate-y-5`}
          vars={{ delay: 1.7, duration: 1.1 }}
        >
          {slice.primary.button_link.map((link) => (
            <ButtonLink
              key={link.key}
              field={link}
              className={clsx(link.variant, `col-span-1 border-2 mx-1 my-1 bg-logocolor border-logofontcolor `)}
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;