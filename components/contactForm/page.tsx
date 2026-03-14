'use client'
import React, { useState } from 'react'

export default function ContactForm() {
    const [loading, setLoading] = useState<boolean>(false)
      async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData(e.currentTarget);
            // const name = formData.get("name");
            // const email = formData.get("email");
            await fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                text: formData.get("text"),
            }),
            });
            setLoading(false);
            alert("Email sent successfully!");
  }
  return (
    <main className="p-10">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="w-full p-2 border border-gray-300 bg-gray-200 rounded text-gray-900"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 bg-gray-200 rounded text-gray-900"
        />
        <textarea
          name="text"
          placeholder="Enter your message"
          className="w-full p-2 border border-gray-300 bg-gray-200 rounded text-gray-900"
        />  
        <button
          disabled={loading}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"

        >
          {loading ? "Sending..." : "Send Email To Megan"}
        </button>
      </form>

    </main>
  )
}
