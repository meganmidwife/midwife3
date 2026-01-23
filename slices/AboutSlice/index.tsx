import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { AboutDisplay } from "./AboutDisplay";
import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

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
          className="relative min-h-screen overflow-hidden bg-neutral-950"
        >
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
    
          <div className="relative flex h-screen flex-col justify-center">
            <RevealText
              field={slice.primary.heading}
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
              <PrismicRichText field={slice.primary.description} />
            </FadeIn>
    
             <FadeIn
              className="mt-8 translate-y-5"
              vars={{ delay: 1.7, duration: 1.1 }}
            >
              <ButtonLink href={"/about"} className="bg-white text-neutral-900 hover:bg-gray-200">About Megan</ButtonLink>
            </FadeIn>
          </div>
        </Bounded>
  );
};

export default AboutSlice;
