import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ServiceSection`.
 */
export type ServiceSectionProps =
  SliceComponentProps<Content.ServiceSectionSlice>;

/**
 * Component for "ServiceSection" Slices.
 */
const ServiceSection: FC<ServiceSectionProps> = ({ slice }) => {
  return (
      <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative glow min-h-screen overflow-hidden bg-logocolor"    >
      
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
          <div className="bg-logocolor  pt-4 px-4 lg:text-6xl z-40">
              <RevealText
                field={slice.primary.heading}
                id="hero-heading"
                className="font-display max-w-xl text-3xl leading-none text-gray-200  md:text-5xl"
                staggerAmount={0.2}
                duration={1.7}
                as="h1"
              />

              <FadeIn
                  className="mb-8 p-4 translate-y-8 text-lg text-center  text-logofontcolor"
                  vars={{ delay: 1, duration: 1.3 }}
                >
                  <PrismicRichText field={slice.primary.description} />
                </FadeIn>
          </div>
        
      </div>
    </Bounded>
  );
};

export default ServiceSection;
