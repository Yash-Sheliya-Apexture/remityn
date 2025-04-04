// components/admin/payments/PaymentEditModal.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, X } from 'lucide-react';
import CustomDropdown from './CustomDropdown';
import { useCopyToClipboard } from './useCopyToClipboard';

interface PaymentEditModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedPaymentForEdit: any; // Replace 'any' with a more specific type if possible
    editFormData: { status: string };
    setEditFormData: React.Dispatch<React.SetStateAction<{ status: string }>>;
    editLoading: boolean;
    handleSaveEdit: () => Promise<void>;
    statusOptions: string[];
}

const PaymentEditModal: React.FC<PaymentEditModalProps> = ({
    isEditModalOpen,
    setIsEditModalOpen,
    selectedPaymentForEdit,
    editFormData,
    setEditFormData,
    editLoading,
    handleSaveEdit,
    statusOptions,
}) => {
    const editModalRef = useRef(null);
    const { copy: copyPaymentId, isCopied: isPaymentIdCopied } = useCopyToClipboard();
    const { copy: copyReferenceCode, isCopied: isReferenceCodeCopied } = useCopyToClipboard();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditModalOpen && editModalRef.current && !editModalRef.current.contains(event.target) && !event.target.closest('[id^="radix-ui-popper-"]')) {
                setIsEditModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditModalOpen, setIsEditModalOpen]);

    const handleStatusDropdownChange = (status: string) => {
        setEditFormData({ ...editFormData, status: status });
    };

    if (!selectedPaymentForEdit) return null; // Or handle this case appropriately

    return (
        <AnimatePresence>
            {isEditModalOpen && selectedPaymentForEdit && (
                <motion.div
                    ref={editModalRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50"
                >
                    <motion.div
                        initial={{ y: -30, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }}
                        exit={{ y: -30, opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
                    >
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-main">Edit Payment Status</h2>
                        </div>

                        <div className="space-y-4">
                            <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
                                <div>
                                    <label htmlFor="paymentId" className="block font-semibold text-main mb-1">Payment ID : </label>
                                    <span className="font-medium text-gray-700">{selectedPaymentForEdit._id}</span>
                                </div>
                                <button
                                    onClick={() => copyPaymentId(selectedPaymentForEdit._id)}
                                    className="p-2 rounded hover:bg-gray-100 focus:outline-none"
                                    aria-label="Copy Payment ID"
                                >
                                    <Copy className="size-4 text-gray-500" />
                                </button>
                            </div>
                            {isPaymentIdCopied && <p className="text-sm text-green-500 mt-1">Payment ID copied!</p>}

                            <div className='bg-green/10 p-3 rounded-md flex items-center justify-between'>
                                <div>
                                    <label htmlFor="referenceCode" className="block font-semibold text-main mb-1">Reference Code</label>
                                    <span className="font-medium text-gray-700">{selectedPaymentForEdit.referenceCode || 'N/A'}</span>
                                </div>
                                <button
                                    onClick={() => copyReferenceCode(selectedPaymentForEdit.referenceCode || '')}
                                    className="p-2 rounded hover:bg-gray-100 focus:outline-none"
                                    aria-label="Copy Reference Code"
                                >
                                    <Copy className="size-4 text-gray-500" />
                                </button>
                            </div>
                            {isReferenceCodeCopied && <p className="text-sm text-green-500 mt-1">Reference Code copied!</p>}

                            <div className='bg-green/10 p-3 rounded-md'>
                                <label htmlFor="amountToAdd" className="block font-semibold text-main mb-1">Amount</label>
                                <span className="font-medium text-gray-700">{selectedPaymentForEdit.amountToAdd}</span>
                            </div>
                            <div className='bg-green/10 p-3 rounded-md flex items-center'>
                                <label htmlFor="currency" className="block font-semibold text-main mb-1 mr-2">Currency</label>
                                <span className="font-medium text-gray-700">{selectedPaymentForEdit.payInCurrency?.code || 'N/A'}</span>
                            </div>
                            <div>
                                <CustomDropdown
                                    label="Status"
                                    value={editFormData.status || null}
                                    onChange={handleStatusDropdownChange}
                                    options={statusOptions.filter(opt => opt !== 'all')}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 w-full py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-md focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={editLoading}
                                className={`px-4 py-3 w-full cursor-pointer bg-primary text-secondary rounded-md hover:bg-primary-hover focus:outline-none ${editLoading ? 'opacity-50 cursor-wait' : ''}`}
                            >
                                {editLoading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentEditModal;