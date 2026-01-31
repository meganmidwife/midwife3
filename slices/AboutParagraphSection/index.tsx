import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `AboutParagraphSection`.
 */
export type AboutParagraphSectionProps =
  SliceComponentProps<Content.AboutParagraphSectionSlice>;

/**
 * Component for "AboutParagraphSection" Slices.
 */
const AboutParagraphSection: FC<AboutParagraphSectionProps> = ({ slice }) => {
  console.log(slice.primary.image_position)
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation} 
    className="py-2 px-4 bg-logocolor"
    >
        <div className={`grid grid-cols-4 w-full py-4 bg-logocolor text-gray-900`}>
          <div className="col-span-4 text-4xl md:5xl lg:6xl font-display text-logofontcolor ">
            <PrismicRichText field= {slice.primary.heading} />
          </div>
          {slice.primary.image.url  ? <><div className={`col-span-1 mx-3 ${!slice.primary.image_position? "order-2" : "order-1"}`}><PrismicNextImage field={slice.primary.image}/></div><div className={`col-span-3 ${!slice.primary.image_position? "order-1" : "order-2`"} `} ><PrismicRichText field={slice.primary.description}/></div></> :<><div className="col-span-4"><PrismicRichText field={slice.primary.description}/></div></>}
         
          
              
          </div>
    </Bounded>
  );
};

export default AboutParagraphSection;
