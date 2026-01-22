import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {  SliceComponentProps } from "@prismicio/react";
import { BlogDisplay } from "./BlogDisplay";

/**
 * Props for `BlogList`.
 */
export type BlogListProps = SliceComponentProps<Content.BlogListSlice>;

/**
 * Component for "BlogList" Slices.
 */
const BlogList: FC<BlogListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <div>
      {slice.primary.bloglist.map((item) => {
          if (isFilled.contentRelationship(item.blogpage)) {
            return (
              <BlogDisplay
                  key={item.blogpage.id}
                  id={item.blogpage.id}
                />
            );
          }
        })}
     </div>
    </section>
  );
};

export default BlogList;
