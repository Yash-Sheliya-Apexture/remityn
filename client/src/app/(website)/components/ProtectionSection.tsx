// components/ProtectionSection.tsx
import { FaUsers, FaLandmark, FaHeadset } from "react-icons/fa"; // Import icons from react-icons/fa (Font Awesome)

const ProtectionSection = () => {
  return (
    <section className="Protection-Section py-12">
      <div className="container mx-auto px-4">
        <div className="border-t  pt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Trusted by Millions */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-lightgray dark:bg-primarybox flex items-center justify-center">
              <FaUsers className="w-8 h-8 text-mainheading dark:text-primary" />{" "}
              {/* Use FaUsers icon */}
            </div>
            <h3 className="text-xl font-medium text-mainheading dark:text-white">
              Trusted by millions
            </h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              Millions of customers globally move around 1.1 trillion INR each
              month
            </p>
          </div>

          {/* Regulated */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-lightgray dark:bg-primarybox flex items-center justify-center">
              <FaLandmark className="w-8 h-8 text-mainheading dark:text-primary" />{" "}
              {/* Use FaLandmark icon */}
            </div>
            <h3 className="text-xl font-medium text-mainheading dark:text-white">Regulated</h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              Wise is approved by the{" "}
              <a href="#" className="text-mainheading dark:text-primary font-medium underline">
                Reserve Bank of India
              </a>{" "}
              in India
            </p>
          </div>

          {/* 24/7 Customer Support */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-lightgray dark:bg-primarybox flex items-center justify-center">
              <FaHeadset className="w-8 h-8 text-mainheading dark:text-primary" />{" "}
              {/* Use FaHeadset icon */}
            </div>
            <h3 className="text-xl font-medium text-mainheading dark:text-white">
              24/7 Customer Support
            </h3>
            <p className="text-gray-500 dark:text-gray-300 leading-relaxed">
              Get help from 1,000s of specialists any time over email, phone and
              chat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtectionSection;
