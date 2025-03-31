import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { FiShield } from "react-icons/fi";
import { GrLogout } from "react-icons/gr";
import { ImInfo } from "react-icons/im";

export default function SecurityAndPrivacyPage() {
  return (
    <section className="security-privacy py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl text-main font-semibold">
          Security and privacy
        </h2>

        <div className="mt-8">
          <h4 className="text-main text-2xl font-semibold mb-3">Security</h4>

          <div className="space-y-2">
            {/* password */}
            <div>
              <Link href="security-and-privacy/change-password">
                {/* Wrap with Link */}
                <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
                  {/* Icon Container */}
                  <div className="bg-lightborder rounded-full p-3 ">
                    <FiShield size={24} className="text-main" />
                  </div>

                  <div className="flex-grow">
                    <p className="font-semibold text-main">Password</p>
                    <p className=" text-gray text-sm font-light">
                      ********
                    </p>
                  </div>

                  {/* Right Arrow Icon */}
                  <div>
                    <IoIosArrowForward size={20} className="text-gray" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Log out */}
            <div>
              <Link href="security-and-privacy/account-kill">
                <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
                  {/* Icon Container */}
                  <div className="bg-lightborder rounded-full p-3 ">
                    <GrLogout size={24} className="text-main" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow">
                    <p className="font-semibold text-main">
                      Log out everywhere
                    </p>
                    <p className=" text-gray text-sm font-light">
                      If you notice any suspicious activity, log out of Wise
                      across all devices and browsers.
                    </p>
                  </div>

                  {/* Right Arrow Icon */}
                  <div>
                    <IoIosArrowForward size={20} className="text-gray-500" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-main text-2xl font-semibold mb-3">Privacy</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-4 hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out cursor-pointer">
              {/* Icon Container */}
              <div className="bg-lightborder rounded-full p-3 ">
                <ImInfo size={24} className="text-main" />
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <p className="font-semibold text-main">Privacy Policy</p>
                <p className=" text-gray text-sm font-light">
                  Learn how we protect and use your personal information.
                </p>
              </div>

              {/* Right Arrow Icon */}
              <div>
                <IoIosArrowForward size={20} className="text-gray" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
