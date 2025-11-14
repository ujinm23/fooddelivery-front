"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/Checkbox";
import BackButton from "./BackButton";

export default function Step2({ increaseStep, reduceStep }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const isValid = password.length >= 6 && password === confirm;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex items-center justify-center w-1/2">
        <div className="w-full max-w-[416px] mb-6">
          <div className="mb-6">
            <BackButton onClick={reduceStep} />{" "}
          </div>

          <h1 className="font-semibold text-2xl mb-2">
            Create a strong password
          </h1>
          <p className="text-[#71717A] mb-6">
            Create a strong password with letters, numbers.
          </p>

          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm"
            className="mb-3"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <div className="flex items-center gap-2 mb-6">
            <Checkbox id="show" onCheckedChange={(v) => setShow(v)} />
            <label
              htmlFor="show"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Show password
            </label>
          </div>

          <Button
            onClick={increaseStep}
            disabled={!isValid}
            className={`w-full ${
              isValid
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Let&apos;s go
          </Button>
        </div>
      </div>

      {/* Right side image */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="/Delivery.svg"
          className="w-full h-full object-cover"
          alt="auth illustration"
        />
      </div>
    </div>
  );
}
