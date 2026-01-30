import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage} from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import clsx from "clsx";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
  return (
     <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative glow min-h-screen overflow-hidden bg-logocolor"
    >
      <div className="relative flex h-screen flex-col justify-center ">          
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
          <div className="bg-logocolor rounded-t-md  pt-4 px-4 lg:text-6xl z-40">
            <RevealText
              field={slice.primary.heading}
              id="hero-heading"
              className="font-display text-4xl md:text-7xl lg:text-8xl mt-10  leading-none mb:-10 text-logofontcolor text-center"              
              staggerAmount={0.2}
              align="center"
              duration={1.7}
              as="h1"
            />
           <FadeIn
            className="mb-8 p-4 translate-y-8 text-xl text-center font-bold  text-logofontcolor"
            vars={{ delay: 1, duration: 1.3 }}
          >
              <div className="col-span-4 md:col-span-1">
                <PrismicNextImage field={slice.primary.image}/> 
              </div>
              <div className="col-span-4 md:col-span-3 ">
                <PrismicRichText field={slice.primary.description} />
              </div>
            </FadeIn>
            </div>
             <FadeIn
              className="mt-8 translate-y-5"
              vars={{ delay: 1.7, duration: 1.1 }}
            >
              {slice.primary.button_link.map((link) => (
                <ButtonLink
                  key={link.key}
                  field={link}
                  className={clsx(link.variant, `col-span-1 border-2 mx-1 my-1 bg-logocolor border-logofontcolor `)}
                >
                  Link
                </ButtonLink>
              ))}
            </FadeIn>
          </div>
        </Bounded>
  );
};

export default About;
