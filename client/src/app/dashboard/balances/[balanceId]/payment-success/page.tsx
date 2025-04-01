"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import WiseLogo from '../../../../../../public/assets/images/plane-medium.png'; // Adjust path as needed
import { useAuth } from '../../../../hooks/useAuth';
import paymentService from '../../../../services/payment'; // Adjust path
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

interface PaymentSuccessParams {
    balanceId: string;
}

interface PaymentDetails {
    _id: string;
    amountToAdd: number;
    balanceCurrency: { code: string };
    payInCurrency: { code: string };
    // Add any other fields needed, e.g., estimated arrival if available
}

const PaymentSuccessPage = () => {
    const router = useRouter();
    const params = useParams<PaymentSuccessParams>();
    const searchParams = useSearchParams();
    const paymentId = searchParams.get('paymentId');
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

    // Optional: Fetch payment details for dynamic content (like arrival time)
    useEffect(() => {
        const fetchDetails = async () => {
            if (!paymentId || !token) {
                setError("Payment details cannot be loaded.");
                setIsLoading(false);
                return;
            }
            try {
                const details = await paymentService.getPaymentDetails(paymentId, token);
                setPaymentDetails(details);
            } catch (err: any) {
                console.error("Failed to fetch payment details for success page:", err);
                setError("Could not load specific payment details."); // Non-blocking error
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [paymentId, token]);


    const handleGotIt = () => {
        // Navigate to a relevant page, e.g., transactions or dashboard home
        router.push('/dashboard/transactions');
    };

    // Estimate - replace with actual data if available from paymentDetails
    const estimatedArrivalTime = "in 2 hours";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-700 text-white p-4">
            <div className="absolute top-6 left-6">
                <Image src={WiseLogo} alt="Wise Logo" width={100} height={25} />
            </div>

            <div className="text-center">
                {/* Placeholder for Paper Airplane Image */}
                <div className="mb-8 text-6xl">
                    {/* You can use an emoji or ideally an SVG/Image component */}
                    💸 {/* Placeholder */}
                    {/* Example with an image:
                    <Image
                        src="/path/to/paper-airplane.svg" // Add your image path
                        alt="Paper Airplane"
                        width={150}
                        height={150}
                        className="mx-auto"
                    />
                    */}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">
                    Your Money's on the Move
                </h1>

                {isLoading && <Skeleton className="h-5 w-64 mx-auto bg-green-600 mb-8" />}
                {!isLoading && (
                     <p className="text-lg mb-8">
                        Your money should arrive {estimatedArrivalTime}. We'll keep you posted.
                        {/* Optional: Show amount if details loaded */}
                        {/* {paymentDetails && ` Adding ${paymentDetails.amountToAdd} ${paymentDetails.balanceCurrency.code}.`} */}
                    </p>
                )}
                 {error && <p className="text-yellow-300 mb-8 text-sm">{error}</p>}


                <button
                    onClick={handleGotIt}
                    className="bg-green-400 hover:bg-green-300 text-green-900 font-bold py-3 px-10 rounded-md transition duration-200"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;