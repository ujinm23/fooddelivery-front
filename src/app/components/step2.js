"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import BackButton from "./BackButton";

export default function Step2({ increaseStep, reduceStep, email }) {
  console.log("▶️ STEP2 RECEIVED EMAIL =", email);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  let strength = "weak";
  if (password.length >= 8 && hasLetters && hasNumbers && hasSpecial) {
    strength = "strong";
  } else if (password.length >= 6 && hasLetters && hasNumbers) {
    strength = "medium";
  }

  const isValid = password.length >= 6 && password === confirm && hasSpecial;
  const error = touched && !isValid;

  // ✅ ШИНЭ ЗӨВ SIGNUP CALL
  const handleFinishSignUp = async () => {
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:999/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Sign up failed");
        return;
      }

      increaseStep(); // success
    } catch (err) {
      setErrorMsg("Server error. Try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex items-center justify-center w-1/2">
        <div className="w-full max-w-[416px] mb-6">
          <div className="mb-6">
            <BackButton onClick={reduceStep} />
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
            className={`${
              error ? "border-red-300 focus-visible:ring-red-300" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <div className="relative h-5">
            {password.length > 0 && (
              <p
                className={`text-sm ${
                  strength === "weak"
                    ? "text-red-300"
                    : strength === "medium"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {strength === "weak" && "Weak password (too easy)"}
                {strength === "medium" && "Medium password strength"}
                {strength === "strong" && "Strong password"}
              </p>
            )}
          </div>

          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            className={`${
              error ? "border-red-300 focus-visible:ring-red-300" : ""
            }`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <div className="relative h-5 mb-4">
            {error && (
              <p className="text-red-300 text-sm">
                Those passwords didn’t match, try again
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Checkbox id="show" onCheckedChange={(v) => setShow(v)} />
            <label
              htmlFor="show"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Show password
            </label>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
          )}

          <Button
            onClick={handleFinishSignUp}
            disabled={!isValid}
            className={`w-full cursor-pointer mb-6 ${
              isValid ? "bg-black text-white" : "bg-gray-300 text-gray-500"
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
