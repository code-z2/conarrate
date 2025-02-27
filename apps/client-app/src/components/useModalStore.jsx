import { useState } from "react";

export const useModalStore = () => {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(50); // Default slider value

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return {
    step,
    topic,
    setTopic,
    description,
    setDescription,
    amount,
    setAmount,
    nextStep,
    prevStep,
  };
};
