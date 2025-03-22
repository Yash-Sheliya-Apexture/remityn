// // pages/tasks.tsx
// import React from "react";
// import { GetServerSideProps } from "next";
// import { MdError } from "react-icons/md";
// import { LuPlus } from "react-icons/lu";

// interface Task {
//   id: string;
//   amount: string;
//   currency: string;
//   description: string;
//   status: "pending" | "completed";
// }

// interface TasksProps {
//   tasks: Task[];
// }

// const Tasks: React.FC<TasksProps> = ({ tasks }) => {
//   return (
//     <section className="Tasks pt-12">
//       <div className="container mx-auto px-4">
//         <div className="w-full">
//           <h1 className="text-3xl font-semibold text-main mb-4">Tasks</h1>

//           <div className="bg-lightgray rounded-2xl p-3">
//             {tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="flex sm:items-center items-start gap-4 "
//               >
//                 <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200 relative">
//                   <LuPlus size={28} className="text-main" />

//                   {/* status icon */}
//                   <div className="absolute bottom-0 left-6">
//                     {task.status === "pending" && (
//                       <MdError size={18} className="text-amber-500 ml-2" />
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex sm:flex-row flex-col sm:items-center justify-between w-full gap-3">
//                   <div>
//                     <div className="flex items-center">
//                       <p className="font-medium text-gray-900">
//                         {task.amount} {task.currency} to your {task.currency}{" "}
//                         balance
//                       </p>
//                     </div>
//                     <p className="text-sm text-gray-500">{task.description}</p>
//                   </div>

//                   {/* Review Button */}
//                   <button className="w-fit bg-primary text-secondary px-3 py-1 rounded-full text-sm font-medium text-right cursor-pointer">
//                     Review
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Page component that uses the Tasks component
// export default function TasksPage() {
//   // In a real application, this data would come from props provided by getServerSideProps
//   const tasks: Task[] = [
//     {
//       id: "1",
//       amount: "91.87",
//       currency: "EUR",
//       description: "Waiting for you to pay",
//       status: "pending",
//     },
//     // You can add more tasks here if needed
//   ];

//   return <Tasks tasks={tasks} />;
// }

// // This function would normally fetch data from an API
// export const getServerSideProps: GetServerSideProps = async () => {
//   // In a real application, you would fetch tasks from an API or database
//   const tasks: Task[] = [
//     {
//       id: "1",
//       amount: "91.87",
//       currency: "EUR",
//       description: "Waiting for you to pay",
//       status: "pending",
//     },
//   ];

//   return {
//     props: {
//       tasks,
//     },
//   };
// };








// pages/tasks.tsx
import React from "react";
import { GetServerSideProps } from "next";
import { MdError } from "react-icons/md";
import { LuPlus } from "react-icons/lu";

interface Task {
  id: string;
  amount: string;
  currency: string;
  description: string;
}

interface TasksProps {
  tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  return (
    <section className="Tasks pt-12">
      <div className="container mx-auto">
        <div className="w-full">
          <h1 className="text-3xl font-semibold text-main mb-5">Tasks</h1>

          <div className="bg-lightgray rounded-2xl p-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex sm:items-center items-start gap-4 "
              >
                <div className="p-3 bg-white rounded-full flex items-center justify-center border border-gray-200 relative z-10">
                  <LuPlus size={28} className="text-main" />

                  {/* status icon */}
                  <div className="absolute bottom-0 left-6">
                    <MdError size={18} className="text-amber-500 ml-2" />
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:items-center justify-between w-full gap-3">
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium text-main">
                        {task.amount} {task.currency} to your {task.currency}{" "}
                        balance
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>

                  {/* Review Button */}
                  <button className="w-fit bg-primary text-secondary px-3 py-1 rounded-full text-sm font-medium text-right cursor-pointer">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Page component that uses the Tasks component
export default function TasksPage() {
  // In a real application, this data would come from props provided by getServerSideProps
  const tasks: Task[] = [
    {
      id: "1",
      amount: "91.87",
      currency: "EUR",
      description: "Waiting for you to pay",
    },
    // You can add more tasks here if needed
  ];

  return <Tasks tasks={tasks} />;
}

// This function would normally fetch data from an API
export const getServerSideProps: GetServerSideProps = async () => {
  // In a real application, you would fetch tasks from an API or database
  const tasks: Task[] = [
    {
      id: "1",
      amount: "91.87",
      currency: "EUR",
      description: "Waiting for you to pay",
    },
  ];

  return {
    props: {
      tasks,
    },
  };
};