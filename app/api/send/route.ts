import {NextResponse} from 'next/server';
import {Resend} from 'resend';

export async function GET(){
    const resend = new Resend(process.env.RESEND_API_KEY);
    try{
        const data = await resend.emails.send({
            from:'meganthemidwife@outlook.com',
            to:'r.mill@ntlworld.com',
            subject:'Test Email',
            html:'<h1>Hello World</h1>'
        })
        return NextResponse.json({message: "DATA"+data.data?.id});
    }
    catch(error){
        return NextResponse.json({error: 'Something went wrong'}, {status: 500});
    }
}