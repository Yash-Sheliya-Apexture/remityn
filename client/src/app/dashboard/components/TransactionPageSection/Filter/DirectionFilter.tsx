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















// components/Filter/DirectionFilter.tsx
import React from "react";
import { BsList } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { GoArrowUp } from "react-icons/go";

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
      <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
        Direction
      </h4>
      <div className="pt-4">
        {/* All */}
        <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
          <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
            <BsList size={24} className="text-main" />
          </div>
          <span className="text-main font-semibold">All</span>
          <div className="ml-auto relative">
            <input
              type="radio"
              className="hidden"
              name="direction"
              value="all"
              checked={selectedDirection === "all"}
              onChange={() => onDirectionChange("all")}
            />
            <div
              className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
                selectedDirection === "all" ? "border-primary" : ""
              }`}
            >
              {selectedDirection === "all" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        </label>

        {/* Money in */}
        <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
          <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
            <LuPlus size={24} className="text-main" />
          </div>
          <span className="text-main font-semibold">Add Money</span>
          <div className="ml-auto relative">
            <input
              type="radio"
              className="hidden"
              name="direction"
              value="in"
              checked={selectedDirection === "add"}
              onChange={() => onDirectionChange("add")}
            />
            <div
              className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
                selectedDirection === "add" ? "border-primary" : ""
              }`}
            >
              {selectedDirection === "add" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        </label>

        {/* Money out */}
        <label className="flex items-center gap-4 cursor-pointer hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out">
          <div className="p-3 rounded-full bg-lightborder flex items-center justify-center">
            <GoArrowUp size={24} className="text-main" />
          </div>
          <span className="text-main font-semibold">Send Money</span>
          <div className="ml-auto relative">
            <input
              type="radio"
              className="hidden"
              name="direction"
              value="out"
              checked={selectedDirection === "send"}
              onChange={() => onDirectionChange("send")}
            />
            <div
              className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${
                selectedDirection === "send" ? "border-primary" : ""
              }`}
            >
              {selectedDirection === "send" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default DirectionFilter;