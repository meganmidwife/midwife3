import Image from "next/image";
import { TransitionLink } from "@/components/TransitionLink";
import { FaFacebookSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { Content } from "@prismicio/client";
type FooterProps = {
    settings: Content.SettingsDocument;
}
type FooterIconsProps = {
  icon: string;
  className?: string;
  tabIndex?: number;
};
 const FooterIcon = ({ icon }:FooterIconsProps) => {
   let Icon;
   switch (icon) {
     case "Facebook":
       Icon = <FaFacebookSquare size={24} className="mx-2 text-logofontcolor hover:text-gray-900" />;
       break;
     case "LinkedIn":
       Icon = <FaLinkedin size={24} className="mx-2 text-logofontcolor hover:text-gray-900" />;
       break;
     case "Instagram":
       Icon = <FaInstagramSquare size={24} className="mx-2 text-logofontcolor hover:text-gray-900" />;
       break;
     case "WhatsApp":
       Icon = <FaSquareWhatsapp size={24} className="mx-2 text-logofontcolor hover:text-gray-900" />;
       break;
     default:
       Icon = null;
   } 
    
   return (Icon)
 };

export const Footer = ({settings}:FooterProps) => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-logocolor">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto">
        

        {/* Bottom footer */}
        
        <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex ">
             <div className="pt-4">
              {settings.data.social_links.map((soc)=>(
                <div key={soc.key} className="text-white inline-flex">
                  <FooterIcon icon={String(soc?.text)}/>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-black">
            © {new Date().getFullYear()} Megan The Midwife All rights reserved
          </p>
          
          <TransitionLink
            href="/"
            aria-label="Megan the midwife home"
            className="order-first md:order-0  align-middle "
          >
            <Image src="/meganlogo4.png" alt="Megan The " width={150} height={80} />
          </TransitionLink>
         
        </div>
        <p className="z-50 block text-logofontcolor border-b-2 border-logofontcolor">Call: {settings.data.phone_number}</p>
      </div>
    </footer>
  );
};




