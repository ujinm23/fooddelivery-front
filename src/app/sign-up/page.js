"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1 from "../components/step1";
import Step2 from "../components/step2";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
  });

  const increaseStep = (data) => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }));
    }

    if (step === 2) {
      // Sign-up success → Login page руу явуулна
      router.push("/login");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const reduceStep = () => setStep((prev) => prev - 1);

  return (
    <div className="w-screen h-screen justify-center items-center flex">
      {step === 1 && <Step1 increaseStep={increaseStep} />}
      {step === 2 && (
        <Step2
          increaseStep={increaseStep}
          reduceStep={reduceStep}
          email={formData.email}
        />
      )}
    </div>
  );
}
