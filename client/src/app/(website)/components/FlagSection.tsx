import Image from "next/image";
import React from "react";
import INR from "../../../../public/assets/icons/inr.svg";
import USD from "../../../../public/assets/icons/usd.svg";
import AUD from "../../../../public/assets/icons/aud.svg";
import AED from "../../../../public/assets/icons/aed.svg";
import CAD from "../../../../public/assets/icons/cad.svg";
import EUR from "../../../../public/assets/icons/eur.svg";


import { GoArrowRight } from "react-icons/go";

const FlagSection = () => {
  return (
    <section className="Flag-section py-12">
      <div className="flex items-end overflow-hidden">
        <div className="bg-lightgreen py-2 px-3 rounded-r-full flex justify-end w-4xl">

        <div className="p-4 bg-green inline-flex items-center rounded-full">
            <GoArrowRight size={100} className="text-lightgreen"/>
        </div>
        </div>
        <div className="flex items-center">
          <Image src={INR} alt="" width={150} className="p-3" />
          <Image src={USD} alt="" width={150} className="p-3" />
          <Image src={AUD} alt="" width={150} className="p-3" />
          <Image src={AED} alt="" width={150} className="p-3" />
          <Image src={CAD} alt="" width={150} className="p-3" />
          <Image src={EUR} alt="" width={150} className="p-3" />
        </div>
      </div>
    </section>
  );
};
export default FlagSection;
