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
          slice.primary.services.map((item) => {
            if (isFilled.contentRelationship(item.service)) {
              return (
                <ServiceDisplay
                  key={item.service.id}
                  id={item.service.id}
                />
              );
            }
          })

  );
};

export default ServiceList;