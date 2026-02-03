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
      
    ><div id="contactform">
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />

      {/* <AnimatedContent>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
                {children}
              </h2>
            ),
          }}
        />
      </AnimatedContent> */}
      <div className="mt-16 grid items-center gap-8  border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-2 lg:gap-0 lg:py-12">
        <div className="bg-logocolor p-6">
          
          <div className="mt-6 text-3xl md:text-6xl font-display text-logofontcolor">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div className="prose prose-invert mt-4 max-w-xl text-gray-900">
            <PrismicRichText field={slice.primary.description} />
             <p className="grid grid-cols-2 p-4 bg-logocolor text-logofontcolor text-2xl font-bold">
                          <span className="inline-block my-3 align-middle text-center"><a href="#contactform" > <MdEmail className="inline-block"/> {slice.primary.email}
            </a></span><span className="inline-block my-3 align-middle text-center"><a href={`${slice.primary.phone}`}><FaPhoneSquareAlt className="inline-block" /> {slice.primary.phone}</a></span></p>
          </div>
        </div>

        <form className="container">
          <div className="email grid grid-cols-3 align-middle items-center border-b-2 border-gray-500">
            <label htmlFor="frm-email" className="col-span-3 md:col-span-1  text-center w-full  md:text-left border-2 border-gray-200  bg-gray-800 mt-3 pl-4 pr-3 md:border-0 md:bg-logohovercolor">Email</label>
            <input 
              type="email" 
              id="frm-email" 
              name="frm-email"
              autoComplete="email"
              placeholder="email"
              required
               className="col-span-3 md:col-span-2  text-gray-900"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
          </div>
          <div className="phone grid grid-cols-3 align-middle items-center border-b-2 border-gray-500">
            <label htmlFor="frm-phone" className="col-span-3 md:col-span-1  text-center w-full  md:text-left border-2 border-gray-200  bg-gray-800 mt-3 pl-4 pr-3 md:border-0 md:bg-logohovercolor">Phone</label>
            <input 
              type="phone" 
              id="frm-phone" 
              name="frm-phone"
              autoComplete="phone"
              placeholder="phone"
              required
              className="col-span-3 md:col-span-2  text-gray-900"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              />
          </div>
          <div className="first-name grid grid-cols-3 align-middle items-center border-b-2 border-gray-500">
            <label htmlFor="frm-first-name" className="col-span-3 md:col-span-1  text-center w-full  md:text-left border-2 border-gray-200 bg-gray-800 mt-3 pl-4 pr-3 md:border-0 md:bg-logohovercolor">First Name </label>
            <input 
              type="first-name" 
              id="frm-first-name" 
              name="frm-first-name"
              autoComplete="first-name"
              placeholder="first-name"
              required
              className="col-span-3 md:col-span-2  text-gray-900"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              />
          </div>
          <div className="last-name grid grid-cols-3 align-middle items-center border-b-2 border-gray-500">
            <label htmlFor="frm-last-name" className="col-span-3 md:col-span-1  text-center w-full  md:text-left border-2 border-gray-200  bg-gray-800 mt-3  pl-4 pr-3 md:border-0 md:bg-logohovercolor">Last Name</label>
            <input 
              type="last-name" 
              id="frm-last-name" 
              name="frm-last-name"
              autoComplete="last-name"
              placeholder="last-name"
              required
              className="col-span-3 md:col-span-2   text-gray-900 "
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              />
          </div>
      <div className="last-name grid grid-cols-3 align-middle items-center">
        <label htmlFor="frm-message" className="col-span-3  pl-4 pr-3 md:col-span-1  text-center w-full  md:text-left border-2 border-gray-200  bg-gray-800 mt-3 md:border-0 md:bg-logohovercolor">Message</label>
        <textarea id="frm-message" className="col-span-3 md:col-span-2  text-gray-900" rows={6} name="message" onChange={(e)=>setMessage(e.target.value)} value={message}/>
      </div>
      <div className="button flex w-full">
        <button type="submit" className="w-full border-2 border-gray-200  py-4 bg-gray-400 hover:bg-gray-600 mt-4">Submit</button>
      </div>

        </form>

      </div>
      </div>
    </Bounded>
  );
};

export default ContactForm;