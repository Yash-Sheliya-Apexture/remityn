import React from "react";
import Image from "next/image";
import Link from "next/link";
import img from "../../../../public/assets/images/lock.webp";
import { LuLockKeyhole } from "react-icons/lu";
import { BsBank } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";

const SecuritySection = () => {
  return (
    <section className="Security-section py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Content */}
          <div className="w-full md:w-3/5 order-2 md:order-1">
            <div className="mb-10">
              <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold text-mainheading dark:text-white font-mont tracking-tight mb-8">
                Disappoint thieves
              </h1>
              <p className="text-gray-500 dark:text-gray-300 lg:text-xl">
                Every month, millions of our personal and business customers
                trust us to move over 1.1 trillion INR of their money.
              </p>
            </div>
            <div>
              <button className="bg-primary rounded-full px-6 py-3 h-14 hover:bg-primaryhover text-mainheading font-medium text-lg transition-colors duration-300 ease-in-out">
                <Link href={""} className="text-mainheading font-medium">
                  How we keep your money safe
                </Link>
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full md:w-2/5 h-auto order-1 md:order-2 flex md:justify-end justify-center">
            <Image
              src="/assets/images/lock.webp"
              alt="Image-1"
              width={500}
              height={500}
              className="w-[300px] lg:w-[500px] h-auto"
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="p-4 bg-lightgray dark:bg-secondary text-mainheading dark:text-primary rounded-full inline-flex items-center ">
                <LuLockKeyhole size={32} />
              </div>
              <div>
                <p className="font-medium lg:text-lg text-gray-500 dark:text-gray-300">
                  Our dedicated fraud and security teams work to keep your money
                  safe
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-lightgray dark:bg-secondary text-mainheading dark:text-primary rounded-full inline-flex items-center ">
              <MdSecurity size={32} />
              </div>
              <div>
                <p className="font-medium lg:text-lg text-gray-500 dark:text-gray-300">
                  We use 2-factor authentication to protect your account
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-lightgray dark:bg-secondary text-mainheading dark:text-primary rounded-full inline-flex items-center ">
                <BsBank size={32} />
              </div>
              <div>
                <p className="font-medium lg:text-lg text-gray-500 dark:text-gray-300">
                  We hold your money with established financial institutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SecuritySection;
