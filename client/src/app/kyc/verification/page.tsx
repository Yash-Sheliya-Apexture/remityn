import React from "react";
import type { NextPage } from "next";
import { LuCheck } from "react-icons/lu";
import { BsExclamationLg } from "react-icons/bs";

const VerificationKYCPage: NextPage = () => {
  return (
    <section className="KYC-Verification-Page py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold text-main text-center mb-8">
            We need to verify your bank account
          </h1>
          <p className="text-sm text-gray text-center mb-4">
            Wise will send a small deposit to ensure that the bank account is
            valid and that it belongs to you.
          </p>

          <div className=" mb-8 space-y-4">
            <div className="bg-lightgray rounded-xl p-4 flex items-start gap-4">
              <div className="p-3 bg-green rounded-full">
                <LuCheck size={24} className="text-white" />
              </div>
              <p className="text-gray">
                All payments received through Wise will be converted to INR and
                sent to this bank account.
              </p>
            </div>

            <div className="bg-lightgray rounded-xl p-4 flex items-start gap-4">
              <div className="p-3 bg-yellow-400 rounded-full">
                <BsExclamationLg size={24} className="text-main" />
              </div>

              <p className="text-gray">
                The name on your bank account must exactly match the name on
                your Wise profile: kartavya patel
              </p>
            </div>
          </div>

          <form className="space-y-8 max-w-sm mx-auto">
            <div className="">
              <label
                htmlFor="accountNumber"
                className="text-gray text-sm block capitalize font-medium mb-1"
              >
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                placeholder="400300200100"
              />
            </div>

            <div className="">
              <label
                htmlFor="ifscCode"
                className="text-gray text-sm block capitalize font-medium mb-1"
              >
                IFSC Code
              </label>
              <input
                type="text"
                id="ifscCode"
                className="mt-1 block px-4 py-3 w-full border rounded-xl transition-shadow ease-in-out duration-300 border-[#c9cbce] hover:shadow-color"
                placeholder="HDFC0000001"
              />
            </div>

            <div className="w-full text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-secondary font-medium rounded-full border border-transparent hover:bg-primary/80 cursor-pointer transition-colors duration-150 ease-in-out "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerificationKYCPage;
