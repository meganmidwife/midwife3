"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const response = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setStatus("Email sent! Check your inbox.");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("Error sending email.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md p-4">
      <input name="name" placeholder="Name" required className="border p-2" />
      <input name="email" type="email" placeholder="Email" required className="border p-2" />
      <textarea name="message" placeholder="Message" required className="border p-2" rows={4} />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Send Message</button>
      <p>{status}</p>
    </form>
  );
}