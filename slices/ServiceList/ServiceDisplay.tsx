import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText} from "@prismicio/react";

// type ServiceDisplayProps = {
//   id: string;
// };
         type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const client = createClient();
  //const service = await client.getByType("services");
   const { uid } = await params;
  const page = await client.getByUID("services", uid).catch(() => notFound())

  return (
    <div>HI</div>
    // <Bounded
    //       className="relative min-h-screen overflow-hidden hidden"
    //     >
    //       <FadeIn
    //         vars={{ scale: 1, opacity: 0.5 }}
    //         className="absolute inset-0 opacity-0 motion-safe:scale-125"
    //       >
    //         <PrismicNextImage
    //           field={service.data.image}
    //           alt=""
    //           priority
    //           fill
    //           className="object-cover motion-reduce:opacity-50"
    //         />
    //       </FadeIn>
    
    //       <div className="relative flex h-screen flex-col justify-center ">
    //         <RevealText
    //           field={service.data.heading}
    //           id="hero-heading"
    //           className="font-display text-3xl leading-none text-logofontcolor bg-logocolor   pt-4 pl-4 md:text-5xl"
    //           staggerAmount={0.2}
    //           duration={1.7}
    //           as="h1"
    //         />
    //         <FadeIn
    //           className="mt-6 p-4  translate-y-8 text-lg  bg-logocolor text-gray-800"
    //           vars={{ delay: 1, duration: 1.3 }}
    //         >
    //           <PrismicRichText field={service.data.description} />
    //         </FadeIn>
    //       </div>
    //     </Bounded>
  );
};