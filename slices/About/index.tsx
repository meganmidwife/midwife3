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
     <div
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="relative bg-logocolor pt-10  overflow-hidden"
        >
          <div className="relative flex  flex-col justify-center  mb-10">
            <div className="bg-logocolor   pt-4 text-4xl md:text-5xl lg:text-6xl z-40">
              <RevealText
                field={slice.primary.heading}
                id="hero-heading"
                className="  font-display text-balance align-middle  mt-14 pt-4  leading-none bg-logocolor text-logofontcolor pl-5"
                staggerAmount={0.2}
                align="center"
                duration={1.7}
                as="h1"
              />
            </div>
            <div>
            <Bounded>
              <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className={`col-span-1 mb-4 md:mb-0`}>
                    {slice.primary.image && (<PrismicNextImage field={slice.primary.image} />)}
                  </div>
                  <div className="col-span-1 md:col-span-4">
                    {slice.primary.paragraphs.map((item, index) => (
                      <div key={index} className={`mb-4 ml-0 mr-0 ${slice.primary.align_image === false ? "md:ml-3" : "md:mr-3"}`}>
                        <div className="text-2xl md:text-3xl text-logofontcolor"><PrismicRichText field={item.sub_heading} /></div>
                        <div className="text-gray-800 text-lg"><PrismicRichText field={item.description} /></div>
                        {item.button_link && <ButtonLink field={item.button_link} className="mt-4" />}
                      </div>
                    ))}
                  </div>
              </div>
            </Bounded>
            </div>
          </div>
        </div>
  );
};

export default About;
