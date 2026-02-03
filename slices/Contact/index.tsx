import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { FaPhoneSquareAlt } from "react-icons/fa";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact: FC<ContactProps> = ({ slice }) => {
  return (
     <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="relative min-h-screen overflow-hidden bg-logocolor"
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
    
          <div className="relative flex h-screen flex-col justify-center">
            <div className="grid grid-cols-4 bg-logocolor ">
                <div className="p-6 col-span-4 md:col-span-3">
                <RevealText
                  field={slice.primary.heading}
                  id="contact-heading"
                  className="font-display max-w-xl text-4xl  text-logofontcolor  md:text-5xl lg:text-6xl"
                  staggerAmount={0.2}
                  duration={1.7}
                  as="h1"
                />
    
                <FadeIn
                  className="mt-6 max-w-md translate-y-8 text-lg text-gray-900"
                  vars={{ delay: 1, duration: 1.3 }}
                >
                  <PrismicRichText field={slice.primary.description} />
                </FadeIn>
              </div>
              <div className="col-span-4 md:col-span-1 ">
                <PrismicNextImage field={slice.primary.featured_image} className="object-contain hidden md:block"/>
              </div>
            </div>
             <p className="grid grid-cols-1 md:grid-cols-2 p-4 bg-logocolor text-logofontcolor text-2xl font-bold">
              <span className="inline-block my-3 align-middle text-left md:text-center"><a href="#contactform" > <MdEmail className="inline-block"/> {slice.primary.email}
</a></span><span className="inline-block my-3 align-middle text-left md:text-center"><a href={`tel:${slice.primary.phone}`}><FaPhoneSquareAlt className="inline-block" /> {slice.primary.phone}</a></span></p>
          </div>
        </Bounded>
  );
};

export default Contact;
