import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { RevealText } from "@/components/RevealText";
import { ServiceDisplay } from "./ServiceDisplay";

/**
 * Props for `ServiceList`.
 */
export type ServiceListProps =
  SliceComponentProps<Content.ServiceListSlice>;

/**
 * Component for "ServiceList" Slices.
 */
const ServiceList: FC<ServiceListProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="space-y-8 bg-logocolor py-16 text-center text-white md:py-24"
    >
      <div className="mx-auto space-y-8">

        <div className="mt-12 grid grid-cols-1 gap-12">
          {slice.primary.services.map((item) => {
            if (isFilled.contentRelationship(item.service)) {
              return (
                <ServiceDisplay
                  key={item.service.id}
                  id={item.service.id}
                />
              );
            }
          })}
        </div>
      </div>
    </Bounded>
  );
};

export default ServiceList;