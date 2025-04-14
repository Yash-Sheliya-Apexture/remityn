// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// // import globel from "../../../../public/assets/images/globel.webp";

// const MissionSection: React.FC = () => {
//   return (
//     <section className="mission-section lg:pt-52 pt-12 pb-12 relative">
//       <div className="container mx-auto px-4">
//         <div className="inline-flex justify-center items-center w-full">
//           <Image
//             src="/assets/images/globel.webp"
//             alt="globel"
//             width={500}
//             height={500}
//             className="absolute lg:w-[500px] w-[300px] mt-10"
//             priority
//           />
//         </div>
//         <div className="p-10 bg-green dark:bg-background rounded-4xl text-lightgreen dark:text-primary">
//           <div className="text-center max-w-5xl mx-auto space-y-6 lg:mt-50 mt-30">
//             <h1 className="text-3xl md:text-6xl xl:text-8xl font-black font-mont uppercase tracking-tight">
//               Meet money without borders
//             </h1>
//             <p className="text-white dark:text-gray-300 font-medium lg:text-xl text-lg">
//               We’re building the best way to move and manage the world’s money.
//               Min fees. Max ease. Full speed.
//             </p>
//           </div>
//           <div className="text-center mt-8">
//             <button className="bg-primary hover:bg-primaryhover text-mainheading text-lg font-medium rounded-full px-6 py-3 h-14 transition-colors duration-300 ease-in-out">
//               <Link href="/" className="text-green font-medium">
//                 Learn about our mission
//               </Link>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MissionSection;

// import React from "react";

// const MissionSection = () => {
//   return <div>dfbhdfzdf</div>;
// };

// export default MissionSection;


import Image from "next/image";
import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

// Define the component using React's FunctionComponent type (React.FC)
const MobileDownloadSection: React.FC = () => {
  return (
    <div className="py-10 bg-[#F2F4F7] dark:bg-background">
      <section
        className="flex flex-col gap-8 md:gap-6 lg:flex-row lg:items-center lg:justify-between container mx-auto px-4"
        id="mobile-download"
      >
        {/* Left Column: Text content and download buttons */}
        <article className="flex flex-col gap-4 md:gap-10 lg:w-1/2">
          {/* User avatars and star rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-2">
              <Image
                src="/assets/images/Tom.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="md:size-10 size-7 rounded-full border-2 border-white"
                style={{ color: "transparent" }}
              />
              <Image
                src="/assets/images/Lisa-Carter.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="md:size-10 size-7 rounded-full border-2 border-white"
                style={{ color: "transparent" }}
              />
              <Image
                src="/assets/images/Amelia.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="md:size-10 size-7 rounded-full border-2 border-white"
                style={{ color: "transparent" }}
              />
              <Image
                src="/assets/images/Hannah.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="md:size-10 size-7 rounded-full border-2 border-white"
                style={{ color: "transparent" }}
              />
              <Image
                src="/assets/images/Jake.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="md:size-10 size-7 rounded-full border-2 border-white"
                style={{ color: "transparent" }}
              />
            </div>

            {/* Star rating and user count */}
            <div className="space-y-1.5">
              <div className="flex">
                {/* SVG Star Icons (remain the same) */}
                <FaStar className="size-5 text-yellow-500 dark:text-white" />
                <FaStar className="size-5 text-yellow-500 dark:text-white" />
                <FaStar className="size-5 text-yellow-500 dark:text-white" />
                <FaStar className="size-5 text-yellow-500 dark:text-white" />
                <FaStarHalfAlt className="size-5 text-yellow-500 dark:text-white" />
              </div>
              <p className="text-xs font-normal text-mainheading dark:text-white capitalize">
                Join +500 happy users
              </p>
            </div>
          </div>

          {/* Text Content: Heading and Paragraph */}
          <div className="flex flex-col md:gap-5">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
              Send Money to India
              <span className="text-primary"> with Wise </span>
            </h1>

            <p className="lg:text-lg sm:text-base text-sm font-medium text-mainheading leading-relaxed dark:text-gray-300 mt-5">
              Wise makes sending money to India simple, reliable, and
              stress-free. Whether you're supporting your family, paying for
              education, or managing personal commitments, we ensure your money
              reaches where it matters most — quickly and securely
            </p>
          </div>
        </article>

        {/* Right Column: Phone Image */}
        <aside className="flex flex-1 items-center justify-center">
          <div className="relative flex aspect-square w-full flex-shrink-0 justify-center overflow-hidden rounded-bl-lg rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-white dark:bg-white/5  dark:border pt-12 md:h-[572px] md:w-[583px] md:rounded-bl-[30px] md:rounded-br-[120px] md:rounded-tl-[120px] md:rounded-tr-[30px]">
            <Image
              src="/assets/images/Send-Monyes.svg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="z-10 flex-shrink-0 md:h-[550px] md:w-[312px]"
              style={{ color: "transparent" }}
            />
            <Image
              src="/assets/images/curve-1.svg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="absolute bottom-0 left-0 right-0 z-10 w-full"
              style={{ color: "transparent" }}
            />
            <Image
              src="/assets/images/curve-2.svg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="absolute bottom-0 left-0 right-0 w-full "
              style={{ color: "transparent" }}
            />
          </div>
        </aside>
      </section>
    </div>
  );
};

// Export the component for use in other parts of your application
export default MobileDownloadSection;
