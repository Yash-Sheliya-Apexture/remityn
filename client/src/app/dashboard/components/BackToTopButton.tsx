"use client"; // Essential for using hooks like useState, useEffect

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down more than 800px
  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Provides the smooth scrolling effect
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }} // Start 100px below its final position and invisible
          animate={{ y: 0, opacity: 1 }}   // Animate to final position (y=0) and fully visible
          exit={{ y: 100, opacity: 0 }}     // Animate back down 100px and fade out
          transition={{ duration: 0.3 }}    // Animation speed
          className="fixed cursor-pointer bottom-5 right-5 p-1.5 px-5 rounded-full bg-primary text-neutral-900 shadow-md hover:bg-primaryhover focus:outline-none z-50 cinder animate-pulse sm:block hidden"
          onClick={scrollToTop}
        >
          Back to top
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;