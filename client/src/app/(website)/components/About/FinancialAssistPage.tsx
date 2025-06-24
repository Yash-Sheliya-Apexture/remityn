import Link from "next/link";
import Image from "next/image";
import React from "react";

// SVG Icons (Heroicons or similar would be great here, but for simplicity, using basic inline SVGs)

const QuestionMarkCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    />
  </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0L13.5 19.5M21 12H3"
    />
  </svg>
);

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"
    />
  </svg>
);

const VideoCameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z"
    />
  </svg>
);

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

interface MessageBubbleProps {
  text: string;
  sender: "sophie" | "john";
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  sender,
  className,
}) => {
  const isSophie = sender === "sophie";
  return (
    <div
      className={`flex ${isSophie ? "justify-start" : "justify-end"} ${
        className || ""
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isSophie
            ? "bg-neutral-700 text-white rounded-br-lg" // Original image Sophie bubble looks more like rounded-xl with slight difference
            : "bg-neutral-200 text-neutral-800 rounded-bl-lg"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

const FinancialAssistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row items-center justify-center p-4 lg:p-0">
      {/* Left Side: Phone Mockup */}
      <div className="w-full lg:w-1/2  flex justify-center items-center p-4 md:p-8 relative">
        <Image
          src="/assets/images/fingerchat.png" // Use the imported image object
          alt="Phone displaying a chat interface with a finger pointing to it" // Improved alt text
          height={700}
          width={700}
        />
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 text-left">
        <div className="flex items-center space-x-2 text-sm text-subheadingWhite mb-4">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          <span>WHY US?</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight capitalize">
          We go the extra mile to
          <br /> <span className="text-primary">financially assist you</span>
        </h1>


        <p className="text-neutral-300 mb-10 text-base md:text-lg max-w-md">
          Lorem ipsum dolor sit amet consectetur id urna vulputate condimentum
          aliquam odio in pellentesque pharetra.
        </p>

        <Link href="/auth/login" className="bg-primary hover:bg-primaryhover cursor-pointer text-mainheading font-medium py-3 px-6 rounded-full flex items-center space-x-3 group transition-all duration-150 ease-linear">
          <span>OPEN YOUR ACCOUNT</span>
        </Link>

      </div>
    </div>
  );
};

export default FinancialAssistPage;
