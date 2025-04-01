// import React from "react";

// const page = () => {
//   return <div>this is my Profile Picture</div>;
// };

// export default page;

// import React from "react";
// import { FiUser } from "react-icons/fi";
// import { LiaCameraSolid } from "react-icons/lia";
// import { IoMdCopy } from "react-icons/io";
// import { FaRegBell } from "react-icons/fa";
// import { RxQuestionMark } from "react-icons/rx";
// import Image from "next/image";
// import { RiShieldLine } from "react-icons/ri";
// import { AiFillBank } from "react-icons/ai";
// import { TbBrandSpeedtest } from "react-icons/tb";
// import { FiAlertCircle } from "react-icons/fi";
// import { CiGift } from "react-icons/ci";
// import { IoMdCloseCircleOutline } from "react-icons/io";

// // Types for our props
// type AccountCardProps = {
//   username: string;
//   membershipNumber: string;
// };

// type MenuItemProps = {
//   icon: React.ReactNode;
//   label: string;
//   hasChevron?: boolean;
//   description?: string;
//   badge?: number;
// };

// // Account Card Component
// const AccountCard: React.FC<AccountCardProps> = ({
//   username,
//   membershipNumber,
// }) => {
//   return (
//     <>
//       <div className="bg-green/8 p-8 rounded-3xl">
//         <div className="flex flex-col items-center mb-4">
//           <div className="relative">
//             <div className="p-5 bg-green/8 rounded-full flex items-center justify-center">
//               <FiUser className="size-6" />
//             </div>
//             <div className="absolute bottom-0 right-0 bg-lightgreen flex items-center justify-center size-6 rounded-full border-2 border-white">
//               <LiaCameraSolid className="" />
//             </div>
//           </div>
//         </div>

//         <h1 className="text-4xl font-black tracking-tighter text-center mb-2">
//           {username}
//         </h1>
//         <p className="text-center font-medium capitalize mb-6">
//           Your personal account
//         </p>
//       </div>
//       <div className="text-center my-5 flex justify-center items-center gap-1">
//         <span className="text-base text-gray">
//           Membership number:{" "}
//           <span className="hover:underline underline-offset-1">
//             {" "}
//             {membershipNumber}{" "}
//           </span>
//         </span>
//         <IoMdCopy className="text-gray" />
//       </div>

//       <div className="text-center">
//         <button className="px-4 cursor-pointer bg-primary hover:bg-primary-hover rounded-full py-1.5 text-secondary transition-transform ease-in-out duration-300 font-medium">
//           Log Out
//         </button>
//       </div>
//     </>
//   );
// };

// // Menu Item Component
// const MenuItem: React.FC<MenuItemProps> = ({
//   icon,
//   label,
//   hasChevron = true,
//   description,
//   badge,
// }) => {
//   return (
//     <div className="flex items-center p-4 hover:bg-green/10 rounded-xl cursor-pointer relative">
//       <div className="bg-green/6 p-4 rounded-full mr-4">{icon}</div>
//       <div className="flex-grow">
//         <div className="font-medium text-xl">{label}</div>
//         {description && (
//           <div className="text-sm text-gray-500">{description}</div>
//         )}
//       </div>

//       {badge && (
//         <div className="mr-2 absolute top-4 left-14">
//           <div className="bg-[#cb272f] flex items-center justify-center p-2 rounded-full border-4 border-white"></div>
//         </div>
//       )}

//       {hasChevron && (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           className="w-5 h-5 text-gray-600"
//         >
//           <path
//             fillRule="evenodd"
//             d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
//             clipRule="evenodd"
//           />
//         </svg>
//       )}
//     </div>
//   );
// };

// // Main App Component
// const AccountSettings: React.FC = () => {
//   return (
//     <div className="max-w-5xl mx-auto font-sans">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div>
//           <AccountCard username="RUDRA SUTARIYA" membershipNumber="P85409718" />
//         </div>

//         <div>
//           <h2 className="text-2xl capitalize font-bold mb-4">Your account</h2>
//           <div className="space-y-2 mb-8">
//             <MenuItem
//               icon={
//                 <Image
//                   src="/assets/icon/bell.svg"
//                   width={25}
//                   height={25}
//                   alt="copy"
//                 />
//               }
//               label="Inbox"
//               badge={1}
//             />

//             <MenuItem
//               icon={<RxQuestionMark className="size-6" />}
//               label="Help"
//             />

//             <MenuItem
//               icon={
//                 <Image
//                   src="/assets/icon/copy.svg"
//                   width={25}
//                   height={25}
//                   alt="copy"
//                 />
//               }
//               label="Statements and reports"
//             />
//           </div>
//           <h2 className="text-2xl capitalize font-bold mb-4">Settings</h2>
//           <div className="space-y-2">
//             <MenuItem
//               icon={<RiShieldLine className="size-6" />}
//               label="Security and privacy"
//               description="Change your security and privacy settings."
//             />

//             <MenuItem
//               icon={
//                 <Image
//                   src="/assets/icon/bell.svg"
//                   width={25}
//                   height={25}
//                   alt="copy"
//                 />
//               }
//               label="Notifications"
//               description="Customise how you get updates."
//             />

//             <MenuItem
//               icon={<AiFillBank className="size-6" />}
//               label="Payment methods"
//               description="Manage saved cards and bank accounts that are linked to this account."
//             />

//             <MenuItem
//               icon={<TbBrandSpeedtest className="size-6" />}
//               label="Limits"
//               description="Manage your transfer and card limits."
//             />

//             <MenuItem
//               icon={<FiUser className="size-6" />}
//               label="Personal details"
//               description="Update your personal information."
//             />
//           </div>
//           <h2 className="text-2xl capitalize font-bold mb-4 mt-5">
//             Actions and agreements
//           </h2>
//           <div className="space-y-2">
//             <MenuItem
//               icon={<FiAlertCircle className="size-6" />}
//               label="Our agreements"
//             />

//             <MenuItem
//               icon={<CiGift className="size-6" />}
//               label="Earn ₹1,001"
//             />

//             <MenuItem
//               icon={<IoMdCloseCircleOutline className="size-6" />}
//               label="Close account"
//               description="Close your personal account."
//             />
//           </div>

//           <div className="text-center space-y-1.5 pb-10">
//             <p className="text-gray mt-2">
//               We’ve made some changes to this area of the app.
//             </p>
//             <span className="text-green font-medium underline underline-offset-1">
//               Give us feedback
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSettings;

// import AccountCard from "@/app/components/AccountCard";
// import MenuItem from "@/app/components/MenuItem";
// import { FiUser } from "react-icons/fi";
// import { RxQuestionMark } from "react-icons/rx";
// import Image from "next/image";
// import { RiShieldLine } from "react-icons/ri";
// import { AiFillBank } from "react-icons/ai";
// import { TbBrandSpeedtest } from "react-icons/tb";
// import { FiAlertCircle } from "react-icons/fi";
// import { CiGift } from "react-icons/ci";
// import { IoMdCloseCircleOutline } from "react-icons/io";

// const AccountSettings: React.FC = () => {
//   return (
//     <div className="max-w-5xl mx-auto font-sans">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* leftside Account */}
//         <div>
//           <AccountCard username="RUDRA SUTARIYA" membershipNumber="P85409718" />
//         </div>

//         {/* rightside Accoun-Feild */}
//         <div>
//           <h2 className="text-2xl capitalize font-bold mb-4">Your account</h2>
//           <div className="space-y-2 mb-8">
//             <MenuItem
//               icon={
//                 <Image
//                   src="/assets/icon/bell.svg"
//                   width={25}
//                   height={25}
//                   alt="copy"
//                 />
//               }
//               label="Inbox"
//               badge={1}
//             />

//             <MenuItem
//               icon={<RxQuestionMark className="size-6" />}
//               label="Help"
//             />

//             <MenuItem
//               icon={
//                 <Image
//                   src="/assets/icon/copy.svg"
//                   width={25}
//                   height={25}
//                   alt="copy"
//                 />
//               }
//               label="Statements and reports"
//             />
//           </div>

//           <h2 className="text-2xl capitalize font-bold mb-4">Settings</h2>
//           <div className="space-y-2">
//             <MenuItem
//               icon={<RiShieldLine className="size-6" />}
//               label="Security and privacy"
//               description="Change your security and privacy settings."
//             />

//             <MenuItem
//               icon={
//                 <Image
//                   src="/assets/icon/bell.svg"
//                   width={25}
//                   height={25}
//                   alt="copy"
//                 />
//               }
//               label="Notifications"
//               description="Customise how you get updates."
//             />

//             <MenuItem
//               icon={<AiFillBank className="size-6" />}
//               label="Payment methods"
//               description="Manage saved cards and bank accounts that are linked to this account."
//             />

//             <MenuItem
//               icon={<TbBrandSpeedtest className="size-6" />}
//               label="Limits"
//               description="Manage your transfer and card limits."
//             />

//             <MenuItem
//               icon={<FiUser className="size-6" />}
//               label="Personal details"
//               description="Update your personal information."
//             />
//           </div>

//           <h2 className="text-2xl capitalize font-bold mb-4 mt-5">
//             Actions and agreements
//           </h2>
//           <div className="space-y-2">
//             <MenuItem
//               icon={<FiAlertCircle className="size-6" />}
//               label="Our agreements"
//             />

//             <MenuItem
//               icon={<CiGift className="size-6" />}
//               label="Earn ₹1,001"
//             />

//             <MenuItem
//               icon={<IoMdCloseCircleOutline className="size-6" />}
//               label="Close account"
//               description="Close your personal account."
//             />
//           </div>

//           <div className="text-center space-y-1.5 pb-10">
//             <p className="text-gray mt-2">
//               We’ve made some changes to this area of the app.
//             </p>
//             <span className="text-green font-medium underline underline-offset-1">
//               Give us feedback
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSettings;

// import AccountCard from "@/app/components/AccountCard";
// import MenuItem from "@/app/components/MenuItem";
// import { FiUser } from "react-icons/fi";
// import { RxQuestionMark } from "react-icons/rx";
// import Image from "next/image";
// import { RiShieldLine } from "react-icons/ri";
// import { AiFillBank } from "react-icons/ai";
// import { TbBrandSpeedtest } from "react-icons/tb";
// import { FiAlertCircle } from "react-icons/fi";
// import { CiGift } from "react-icons/ci";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { FaRegBell } from "react-icons/fa6";
// import { IoMdCopy } from "react-icons/io";
// import Link from "next/link";

// const AccountSettings: React.FC = () => {
//   return (
//     <div className="max-w-5xl mx-auto font-sans grid grid-cols-1 md:grid-cols-2 gap-10">
//       {/* Left Side: Fixed Account Card */}
//       <div className="md:sticky top-0 h-fit">
//         <AccountCard username="RUDRA SUTARIYA" membershipNumber="P85409718" />
//       </div>

//       {/* Right Side: Scrollable Menu Items */}
//       <div className="flex flex-col w-full">
//         {/* Adjust width as needed */}
//         <h2 className="text-2xl capitalize font-bold mb-4">Your account</h2>
//         <div className="space-y-2 mb-6">
//           <MenuItem icon={<FaRegBell className="size-6" />} label="Inbox" />
//           <MenuItem icon={<RxQuestionMark className="size-6" />} label="Help" />
//           <MenuItem
//             icon={<IoMdCopy className="size-6" />}
//             label="Statements and reports"
//           />
//         </div>
//         <h2 className="text-2xl capitalize font-bold mb-4">Settings</h2>
//         <div className="space-y-2">
//           <MenuItem
//             icon={<RiShieldLine className="size-6" />}
//             label="Security and privacy"
//             description="Change your security and privacy settings."
//           />

//           <MenuItem
//             icon={<FaRegBell className="size-6" />}
//             label="Notifications"
//             description="Customise how you get updates."
//           />

//           <MenuItem
//             icon={<AiFillBank className="size-6" />}
//             label="Payment methods"
//             description="Manage saved cards and bank accounts that are linked to this account."
//           />

//           <MenuItem
//             icon={<TbBrandSpeedtest className="size-6" />}
//             label="Limits"
//             description="Manage your transfer and card limits."
//           />

//           <MenuItem
//             icon={<FiUser className="size-6" />}
//             label="Personal details"
//             description="Update your personal information."
//           />
//         </div>

//         <h2 className="text-2xl capitalize font-bold my-5">
//           Actions and agreements
//         </h2>
//         <div className="space-y-2">
//           <MenuItem
//             icon={<FiAlertCircle className="size-6" />}
//             label="Our agreements"
//           />

//           <MenuItem icon={<CiGift className="size-6" />} label="Earn ₹1,001" />

//           <MenuItem
//             icon={<IoMdCloseCircleOutline className="size-6" />}
//             label="Close account"
//             description="Close your personal account."
//           />
//         </div>
//         <div className="text-center space-y-1.5 pb-10">
//           <p className="text-gray mt-2">
//             We’ve made some changes to this area of the app.
//           </p>
//           <Link
//             href="/"
//             className="text-green font-medium underline underline-offset-1"
//           >
//             Give us feedback
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSettings;

// import AccountCard from "@/app/components/AccountCard";
// import MenuItem from "@/app/components/MenuItem";
// import { FiUser } from "react-icons/fi";
// import { RxQuestionMark } from "react-icons/rx";
// import Image from "next/image";
// import { RiShieldLine } from "react-icons/ri";
// import { AiFillBank } from "react-icons/ai";
// import { TbBrandSpeedtest } from "react-icons/tb";
// import { FiAlertCircle } from "react-icons/fi";
// import { CiGift } from "react-icons/ci";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { FaRegBell } from "react-icons/fa6";
// import { IoMdCopy } from "react-icons/io";
// import Link from "next/link";

// const AccountSettings: React.FC = () => {
//   return (
//     <div className="max-w-5xl mx-auto font-sans grid grid-cols-1 md:grid-cols-2 gap-10">
//       {/* Left Side: Fixed Account Card */}
//       <div className="md:sticky top-0 h-fit">
//         <AccountCard username="RUDRA SUTARIYA" membershipNumber="P85409718" />
//       </div>

//       {/* Right Side: Scrollable Menu Items */}
//       <div className="flex flex-col w-full">
//         {/* Adjust width as needed */}
//         <h2 className="text-2xl capitalize font-bold mb-4">Your account</h2>
//         <div className="space-y-2 mb-6">
//           <MenuItem
//             icon={<FaRegBell className="size-6" />}
//             label="Inbox"
//             href="/your-account/inbox" // Add href for Inbox
//           />
//           <MenuItem
//             icon={<RxQuestionMark className="size-6" />}
//             label="Help"
//             href="/help" // Add href for Help
//           />
//           <MenuItem
//             icon={<IoMdCopy className="size-6" />}
//             label="Statements and reports"
//             href="/statements" // Add href for Statements and reports
//           />
//         </div>

//         <h2 className="text-2xl capitalize font-bold mb-4">Settings</h2>
//         <div className="space-y-2">
//           <MenuItem
//             icon={<RiShieldLine className="size-6" />}
//             label="Security and privacy"
//             description="Change your security and privacy settings."
//             href="your-account/security-and-privacy" // Add href for Security and privacy
//           />

//           <MenuItem
//             icon={<FaRegBell className="size-6" />}
//             label="Notifications"
//             description="Customise how you get updates."
//             href="/your-account/notification-preferences" // Add href for Notifications
//           />

//           <MenuItem
//             icon={<AiFillBank className="size-6" />}
//             label="Payment methods"
//             description="Manage saved cards and bank accounts that are linked to this account."
//             href="/your-account/payment-methods" // Add href for Payment methods
//           />

//           <MenuItem
//             icon={<TbBrandSpeedtest className="size-6" />}
//             label="Limits"
//             description="Manage your transfer and card limits."
//             href="/your-account/limits" // Add href for Limits
//           />

//           <MenuItem
//             icon={<FiUser className="size-6" />}
//             label="Personal details"
//             description="Update your personal information."
//             href="your-account/personal-details" // Add href for Personal details
//           />
//         </div>

//         <h2 className="text-2xl capitalize font-bold my-5">
//           Actions and agreements
//         </h2>
//         <div className="space-y-2">
//           <MenuItem
//             icon={<FiAlertCircle className="size-6" />}
//             label="Our agreements"
//             href="/terms-and-conditions" // Add href for Our agreements
//           />

//           <MenuItem
//             icon={<CiGift className="size-6" />}
//             label="Earn ₹1,001"
//             href="/invite" // Add href for Earn ₹1,001
//           />

//           <MenuItem
//             icon={<IoMdCloseCircleOutline className="size-6" />}
//             label="Close account"
//             description="Close your personal account."
//             href="/account-closure-flow" // Add href for Close account
//           />
//         </div>
//         <div className="text-center space-y-1.5 pb-10">
//           <p className="text-gray mt-2">
//             We’ve made some changes to this area of the app.
//           </p>

//           {/* Feedback */}
//           <span className="text-green font-medium underline underline-offset-1">
//             Give us feedback
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSettings;





import AccountCard from "@/app/components/AccountCard";
import MenuItem from "@/app/components/MenuItem";
import { FiUser } from "react-icons/fi";
import { RxQuestionMark } from "react-icons/rx";
import Image from "next/image";
import { RiShieldLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import Link from "next/link";

const AccountSettings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 gap-10">
      {/* Left Side: Fixed Account Card */}
      <div className="md:sticky top-0 h-fit bg-white z-10">
        <AccountCard username="RUDRA SUTARIYA"  />
      </div>

      {/* Right Side: Scrollable Menu Items */}
      <div className="flex flex-col w-full">
        {/* Adjust width as needed */}
        <h2 className="text-2xl capitalize font-bold mb-4">Your account</h2>
        <div className="space-y-2 mb-6">
          <MenuItem
            icon={<FaRegBell className="size-6" />}
            label="Inbox"
            href="/your-account/inbox" // Add href for Inbox
          />
          <MenuItem
            icon={<RxQuestionMark className="size-6" />}
            label="Help"
            href="/help" // Add href for Help
          />
          <MenuItem
            icon={<IoMdCopy className="size-6" />}
            label="Statements and reports"
            href="/statements" // Add href for Statements and reports
          />
        </div>

        <h2 className="text-2xl capitalize font-bold mb-4">Settings</h2>
        <div className="space-y-2">
          <MenuItem
            icon={<RiShieldLine className="size-6" />}
            label="Security and privacy"
            description="Change your security and privacy settings."
            href="your-account/security-and-privacy" // Add href for Security and privacy
          />

          <MenuItem
            icon={<FaRegBell className="size-6" />}
            label="Notifications"
            description="Customise how you get updates."
            href="your-account/notification-preferences" // Add href for Notifications
          />

          <MenuItem
            icon={<FiUser className="size-6" />}
            label="Personal details"
            description="Update your personal information."
            href="your-account/personal-details" // Add href for Personal details
          />
        </div>
        
        <div className="text-center space-y-1.5 pb-10">
          <p className="text-gray mt-2">
            We’ve made some changes to this area of the app.
          </p>

          {/* Feedback */}
          <span className="text-green font-medium underline underline-offset-1">
            Give us feedback
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;