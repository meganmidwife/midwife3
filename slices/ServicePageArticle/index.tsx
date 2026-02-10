import { FC } from "react";
import { Content } from "@prismicio/client";
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
      className="bg-logocolor text-gray-900"
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
        <div className={`col-span-${slice.primary.image?"3":"4"}`}>
          <div className="text-3xl dispalay-text text-logofontcolor font-body-bold">
          <PrismicRichText field={slice.primary.section_heading} />
          </div>
          <div className="text-2xl">
          <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
        {slice.primary.image && <div className={`${slice.primary.image?"col-span-1":""}`}><PrismicNextImage field={slice.primary.image} /></div>}
      <div className="col-span-4"><button>More</button></div>
      </div>
      
    </Bounded>
  );
};

export default ServicePageArticle;
