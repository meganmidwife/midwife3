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
      Icon = <FaFacebookSquare size={24} className="mx-2 text-white hover:text-gray-300" />;
      break;
    case "LinkedIn":
      Icon = <FaLinkedin size={24} className="mx-2 text-white hover:text-gray-300" />;
      break;
    case "Instagram":
      Icon = <FaInstagramSquare size={24} className="mx-2 text-white hover:text-gray-300" />;
      break;
    case "WhatsApp":
      Icon = <FaSquareWhatsapp size={24} className="mx-2 text-white hover:text-gray-300" />;
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
    <header>
      <div className="navbar fixed top-0 left-0 z-50 w-full  text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          <button
            onClick={toggleDrawer}
            aria-label="Menu"
            className="cursor-pointer p-2 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <HiBars3 size={24} />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <TransitionLink href="/">
              <Image
                src="/logo.svg"
                alt="Megan The Midwife Logo"
                width={180}
                height={30}
                className="w-32 md:w-44"
              />
            </TransitionLink>
          </div>

          <div className="flex ">
            {/* <NavIcons className="hidden md:flex" /> */}
             <div className="pt-4 ">
            {settings.data.social_links.map((soc)=>(
              <div key={soc.key} className="text-white inline-flex">
                <NavIcon icon={String(soc?.text)}/>
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
          "nav-drawer fixed top-0 left-0 z-50 h-full w-72 bg-neutral-900 p-6 transition-transform duration-500",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal={isDrawerOpen}
      >
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