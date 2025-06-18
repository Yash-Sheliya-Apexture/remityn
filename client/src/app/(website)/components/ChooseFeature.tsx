// import React from "react";

// const ChooseFeature: React.FC = () => {
//   const features = [
//     {
//       title: "Smart Spending",
//       description:
//         "Track expenses automatically, identify trends, and make informed decisions.",
//       icon: "dollar", // Placeholder identifier
//     },
//     {
//       title: "Personal Insights",
//       description:
//         "Get personalized tips, visualize spending with charts, and track financial goals.",
//       icon: "chart", // Placeholder identifier
//     },
//     {
//       title: "Easy Budgeting",
//       description:
//         "Create custom budgets, monitor spending, and get alerts when limits are near.",
//       icon: "pie-chart", // Placeholder identifier
//     },
//     {
//       title: "Bank-Grade Security",
//       description:
//         "Get personalized tips, visualize spending with charts, and track financial goals.",
//       icon: "security", // Placeholder identifier
//     },
//   ];

//   // Function to render placeholder icon based on identifier
//   const renderPlaceholderIcon = (iconType: string) => {
//     // These are simple placeholders. You would replace this with SVG or Image components.
//     const baseClasses =
//       "w-16 h-16 rounded-full flex items-center justify-center mt-auto";
//     const purpleColorClasses = "bg-purple-200 text-purple-800"; // Placeholder background/text color
//     const iconClasses = "text-3xl font-bold"; // Placeholder text size

//     switch (iconType) {
//       case "dollar":
//         return (
//           <div className={`${baseClasses} ${purpleColorClasses}`}>
//             {/* Replace with your Dollar SVG/Image */}
//             <span className={iconClasses}>$</span>
//           </div>
//         );
//       case "chart":
//         return (
//           <div className={`${baseClasses} ${purpleColorClasses}`}>
//             {/* Replace with your Bar Chart SVG/Image */}
//             <span className={iconClasses}>📈</span>{" "}
//             {/* Using emoji as a quick placeholder */}
//           </div>
//         );
//       case "pie-chart":
//         return (
//           <div className={`${baseClasses} ${purpleColorClasses}`}>
//             {/* Replace with your Pie Chart SVG/Image */}
//             <span className={iconClasses}>📊</span>{" "}
//             {/* Using emoji as a quick placeholder */}
//           </div>
//         );
//       case "security":
//         return (
//           <div className={`${baseClasses} ${purpleColorClasses}`}>
//             {/* Replace with your Security/Building SVG/Image */}
//             <span className={iconClasses}>🛡️</span>{" "}
//             {/* Using emoji as a quick placeholder */}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     // Main container with subtle background color (pattern needs custom CSS/image)
//     // Use 'pattern-bg' class and define it in your CSS for the exact texture if needed
//     <section className="bg-background py-10 md:py-16">
//       {/* Content container for centering and max width */}
//       <div className="max-w-screen-xl space-y-5 mx-auto px-4 text-center">
//         {/* Features Tag */}
//         <div className="flex justify-center">
//           <span className="text-mainheadingWhite text-lg border px-8 py-2 contactbg inline-block rounded-3xl">
//             Features
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="lg:text-6xl md:text-5xl text-4xl font-semibold text-mainheadingWhite">
//           Why Choose <span className="text-primary">Remityn</span>
//         </h2>

//         {/* Description */}
//         <p className="text-center text-base md:text-lg text-subheadingWhite max-w-2xl mx-auto mb-12 md:mb-16">
//           Seamlessly track, budget, and manage your money all in one app.
//         </p>

//         {/* Feature Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-left">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className=" bg-[linear-gradient(112deg,#fcfcff 20%,rgba(220,220,232,1) 100%)] rounded-2xl p-6 md:p-8 flex flex-col" // flex-col for stacking, shadow-md for subtle shadow
//             >
//               {/* Card Content */}
//               <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 text-sm md:text-base flex-grow mb-4">
//                 {" "}
//                 {/* flex-grow to push icon down */}
//                 {feature.description}
//               </p>

//               {/* Placeholder for Illustration/Icon */}
//               {renderPlaceholderIcon(feature.icon)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChooseFeature;

import React from "react";

const ChooseFeature: React.FC = () => {
  const features = [
    {
      title: "Quick Sign-Up",
      description:
        "Start in two minutes.",
      icon: "dollar", // Placeholder identifier
    },
    {
      title: "Pay Any Way",
      description:
        "ACH, or wire transfer.",
      icon: "chart", // Placeholder identifier
    },
    {
      title: "Fast INR Credit",
      description:
        "Fast INR Credit",
      icon: "pie-chart", // Placeholder identifier
    },
    {
      title: "Fast INR Credit",
      description:
        "Watch every step till it arrives.",
      icon: "security", // Placeholder identifier
    },
  ];
  

  // Function to render placeholder icon based on identifier (assuming you will replace with actual SVGs)
  const renderPlaceholderIcon = (iconType: string) => {
    // These are simple placeholders. You would replace this with SVG or Image components.
    // Adjust these styles to match your actual icon styles (e.g., purple in the original image)
    const baseClasses =
      "w-16 h-16 rounded-full flex items-center justify-center mt-auto";
    const purpleColorClasses = "bg-sky-300 text-mainheading"; // Keeping purple theme for icons
    const iconClasses = "text-3xl font-bold"; // Placeholder text size

    // In a real scenario, load and render your SVGs here based on iconType
    switch (iconType) {
      case "dollar":
        return (
          // Replace with your Dollar SVG/Image component/element
          <div className={`${baseClasses} ${purpleColorClasses}`}>
            <span className={iconClasses}>$</span> {/* Placeholder */}
          </div>
        );
      case "chart":
        return (
          // Replace with your Bar Chart SVG/Image component/element
          <div className={`${baseClasses} ${purpleColorClasses}`}>
            <span className={iconClasses}>📈</span> {/* Placeholder */}
          </div>
        );
      case "pie-chart":
        return (
          // Replace with your Pie Chart SVG/Image component/element
          <div className={`${baseClasses} ${purpleColorClasses}`}>
            <span className={iconClasses}>📊</span> {/* Placeholder */}
          </div>
        );
      case "security":
        return (
          // Replace with your Security/Building SVG/Image component/element
          <div className={`${baseClasses} ${purpleColorClasses}`}>
            <span className={iconClasses}>🛡️</span> {/* Placeholder */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    // Main container using the arbitrary value for the background-image property
    // The gradient transitions from #66e8fa to #fcfcff at a 112-degree angle.
    // Underscores (_) replace spaces in the CSS value for Tailwind parsing.
    <section
      className="
        bg-background
        py-10 md:py-16 relative overflow-hidden
      "
    >
      {/* Optional: Add a background pattern overlay if desired, on top of the gradient */}
      {/* <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'url(/your-pattern.png)' }}></div> */}

      {/* Content container for centering and max width */}
      <div className="max-w-screen-xl mx-auto space-y-5 px-4 z-10 relative text-center">
        {" "}
        {/* z-10 to ensure content is above potential pattern/gradient */}
        {/* Features Tag */}
        <div className="flex justify-center">
          <span className="text-mainheadingWhite text-lg border px-8 py-2 contactbg inline-block rounded-3xl">
            Features
          </span>
        </div>

        {/* Heading */}
        <h2 className="lg:text-6xl md:text-5xl text-4xl font-semibold text-mainheadingWhite">
          Why Choose <span className="text-primary">Remityn</span>
        </h2>

        {/* Description */}
        <p className="text-center text-base md:text-lg text-subheadingWhite max-w-2xl mx-auto mb-12 md:mb-16">
          Seamlessly track, budget, and manage your money all in one app.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[linear-gradient(300deg,#66e8fa_20%,#fcfcff_100%)] rounded-2xl p-6 md:p-8 flex flex-col" // flex-col for stacking, shadow-md for subtle shadow
            >
              {/* Card Content */}
              <h3 className="text-xl md:text-2xl font-semibold text-mainheading mb-3">
                {feature.title}
              </h3>
              <p className="text-subheading font-medium leading-6 text-sm md:text-base flex-grow mb-4">
                {" "}
                {/* flex-grow to push icon down */}
                {feature.description}
              </p>

              {/* Placeholder for Illustration/Icon */}
              <div className="flex justify-end">
                {renderPlaceholderIcon(feature.icon)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ChooseFeature;
