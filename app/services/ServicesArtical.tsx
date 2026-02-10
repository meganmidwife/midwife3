import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

type ServicesArticleProps = {
  id: string;
};

export const ServicesArticle = async ({ id }: ServicesArticleProps) => {
  const client = createClient();
  const pack = await client.getByID<Content.ServiceArticleDocument>(id);
  const truncatedDescription = asText(pack.data.description).substring(0,150) + ' ...'
  return (
  
  <>
  <Image src={"/basiclogo-round.png"}  width={100} height={100} alt="megan" className="absolute inset-left-5 inset-top-0 -mt-2 z-30 w-12 h-12 md:w-24 md:h-24" />
    <FadeIn
      className="h-full bg-logocolor p-3 pt-25 "
      vars={{ duration: 2.5 }}
      start="top 50%"
    >
      <div className="flex-1 text-logofontcolor  ">
        <h3 className="font-body-bold text-xl  ">
          <PrismicText field={pack.data.heading} />
        </h3>
        <div className="mb-10">
          <p className="text-lg text-gray-900">{truncatedDescription}
        </p>
        </div>
        
        </div>
        <Link href={`servicearticle/${pack.uid}`} className="absolute bottom-0 left-0 text-center w-full border-2 border-logohovercolor bg-logocolor/50 hover:bg-logohovercolor/50 hover:border-logohovercolor/50 text-white uppercase">
        More
        </Link>
      </FadeIn>
      
         <div className="flex flex-wrap">
          <PrismicNextImage field={pack.data.image} alt=""/>
        </div>
    
    </>
  );
};