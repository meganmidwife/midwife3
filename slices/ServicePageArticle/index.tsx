import { FC } from "react";
import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";

/**
 * Props for `ServicePageArticle`.
 */
export type ServicePageArticleProps =
  SliceComponentProps<Content.ServicePageArticleSlice>;

/**
 * Component for "ServicePageArticle" Slices.
 */
const ServicePageArticle: FC<ServicePageArticleProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-logohovercolor/20 hidden text-gray-900 border-6 border-gray-400/30 rounded-3xl mb-3 md:block"
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
      <div className={`grid grid-cols-4`}>
        <div className={`col-span-${isFilled.image(slice.primary.image)?"3":"4"}`}>
          <div className="text-3xl dispalay-text text-logofontcolor bg-logocolor w-full p-4 my-3 font-body-bold">
          <PrismicRichText field={slice.primary.section_heading} />
          </div>
          <div className="text-2xl bg-logocolor p-4 mb-3 font-bold">
          <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
        {slice.primary.image && <div className={`${isFilled.image(slice.primary.image)?"col-span-1":""}`}>
          <PrismicNextImage field={slice.primary.image} />
          </div>}
     
      </div>
      
    </Bounded>
  );
};

export default ServicePageArticle;
