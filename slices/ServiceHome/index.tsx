import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { TransitionLink } from "@/components/TransitionLink";
import { ButtonLink } from "@/components/ButtonLink";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import clsx from "clsx";

/**
 * Props for `ServiceHome`.
 */
export type ServiceHomeProps = SliceComponentProps<Content.ServiceHomeSlice>;

/**
 * Component for "ServiceHome" Slices.
 */
const ServiceHome: FC<ServiceHomeProps> = ({ slice }) => {
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
           <div className="bg-logocolor rounded-t-md  pt-4  lg:text-6xl z-40">           
              <RevealText
              field={slice.primary.heading}
              id="service-heading"
              className="font-display text-4xl md:text-7xl lg:text-8xl mt-10  leading-none mb:-10 text-logofontcolor text-center"
              staggerAmount={0.2}
              duration={1.7}
              as="h1"
            />
    
            <FadeIn
            className="mb-8 translate-y-8 text-xl text-left  text-gray-900"
            vars={{ delay: 1, duration: 1.3 }}
          >
              <PrismicRichText field={slice.primary.description} />
            </FadeIn>
            </div>
            <FadeIn
              className={`grid gird-cols-1 md:grid-cols-4 mt-8 translate-y-5`}
              vars={{ delay: 1.7, duration: 1.1 }}
            >
                <ButtonLink
                  field={slice.primary.button_link}
                  className={clsx( `col-span-1 border-2 mx-1 my-1 bg-logocolor border-logofontcolor `)}
                >
                  Services
                </ButtonLink>
            </FadeIn>
          </div>
          
        </Bounded>
  );
};

export default ServiceHome;
