// components/ProtectionSection.tsx
import { FaUsers, FaLandmark, FaHeadset } from "react-icons/fa"; // Import icons from react-icons/fa (Font Awesome)

const ProtectionSection = () => {
  return (
    <section className="Protection-Section py-12">
      <div className="container mx-auto px-4">
        <div className="border-t border-green pt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Trusted by Millions */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mb-4">
              <FaUsers className="w-8 h-8 text-green" />{" "}
              {/* Use FaUsers icon */}
            </div>
            <h3 className="text-xl font-medium text-main mb-2">
              Trusted by millions
            </h3>
            <p className="text-gray">
              Millions of customers globally move around 1.1 trillion INR each
              month
            </p>
          </div>

          {/* Regulated */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mb-4">
              <FaLandmark className="w-8 h-8 text-green" />{" "}
              {/* Use FaLandmark icon */}
            </div>
            <h3 className="text-xl font-medium text-main mb-2">Regulated</h3>
            <p className="text-gray">
              Wise is approved by the{" "}
              <a href="#" className="text-green font-medium underline">
                Reserve Bank of India
              </a>{" "}
              in India
            </p>
          </div>

          {/* 24/7 Customer Support */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mb-4">
              <FaHeadset className="w-8 h-8 text-green" />{" "}
              {/* Use FaHeadset icon */}
            </div>
            <h3 className="text-xl font-medium text-main mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-gray">
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
