"use client";

// --- FIX #1 & #2: Corrected the React import. Hooks go inside curly braces. ---
import React, { useState, useEffect, useRef } from "react";
import {
  SignUpGraphic,
  CurrencyWalletGraphic,
  RecipientsGraphic,
  SendMoneyGraphic,
} from "./HowItWorksGraphics";

// Define the type for a single step
interface Step {
  id: number;
  title: string;
  description: string;
  Graphic: React.FC; // A component for the visual part
}

// Data for the steps
const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up and Get Verified",
    description:
      "Quickly create your account and complete secure KYC verification in minutes.",
    Graphic: SignUpGraphic,
  },
  {
    id: 2,
    title: "Create a Currency Wallet",
    description:
      "Create your currency wallet and easily add funds with bank transfer.",
    Graphic: CurrencyWalletGraphic,
  },
  {
    id: 3,
    title: "Add Your Recipient",
    description:
      "Add recipient details securely and manage multiple beneficiaries effortlessly.",
    Graphic: RecipientsGraphic,
  },
  {
    id: 4,
    title: "Transfer Money",
    description: "Transfer money confidently and track each transaction in real time from wallet to recipient.",
    Graphic: SendMoneyGraphic,
  }
];

const HowItWorksSection = () => {
  // State to track the currently active step
  const [activeStep, setActiveStep] = useState<number>(1);

  // Refs to hold a map of step IDs to their DOM elements
  const stepRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = Number(entry.target.getAttribute("data-step-id"));
          if (stepId) setActiveStep(stepId);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    stepRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="StepSection sm:py-16 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Sticky Column */}
          <div className="lg:sticky lg:top-20 h-max lg:max-w-xl max-w-full">
            <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite">
              Send Money in{" "}
              <span className="text-primary">4 Simple Steps</span>
            </h3>
            <p className="text-subheadingWhite md:text-lg text-base">
              Send money quickly and securely in just four easy steps. From setting up your account to your recipient receiving funds in India, our streamlined process ensures a smooth and hassle-free experience.
            </p>
          </div>

          {/* Right Scrolling Column */}
          <div className="flex flex-col sm:gap-16 gap-10">
            {steps.map((step) => (
              <div
                key={step.id}
                // --- FIX #3: Added a type for the 'el' parameter in the ref callback ---
                // Correct: The curly braces create a function body with no return value (void)
                ref={(el: HTMLDivElement | null) => {
                  stepRefs.current.set(step.id, el);
                }}
                data-step-id={step.id}
                className={`sm:p-8 p-4 rounded-4xl bg-primary-foreground`}
              >
                <div className="space-y-4">
                    <span className="rounded-full bg-background px-3 py-1 text-sm font-semibold text-primary">
                        Step {step.id}
                    </span>
                    <h3 className="sm:text-3xl text-2xl font-semibold text-mainheadingWhite mt-4">
                        {step.title}
                    </h3>
                    <p className="sm:text-lg text-base text-subheadingWhite">
                        {step.description}
                    </p>
                </div>

                <step.Graphic />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
