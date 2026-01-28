import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage} from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

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
          className="relative min-h-screen overflow-hidden"
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
    
          <div className="relative flex h-screen flex-col justify-center mt-20">
            <RevealText
              field={slice.primary.heading}
              id="hero-heading"
              className="font-display text-balance align-middle  mt-14 pt-4 text-4xl leading-none bg-logocolor text-logofontcolor pl-5  md:text-5xl lg:text-6xl"
              staggerAmount={0.2}
              duration={1.7}
              as="h1"
            />
    
            <FadeIn
              className="mt-6 translate-y-8 text-lg  bg-logocolor text-logofontcolor font-bold p-6 mb-4"
              vars={{ delay: 1, duration: 1.3 }}
            >
              <PrismicRichText field={slice.primary.description} />
            </FadeIn>
    
             <FadeIn
              className="mt-8 translate-y-5"
              vars={{ delay: 1.7, duration: 1.1 }}
            >
              {slice.primary.button_link.map((link) => (
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
  );
};

export default About;
