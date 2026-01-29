"use client";

import { Content } from "@prismicio/client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import {
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { TransitionLink } from "@/components/TransitionLink";

 type NavIconsProps = {
   icon: string;
   className?: string;
   tabIndex?: number;
 };

type NavBarProps = {
  settings: Content.SettingsDocument;
};
 
 const NavIcon = ({ icon }:NavIconsProps) => {
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
export const NavBar = ({ settings }: NavBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <header className="">
      <div className="navbar fixed top-0 left-0 z-50 w-full h-auto md:min-h-40 logocolor  text-white" style={{backgroundColor:'var(--color-logocolor)'}}>
        <div className="flex items-center   md:p-6 md:border-2 md:border-logofontcolor m-2">
          <button
            onClick={toggleDrawer}
            aria-label="Menu"
            className=" cursor-pointer block md:cursor-none md:hidden p-2 text-white transition-colors  duration-300 hover:bg-white/20"
          >
            <HiBars3 size={34} />
          </button>
          <nav className="absolute bottom-0 hidden md:block mb-3 left-0  w-full top-30  text-center  align-middle" aria-label="Main Navigation">
          {settings.data.navigation_link.map((link) => (
            <TransitionLink
              field={link}
              key={link.key}
              className="border-b border-t border-logofontcolor text-sm py-1 px-2 mt-10 font-semibold text-black uppercase hover:bg-logohovercolor hover:text-gray-300 mx-2"
              
            />
          ))}
         
        </nav>

          <div className="absolute right-0 md:left-1/2 md:-translate-x-1/2 md:transform -mt-9 ">
          
            <TransitionLink href="/" className="min-w-44 z-50 items-center flex justify-center">
             <Image
                src="/meganlogo3.png"
                alt="Megan The Midwife Logo"
                width={150}
                height={90}
                className="w-30 md:block md:w-40 mt-9"
              />
            </TransitionLink>
          </div>

           <div className="flex ">
             <div className="pt-4 ">
              {settings.data.social_links.map((soc)=>(
                <div key={soc.key} className="text-logofontcolor inline-flex" style={{color:"logofontcolor"}}>
                  <NavIcon icon={String(soc?.text)} className="text-logofontcolor"/>
                </div>
              ))}
            </div>
          </div> 
        </div>
      </div>

      <div
        className={clsx(
          "nav-drawer-blur fixed inset-0 z-40 bg-black/40 opacity-0 transition-all duration-500",
          isDrawerOpen
            ? "pointer-events-auto opacity-100 backdrop-blur-xs"
            : "pointer-events-none backdrop-blur-none",
        )}
        onClick={toggleDrawer}
        aria-hidden="true"
      />

      <div
        className={clsx(
          "nav-drawer fixed top-0 left-0 z-50 h-full w-72 bg-logocolor p-6 transition-transform duration-500",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal={isDrawerOpen}
      >
        

              <Image
                src="/meganlogo3.png"
                alt="Megan The Midwife Logo"
                width={300}
                height={100}
                className="w-300 m-auto"
              />
        <div className="mb-6 flex justify-end">
          <button
            className="p-2 text-white transition-colors duration-300 hover:bg-white/10"
            onClick={toggleDrawer}
            aria-label="Close Menu"
            tabIndex={isDrawerOpen ? 0 : -1}
          >
            <HiXMark size={24} />
          </button>
        </div>

        <nav className="space-y-4" aria-label="Main Navigation">
          {settings.data.navigation_link.map((link) => (
            <TransitionLink
              field={link}
              onClick={() => setIsDrawerOpen(false)}
              key={link.key}
              className="block border-b border-white/10 py-2 text-xl font-semibold tracking-wide text-white uppercase hover:text-gray-300"
              tabIndex={isDrawerOpen ? 0 : -1}
            />
          ))}
         
        </nav>
      </div>
    </header>
  );
};