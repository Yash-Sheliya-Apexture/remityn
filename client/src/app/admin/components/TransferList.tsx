// frontend/src/app/admin/components/TransferList.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Transfer as TransferType } from "../../../types/transfer"; // Assuming you have types defined

interface TransferListProps {
  transfers: TransferType[]; // Array of Transfer type
}

const TransferList: React.FC<TransferListProps> = ({ transfers }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Recipient
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr
              key={transfer._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {transfer._id}
              </th>
              <td className="px-6 py-4">{transfer.user?.fullName || "N/A"}</td>
              <td className="px-6 py-4">
                {transfer.recipient?.accountHolderName || "N/A"}
              </td>
              <td className="px-6 py-4">
                {transfer.sendAmount} {transfer.sendCurrency?.code}
              </td>
              <td className="px-6 py-4">{transfer.status}</td>
              <td className="px-6 py-4">
                {new Date(transfer.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/admin/transfer/${transfer._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transfers.length === 0 && (
        <div className="p-4 text-center">No transfers to display.</div>
      )}
      {/* TODO: Add Pagination Controls Below the table */}
    </div>
  );
};

export default TransferList;
