'use client'
import { useState } from "react";
import { FC } from "react";
import Image from "next/image";
import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { BoundedFW } from "@/components/BoundedFW";
import { PrismicNextImage } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { PiCurrencyGbpBold } from "react-icons/pi";



/**
 * Props for `ServicePageArticle`.
 */
export type ServicePageArticleProps =
  SliceComponentProps<Content.PackageSliceSlice>;

/**
 * Component for "ServicePageArticle" Slices.
 */
const ServicePageArticle: FC<ServicePageArticleProps> = ({ slice }) => {
  const sliceID = slice.id;
  const [showArticle, setShowArticle] = useState("");
  const [showLink, setShowLink] = useState(true);
    const truncatedDescription = asText(slice.primary.description).substring(0,150) + ' ...'
  const hideShow = () =>{
    if(showArticle !== slice.id){
      setShowArticle(slice.id)
    } 
  }

  return (
    <BoundedFW
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-gray-900  mb-3 md:block"
      
    >
      {/** Below Medium */}
      
      <div className="block md:hidden" onClick={hideShow}>
          <div onClick={()=>setShowLink(!showLink)}>
              <Image src={"/basiclogo-round.png"}  width={100} height={100} alt="megan" className="absolute inset-left-5 inset-top-0 -mt-2 z-30 w-12 h-12 md:w-24 md:h-24" />
              <FadeIn
                className="h-full bg-logocolor p-3 pt-25 "
                vars={{ duration: 2.5 }}
                start="top 50%"
              >
            <div className="text-logofontcolor  ">
              <h3 className="font-body-bold text-xl  ">
                <PrismicText field={slice.primary.heading} />
              </h3>
              <div className="flex flex-wrap">
                <PrismicNextImage field={slice.primary.image} alt=""/>
              </div>
              <div className="mb-10">
                {showArticle!==slice.id
                ?<p className="text-lg text-gray-900">{truncatedDescription}</p>:
                <div className="text-lg text-gray-900">{
                  <div><PrismicRichText field={slice.primary.description}/>
                    <div>
                      <div className="w-full bg-logohovercolor text-gray-300 p-3 mt-3">Price <PiCurrencyGbpBold className="inline pb-1 font-bold" />{ slice.primary.price}</div>
                    </div>
                  </div>
                }
                </div>}
              
              </div>
              
              </div>
              <div className={`absolute ${showLink ? ' block':'hidden'}  -bottom-3 left-0 text-center w-full  bg-logocolor hover:bg-logohovercolor/50 hover:border-logohovercolor/50 text-logofontcolor uppercase`}>
              show more
              </div>
              
            </FadeIn>
          
          </div>
      </div>

      {/** Medium and above */}
      <div className="hidden md:block">
        {/* <FadeIn
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
        </FadeIn> */}
           <div className={`grid grid-cols-4 lg:grid-cols-5`}>
              <div className={`md:col-span-${isFilled.image(slice.primary.image)?"3":"4"} lg:col-span-${isFilled.image(slice.primary.image)?"3":"5"}`}>
                <div className="text-3xl dispalay-text text-logofontcolor bg-logocolor w-full p-4 my-3 font-body-bold">
                <PrismicRichText field={slice.primary.heading} />
                </div>
                <div className="text-2xl bg-logocolor p-4 mb-3 font-bold"><div>
                <PrismicRichText field={slice.primary.description} />
                
              </div>
              </div>
            </div>
            {slice.primary.image && <div className={`mt-6 ${isFilled.image(slice.primary.image)?"md:col-span-1 lg:col-span-2":""}`}>
              <PrismicNextImage field={slice.primary.image} />
              </div>}
          </div>
          <div className="w-full bg-logohovercolor text-gray-300 p-3 mt-3">Price &#8356;{ slice.primary.price?.trim()}</div>
        </div>
    </BoundedFW>
  );
};

export default ServicePageArticle;
