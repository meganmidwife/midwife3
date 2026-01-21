import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Service`.
 */
export type ServiceProps = SliceComponentProps<Content.ServiceSlice>;

/**
 * Component for "Service" Slices.
 */
const Service: FC<ServiceProps> = ({ slice }) => {
  return (
    <div>TBA</div>
    //    <Bounded
    //   data-slice-type={slice.slice_type}
    //   data-slice-variation={slice.variation}
    //   className="relative min-h-screen overflow-hidden bg-neutral-950"
    // >
    //   <FadeIn
    //     vars={{ scale: 1, opacity: 0.5 }}
    //     className="absolute inset-0 opacity-0 motion-safe:scale-125"
    //   >
    //     <PrismicNextImage
    //       field={slice.primary.image}
    //       alt=""
    //       priority
    //       fill
    //       className="object-cover motion-reduce:opacity-50"
    //     />
    //   </FadeIn>

    //   <div className="relative flex h-screen flex-col justify-center">
    //     <RevealText
    //       field={slice.primary.heading}
    //       id="hero-heading"
    //       className="font-display max-w-xl text-4xl leading-none text-gray-200  md:text-5xl lg:text-6xl"
    //       staggerAmount={0.2}
    //       duration={1.7}
    //       as="h1"
    //     />

    //     <FadeIn
    //       className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
    //       vars={{ delay: 1, duration: 1.3 }}
    //     >
    //       <PrismicRichText field={slice.primary.description} />
    //     </FadeIn>

    //      <FadeIn
    //       className="mt-8 translate-y-5"
    //       vars={{ delay: 1.7, duration: 1.1 }}
    //     >
    //       {slice.primary.button_link.map((link) => (
    //         <ButtonLink
    //           key={link.key}
    //           field={link}
    //           className={link.variant}
    //         >
    //           Link
    //         </ButtonLink>
    //       ))}
    //     </FadeIn>
    //   </div>
    // </Bounded>
  );
};

export default Service;
