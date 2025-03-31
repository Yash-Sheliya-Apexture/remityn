import React from "react";

export default function ChangePersonalDetails() {
  return (
    <section className="change-personal-details py-10">
      <div className="container mx-auto ">
        <div className="max-w-md mx-auto bg-white">
          <h2 className="text-3xl text-center text-main font-semibold">
            Tell us about yourself
          </h2>
          <form className="space-y-6 mt-10">
            {/* Country of residence */}
            <div>
              <label
                htmlFor="country"
                className="text-main text-sm block capitalize font-semibold mb-1"
              >
                Country of residence
              </label>
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>

            {/* Personal details */}
            <div className="space-y-6">
              <h3 className="text-gray font-medium mb-4 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
                Personal details
              </h3>

              {/* Full legal first and middle name(s) */}
              <div>
                <label
                  htmlFor="firstName"
                  className="text-main text-sm block capitalize font-semibold mb-1"
                >
                  Full legal first and middle name(s)
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Kartavya"
                  className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                />
              </div>

              {/* Full legal last name(s) */}
              <div className="mt-4">
                <label
                  htmlFor="lastName"
                  className="text-main text-sm block capitalize font-semibold mb-1"
                >
                  Full legal last name(s)
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Patel"
                  className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                />
              </div>

              {/* Date of birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="text-main block capitalize font-semibold mb-1"
                >
                  Date of birth
                </label>
                <div className="flex gap-2">
                  {/* Day */}
                  <div className="w-1/3">
                    <label
                      htmlFor="dob-day"
                      className="block text-sm text-gray mt-1"
                    >
                      Day
                    </label>

                    <input
                      type="text"
                      id="dob-day"
                      name="dob-day"
                      placeholder="27"
                      className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                      defaultValue={27}
                    />
                  </div>
                  {/* Month */}
                  <div className="w-1/2 relative">
                    <label
                      htmlFor="dob-month"
                      className="block text-sm text-gray mt-1"
                    >
                      Month
                    </label>

                    <select
                      id="dob-month"
                      name="dob-month"
                      className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                    >
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                  </div>
                  {/* Year */}
                  <div className="w-1/3">
                    <label
                      htmlFor="dob-year"
                      className="block text-sm text-gray mt-1"
                    >
                      Year
                    </label>

                    <input
                      type="text"
                      id="dob-year"
                      name="dob-year"
                      placeholder="2004"
                      className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                      defaultValue={2002}
                    />
                  </div>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-main text-sm block capitalize font-semibold mb-1"
                >
                  Phone number
                </label>
                <div className="flex">
                  {/* Country code */}
                  <div className="relative w-44 mr-2">
                    <select
                      id="country-code"
                      name="country-code"
                      className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                    >
                      <option>+91</option>
                      <option>+1</option>
                      {/* Add more country codes as needed */}
                    </select>
                  </div>

                  {/* Phone number input */}
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="8849498140"
                    className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                  />
                </div>
              </div>

              {/* Change phone number link */}
              <div className="text-center mt-2">
                <a href="#" className="text-secondary font-bold underline">
                  Change phone number
                </a>
              </div>

              <h3 className="text-gray font-medium mb-4 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
                Address
              </h3>

              {/* Home Address */}
              <div>
                <label
                  htmlFor="address"
                  className="text-main text-sm block capitalize font-semibold mb-1"
                >
                  Home address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue="Mota Varachha"
                  className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                />
              </div>

              {/* City */}
              <div className="mt-4">
                <label
                  htmlFor="lastName"
                  className="text-main text-sm block capitalize font-semibold mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue="Surat"
                  className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                />
              </div>

              {/* Pincode */}
              <div className="mt-4">
                <label
                  htmlFor="pincode"
                  className="text-main text-sm block capitalize font-semibold mb-1"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="picode"
                  defaultValue="395006"
                  className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                />
              </div>

              <h3 className="text-gray font-medium mb-4 relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
                Additional Information
              </h3>

              {/* Occupation */}
              <div className="mt-4">
                <label
                  htmlFor="occupation"
                  className="text-main text-sm block capitalize font-semibold mb-1"
                >
                  Occupation
                </label>
                <div className="relative">
                  <select
                    id="occupation"
                    name="occupation"
                    className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                  >
                    <option>Salaried personnel</option>
                    <option>Self-employed</option>
                    <option>Retired</option>
                    <option>Enterpreneur</option>
                    <option>Student</option>
                    <option>Stay at home partner</option>
                    <option>Other</option>
                    {/* Add more countries as needed */}
                  </select>
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
