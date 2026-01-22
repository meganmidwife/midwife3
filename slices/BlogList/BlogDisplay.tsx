import { ButtonLink } from "@/components/ButtonLink";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { TransitionLink } from "@/components/TransitionLink";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

type BlogDisplayProps = {
  id: string;
};

export const BlogDisplay = async ({ id }: BlogDisplayProps) => {
  const client = createClient();
  const blog = await client.getByID<Content.BlogPostDocument>(id);
  console.log(blog)
  return (
  
  <>
  <Image src={"/meganThumbnail.png"} width={100} height={100} alt="megan" className="absolute inset-left-0 inset-top-0 m-10 z-30 border-2 border-white/50 rounded-full" />
    <FadeIn
      className="relative z-10 grid min-h-[85vh] w-full grid-cols-1 md:grid-cols-2 gap-4 translate-y-20 items-center justify-items-start p-4 text-left md:p-14 lg:p-20"
      vars={{ duration: 2.5 }}
      start="top 50%"
    >
     
      <div className="absolute inset-0 -z-1">
        <PrismicNextImage
          field={blog.data.background_image}
          className="object-cover opacity-20 md:opacity-30"
          fill
          width={1150}
          quality={90}
          alt=""
        />
      </div>

    
      <FadeIn
        className="relative z-10 grid-cols-2 md:grid-cols-1"
        vars={{ duration: 3, delay: 0.2 }}
        start="top 60%"
      >
        <h3 className="font-display mb-3 text-5xl md:text-6xl lg:text-7xl">
          <PrismicText field={blog.data.heading} />
        </h3>
        <div className="mb-10 text-lg text-gray-300 bg-gray-800/50 p-4">
          <PrismicRichText field={blog.data.description} />
        </div>
        <TransitionLink document={blog} className="absolute min-w-50 text-center z-30 border-2 border-white bg-gray-300/20 hover:bg-gray-300/50 text-2xl text-gray-100 p-6">More</TransitionLink>
      </FadeIn>
      <FadeIn
        className="relative z-10 grid-cols-2 md:grid-cols-1"
        vars={{ duration: 3, delay: 0.2 }}
        start="top 50%"
      >
         <div className="flex flex-wrap">
          <PrismicNextImage field={blog.data.image}/>
        </div>
      </FadeIn>
    </FadeIn>
    
    </>
  );
};