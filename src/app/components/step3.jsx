"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BackButton from "./BackButton";
import { MailIcon } from "lucide-react"; // ← Import missing байсан

export function Step3({ increaseStep, reduceStep }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState(false);

  const validEmail = /^\S+@\S+\.\S+$/.test(email);
  const isError = touched && password.length < 6;

  return (
    <div className="flex h-screen overflow-hidden">

    
      <div className="flex items-center justify-center w-1/2">
        <div className="w-full max-w-[416px]">

          <div className="mb-6">
            <BackButton onClick={reduceStep} />
          </div>

          <div className="mb-6">
            <h1 className="font-semibold text-2xl">Create your account</h1>
            <p className="text-[#71717A]">
              Sign up to explore your favorite dishes.
            </p>
          </div>

          <div className="relative mb-4">
          

            <Input
              type="email"
              placeholder="Enter your email"
              className={` ${
                !validEmail && touched
                  ? "border-red-300 focus-visible:ring-red-300"
                  : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
            />

              <div className="relative mb-2 h-4 ">
  {isError && (
    <p className="absolute left-0 top-0 text-red-500 text-sm">
invalid email. Use a format like example@email.com    </p>
  )}
</div>
          </div>

         
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            className={` ${
              isError ? "border-red-300 focus-visible:ring-red-300" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(true)}
          />


       <div className="relative mb-5 h-4">
  {isError && (
    <p className="absolute left-0 top-0 text-red-500 text-sm">
      incorrect password. Please try again.
    </p>
  )}
</div>

      
          <Button
            onClick={increaseStep}
            disabled={!validEmail || isError}
            className={`w-[416px] h-9 mb-6 ${
              validEmail && !isError
                ? "bg-[#18181B] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Let&apos;s Go
          </Button>

          <p className="text-[#71717A] text-center">
           Don't have an account?
            <span className="text-[#2563EB] cursor-pointer">Sign up</span>
          </p>

        </div>
      </div>

      
      <div className="w-1/2 p-4 flex items-center justify-center">
        <img
          src="/Delivery.svg"
          alt="auth illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

    </div>
  );
}

export default Step3;

