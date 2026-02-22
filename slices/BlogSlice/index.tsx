import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextLink } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";

/**
 * Props for `BlogSlice`.
 */
export type BlogSliceProps = SliceComponentProps<Content.BlogSliceSlice>;

/**
 * Component for "BlogSlice" Slices.
 */
const BlogSlice: FC<BlogSliceProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-gray-800  pb-3 md:pb-0 md:block bg-logocolor pt-15"

    >
      <RevealText
        field={slice.primary.heading}
        id="blog-heading"
        className="font-display text-3xl md:text-5xl mt-10  leading-none mb:-10 text-logofontcolor text-center"
        staggerAmount={0.2}
        duration={1.7}
        align="center"
        as="h1"
      />
          <FadeIn
            className="h-full bg-logocolor p-3 pt-25 "
            vars={{ duration: 2.5 }}
            start="top 60%"
          >
      {/* <PrismicRichText field={slice.primary.heading} /> */}
      {slice.primary.paragraphs.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="text-logofontcolor font-body-bold text-xl md:text-3xl">
          <PrismicRichText field={item.sub_heading} />
          </div>
          <div className="text-lg  text-gray-800">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
       {slice.primary.button_link.map((item, index) => (
        <div key={index} className="">
        {item.link.map((link) => (
          <ButtonLink
            key={link.key}
            field={link}
            className={` border-2 w-full md:w-auto border-gray-300 bg-logohovercolor !text-gray-300 mr-1 ${link.variant}`}
          />
        ))}
        </div>
      ))}
     
      </FadeIn>
    </Bounded>
  );
};

export default BlogSlice;
