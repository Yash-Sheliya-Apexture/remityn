// import DashboardHeader from "@/app/components/layout/DashboardHeader";
// import React from "react";

// export default function ChangePersonalDetails() {
//   return (
//     <section className="change-personal-details pb-10">
//       <div className="container mx-auto ">
//         <div className="bg-white dark:bg-background w-full lg:max-w-lg ">
//           <DashboardHeader title="Tell us about yourself" />
//           <form className="space-y-6  ">
//             {/* Country of residence */}
//             <div>
//               <label
//                 htmlFor="country"
//                 className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//               >
//                 Country of residence
//               </label>
//               <div className="relative">
//                 <select
//                   id="country"
//                   name="country"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 >
//                   <option>India</option>
//                   <option>United States</option>
//                   <option>Canada</option>
//                   {/* Add more countries as needed */}
//                 </select>
//               </div>
//             </div>

//             {/* Personal details */}
//             <div className="space-y-6">
//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Personal details
//               </h3>

//               {/* Full legal first and middle name(s) */}
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Full legal first and middle name(s)
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   placeholder="Kartavya"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Full legal last name(s) */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Full legal last name(s)
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   placeholder="Patel"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Date of birth */}
//               <div>
//                 <h3
//                   className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"
//                 >
//                   Date of birth
//                 </h3>
//                 <div className="flex gap-2">
//                   {/* Day */}
//                   <div className="w-1/3">
//                     <label
//                       htmlFor="dob-day"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Day
//                     </label>

//                     <input
//                       type="text"
//                       id="dob-day"
//                       name="dob-day"
//                       placeholder="27"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                       defaultValue={27}
//                     />
//                   </div>
//                   {/* Month */}
//                   <div className="w-1/2 relative">
//                     <label
//                       htmlFor="dob-month"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Month
//                     </label>

//                     <select
//                       id="dob-month"
//                       name="dob-month"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                     >
//                       <option>January</option>
//                       <option>February</option>
//                       <option>March</option>
//                       <option>April</option>
//                       <option>May</option>
//                       <option>June</option>
//                       <option>July</option>
//                       <option>August</option>
//                       <option>September</option>
//                       <option>October</option>
//                       <option>November</option>
//                       <option>December</option>
//                     </select>
//                   </div>
//                   {/* Year */}
//                   <div className="w-1/3">
//                     <label
//                       htmlFor="dob-year"
//                       className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                     >
//                       Year
//                     </label>

//                     <input
//                       type="text"
//                       id="dob-year"
//                       name="dob-year"
//                       placeholder="2004"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                       defaultValue={2002}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Phone number */}
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Phone number
//                 </label>
//                 <div className="flex">
//                   {/* Country code */}
//                   <div className="relative w-44 mr-2">
//                     <select
//                       id="country-code"
//                       name="country-code"
//                       className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                     >
//                       <option>+91</option>
//                       <option>+1</option>
//                       {/* Add more country codes as needed */}
//                     </select>
//                   </div>

//                   {/* Phone number input */}
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="8849498140"
//                     className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                   />
//                 </div>
//               </div>

//               {/* Change phone number link */}
//               <div className="text-center mt-2">
//                 <a href="#" className="text-primary font-bold underline">
//                   Change phone number
//                 </a>
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Address
//               </h3>

//               {/* Home Address */}
//               <div>
//                 <label
//                   htmlFor="address"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Home address
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   defaultValue="Mota Varachha"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* City */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   defaultValue="Surat"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               {/* Pincode */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="pincode"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Pincode
//                 </label>
//                 <input
//                   type="text"
//                   id="pincode"
//                   name="picode"
//                   defaultValue="395006"
//                   className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                 />
//               </div>

//               <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
//                 Additional Information
//               </h3>

//               {/* Occupation */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="occupation"
//                   className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
//                 >
//                   Occupation
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="occupation"
//                     name="occupation"
//                     className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
//                   >
//                     <option>Salaried personnel</option>
//                     <option>Self-employed</option>
//                     <option>Retired</option>
//                     <option>Enterpreneur</option>
//                     <option>Student</option>
//                     <option>Stay at home partner</option>
//                     <option>Other</option>
//                     {/* Add more countries as needed */}
//                   </select>
//                 </div>
//               </div>

//             </div>

//             {/* Save Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center w-full px-6 py-3 text-secondary bg-primary hover:bg-primary/80 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
//               >
//                 Save Changes
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import DashboardHeader from "@/app/components/layout/DashboardHeader";
import React, { useState } from "react";
import ReusableDropdown from "@/app/components/ui/ReusableDropdown"; // Assuming ReusableDropdown is in this path

export default function ChangePersonalDetails() {
  // State to manage dropdown values
  const [country, setCountry] = useState<string | undefined>("");
  const [month, setMonth] = useState<string | undefined>("");
  const [countryCode, setCountryCode] = useState<string | undefined>("");
  const [occupation, setOccupation] = useState<string | undefined>("");

  // Options for dropdowns
  const countryOptions = [
    { value: "India", label: "India" },
    { value: "United States", label: "United States" },
    { value: "Canada", label: "Canada" },
    // Add more countries as needed
  ];

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const countryCodeOptions = [
    { value: "+91", label: "+91 (India)" },
    { value: "+1", label: "+1 (United States)" },
    // Add more country codes as needed
  ];

  const occupationOptions = [
    { value: "Salaried personnel", label: "Salaried personnel" },
    { value: "Self-employed", label: "Self-employed" },
    { value: "Retired", label: "Retired" },
    { value: "Enterpreneur", label: "Enterpreneur" },
    { value: "Student", label: "Student" },
    { value: "Stay at home partner", label: "Stay at home partner" },
    { value: "Other", label: "Other" },
    // Add more occupations as needed
  ];

  return (
    <section className="change-personal-details pb-10">
      <div className="container mx-auto ">
        <div className="bg-white dark:bg-background w-full lg:max-w-lg ">
          <DashboardHeader title="Tell us about yourself" />
          <form className="space-y-6  ">
            {/* Country of residence */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
              >
                Country of residence
              </label>
              <div className="relative">
                <ReusableDropdown
                  condition={true} // Add condition prop here
                  options={countryOptions}
                  value={country}
                  onChange={(value) => setCountry(value)}
                  placeholder="Select Country"
                  className="w-full"
                />
              </div>
            </div>

            {/* Personal details */}
            <div className="space-y-6">
              <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
                Personal details
              </h3>

              {/* Full legal first and middle name(s) */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Full legal first and middle name(s)
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Kartavya"
                  className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                />
              </div>

              {/* Full legal last name(s) */}
              <div className="mt-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Full legal last name(s)
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Patel"
                  className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                />
              </div>

              {/* Date of birth */}
              <div>
                <h3
                  className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1"
                >
                  Date of birth
                </h3>
                <div className="flex gap-2">
                  {/* Day */}
                  <div className="w-1/3">
                    <label
                      htmlFor="dob-day"
                      className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                    >
                      Day
                    </label>

                    <input
                      type="text"
                      id="dob-day"
                      name="dob-day"
                      placeholder="27"
                      className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                      defaultValue={27}
                    />
                  </div>
                  {/* Month */}
                  <div className="w-1/2 relative">
                    <label
                      htmlFor="dob-month"
                      className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                    >
                      Month
                    </label>

                    <ReusableDropdown
                      condition={true} // Add condition prop here
                      options={monthOptions}
                      value={month}
                      onChange={(value) => setMonth(value)}
                      placeholder="Select Month"
                      className="w-full"
                    />
                  </div>
                  {/* Year */}
                  <div className="w-1/3">
                    <label
                      htmlFor="dob-year"
                      className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                    >
                      Year
                    </label>

                    <input
                      type="text"
                      id="dob-year"
                      name="dob-year"
                      placeholder="2004"
                      className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                      defaultValue={2002}
                    />
                  </div>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Phone number
                </label>
                <div className="flex">
                  {/* Country code */}
                  <div className="relative w-44 mr-2">
                    <ReusableDropdown
                      condition={true} // Add condition prop here
                      options={countryCodeOptions}
                      value={countryCode}
                      onChange={(value) => setCountryCode(value)}
                      placeholder="Select Code"
                      className="w-full"
                    />
                  </div>

                  {/* Phone number input */}
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="8849498140"
                    className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Change phone number link */}
              <div className="text-center mt-2">
                <a href="#" className="text-primary font-bold underline">
                  Change phone number
                </a>
              </div>

              <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
                Address
              </h3>

              {/* Home Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Home address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue="Mota Varachha"
                  className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                />
              </div>

              {/* City */}
              <div className="mt-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue="Surat"
                  className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                />
              </div>

              {/* Pincode */}
              <div className="mt-4">
                <label
                  htmlFor="pincode"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="picode"
                  defaultValue="395006"
                  className="autofill:bg-transparent dark:bg-transparent w-full rounded-lg h-12.5 py-3 px-4 border transition-shadow ease-in-out duration-300 border-neutral-600 hover:shadow-darkcolor dark:hover:shadow-whitecolor dark:border-white focus:outline-0 focus:ring-0 dark:focus:shadow-whitecolor focus:shadow-darkcolor placeholder:text-neutral-600 dark:placeholder:text-white/80 text-neutral-900 dark:text-white"
                />
              </div>

              <h3 className="font-medium text-gray-600 dark:text-white mb-3 relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-200 dark:after:bg-primarybox after:mt-1">
                Additional Information
              </h3>

              {/* Occupation */}
              <div className="mt-4">
                <label
                  htmlFor="occupation"
                  className="block text-sm font-semibold text-gray dark:text-gray-300 mb-1"
                >
                  Occupation
                </label>
                <div className="relative">
                  <ReusableDropdown
                    condition={true} // Add condition prop here
                    options={occupationOptions}
                    value={occupation}
                    onChange={(value) => setOccupation(value)}
                    placeholder="Select Occupation"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-secondary bg-primary hover:bg-primary/80 cursor-pointer font-semibold rounded-full border border-transparent transition-colors duration-150 ease-in-out"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}