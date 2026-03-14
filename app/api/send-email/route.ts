import WelcomeEmail from "@/emails/welcome-email";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import { createElement } from "react";
import { Resend } from "resend";
 

const resend = new Resend(process.env.RESEND_API_KEY||"re_P1okkjyQ_CELMoDnW6e8pzbjMKVTYHa1B");



export async function POST(req: Request) { 
     const body = await req.json();
     console.log(body)
     const { name, email, text } = body;
     const emailElement = createElement(WelcomeEmail, { name, email, text });
     const html = await render(emailElement);
    try {
     

      if (!name || !email) {
        return NextResponse.json(
            { error: "Name and email are required" }, 
            { status: 400 }
        );
      }

      await resend.emails.send({
       
         from: 'Megan the Midwife  <onboarding@resend.dev>',
            to: ['meganthemidwife@outlook.com'],
            subject: 'hello world',
            html,
            replyTo: 'onboarding@resend.dev',
      });   

      return NextResponse.json({ message: `Email sent to ${name} at ${email}` }, { status: 200 });

    } catch (error) {
        console.log("SEND_EMAIL_ERROR:", error);
       return NextResponse.json({ error: "Invalid request body" }, { status: 500 });

    }
}