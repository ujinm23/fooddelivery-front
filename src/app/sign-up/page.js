"use client";

import { useState } from "react";
import Step1 from "../components/step1";
import Step2 from "../components/step2";
import Step3 from "../components/step3";
export default function Page() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
  });

  const increaseStep = (data) => {
    if (data) {
      console.log("📥 INCREASE STEP DATA =", data);

      setFormData((prev) => {
        const updated = { ...prev, ...data };
        console.log("📦 UPDATED FORMDATA =", updated);
        return updated;
      });
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
      {step === 3 && <Step3 reduceStep={reduceStep} />}
    </div>
  );
}
