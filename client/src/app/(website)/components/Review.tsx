// src/app/all-reviews/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// --- Interfaces for Data Structure (Copied from SocialTrust) ---
interface Review {
    reviewerName: string;
    avatarUrl: string;
    rating: number;
    comment: string;
    // Add a unique ID if your data source provides one, otherwise rely on index (less ideal)
    id?: string | number;
}

interface ReviewGroup {
    id: string;
    reviews: Review[];
}

interface ReviewData {
    reviewGroups: ReviewGroup[];
}


// --- StarRating Component (Copied from SocialTrust) ---
interface StarRatingProps {
    rating: number;
    maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < maxRating; i++) {
    if (i < fullStars) {
      stars.push(
        <FaStar
          key={i}
          className="inline-block text-[#FBBF24] dark:text-white"
          size={18}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="inline-block text-[#FBBF24] dark:text-white"
          size={18}
        />
      );
    } else {
      stars.push(
        <FaStar
          key={i}
          className="inline-block text-lightgray dark:text-white"
          size={18}
        />
      );
    }
  }

  return <div className="inline-block">{stars}</div>;
};


// --- ReviewCard Component (Copied from SocialTrust) ---
interface ReviewCardProps extends Review {} // Use the Review interface directly

const ReviewCard: React.FC<ReviewCardProps> = ({
    reviewerName,
    avatarUrl,
    rating,
    comment,
}) => {
    return (
        // Added min-h-[200px] or similar to prevent layout shifts during load
        <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start h-full min-h-[200px]">
            <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <img
                        src={avatarUrl}
                        alt={`Avatar of ${reviewerName}`}
                        className="size-16 rounded-full object-cover flex-shrink-0" // Added flex-shrink-0
                        loading="lazy" // Added lazy loading for images
                    />
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-neutral-900 lg:text-lg text-base capitalize dark:text-primary leading-5 font-medium text-nowrap">
                            {reviewerName}
                        </div>
                        <StarRating rating={rating} />
                    </div>
                </div>
            </div>

            <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5 flex-grow"> {/* Added flex-grow */}
                {comment}
            </div>
        </div>
    );
};


// --- Constants for Infinite Scrolling ---
const INITIAL_MOBILE_LOAD = 6;
const LOAD_MORE_COUNT = 6; // Number of reviews to load each time


// --- Main AllReviewsPage Component ---
const AllReviewsPage: React.FC = () => {
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false); // Tracks if more reviews can be loaded
    const [loadingMore, setLoadingMore] = useState<boolean>(false); // Tracks if loading more is in progress

    const observerRef = useRef<HTMLDivElement | null>(null); // Ref for the intersection observer target

    // --- 1. Fetch All Reviews ---
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("/Review.json"); // Ensure this path is correct
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ReviewData = await response.json();
                if (!data || !Array.isArray(data.reviewGroups)) {
                    throw new Error("Invalid data structure in Review.json");
                }

                // Flatten all reviews from all groups into one array
                // Add a unique ID based on group and index if not present
                const flattenedReviews = data.reviewGroups.flatMap((group, groupIndex) =>
                    group.reviews.map((review, reviewIndex) => ({
                        ...review,
                        id: review.id ?? `g${groupIndex}-r${reviewIndex}`, // Assign a generated ID
                    }))
                );

                setAllReviews(flattenedReviews);

            } catch (err: any) {
                console.error("Failed to fetch reviews:", err);
                setError(err instanceof Error ? err : new Error("Unknown error"));
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []); // Fetch only once on component mount


    // --- 2. Detect Mobile Screen Size ---
    useEffect(() => {
        const checkMobile = () => {
            // Using 768px (Tailwind's `md` breakpoint) as the threshold
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile(); // Initial check
        window.addEventListener("resize", checkMobile);

        // Cleanup listener on component unmount
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    // --- 3. Set Initial Displayed Reviews ---
    useEffect(() => {
        if (allReviews.length === 0) return; // Don't run if no reviews fetched yet

        if (isMobile) {
            // Mobile: Show initial batch
            const initialToShow = allReviews.slice(0, INITIAL_MOBILE_LOAD);
            setDisplayedReviews(initialToShow);
            // Check if there are more reviews beyond the initial load
            setHasMore(allReviews.length > INITIAL_MOBILE_LOAD);
        } else {
            // Desktop: Show all reviews
            setDisplayedReviews(allReviews);
            setHasMore(false); // No "load more" needed for desktop
        }
    }, [allReviews, isMobile]); // Rerun when allReviews are loaded or screen size changes


    // --- 4. Infinite Scroll Logic ---
    const loadMoreReviews = useCallback(() => {
        if (loadingMore || !hasMore || !isMobile) return; // Exit if already loading, no more reviews, or not mobile

        setLoadingMore(true);

        const currentLength = displayedReviews.length;
        const nextBatch = allReviews.slice(currentLength, currentLength + LOAD_MORE_COUNT);

        // Simulate network delay for loading indicator visibility (optional)
        setTimeout(() => {
            setDisplayedReviews(prev => [...prev, ...nextBatch]);
            setHasMore(currentLength + nextBatch.length < allReviews.length);
            setLoadingMore(false);
        }, 300); // Adjust delay as needed

    }, [allReviews, displayedReviews.length, hasMore, isMobile, loadingMore]);

    // --- 5. Setup Intersection Observer ---
    useEffect(() => {
        // Only run observer setup on mobile and if there's potentially more to load
        if (!isMobile || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // isIntersecting is true when the target element enters the viewport
                if (entries[0].isIntersecting && hasMore && !loadingMore) {
                    loadMoreReviews();
                }
            },
            {
                root: null, // Use the viewport as the root
                rootMargin: '0px',
                threshold: 0.1 // Trigger when 10% of the target is visible
            }
        );

        // If the observerRef exists, start observing it
        const currentObserverRef = observerRef.current;
        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }

        // Cleanup function: disconnect the observer when the component unmounts
        // or when dependencies change (isMobile, hasMore)
        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [isMobile, hasMore, loadMoreReviews, loadingMore]); // Dependencies for the observer effect


    // --- 6. Render UI ---
    if (loading) {
        return (
            <div className="text-center p-10 text-gray-700 dark:text-gray-300">
                Loading all reviews...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-10 text-red-500">
                Error loading reviews: {error.message}
            </div>
        );
    }

    if (allReviews.length === 0) {
        return (
            <div className="text-center p-10 text-gray-700 dark:text-gray-300">
                No reviews have been submitted yet.
            </div>
        );
    }

    return (
        <section className="AllReviews bg-white dark:bg-background py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-mainheading dark:text-white mb-8 text-center">
                    What Our Customers Say
                </h1>

                {/* Grid for displaying reviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedReviews.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </div>

                {/* --- Observer Target & Loading Indicator (Mobile Only) --- */}
                {isMobile && (
                    <div ref={observerRef} className="h-10 flex justify-center items-center mt-8">
                        {loadingMore && (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                Loading more reviews...
                            </div>
                        )}
                        {!hasMore && displayedReviews.length > INITIAL_MOBILE_LOAD && (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                You've reached the end!
                            </div>
                        )}
                    </div>
                )}
                {/* Optionally, add a "Load More" button for non-mobile if desired, */}
                {/* but the request specified infinite scroll *only* for mobile */}

            </div>
        </section>
    );
};

export default AllReviewsPage;