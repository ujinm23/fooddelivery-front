"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import BackButton from "./BackButton";

import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Step1({ increaseStep }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const validEmail = /^\S+@\S+\.\S+$/.test(email);

  const handleNext = async () => {
    setError("");
    console.log("Step1 INCREASE email =", email);

    try {
      const res = await fetch("http://localhost:999/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      increaseStep({ email });
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex items-center justify-center w-1/2">
        <div className="w-full max-w-[416px]">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="mb-6">
            <h1 className="font-semibold text-2xl">Create your account</h1>
            <p className="text-[#71717A]">
              Sign up to explore your favorite dishes.
            </p>
          </div>

          <div className="relative mb-2">
            <MailIcon
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 
              ${!validEmail && touched ? "text-red-300" : "text-[#71717A]"}`}
            />

            <Input
              type="email"
              placeholder="Enter your email"
              className={`pl-10 w-[416px] ${
                !validEmail && touched
                  ? "border-red-300 focus-visible:ring-red-300"
                  : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
            />
          </div>

          <div className="h-5 mb-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {!validEmail && touched && (
              <p className="text-red-300 text-sm">
                Invalid email. Use a format like example@email.com
              </p>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!validEmail}
            className={`w-[416px] h-9 mb-6 cursor-pointer
              ${
                validEmail
                  ? "bg-[#18181B] text-white"
                  : "bg-gray-300 text-gray-500"
              }
            `}
          >
            Let&apos;s Go
          </Button>

          <p className="text-[#71717A] text-center">
            Already have an account?{" "}
            <span className="text-[#2563EB] cursor-pointer">Log in</span>
          </p>
        </div>
      </div>

      <div className="w-1/2 h-full p-3 ">
        <img
          src="/Delivery.svg"
          alt="auth illustration"
          className="w-[2440px] h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
