// // src/types.ts (or your preferred location for types)
// import React from "react";
// import { IconType } from "react-icons";

// export interface ContentBlock {
//   text: string;
//   type?: "default" | "success" | "warning" | "secondry";
// }

// export interface StepData {
//   id: number;
//   iconDefault: IconType;
//   iconActive: IconType;
//   contentTitle: string;
//   contentSubtitle: React.ReactNode;
//   contentImages: {
//     img: string;
//     imgTitle: string; // <-- ADD THIS LINE
//   };
//   contentBlocks?: ContentBlock[];
// }

// types/step-data.ts
import React from "react";
import { IconType } from "react-icons";

export interface ContentBlock {
  text: string;
  type?: "default" | "success" | "warning" | "secondry"; // Note: "secondary" is usually spelled with an 'a'
}

export interface StepData {
  id: number;
  iconDefault: IconType;
  iconActive: IconType;
  tabName: string; // <-- ADD THIS LINE
  contentTitle: string;
  contentSubtitle: React.ReactNode; // Can be string or JSX
  contentImages: {
    img: string;
    imgTitle: string; // Title/description for image, good for alt text
  };
  contentBlocks?: ContentBlock[];
}