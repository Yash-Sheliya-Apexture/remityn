// MoneyTransferSteps.tsx
import React from "react";

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="bg-white dark:bg-background dark:border p-8 rounded-2xl">
      <div className="text-primary size-14 bg-primary rounded-full flex items-center justify-center">
        <span className="text-mainheading font-bold text-2xl">{number}</span>
      </div>    

      <h3 className="text-xl font-semibold text-main dark:text-white mt-5">
        {title}
      </h3>

      <p className="text-mainheading dark:text-gray-300 leading-relaxed mt-5">
        {description}
      </p>
    </div>
  );
};

const MoneyTransferSteps: React.FC = () => {
  const steps: StepProps[] = [
    {
      number: "1",
      title: "Sign up for free",
      description:
        "It only takes a few minutes—all you need is an email address, and you're ready to get started.",
    },
    {
      number: "2",
      title: "Get a quote",
      description:
        "Choose your destination country, send & recipient currency, and send amount to generate a quote.",
    },
    {
      number: "3",
      title: "Add your recipient",
      description:
        "Provide your recipient's payment information (you'll need details like their name and address).",
    },
    {
      number: "4",
      title: "Verify your identity",
      description:
        "For some transfers, we may need identifying documents to confirm it's really you and keep your money safe.",
    },
    {
      number: "5",
      title: "Confirm the quote",
      description:
        "Confirm and fund your transfer with a bank account, credit card, or a debit card and you're done!",
    },
    {
      number: "6",
      title: "Track your transfer",
      description:
        "See where your money is and when it arrives to your recipient. Get live chat, phone and email support.",
    },
  ];

  return (
    <div className="bg-[#f2f4f7] dark:bg-background dark:my-10">
      <div className="max-w-8xl px-4 container mx-auto">
        <h1 className="text-5xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
          How to send money
          <span className="text-primary"> online with Apexture </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferSteps;
