// import React from "react";
// import Link from 'next/link';
// import { LuUser, LuMail, LuPhone } from "react-icons/lu";
// import { IoIosArrowForward } from "react-icons/io";



// export default function PersonalDetails() {
//   return (
//     <section className="personal-details py-10">
//       <div className="container-mx-auto">
//         <h2 className="text-3xl text-main font-semibold">Personal details</h2>
        
//         <div className="mt-8 space-y-2">
//             {/* user account */}
//             <div>
//               <Link href="accout">
//                 {/* Wrap with Link */}
//                 <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder rounded-full p-3 ">
//                     <LuUser  size={24} className="text-main" />
//                   </div>

//                   <div className="flex-grow">
//                     <span className="font-semibold text-main">Complete your account</span>
//                     <div className=" text-gray text-sm">
                     
//                     </div>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div>
//                     <IoIosArrowForward size={20} className="text-gray" />
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* user Email */}
//             <div>
//               <Link href="change-email">
//                 {/* Wrap with Link */}
//                 <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder rounded-full p-3 ">
//                     <LuMail size={24} className="text-main" />
//                   </div>

//                   <div className="flex-grow">
//                     <span className="font-semibold text-main">Email Address</span>
//                     <div className=" text-gray text-sm">
//                         kartavyatech@gmail.com
//                     </div>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div>
//                     <IoIosArrowForward size={20} className="text-gray" />
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* user phone no */}
//             <div>
//               <Link href="change-email">
//                 {/* Wrap with Link */}
//                 <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
//                   {/* Icon Container */}
//                   <div className="bg-lightborder rounded-full p-3 ">
//                     <LuMail size={24} className="text-main" />
//                   </div>

//                   <div className="flex-grow">
//                     <span className="font-semibold text-main">Phone number</span>
//                     <div className=" text-gray text-sm">
//                         +919265348797
//                     </div>
//                   </div>

//                   {/* Right Arrow Icon */}
//                   <div>
//                     <IoIosArrowForward size={20} className="text-gray" />
//                   </div>
//                 </div>
//               </Link>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// }







import React from "react";
import Link from 'next/link';
import { LuUser, LuMail, LuPhone } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";

export default function PersonalDetails() {
  // Assume you have a way to check if the user's account is verified and complete
  // For this example, let's use a boolean variable.
  const isAccountComplete = true; // Replace with your actual logic to check account completion

  return (
    <section className="Personal-Details py-10">
      <div className="container-mx-auto">
        <h2 className="text-3xl text-main font-semibold">Personal details</h2>

        <div className="mt-8 space-y-2">
          {/* user account */}
          <div>
            <Link href={isAccountComplete ? "change-personal-details" : "/dashboard"}>
              {/* Wrap with Link */}
              <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
                {/* Icon Container */}
                <div className="bg-lightborder rounded-full p-3 ">
                  <LuUser size={24} className="text-main" />
                </div>

                <div className="flex-grow">
                  <p className="font-semibold text-main">
                    {isAccountComplete ? "Personal Information" : "Complete your account"}
                  </p>
                  <p className=" text-gray text-sm">
                    {isAccountComplete ? "Manage your personal information" : ""}
                  </p>
                </div>

                {/* Right Arrow Icon */}
                <div>
                  <IoIosArrowForward size={20} className="text-gray" />
                </div>
              </div>
            </Link>
          </div>

          {/* user Email */}
          <div>
            <Link href="change-email">
              {/* Wrap with Link */}
              <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
                {/* Icon Container */}
                <div className="bg-lightborder rounded-full p-3 ">
                  <LuMail size={24} className="text-main" />
                </div>

                <div className="flex-grow">
                  <p className="font-semibold text-main">Email Address</p>
                  <p className=" text-gray text-sm">
                    kartavyatech@gmail.com
                  </p>
                </div>

                {/* Right Arrow Icon */}
                <div>
                  <IoIosArrowForward size={20} className="text-gray" />
                </div>
              </div>
            </Link>
          </div>

          {/* user phone no */}
          <div>
            <Link href="change-email">
              {/* Wrap with Link */}
              <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out cursor-pointer">
                {/* Icon Container */}
                <div className="bg-lightborder rounded-full p-3 ">
                  <LuPhone size={24} className="text-main" />
                </div>

                <div className="flex-grow">
                  <p className="font-semibold text-main">Phone number</p>
                  <p className=" text-gray text-sm">
                    +919265348797
                  </p>
                </div>

                {/* Right Arrow Icon */}
                <div>
                  <IoIosArrowForward size={20} className="text-gray" />
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}