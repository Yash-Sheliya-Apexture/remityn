"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const CountryCard = () => {
  const countryCardData = [
    {
      currencyCode: "USD",
      value: "10",
      icon: "/assets/icon/usd.svg",
    },
    {
      currencyCode: "AED",
      value: "399.92",
      icon: "/assets/icon/aed.svg",
    },
    {
      currencyCode: "AUD",
      value: "24558",
      icon: "/assets/icon/aud.svg",
    },
    {
      currencyCode: "EUR",
      value: "0.971",
      icon: "/assets/icon/eur.svg",
    },
    {
      currencyCode: "GBP",
      value: "2110",
      icon: "/assets/icon/gbp.svg",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null); // Specify the type of ref
  const [isHovering, setIsHovering] = useState(false);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300; // Adjust scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300; // Adjust scroll amount as needed
    }
  };

  return (
    <section className="Country-card pt-12">
      <div className="container mx-auto relative z-10">
        {" "}
        {/* Added relative for button positioning */}
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Srcolling button */}
          {isHovering && (
            <button
              onClick={scrollLeft}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
            >
              <IoIosArrowBack size={24} />
            </button>
          )}

          {/* Country card */}
          <div
            ref={containerRef}
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 py-4" // flex for row, overflow-x-scroll for horizontal scroll, space-x-4 for card spacing, scrollbar-hide to hide scrollbar
          >
            {countryCardData.map((card, index) => (
              <div
                key={index}
                className="p-6 bg-lightgray rounded-2xl flex flex-col justify-between w-72 shrink-0 transition-colors duration-200 ease-linear"
              >
                {" "}
                {/* w-72 for fixed width, shrink-0 to prevent shrinking */}
                <div className="flex items-center gap-4">
                  <Image
                    src={card.icon}
                    alt={`${card.currencyCode} flag`}
                    width={50}
                    height={50}
                  />
                  <span className="text-secondary text-xl font-semibold">
                    {card.currencyCode}
                  </span>
                </div>
                <div className="pt-16">
                  <span className="text-secondary text-2xl font-semibold">
                  {parseFloat(card.value).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Srcolling button */}
          {isHovering && (
            <button
              onClick={scrollRight}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white shadow text-green p-2 rounded-full sm:block hidden cursor-pointer"
            >
              <IoIosArrowForward size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountryCard;