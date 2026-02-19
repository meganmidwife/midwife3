"use client";
import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";
import AnimatedContent from "./AnimatedContent";
import { JSX, useState } from "react";
import "./contact.css";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Contact from "@/components/Contact";

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
};

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
      
    >
      <div id="contactform">
      <div className="glow absolute -z-10 aspect-square rounded-full blur-3xl filter" />
  
     <div className="mt-16 grid items-center gap-4 lg:grid-cols-2 lg:gap-0 lg:py-5">
        <div className="bg-logocolor p-3 h-full">
          
          <div className="mt-6 text-3xl md:text-6xl font-display text-logofontcolor">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div className="prose prose-invert mt-4 max-w-xl text-gray-800">
            <PrismicRichText field={slice.primary.description} />
             <p className="grid grid-cols-1 md:grid-cols-2 p-4 bg-logocolor text-logofontcolor text-2xl">
            <span className="col-span-1 inline-block my-3 align-middle text-left md:text-center"><a href="#contactform" > <MdEmail className="inline-block"/> {slice.primary.email}
            </a></span><span className="col-span-1 inline-block my-3 align-middle text-left md:text-center"><a href={`${slice.primary.phone}`}><FaPhoneSquareAlt className="inline-block" /> {slice.primary.phone}</a></span></p>
          </div>
        </div>
        <div className=" p-4 bg-logocolor text-logofontcolor text-2xl">
          <Contact/>
        </div>
      </div>
      
      </div>
    </Bounded>
  );
};

export default ContactForm;