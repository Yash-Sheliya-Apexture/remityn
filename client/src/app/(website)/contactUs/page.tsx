"use client";
// ContactForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";

// Define an interface for the form data
interface FormData {
  full_name: string;
  email: string;
  message: string;
}

// Define an interface for the component's props (if any)
interface ContactFormProps {
  // Example: onSubmit?: (data: FormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // You might want an error state as well
  // const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // setError(null); // Clear previous errors

    console.log("Form data submitted:", formData);

    // Here you would typically make an API call
    // For example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || 'Something went wrong');
    //   }
    //   console.log('Form submitted successfully!');
    //   // Optionally reset the form
    //   setFormData({ full_name: '', email: '', message: '' });
    //   // if (props.onSubmit) props.onSubmit(formData);
    // } catch (err) {
    //   console.error('Submission error:', err);
    //   setError(err instanceof Error ? err.message : 'An unknown error occurred');
    // } finally {
    //   setIsSubmitting(false);
    // }

    // Simulating API call delay for demonstration
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form after successful "submission"
      setFormData({ full_name: "", email: "", message: "" });
      alert("Form submitted (check console)!");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto min-h-[59dvh] max-w-7xl xl:px-0">
        <div className="relative flex min-h-full items-center justify-center lg:py-10">
          <div className="px-4 flex w-full max-w-xl flex-col items-center space-y-4 rounded-xl bg-background p-4 sm:mx-0">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-mainheadingWhite capitalize">
              Contact us
            </h2>

            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col gap-1 rounded-md shadow-sm">
                <label
                  htmlFor="full_name"
                  className="text-white inline-block mb-1.5"
                >
                  Name {" "}
                  <span className="text-red-600">*</span>
                </label>

                <input
                  id="full_name"
                  className="block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10"
                  placeholder="Enter your name here"
                  data-testid="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required // Added for basic HTML5 validation
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col gap-1 rounded-md shadow-sm">
                <label
                  htmlFor="email"
                  className="text-white inline-block mb-1.5"
                >
                  Email {" "}
                  <span className="text-red-600">*</span>
                </label>

                <input
                  id="email"
                  type="email" // Added type for better validation/keyboard on mobile
                  className="block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10"
                  placeholder="Enter your email id here."
                  data-testid="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required // Added for basic HTML5 validation
                />
              </div>
            </div>


            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col gap-1 rounded-md shadow-sm">
                <label
                  htmlFor="message"
                  className="text-white inline-block mb-1.5"
                > 
                  Message {" "}
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="block px-4 py-3 bg-primarybox border text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10 min-h-[150px] resize-none"
                  cols={40}
                  rows={8}
                  placeholder="Enter your message here."
                  data-testid="message"
                  value={formData.message}
                  onChange={handleChange}
                  required // Added for basic HTML5 validation
                ></textarea>
              </div>
            </div>

            <p className="text-subheadingWhite text-center font-medium inline-block text-sm sm:text-base">
              or directly contact us via{/* */} {/* Original comment */}
              <a href="mailto:contact@scopex.money" className="underline text-primary">
                contact@Remity.money
              </a>
            </p>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md cursor-pointer bg-primary hover:bg-primaryhover transition-all ease-linear duration-75 px-8 py-3 font-medium text-mainheading"
              data-testid="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
          </div>

        </div>
      </div>
    </form>
  );
};

export default ContactForm;
