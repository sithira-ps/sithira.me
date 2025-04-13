'use client';

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function Subscribe() {
    const [email, setEmail] = useState("");

    const onSubscribe = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
        toast.error("Email is required.");
        return;
    }

    if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
    }

    toast.success(
    <>
        Successfully subscribed with <b>{email}</b>
    </>
    );
    setEmail("");
  };

  return (
    <div className="max-w-96 mx-auto my-12">
      <p className="mb-2 text-sm">Subscribe to the newsletter</p>
      <div className="flex gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-cyan-500"
        />
        <Button
        disabled={email.trim().length == 0}
          className="bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-none focus:ring-0"
          onClick={onSubscribe}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}
