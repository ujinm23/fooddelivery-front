"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BackButton from "./BackButton";

export function Step3({ increaseStep, reduceStep }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const validEmail = /^\S+@\S+\.\S+$/.test(email);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex items-center justify-center w-1/2">
        <div className="w-full max-w-[416px]">
          <div className="mb-6">
            <BackButton onClick={reduceStep} />{" "}
          </div>

          <div className="mb-6">
            <h1 className="font-semibold text-2xl">Create your account</h1>
            <p className="text-[#71717A]">
              Sign up to explore your favorite dishes.
            </p>
          </div>

          {/* <div className="h-5 mb-4">
            {!validEmail && touched && (
              <p className="text-red-500 text-sm">
                Invalid email. Use a format like example@email.com
              </p>
            )}
          </div> */}

          {/* BUTTON */}
          <Button
            onClick={increaseStep} // ← HERE
            disabled={!validEmail}
            className={`w-[416px] h-9 mb-6 
              ${
                validEmail
                  ? "bg-[#18181B] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Let&apos;s Go
          </Button>

          <p className="text-[#71717A] text-center">
            Already have an account?{" "}
            <span className="text-[#2563EB] cursor-pointer">Log in</span>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-1/2 flex items-center justify-center p-4">
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
