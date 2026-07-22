"use client";

import { useState } from "react";
import { OrderProvider } from "@/context/OrderContext";
import CustomerStep from "./steps/CustomerStep";
import LineItemsStep from "./steps/LineItemsStep";
import ReviewStep from "./steps/ReviewStep";

const STEPS = ["customer", "items", "review"] as const;
type Step = (typeof STEPS)[number];

export default function SalesOrderForm() {
  const [currentStep, setCurrentStep] = useState<Step>("customer");

  const goNext = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) setCurrentStep(STEPS[idx + 1]);
  };

  const goBack = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) setCurrentStep(STEPS[idx - 1]);
  };

  return (
    <OrderProvider>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex-1 h-1 rounded ${
                STEPS.indexOf(currentStep) >= i ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {currentStep === "customer" && <CustomerStep onNext={goNext} />}
        {currentStep === "items" && (
          <LineItemsStep onNext={goNext} onBack={goBack} />
        )}
        {currentStep === "review" && <ReviewStep onBack={goBack} />}
      </div>
    </OrderProvider>
  );
}
