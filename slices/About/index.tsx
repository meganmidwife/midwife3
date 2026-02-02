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
          className="relative bg-logocolor pt-10  overflow-hidden"
        >
          <div className="relative flex  flex-col justify-center  mb-10">
         
    <div className="bg-logocolor   pt-4  lg:text-6xl z-40">
            <RevealText
              field={slice.primary.heading}
              id="hero-heading"
              className="  font-display text-balance align-middle  mt-14 pt-4 text-4xl leading-none bg-logocolor text-logofontcolor pl-5  md:text-5xl lg:text-6xl"
              staggerAmount={0.2}
              align="center"
              duration={1.7}
              as="h1"
            />
            </div>
            {/* <FadeIn
              className=" grid grid-cols-4 gap-4 mt-6 translate-y-8 text-lg  bg-logocolor text-black  p-6 mb-4"
              vars={{ delay: 1, duration: 1.3 }}
            >
              <div className="col-span-4 md:col-span-1">
                <PrismicNextImage field={slice.primary.image}/> 
              </div>
              <div className="col-span-4 md:col-span-3 ">
                <PrismicRichText field={slice.primary.description} />
              </div> 
              

            </FadeIn> */}
    
             
          </div>
        </Bounded>
  );
};

export default About;
