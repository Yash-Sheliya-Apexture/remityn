// if user not verify their account then render this Account Verification Banner otherwise not.

import Link from "next/link";
import React from "react";
import { MdOutlineError } from "react-icons/md";


export default function AccountVerification() {
  return (
    <div className="Verify-Banner ">
      <div className="container mx-auto">
        <div className="bg-lightgray rounded-2xl p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className=" rounded-full flex items-center justify-center">
              <MdOutlineError size={40} className="text-yellow-500"/>
            </div>

            {/* Text and Button */}
            <div className="flex flex-col items-start gap-2">
              <p className="text-gray-700">
                Verify your account to start receiving money.
              </p>
              <Link href="/kyc/currencies" className="text-green font-bold relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-green after:mt-1">
                Verify now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

