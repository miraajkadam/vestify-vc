import React from "react";

interface Step {
  name: string;
  component: React.ComponentType<any> | null;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          <span className="text-xs mt-1 text-[#667185]">{step.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
