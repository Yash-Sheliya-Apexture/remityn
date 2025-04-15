import React from "react";

// Define an interface for the feature data structure for type safety
interface FeatureItem {
  title: string;
  description: string;
}

// Array containing the data for the feature boxes
const featuresData: FeatureItem[] = [
  {
    title: "Global reach",
    description:
      "Send and receive money across 200+ countries and territories in over 170+ currencies. Receiving your money is easy. Connect a bank account or opt for cash pick-up at one of our 500,000 locations worldwide.",
  },
  {
    title: "Transparent prices",
    description:
      "With our transparent rates, you’ll always be in the know. You’ll never have to worry about surprises or sneaky deductions with our competitive exchange rates and minimal fees.",
  },
  {
    title: "Fast and reliable transfers",
    description:
      "We understand the value of your hard-earned money. That’s why we prioritize safe and speedy transfers. Send money within seconds and your recipient will receive it within 1-5 days.",
  },
  {
    title: "Easy to use",
    description:
      "Our app and website are designed with your financial needs in mind. Our currency tools and resources assist you in managing your money. Need extra help? Our customer service team is here to support you.",
  },
];

const XeFeaturesSection: React.FC = () => {
  return (
    <div className="bg-[#f2f4f7] dark:bg-background py-5 md:py-10">
      {" "}
      {/* Optional background, adjust padding */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            millions choose Xe
          </h2>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-mainheading dark:text-white mt-6">
            Find out why <span className="text-primary"></span>
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            For over 30 years, Xe Corporation Inc. customers have been trusting
            us to manage and send international money transfers. It's what we
            do.
          </p>
        </div>
        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-20">
          {featuresData.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white p-8 shadow-md" // Card styling: rounded corners, white background, padding, shadow
            >
              <h3 className="text-xl font-semibold leading-7 text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default XeFeaturesSection;
