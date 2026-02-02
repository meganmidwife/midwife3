import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { AboutDisplay } from "./AboutDisplay";
import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import clsx from "clsx";

/**
 * Props for `AboutSlice`.
 */
export type AboutSliceProps = SliceComponentProps<Content.AboutSliceSlice>;

/**
 * Component for "AboutSlice" Slices.
 */
const AboutSlice: FC<AboutSliceProps> = ({ slice }) => {
  return (
    <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="relative min-h-screen overflow-hidden bg-logocolor"
        >
          <div className="relative flex h-screen flex-col justify-center">
          <FadeIn
            vars={{ scale: 1, opacity: 0.5 }}
            className="absolute inset-0 opacity-0 motion-safe:scale-125"
          >
            <PrismicNextImage
              field={slice.primary.background_image}
              alt=""
              priority
              fill
              className="object-cover motion-reduce:opacity-50"
            />
          </FadeIn>
        <div className="bg-logocolor   pt-4 px-4 lg:text-6xl z-40">
            <RevealText
              field={slice.primary.heading}
              id="hero-heading"
              className="font-display  text-4xl md:text-7xl lg:text-8xl leading-none text-logofontcolor bg-logocolor  pt-4 px-4"
              staggerAmount={0.2}
              align="center"
              duration={1.7}
              as="h1"
            />
    
            <FadeIn
              className="mt-6 text-balance translate-y-8 text-lg bg-logocolor pb-6 text-gray-900"
              vars={{ delay: 1, duration: 1.3 }}
            >
              <PrismicRichText field={slice.primary.description} />
            </FadeIn>
        </div>
             <FadeIn
          className={`grid gird-cols-1 md:grid-cols-4 mt-8 translate-y-5`}
          vars={{ delay: 1.7, duration: 1.1 }}
        >
          {slice.primary.link.map((link) => (
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

export default AboutSlice;
