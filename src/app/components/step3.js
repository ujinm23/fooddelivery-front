"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import BackButton from "./BackButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MailIcon } from "lucide-react";

export default function Step3({ increaseStep, reduceStep }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const validEmail = /^\S+@\S+\.\S+$/.test(email);

 const handleNext = async () => {
  setError("");

  try {
    const res = await fetch("http://localhost:999/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Invalid email or password");
      return;
    }

    // Амжилттай бол step нэмэгдэнэ
    increaseStep();

  } catch (err) {
    setError("Server error. Try again.");
  }
};


  return (
    <div className="flex h-screen overflow-hidden">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center w-1/2 bg-white">
        <div className="w-full max-w-[416px]">

          {/* BACK BUTTON */}
          <div className="mb-6">
            <BackButton onClick={() => reduceStep(2)} />
          </div>

          {/* TITLE */}
          <div className="mb-6">
            <h1 className="font-semibold text-2xl">Log in</h1>
            <p className="text-[#71717A]">
              Finish your setup.
            </p>
          </div>

          {/* EMAIL INPUT */}
          <div className="relative mb-3">
             <Input
              type="email"
              placeholder="Enter your email"
              className={` w-[416px] ${
                !validEmail && touched
                  ? "border-red-300 focus-visible:ring-red-300"
                  : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="mb-1">
            <Input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-[416px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ERRORS */}
          <div className="h-2 mb-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {!validEmail && touched && (
              <p className="text-red-300 text-sm">
                Invalid email format.
              </p>
            )}
          </div>

          {/* SHOW PASSWORD */}
          <div className="flex items-center gap-2 mb-6">
            <Checkbox id="show" checked={show} onCheckedChange={setShow} />
            <label htmlFor="show" className="text-sm text-gray-600 cursor-pointer">
              Show password
            </label>
          </div>

          {/* BUTTON */}
          <Button
            onClick={handleNext}
            disabled={!validEmail || !password}
            className={`w-[416px] h-9 mb-6 cursor-pointer ${
              validEmail && password
                ? "bg-[#18181B] text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Continue
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="w-1/2 h-full p-3">
        <img
          src="/Delivery.svg"
          alt="auth illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
