import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PolicySlice`.
 */
export type PolicySliceProps = SliceComponentProps<Content.PolicySliceSlice>;

/**
 * Component for "PolicySlice" Slices.
 */
const PolicySlice: FC<PolicySliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-2 border border-black p-4 my-2"
    >
    <div className="text-2xl"><PrismicRichText field={slice.primary.heading} /></div>
    <PrismicRichText field={slice.primary.description} />
    </section>
  );
};

export default PolicySlice;
