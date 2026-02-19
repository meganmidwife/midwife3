import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { PiCurrencyGbpBold } from "react-icons/pi";

type PackagesContentProps = {
  id: string;
};

export const PackagesContent = async ({ id }: PackagesContentProps) => {
  const client = createClient();
  const pack = await client.getByID<Content.PackageDocument>(id);
  const truncatedDescription = asText(pack.data.description).substring(0,150) + ' ...'
  return (
  
  <>
  <Image src={"/basiclogo-round.png"}  width={100} height={100} alt="megan" className="absolute inset-left-4 inset-top-0 -mt-1 ml-1 z-30 w-12 h-12 md:w-24 md:h-24" />
    <FadeIn
      className="relative z-10 grid pt-10 md:pt-0 min-h-[85vh]  grid-cols-1 md:grid-cols-2 gap-4 translate-y-20 items-center justify-items-start p-4 text-left md:p-14 lg:p-20 border-2 border-indigo-800"
      vars={{ duration: 2.5 }}
      start="top 50%"
    >
     
      <div className="absolute inset-0 -z-1">
        <PrismicNextImage
          field={pack.data.background_image}
          className="object-cover opacity-20 md:opacity-30"
          fill
          width={1150}
          quality={90}
          alt=""
        />
      </div>

    
      <FadeIn
        className="relative z-10 col-span-2 border-2 border-amber-500 "
        vars={{ duration: 3, delay: 0.2 }}
        start="top 60%"
      >
        <div className="text-logofontcolor bg-logocolor p-4">
        <h3 className="font-display mb-3  text-xl md:text-3xl">
          <PrismicText field={pack.data.heading} />
        </h3>
        <div className="block md:hidden mb-10">
          <div className="grid grid-cols-1">
            <div className="col-span-1 text-lg text-gray-800 bg-logocolor p-4">
              {truncatedDescription}
            </div>
            {/* <div className="col-span-1 text-lg text-gray-800 bg-logocolor p-4"><PrismicRichText field={pack.data.description}/></div> */}
            <div className="col-span-1"><PrismicNextImage field={pack.data.image} alt=""/></div>
          </div>
        </div>
        <div className="hidden md:block mb-10">
          <div className="grid grid-cols-1  md:grid-cols-5 text-lg text-gray-800 bg-logocolor p-4">
            <div className="col-span-4">
            <PrismicRichText field={pack.data.description}/>
            {pack.data.price && <p>Price <PiCurrencyGbpBold className="inline pb-1 size-6" />{pack.data.price}</p>}
            </div>
            <div className="col-span-1">
            <PrismicNextImage field={pack.data.image} alt=""/>
            </div>
          </div>
        </div>
        {/* <Link href={`package/${pack.uid}`} className="flex border-2 border-logohovercolor bg-logocolor/50 hover:bg-logohovercolor/50 hover:border-logohovercolor/50 text-white uppercase w-auto p-4 ">
        More <FaChevronRight className="text-lg ml-3"/>
        </Link> */}
        </div>
      </FadeIn>
      {/* <FadeIn
        className="relative z-10 grid-cols-2 md:grid-cols-1 mt-20"
        vars={{ duration: 3, delay: 0.2 }}
        start="top 50%"
      >
         <div className="flex flex-wrap">
          <PrismicNextImage field={pack.data.image} alt=""/>
        </div>
      </FadeIn> */}
    </FadeIn>
    
    </>
  );
};