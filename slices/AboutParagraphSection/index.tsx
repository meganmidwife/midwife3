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

  const imgposition = slice.primary.image_position === false ? "order-1 pr-4 mt-3 pt-4" : "order-2 pl-4 mt-3 pt-4";

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation} 
      className="py-2 px-4 bg-logocolor"
    >
      <>
      <div className={`grid grid-cols-5 w-full  bg-logocolor text-gray-800`}>
          <div className="col-span-5 text-2xl md:text-3xl text-logofontcolor   ">
            <PrismicRichText field= {slice.primary.heading} />
          </div>
      </div>
          {slice.primary.image.url  ? <div className="grid grid-cols-5 text-gray-800">
              {slice.primary.sub_heading ? 
                <div className="col-span-5 text-2xl md:text-3xl text-logofontcolor">
                  <PrismicRichText field={slice.primary.sub_heading} />
                </div> : null  }
                <div className={`col-span-5 md:col-span-1 ${imgposition}`}>
                  <PrismicNextImage field={slice.primary.image} />
                </div>
                <div className={`col-span-5 md:col-span-4 ${imgposition} text-lg pb-2 `} >
                  <PrismicRichText field={slice.primary.description} />
                </div>


          </div>: <>
                 {slice.primary.sub_heading ? <>
                  <div className="col-span-5 text-2xl md:text-3xl  text-logofontcolor">
                    <PrismicRichText field={slice.primary.sub_heading} />
                  </div> 
                  <div className={`col-span-5 md:col-span-5 ${imgposition} text-lg pb-2 text-gray-800`} >
                    <PrismicRichText field={slice.primary.description} />
                  </div>
                </>
                : null  }
          </>

          }

      
    </>
        {/* <div className={`grid grid-cols-5 w-full py-4 bg-logocolor text-gray-800`}>
          <div className="col-span-5 text-2xl md:text-3xl text-logofontcolor py-6 md:py-12 ">
            <PrismicRichText field= {slice.primary.heading} />
          </div>
          {slice.primary.image.url  ? <div className="col-span-5 border-2 border-amber-400">
                      {slice.primary.sub_heading ? <div className="text-3xl text-logofontcolor">
                        <PrismicRichText field={slice.primary.sub_heading} /></div> : null  }

            <div className={`col-span-5  md:col-span-2   md:mx-3 ${!slice.primary.image_position? "order-2" : "order-1"}`}>
            <PrismicNextImage field={slice.primary.image} /></div>
            <div className={`col-span-5 md:col-span-3 ${!slice.primary.image_position? "order-1" : "order-2"} text-lg pb-6 `} >
            <PrismicRichText field={slice.primary.description} /></div>
            <div>
          </div>
          </div> :
          <>
            <div className="col-span-5  text-lg">
              <div>
                {slice.primary.sub_heading ? <div className="text-3xl text-logofontcolor"><PrismicRichText field={slice.primary.sub_heading} /></div> : null  }
              </div>
              <PrismicRichText field={slice.primary.description}/>
            </div>
          </>
          }
         
          
              
        </div> */}
    </Bounded>
  );
};

export default AboutParagraphSection;
