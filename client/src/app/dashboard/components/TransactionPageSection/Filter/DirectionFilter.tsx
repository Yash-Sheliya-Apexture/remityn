// // components/Filter/DirectionFilter.tsx
// import React from "react";
// import { BsList } from "react-icons/bs";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// interface DirectionFilterProps {
//   selectedDirection: string;
//   onDirectionChange: (direction: string) => void;
// }

// const DirectionFilter: React.FC<DirectionFilterProps> = ({
//   selectedDirection,
//   onDirectionChange,
// }) => {
//   return (
//     <div>
//       <h4 className="text-gray relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-lightborder after:mt-1">
//         Direction
//       </h4>
//       <div className="pt-4">
//         {/* All */}
//         <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//             <BsList size={24} className="text-main" />
//           </div>
//           <span className="text-main font-semibold">All</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="all"
//               checked={selectedDirection === "all"}
//               onChange={() => onDirectionChange("all")}
//             />
//             <div
//               className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                 selectedDirection === "all" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "all" && (
//                 <div className="w-3 h-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>

//         {/* Money in */}
//         <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//             <LuPlus size={24} className="text-main" />
//           </div>
//           <span className="text-main font-semibold">Add Money</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="in"
//               checked={selectedDirection === "in"}
//               onChange={() => onDirectionChange("in")}
//             />
//             <div
//               className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                 selectedDirection === "in" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "in" && (
//                 <div className="w-3 h-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>

//         {/* Money out */}
//         <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//             <GoArrowUp size={24} className="text-main" />
//           </div>
//           <span className="text-main font-semibold">Send Money</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="out"
//               checked={selectedDirection === "out"}
//               onChange={() => onDirectionChange("out")}
//             />
//             <div
//               className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                 selectedDirection === "out" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "out" && (
//                 <div className="w-3 h-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default DirectionFilter;















// // components/Filter/DirectionFilter.tsx
// import React from "react";
// import { BsList } from "react-icons/bs";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// interface DirectionFilterProps {
//   selectedDirection: string;
//   onDirectionChange: (direction: string) => void;
// }

// const DirectionFilter: React.FC<DirectionFilterProps> = ({
//   selectedDirection,
//   onDirectionChange,
// }) => {
//   return (
//     <div>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Direction
//       </h4>
//       <div className="pt-4">
//         {/* All */}
//         <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//             <BsList size={24} className="text-main" />
//           </div>
//           <span className="text-main font-semibold">All</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="all"
//               checked={selectedDirection === "all"}
//               onChange={() => onDirectionChange("all")}
//             />
//             <div
//               className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                 selectedDirection === "all" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "all" && (
//                 <div className="w-3 h-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>

//         {/* Money in */}
//         <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//             <LuPlus size={24} className="text-main" />
//           </div>
//           <span className="text-main font-semibold">Add Money</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="in"
//               checked={selectedDirection === "add"}
//               onChange={() => onDirectionChange("add")}
//             />
//             <div
//               className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                 selectedDirection === "add" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "add" && (
//                 <div className="w-3 h-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>

//         {/* Money out */}
//         <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
//             <GoArrowUp size={24} className="text-main" />
//           </div>
//           <span className="text-main font-semibold">Send Money</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="out"
//               checked={selectedDirection === "send"}
//               onChange={() => onDirectionChange("send")}
//             />
//             <div
//               className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
//                 selectedDirection === "send" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "send" && (
//                 <div className="w-3 h-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default DirectionFilter;











// // components/Filter/DirectionFilter.tsx
// import React from "react";
// import { BsList } from "react-icons/bs";
// import { LuPlus } from "react-icons/lu";
// import { GoArrowUp } from "react-icons/go";

// interface DirectionFilterProps {
//   selectedDirection: string;
//   onDirectionChange: (direction: string) => void;
// }

// const DirectionFilter: React.FC<DirectionFilterProps> = ({
//   selectedDirection,
//   onDirectionChange,
// }) => {
//   return (
//     <div>
//       <h4 className="text-gray-500 dark:text-gray-300  font-medium relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-gray/20 after:mt-1">
//         Direction
//       </h4>
//       <div className="pt-4 space-y-2">
//         {/* All */}
//         <label className="flex items-center gap-4 cursor-pointer dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <BsList size={24} className="text-neutral-900 dark:text-white" />
//           </div>
//           <span className="text-neutral-900 font-semibold dark:text-white">All</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="all"
//               checked={selectedDirection === "all"}
//               onChange={() => onDirectionChange("all")}
//             />
//             <div
//               className={`size-5 rounded-full border border-gray-500 dark:border-gray-300 flex items-center justify-center ${
//                 selectedDirection === "all" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "all" && (
//                 <div className="size-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>

//         {/* Money in */}
//         <label className="flex items-center gap-4 cursor-pointer dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <LuPlus size={24} className="text-neutral-900 dark:text-white" />
//           </div>
//           <span className="text-neutral-900 dark:text-white font-semibold">Add Money</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="in"
//               checked={selectedDirection === "add"}
//               onChange={() => onDirectionChange("add")}
//             />
//             <div
//               className={`size-5 rounded-full border border-gray-500 dark:border-gray-300 flex items-center justify-center ${
//                 selectedDirection === "add" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "add" && (
//                 <div className="size-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>

//         {/* Money out */}
//         <label className="flex items-center gap-4 cursor-pointer dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
//           <div className="p-3 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
//             <GoArrowUp size={24} className="text-neutral-900 dark:text-white" />
//           </div>
//           <span className="text-neutral-900 dark:text-white font-semibold">Send Money</span>
//           <div className="ml-auto relative">
//             <input
//               type="radio"
//               className="hidden"
//               name="direction"
//               value="out"
//               checked={selectedDirection === "send"}
//               onChange={() => onDirectionChange("send")}
//             />
//             <div
//               className={`size-5 rounded-full border border-gray-500 dark:border-gray-300 flex items-center justify-center ${
//                 selectedDirection === "send" ? "border-primary" : ""
//               }`}
//             >
//               {selectedDirection === "send" && (
//                 <div className="size-3 rounded-full bg-primary"></div>
//               )}
//             </div>
//           </div>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default DirectionFilter;




// components/Filter/DirectionFilter.tsx
import React from "react";
import { BsList } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DirectionFilterProps {
  selectedDirection: string;
  onDirectionChange: (direction: string) => void;
}

const DirectionFilter: React.FC<DirectionFilterProps> = ({
  selectedDirection,
  onDirectionChange,
}) => {
  return (
    <div>
      <h4 className="text-gray-500 dark:text-gray-300  font-medium relative after:content-[''] after:block after:w-full after:h-px after:rounded-full after:bg-neutral-500 dark:after:bg-white/30 after:mt-1">
        Direction
      </h4>
      <RadioGroup
        defaultValue={selectedDirection} // Make sure selectedDirection is one of "all", "add", "send"
        className="pt-4 space-y-2"
        onValueChange={(value) => { // Added explicit value type and arrow function for clarity
          console.log("Direction changed to:", value); // Debugging log
          onDirectionChange(value);
        }}
      >
        {/* All */}
        <label className="flex items-center gap-4 cursor-pointer dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
          <div className="p-3 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
            <BsList size={24} className="text-neutral-900 dark:text-white" />
          </div>
          <span className="text-neutral-900 font-semibold dark:text-white">All</span>
          <div className="ml-auto relative">
          <RadioGroupItem value="all" id="direction-all" />
          </div>
        </label>

        {/* Money in */}
        <label className="flex items-center gap-4 cursor-pointer dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
          <div className="p-3 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
            <LuPlus size={24} className="text-neutral-900 dark:text-white" />
          </div>
          <span className="text-neutral-900 dark:text-white font-semibold">Add Money</span>
          <div className="ml-auto relative">
          <RadioGroupItem value="add" id="direction-add" />

          </div>
        </label>

        {/* Money out */}
        <label className="flex items-center gap-4 cursor-pointer dark:hover:bg-primarybox hover:bg-lightgray p-4 rounded-2xl transition-colors duration-500 ease-in-out">
          <div className="p-3 rounded-full bg-lightborder dark:bg-secondarybox flex items-center justify-center">
            <GoArrowUp size={24} className="text-neutral-900 dark:text-white" />
          </div>
          <span className="text-neutral-900 dark:text-white font-semibold">Send Money</span>
          <div className="ml-auto relative">
          <RadioGroupItem value="send" id="direction-send" />
          </div>
        </label>
      </RadioGroup>
    </div>
  );
};

export default DirectionFilter;