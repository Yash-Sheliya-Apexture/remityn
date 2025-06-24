// // "use client";
// // // ContactForm.tsx
// // import React, { useState, ChangeEvent, FormEvent } from "react";

// // // Define an interface for the form data
// // interface FormData {
// //   full_name: string;
// //   email: string;
// //   message: string;
// // }

// // // Define an interface for the component's props (if any)
// // interface ContactFormProps {
// //   // Example: onSubmit?: (data: FormData) => void;
// // }

// // const ContactForm: React.FC<ContactFormProps> = () => {
// //   const [formData, setFormData] = useState<FormData>({
// //     full_name: "",
// //     email: "",
// //     message: "",
// //   });

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   // You might want an error state as well
// //   // const [error, setError] = useState<string | null>(null);

// //   const handleChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     // setError(null); // Clear previous errors

// //     console.log("Form data submitted:", formData);

// //     // Here you would typically make an API call
// //     // For example:
// //     // try {
// //     //   const response = await fetch('/api/contact', {
// //     //     method: 'POST',
// //     //     headers: {
// //     //       'Content-Type': 'application/json',
// //     //     },
// //     //     body: JSON.stringify(formData),
// //     //   });
// //     //   if (!response.ok) {
// //     //     const errorData = await response.json();
// //     //     throw new Error(errorData.message || 'Something went wrong');
// //     //   }
// //     //   console.log('Form submitted successfully!');
// //     //   // Optionally reset the form
// //     //   setFormData({ full_name: '', email: '', message: '' });
// //     //   // if (props.onSubmit) props.onSubmit(formData);
// //     // } catch (err) {
// //     //   console.error('Submission error:', err);
// //     //   setError(err instanceof Error ? err.message : 'An unknown error occurred');
// //     // } finally {
// //     //   setIsSubmitting(false);
// //     // }

// //     // Simulating API call delay for demonstration
// //     setTimeout(() => {
// //       setIsSubmitting(false);
// //       // Reset form after successful "submission"
// //       setFormData({ full_name: "", email: "", message: "" });
// //       alert("Form submitted (check console)!");
// //     }, 1000);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <div className="mx-auto min-h-[59dvh] max-w-7xl xl:px-0">
// //         <div className="relative flex min-h-full items-center justify-center lg:py-10">
// //           <div className="px-4 flex w-full max-w-xl flex-col items-center space-y-4 rounded-xl bg-background p-4 sm:mx-0">
// //             <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-white/90 capitalize">
// //               Contact us
// //             </h2>

// //             <div className="flex w-full flex-col gap-2">
// //               <div className="flex flex-col gap-1 rounded-md shadow-sm">
// //                 <label
// //                   htmlFor="full_name"
// //                   className="text-white font-medium inline-block mb-1.5"
// //                 >
// //                   Name <span className="text-red-600">*</span>
// //                 </label>

// //                 <input
// //                   id="full_name"
// //                   className="block px-4 py-3 border border-gray-600 hover:border-gray-500 focus:border-gray-500  text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10"
// //                   placeholder="Enter your name here"
// //                   data-testid="full_name"
// //                   name="full_name"
// //                   value={formData.full_name}
// //                   onChange={handleChange}
// //                   required // Added for basic HTML5 validation
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex w-full flex-col gap-2">
// //               <div className="flex flex-col gap-1 rounded-md shadow-sm">
// //                 <label
// //                   htmlFor="email"
// //                   className="text-white font-medium inline-block mb-1.5"
// //                 >
// //                   Email <span className="text-red-600">*</span>
// //                 </label>

// //                 <input
// //                   id="email"
// //                   type="email" // Added type for better validation/keyboard on mobile
// //                   className="block px-4 py-3  border text-white border-gray-600 hover:border-gray-500 focus:border-gray-500  placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10"
// //                   placeholder="Enter your email id here."
// //                   data-testid="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required // Added for basic HTML5 validation
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex w-full flex-col gap-2">
// //               <div className="flex flex-col gap-1 rounded-md shadow-sm">
// //                 <label
// //                   htmlFor="message"
// //                   className="text-white font-medium inline-block mb-1.5"
// //                 >
// //                   Message <span className="text-red-600">*</span>
// //                 </label>
// //                 <textarea
// //                   name="message"
// //                   id="message"
// //                   className="sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 h-auto w-full transition-all border text-white resize-none border-gray-600 hover:border-gray-500 focus:border-gray-500 rounded-lg focus:outline-none ease-linear duration-75 min-h-[150px]"
// //                   maxLength={5000}
// //                   rows={6} // Suggest rows for initial height, min-h also works
// //                   placeholder="Enter message content..."
// //                   data-testid="message"
// //                   value={formData.message}
// //                   onChange={handleChange}
// //                   required // Added for basic HTML5 validation
// //                 ></textarea>
// //               </div>
// //             </div>

// //             <p className="text-subheadingWhite text-center font-medium inline-block text-sm sm:text-base">
// //               or directly contact us via{/* */} {/* Original comment */}
// //               <a
// //                 href="mailto:contact@scopex.money"
// //                 className="underline text-primary"
// //               >
// //                 contact@Remity.money
// //               </a>
// //             </p>

// //             <button
// //               type="submit"
// //               className="group relative flex w-full justify-center rounded-lg cursor-pointer bg-primary hover:bg-primaryhover transition-all ease-linear duration-75 px-8 py-3 font-medium text-mainheading"
// //               data-testid="submit-button"
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? "Submitting..." : "Submit"}
// //             </button>
// //             {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
// //           </div>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default ContactForm;

// // "use client";
// // // ContactForm.tsx
// // import React, { useState, ChangeEvent, FormEvent } from "react";
// // import { FaTelegram, FaTwitter } from "react-icons/fa";
// // import { IoLogoWhatsapp } from "react-icons/io";

// // // Heroicons (simple inline SVGs for demonstration)
// // const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
// //   <svg
// //     xmlns="http://www.w3.org/2000/svg"
// //     fill="none"
// //     viewBox="0 0 24 24"
// //     strokeWidth={1.5}
// //     stroke="currentColor"
// //     {...props}
// //   >
// //     <path
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
// //     />
// //   </svg>
// // );

// // const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
// //   <svg
// //     xmlns="http://www.w3.org/2000/svg"
// //     fill="none"
// //     viewBox="0 0 24 24"
// //     strokeWidth={1.5}
// //     stroke="currentColor"
// //     {...props}
// //   >
// //     <path
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
// //     />
// //     <path
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
// //     />
// //   </svg>
// // );

// // // Define an interface for the form data
// // interface FormData {
// //   full_name: string;
// //   email: string;
// //   subject: string;
// //   message: string;
// // }

// // const ContactForm: React.FC = () => {
// //   const [formData, setFormData] = useState<FormData>({
// //     full_name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null);

// //   const handleChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     setError(null);
// //     setSuccessMessage(null);

// //     console.log("Form data submitted:", formData);

// //     // Simulate API call
// //     try {
// //       // const response = await fetch('/api/contact', {
// //       //   method: 'POST',
// //       //   headers: { 'Content-Type': 'application/json' },
// //       //   body: JSON.stringify(formData),
// //       // });
// //       // if (!response.ok) {
// //       //   const errorData = await response.json();
// //       //   throw new Error(errorData.message || 'Something went wrong');
// //       // }
// //       // const result = await response.json();
// //       // setSuccessMessage(result.message || "Your message has been sent successfully!");
// //       // setFormData({ full_name: "", email: "", subject: "", message: "" });

// //       // Simulating API call delay for demonstration
// //       await new Promise((resolve) => setTimeout(resolve, 1500));
// //       setSuccessMessage("Your message has been sent successfully! (Simulated)");
// //       setFormData({ full_name: "", email: "", subject: "", message: "" });
// //     } catch (err) {
// //       console.error("Submission error:", err);
// //       setError(
// //         err instanceof Error ? err.message : "An unknown error occurred"
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <section className="bg-background py-10 sm:py-16 antialiased">
// //       <div className="mx-auto max-w-7xl px-4">
// //         <div className="flex flex-col justify-center items-center mb-10 md:mb-14">
// //           <h2 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-mainheadingWhite">
// //             Get In <span className="text-primary">Touch</span>
// //           </h2>

// //           <p className="text-subheadingWhite md:text-lg text-center text-base leading-relaxed max-w-lg lg:mx-0">
// //             We're here to help and answer any question you might have. We look
// //             forward to hearing from you!
// //           </p>
// //         </div>

// //         <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
// //           {/* Left Column: Contact Info */}
// //           <div className="lg:col-span-5 mb-12 lg:mb-0 bg-primarybox p-8 rounded-xl">
// //             <h2 className="text-2xl font-semibold text-white/90 mb-6">
// //               Contact Information
// //             </h2>

// //             <p className="text-mainheadingWhite mb-8">
// //               Have a question or need assistance with our currency exchange
// //               services? Reach out directly or fill the form, and we'll get back
// //               to you promptly.
// //             </p>

// //             <div className="space-y-6">
// //               <div className="flex items-start">
// //                 <MailIcon className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
// //                 <div>
// //                   <h3 className="text-lg font-medium text-white/90">
// //                     Email Us
// //                   </h3>
// //                   <a
// //                     href="mailto:contact@Remity.money"
// //                     className="text-primary hover:text-primaryhover transition-all ease-linear duration-150"
// //                   >
// //                     contact@Remity.money
// //                   </a>
// //                 </div>
// //               </div>
// //               <div className="flex items-start">
// //                 <MapPinIcon className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
// //                 <div>
// //                   <h3 className="text-lg font-medium text-white/90">
// //                     Our Office
// //                   </h3>
// //                   <p className="text-gray-300">123 Exchange Plaza, Suite 400</p>
// //                   <p className="text-gray-300">New York, NY 10001, USA</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-8 pt-8 border-t">
// //               <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
// //               <div className="flex space-x-2">
// //                 {/* Replace with actual links and icons */}
// //                 <a
// //                   href="#" // Replace YOURPHONENUMBER with your WhatsApp number e.g., 15551234567
// //                   target="_blank" // Opens in a new tab
// //                   rel="noopener noreferrer" // Security best practice for target="_blank"
// //                   aria-label="Contact Remity on WhatsApp"
// //                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
// //                 >
// //                   <IoLogoWhatsapp className="size-7" />
// //                 </a>

// //                 <a
// //                   href="#"
// //                   target="_blank"
// //                   aria-label="Remity on Telegram"
// //                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
// //                 >
// //                   <FaTelegram className="size-7" />
// //                 </a>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column: Form */}
// //           <div className="lg:col-span-7 bg-primarybox p-8 rounded-xl">
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div>
// //                 <label htmlFor="full_name" className="text-white inline-block">
// //                   Full Name
// //                 </label>

// //                 <div className="mt-1">
// //                   <input
// //                     id="full_name"
// //                     name="full_name"
// //                     type="text"
// //                     autoComplete="name"
// //                     value={formData.full_name}
// //                     onChange={handleChange}
// //                     required
// //                     placeholder="e.g. Jane Doe"
// //                     data-testid="full_name"
// //                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label htmlFor="email" className="text-white inline-block">
// //                   Email Address
// //                 </label>
// //                 <div className="mt-1">
// //                   <input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     autoComplete="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     required
// //                     placeholder="you@example.com"
// //                     data-testid="email"
// //                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label htmlFor="message" className="text-white inline-block">
// //                   Message
// //                 </label>
// //                 <div className="mt-1">
// //                   <textarea
// //                     name="message"
// //                     id="message"
// //                     rows={5}
// //                     value={formData.message}
// //                     onChange={handleChange}
// //                     required
// //                     maxLength={5000}
// //                     placeholder="Enter your message here..."
// //                     data-testid="message"
// //                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0 sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox resize-none min-h-[130px]"
// //                   ></textarea>
// //                 </div>
// //               </div>

// //               <div>
// //                 <button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   data-testid="submit-button"
// //                   className="flex w-full justify-center rounded-md bg-primary cursor-pointer hover:bg-primaryhover px-6 py-3 h-12.5 lg:text-lg text-base font-medium text-mainheading disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-linear"
// //                 >
// //                   {isSubmitting ? "Sending Message..." : "Send Message"}
// //                 </button>
// //               </div>

// //               {successMessage && (
// //                 <p className="text-green-500 text-sm mt-3 text-center">
// //                   {successMessage}
// //                 </p>
// //               )}

// //               {error && (
// //                 <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ContactForm;

// // "use client";
// // // ContactForm.tsx
// // import React, { useState, ChangeEvent, FormEvent } from "react";
// // import { FaTelegram } from "react-icons/fa"; // Removed FaTwitter as it wasn't used
// // import { IoLogoWhatsapp } from "react-icons/io";
// // import { IoChatboxEllipsesOutline } from "react-icons/io5";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css"; // Import the CSS

// // // Heroicons (simple inline SVGs for demonstration)
// // const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
// //   <svg
// //     xmlns="http://www.w3.org/2000/svg"
// //     fill="none"
// //     viewBox="0 0 24 24"
// //     strokeWidth={1.5}
// //     stroke="currentColor"
// //     {...props}
// //   >
// //     <path
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
// //     />
// //   </svg>
// // );

// // const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
// //   <svg
// //     xmlns="http://www.w3.org/2000/svg"
// //     fill="none"
// //     viewBox="0 0 24 24"
// //     strokeWidth={1.5}
// //     stroke="currentColor"
// //     {...props}
// //   >
// //     <path
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
// //     />
// //     <path
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
// //     />
// //   </svg>
// // );

// // // Define an interface for the form data
// // interface FormData {
// //   full_name: string;
// //   email: string;
// //   subject: string;
// //   message: string;
// // }

// // const ContactForm: React.FC = () => {
// //   const [formData, setFormData] = useState<FormData>({
// //     full_name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   // No longer need successMessage state, react-toastify will handle it
// //   // const [successMessage, setSuccessMessage] = useState<string | null>(null);

// //   const handleChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     setError(null);
// //     // setSuccessMessage(null); // No longer needed

// //     console.log("Form data submitted:", formData);

// //     // Simulate API call
// //     try {
// //       // const response = await fetch('/api/contact', {
// //       //   method: 'POST',
// //       //   headers: { 'Content-Type': 'application/json' },
// //       //   body: JSON.stringify(formData),
// //       // });
// //       // if (!response.ok) {
// //       //   const errorData = await response.json();
// //       //   throw new Error(errorData.message || 'Something went wrong');
// //       // }
// //       // const result = await response.json();
// //       // toast.success(result.message || "Your message has been sent successfully!");
// //       // setFormData({ full_name: "", email: "", subject: "", message: "" });

// //       // Simulating API call delay for demonstration
// //       await new Promise((resolve) => setTimeout(resolve, 1500));
// //       toast.success("Your message has been sent successfully!", {
// //         position: "top-right",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //         theme: "colored", // or "light", "dark"
// //       });
// //       setFormData({ full_name: "", email: "", subject: "", message: "" });
// //     } catch (err) {
// //       console.error("Submission error:", err);
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An unknown error occurred";
// //       setError(errorMessage);
// //       toast.error(errorMessage, {
// //         // Optionally show error toasts too
// //         position: "top-right",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //         progress: undefined,
// //         theme: "colored",
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <section className="bg-background py-10 sm:py-16 antialiased">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={5000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="colored" // Default theme for all toasts, can be overridden per toast
// //       />
// //       <div className="mx-auto max-w-7xl px-4">
// //         <div className="flex flex-col justify-center items-center mb-10 md:mb-14">
// //           <h2 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-mainheadingWhite">
// //             Get In <span className="text-primary">Touch</span>
// //           </h2>

// //           <p className="text-subheadingWhite md:text-lg text-center text-base leading-relaxed max-w-lg lg:mx-0">
// //             We're here to help and answer any question you might have. We look
// //             forward to hearing from you!
// //           </p>
// //         </div>

// //         <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
// //           {/* Left Column: Contact Info */}
// //           <div className="lg:col-span-5 mb-12 lg:mb-0 bg-primarybox p-8 rounded-xl">
// //             <h2 className="text-2xl font-semibold text-white/90 mb-6">
// //               Contact Information
// //             </h2>

// //             <p className="text-mainheadingWhite mb-8">
// //               Have a question or need assistance with our currency exchange
// //               services? Reach out directly or fill the form, and we'll get back
// //               to you promptly.
// //             </p>

// //             <div className="space-y-6">
// //               <div className="flex items-start">
// //                 <MailIcon className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
// //                 <div>
// //                   <h3 className="text-lg font-medium text-white/90">
// //                     Email Us
// //                   </h3>
// //                   <a
// //                     href="mailto:contact@Remity.money"
// //                     className="text-primary hover:text-primaryhover transition-all ease-linear duration-150"
// //                   >
// //                     contact@remity.money
// //                   </a>
// //                 </div>
// //               </div>

// //               <div className="flex items-start">
// //                 {/* live Chat-button */}
// //                 <IoChatboxEllipsesOutline className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
// //                 <div>
// //                   <h3 className="text-lg font-medium text-white/90">
// //                     Live Chat
// //                   </h3>
// //                   <button className="px-6 py-2.5 bg-primary hover:bg-primaryhover transition-all ease-linear duration-150  text-mainheading cursor-pointer mt-1 lg:text-lg text-base rounded-md  font-medium">
// //                     <span>Chat with Us</span>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-8 pt-8 border-t">
// //               <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
// //               <div className="flex space-x-3">
// //                 <a
// //                   href="#" // Replace with your actual WhatsApp link e.g., https://wa.me/YOURPHONENUMBER
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label="Contact Remity on WhatsApp"
// //                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
// //                 >
// //                   <IoLogoWhatsapp className="size-7" />
// //                 </a>

// //                 <a
// //                   href="#" // Replace with your actual Telegram link
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label="Remity on Telegram"
// //                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
// //                 >
// //                   <FaTelegram className="size-7" />
// //                 </a>

// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column: Form */}
// //           <div className="lg:col-span-7 bg-primarybox p-6 rounded-xl">
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div>
// //                 <label htmlFor="full_name" className="text-white inline-block">
// //                   Full Name
// //                 </label>
// //                 <div className="mt-1">
// //                   <input
// //                     id="full_name"
// //                     name="full_name"
// //                     type="text"
// //                     autoComplete="name"
// //                     value={formData.full_name}
// //                     onChange={handleChange}
// //                     required
// //                     placeholder="e.g. Jane Doe"
// //                     data-testid="full_name"
// //                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label htmlFor="email" className="text-white inline-block">
// //                   Email Address
// //                 </label>
// //                 <div className="mt-1">
// //                   <input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     autoComplete="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     required
// //                     placeholder="you@example.com"
// //                     data-testid="email"
// //                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label htmlFor="message" className="text-white inline-block">
// //                   Message
// //                 </label>
// //                 <div className="mt-1">
// //                   <textarea
// //                     name="message"
// //                     id="message"
// //                     rows={5}
// //                     value={formData.message}
// //                     onChange={handleChange}
// //                     required
// //                     maxLength={5000}
// //                     placeholder="Enter your message here..."
// //                     data-testid="message"
// //                     className="mt-1 block px-4 py-3.5 bg-primarybox w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0 sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox resize-none min-h-[120px]"
// //                   ></textarea>
// //                 </div>
// //               </div>

// //               <div>
// //                 <button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   data-testid="submit-button"
// //                   className="flex w-full justify-center rounded-md bg-primary cursor-pointer hover:bg-primaryhover px-6 py-3 h-12.5 lg:text-lg text-base font-medium text-mainheading disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-linear"
// //                 >
// //                   {isSubmitting ? "Sending Message..." : "Send Message"}
// //                 </button>
// //               </div>

// //               {error && (
// //                 <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
// //               )}

// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ContactForm;

// "use client";
// // ContactForm.tsx
// import React, { useState, ChangeEvent, FormEvent, useCallback } from "react"; // Added useCallback
// import { IoChatboxEllipsesOutline } from "react-icons/io5";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Heroicons (simple inline SVGs for demonstration)
// const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//     />
//   </svg>
// );

// // Define an interface for the form data
// interface FormData {
//   full_name: string;
//   email: string;
//   subject: string; // Subject was in FormData but not in the form, kept for consistency
//   message: string;
// }

// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     full_name: "",
//     email: "",
//     subject: "", // Subject field is not in the form UI but in the state
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     console.log("Form data submitted:", formData);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       toast.success("Your message has been sent successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//       setFormData({ full_name: "", email: "", subject: "", message: "" });
//     } catch (err) {
//       console.error("Submission error:", err);
//       const errorMessage =
//         err instanceof Error ? err.message : "An unknown error occurred";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handler for the "Chat with Us" button
//   const handleLiveChatClick = useCallback(() => {
//     console.log(
//       "ContactForm Live Chat button clicked: Attempting to open Tawk.to chat"
//     );
//     if (typeof window !== "undefined" && window.Tawk_API) {
//       if (typeof window.Tawk_API.maximize === "function") {
//         window.Tawk_API.maximize();
//       } else if (typeof window.Tawk_API.toggle === "function") {
//         // Fallback to toggle if maximize is not available or preferred
//         window.Tawk_API.toggle();
//       } else {
//         console.warn(
//           "Tawk_API.maximize() or Tawk_API.toggle() is not available on window.Tawk_API."
//         );
//       }
//     } else {
//       console.warn(
//         "Tawk_API is not initialized or not available on window. Cannot open chat."
//       );
//     }
//   }, []);

//   return (
//     <section className="bg-background py-10 sm:py-16 antialiased">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex flex-col justify-center items-center mb-10 md:mb-14">
//           <h2 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-mainheadingWhite">
//             Let’s <span className="text-primary">Connect</span>
//           </h2>

//           <p className="text-subheadingWhite md:text-lg text-center text-base leading-relaxed max-w-lg lg:mx-0">
//             Need help or have questions? Our team is here to assist you with
//             fast, friendly supports.
//           </p>
//         </div>

//         <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
//           {/* Left Column: Contact Info */}
//           <div className="lg:col-span-5 flex justify-between flex-col mb-10 lg:mb-0 bg-primarybox p-6 rounded-xl h-full">
//             <div>
//               <h2 className="text-2xl font-semibold text-white/90 mb-6">
//                 Contact Information
//               </h2>

//               <p className="text-mainheadingWhite mb-8">
//                 Need help with our currency exchange services? Contact us
//                 directly or use the quick form we’ll respond as soon as
//                 possible. You can also reach out for assistance with adding a
//                 recipient or checking the status of your recent transfers.
//               </p>
//             </div>

//             <div className="space-y-5">
//               <div className="flex items-start">
//                 <MailIcon className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Email Support
//                   </h3>
//                   <a
//                     href="mailto:contact@Remity.money"
//                     className="text-primary hover:text-primaryhover transition-all ease-linear duration-150"
//                   >
//                     contact@remity.money
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <IoChatboxEllipsesOutline className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Live Chat Assistance
//                   </h3>
//                   <button
//                     onClick={handleLiveChatClick} // Added onClick handler
//                     className="px-6 py-2.5 bg-primary hover:bg-primaryhover transition-all ease-linear duration-150 text-mainheading cursor-pointer mt-1 lg:text-lg text-base rounded-md font-medium"
//                     aria-label="Chat with us via live chat"
//                   >
//                     <span>Start Chat</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Form */}
//           <div className="lg:col-span-7 bg-primarybox p-6 rounded-xl">
//             {" "}
//             {/* Added sm:p-8 for consistency */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label
//                   htmlFor="full_name"
//                   className="text-white inline-block mb-1"
//                 >
//                   {" "}
//                   {/* Added mb-1 */}
//                   Full Name
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="full_name"
//                     name="full_name"
//                     type="text"
//                     autoComplete="name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g. Jane Doe"
//                     data-testid="full_name"
//                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 text-white focus:outline-0" // Updated focus style
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="email" className="text-white inline-block mb-1">
//                   {" "}
//                   {/* Added mb-1 */}
//                   Email Address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="you@example.com"
//                     data-testid="email"
//                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 text-white focus:outline-0" // Updated focus style
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="message"
//                   className="text-white inline-block mb-1"
//                 >
//                   {" "}
//                   {/* Added mb-1 */}
//                   Message
//                 </label>
//                 <div className="mt-1">
//                   <textarea
//                     name="message"
//                     id="message"
//                     rows={5}
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     maxLength={2000}
//                     placeholder="Enter your message here..."
//                     data-testid="message"
//                     className="mt-1 block px-4 py-3.5 bg-primarybox w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 text-white focus:outline-0 sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-secondarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondaryboxhover resize-none max-h-[100px]" // Updated focus style
//                   ></textarea>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   data-testid="submit-button"
//                   className="flex w-full justify-center rounded-md bg-primary cursor-pointer hover:bg-primaryhover px-6 py-3 h-12.5 lg:text-lg text-base font-medium text-mainheading disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-linear"
//                 >
//                   {isSubmitting ? "Sending Message..." : "Submit Request"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;

// "use client";
// // ContactForm.tsx
// import React, { useState, ChangeEvent, FormEvent } from "react";

// // Define an interface for the form data
// interface FormData {
//   full_name: string;
//   email: string;
//   message: string;
// }

// // Define an interface for the component's props (if any)
// interface ContactFormProps {
//   // Example: onSubmit?: (data: FormData) => void;
// }

// const ContactForm: React.FC<ContactFormProps> = () => {
//   const [formData, setFormData] = useState<FormData>({
//     full_name: "",
//     email: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   // You might want an error state as well
//   // const [error, setError] = useState<string | null>(null);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // setError(null); // Clear previous errors

//     console.log("Form data submitted:", formData);

//     // Here you would typically make an API call
//     // For example:
//     // try {
//     //   const response = await fetch('/api/contact', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(formData),
//     //   });
//     //   if (!response.ok) {
//     //     const errorData = await response.json();
//     //     throw new Error(errorData.message || 'Something went wrong');
//     //   }
//     //   console.log('Form submitted successfully!');
//     //   // Optionally reset the form
//     //   setFormData({ full_name: '', email: '', message: '' });
//     //   // if (props.onSubmit) props.onSubmit(formData);
//     // } catch (err) {
//     //   console.error('Submission error:', err);
//     //   setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     // } finally {
//     //   setIsSubmitting(false);
//     // }

//     // Simulating API call delay for demonstration
//     setTimeout(() => {
//       setIsSubmitting(false);
//       // Reset form after successful "submission"
//       setFormData({ full_name: "", email: "", message: "" });
//       alert("Form submitted (check console)!");
//     }, 1000);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mx-auto min-h-[59dvh] max-w-7xl xl:px-0">
//         <div className="relative flex min-h-full items-center justify-center lg:py-10">
//           <div className="px-4 flex w-full max-w-xl flex-col items-center space-y-4 rounded-xl bg-background p-4 sm:mx-0">
//             <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-white/90 capitalize">
//               Contact us
//             </h2>

//             <div className="flex w-full flex-col gap-2">
//               <div className="flex flex-col gap-1 rounded-md shadow-sm">
//                 <label
//                   htmlFor="full_name"
//                   className="text-white font-medium inline-block mb-1.5"
//                 >
//                   Name <span className="text-red-600">*</span>
//                 </label>

//                 <input
//                   id="full_name"
//                   className="block px-4 py-3 border border-gray-600 hover:border-gray-500 focus:border-gray-500  text-white placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10"
//                   placeholder="Enter your name here"
//                   data-testid="full_name"
//                   name="full_name"
//                   value={formData.full_name}
//                   onChange={handleChange}
//                   required // Added for basic HTML5 validation
//                 />
//               </div>
//             </div>

//             <div className="flex w-full flex-col gap-2">
//               <div className="flex flex-col gap-1 rounded-md shadow-sm">
//                 <label
//                   htmlFor="email"
//                   className="text-white font-medium inline-block mb-1.5"
//                 >
//                   Email <span className="text-red-600">*</span>
//                 </label>

//                 <input
//                   id="email"
//                   type="email" // Added type for better validation/keyboard on mobile
//                   className="block px-4 py-3  border text-white border-gray-600 hover:border-gray-500 focus:border-gray-500  placeholder-gray-400 h-14 w-full rounded-lg focus:outline-none transition-all duration-75 ease-linear pr-10"
//                   placeholder="Enter your email id here."
//                   data-testid="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required // Added for basic HTML5 validation
//                 />
//               </div>
//             </div>

//             <div className="flex w-full flex-col gap-2">
//               <div className="flex flex-col gap-1 rounded-md shadow-sm">
//                 <label
//                   htmlFor="message"
//                   className="text-white font-medium inline-block mb-1.5"
//                 >
//                   Message <span className="text-red-600">*</span>
//                 </label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   className="sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 h-auto w-full transition-all border text-white resize-none border-gray-600 hover:border-gray-500 focus:border-gray-500 rounded-lg focus:outline-none ease-linear duration-75 min-h-[150px]"
//                   maxLength={5000}
//                   rows={6} // Suggest rows for initial height, min-h also works
//                   placeholder="Enter message content..."
//                   data-testid="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required // Added for basic HTML5 validation
//                 ></textarea>
//               </div>
//             </div>

//             <p className="text-subheadingWhite text-center font-medium inline-block text-sm sm:text-base">
//               or directly contact us via{/* */} {/* Original comment */}
//               <a
//                 href="mailto:contact@scopex.money"
//                 className="underline text-primary"
//               >
//                 contact@Remity.money
//               </a>
//             </p>

//             <button
//               type="submit"
//               className="group relative flex w-full justify-center rounded-lg cursor-pointer bg-primary hover:bg-primaryhover transition-all ease-linear duration-75 px-8 py-3 font-medium text-mainheading"
//               data-testid="submit-button"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//             {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ContactForm;

// "use client";
// // ContactForm.tsx
// import React, { useState, ChangeEvent, FormEvent } from "react";
// import { FaTelegram, FaTwitter } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";

// // Heroicons (simple inline SVGs for demonstration)
// const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//     />
//   </svg>
// );

// const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//     />
//   </svg>
// );

// // Define an interface for the form data
// interface FormData {
//   full_name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     full_name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);

//     console.log("Form data submitted:", formData);

//     // Simulate API call
//     try {
//       // const response = await fetch('/api/contact', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(formData),
//       // });
//       // if (!response.ok) {
//       //   const errorData = await response.json();
//       //   throw new Error(errorData.message || 'Something went wrong');
//       // }
//       // const result = await response.json();
//       // setSuccessMessage(result.message || "Your message has been sent successfully!");
//       // setFormData({ full_name: "", email: "", subject: "", message: "" });

//       // Simulating API call delay for demonstration
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setSuccessMessage("Your message has been sent successfully! (Simulated)");
//       setFormData({ full_name: "", email: "", subject: "", message: "" });
//     } catch (err) {
//       console.error("Submission error:", err);
//       setError(
//         err instanceof Error ? err.message : "An unknown error occurred"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="bg-background py-10 sm:py-16 antialiased">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex flex-col justify-center items-center mb-10 md:mb-14">
//           <h2 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-mainheadingWhite">
//             Get In <span className="text-primary">Touch</span>
//           </h2>

//           <p className="text-subheadingWhite md:text-lg text-center text-base leading-relaxed max-w-lg lg:mx-0">
//             We're here to help and answer any question you might have. We look
//             forward to hearing from you!
//           </p>
//         </div>

//         <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
//           {/* Left Column: Contact Info */}
//           <div className="lg:col-span-5 mb-12 lg:mb-0 bg-primarybox p-8 rounded-xl">
//             <h2 className="text-2xl font-semibold text-white/90 mb-6">
//               Contact Information
//             </h2>

//             <p className="text-mainheadingWhite mb-8">
//               Have a question or need assistance with our currency exchange
//               services? Reach out directly or fill the form, and we'll get back
//               to you promptly.
//             </p>

//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <MailIcon className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Email Us
//                   </h3>
//                   <a
//                     href="mailto:contact@Remity.money"
//                     className="text-primary hover:text-primaryhover transition-all ease-linear duration-150"
//                   >
//                     contact@Remity.money
//                   </a>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <MapPinIcon className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Our Office
//                   </h3>
//                   <p className="text-gray-300">123 Exchange Plaza, Suite 400</p>
//                   <p className="text-gray-300">New York, NY 10001, USA</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 pt-8 border-t">
//               <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
//               <div className="flex space-x-2">
//                 {/* Replace with actual links and icons */}
//                 <a
//                   href="#" // Replace YOURPHONENUMBER with your WhatsApp number e.g., 15551234567
//                   target="_blank" // Opens in a new tab
//                   rel="noopener noreferrer" // Security best practice for target="_blank"
//                   aria-label="Contact Remity on WhatsApp"
//                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
//                 >
//                   <IoLogoWhatsapp className="size-7" />
//                 </a>

//                 <a
//                   href="#"
//                   target="_blank"
//                   aria-label="Remity on Telegram"
//                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
//                 >
//                   <FaTelegram className="size-7" />
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Form */}
//           <div className="lg:col-span-7 bg-primarybox p-8 rounded-xl">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="full_name" className="text-white inline-block">
//                   Full Name
//                 </label>

//                 <div className="mt-1">
//                   <input
//                     id="full_name"
//                     name="full_name"
//                     type="text"
//                     autoComplete="name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g. Jane Doe"
//                     data-testid="full_name"
//                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="email" className="text-white inline-block">
//                   Email Address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="you@example.com"
//                     data-testid="email"
//                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="message" className="text-white inline-block">
//                   Message
//                 </label>
//                 <div className="mt-1">
//                   <textarea
//                     name="message"
//                     id="message"
//                     rows={5}
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     maxLength={5000}
//                     placeholder="Enter your message here..."
//                     data-testid="message"
//                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0 sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox resize-none min-h-[130px]"
//                   ></textarea>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   data-testid="submit-button"
//                   className="flex w-full justify-center rounded-md bg-primary cursor-pointer hover:bg-primaryhover px-6 py-3 h-12.5 lg:text-lg text-base font-medium text-mainheading disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-linear"
//                 >
//                   {isSubmitting ? "Sending Message..." : "Send Message"}
//                 </button>
//               </div>

//               {successMessage && (
//                 <p className="text-green-500 text-sm mt-3 text-center">
//                   {successMessage}
//                 </p>
//               )}

//               {error && (
//                 <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;

// "use client";
// // ContactForm.tsx
// import React, { useState, ChangeEvent, FormEvent } from "react";
// import { FaTelegram } from "react-icons/fa"; // Removed FaTwitter as it wasn't used
// import { IoLogoWhatsapp } from "react-icons/io";
// import { IoChatboxEllipsesOutline } from "react-icons/io5";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import the CSS

// // Heroicons (simple inline SVGs for demonstration)
// const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//     />
//   </svg>
// );

// const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//     />
//   </svg>
// );

// // Define an interface for the form data
// interface FormData {
//   full_name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     full_name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   // No longer need successMessage state, react-toastify will handle it
//   // const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     // setSuccessMessage(null); // No longer needed

//     console.log("Form data submitted:", formData);

//     // Simulate API call
//     try {
//       // const response = await fetch('/api/contact', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(formData),
//       // });
//       // if (!response.ok) {
//       //   const errorData = await response.json();
//       //   throw new Error(errorData.message || 'Something went wrong');
//       // }
//       // const result = await response.json();
//       // toast.success(result.message || "Your message has been sent successfully!");
//       // setFormData({ full_name: "", email: "", subject: "", message: "" });

//       // Simulating API call delay for demonstration
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       toast.success("Your message has been sent successfully!", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored", // or "light", "dark"
//       });
//       setFormData({ full_name: "", email: "", subject: "", message: "" });
//     } catch (err) {
//       console.error("Submission error:", err);
//       const errorMessage =
//         err instanceof Error ? err.message : "An unknown error occurred";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         // Optionally show error toasts too
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="bg-background py-10 sm:py-16 antialiased">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored" // Default theme for all toasts, can be overridden per toast
//       />
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex flex-col justify-center items-center mb-10 md:mb-14">
//           <h2 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-mainheadingWhite">
//             Get In <span className="text-primary">Touch</span>
//           </h2>

//           <p className="text-subheadingWhite md:text-lg text-center text-base leading-relaxed max-w-lg lg:mx-0">
//             We're here to help and answer any question you might have. We look
//             forward to hearing from you!
//           </p>
//         </div>

//         <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
//           {/* Left Column: Contact Info */}
//           <div className="lg:col-span-5 mb-12 lg:mb-0 bg-primarybox p-8 rounded-xl">
//             <h2 className="text-2xl font-semibold text-white/90 mb-6">
//               Contact Information
//             </h2>

//             <p className="text-mainheadingWhite mb-8">
//               Have a question or need assistance with our currency exchange
//               services? Reach out directly or fill the form, and we'll get back
//               to you promptly.
//             </p>

//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <MailIcon className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Email Us
//                   </h3>
//                   <a
//                     href="mailto:contact@Remity.money"
//                     className="text-primary hover:text-primaryhover transition-all ease-linear duration-150"
//                   >
//                     contact@remity.money
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 {/* live Chat-button */}
//                 <IoChatboxEllipsesOutline className="size-6 text-primary flex-shrink-0 mr-4 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Live Chat
//                   </h3>
//                   <button className="px-6 py-2.5 bg-primary hover:bg-primaryhover transition-all ease-linear duration-150  text-mainheading cursor-pointer mt-1 lg:text-lg text-base rounded-md  font-medium">
//                     <span>Chat with Us</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 pt-8 border-t">
//               <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
//               <div className="flex space-x-3">
//                 <a
//                   href="#" // Replace with your actual WhatsApp link e.g., https://wa.me/YOURPHONENUMBER
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Contact Remity on WhatsApp"
//                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
//                 >
//                   <IoLogoWhatsapp className="size-7" />
//                 </a>

//                 <a
//                   href="#" // Replace with your actual Telegram link
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Remity on Telegram"
//                   className="text-mainheadingWhite hover:text-primary transition-all ease-linear duration-150"
//                 >
//                   <FaTelegram className="size-7" />
//                 </a>

//               </div>
//             </div>
//           </div>

//           {/* Right Column: Form */}
//           <div className="lg:col-span-7 bg-primarybox p-6 rounded-xl">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="full_name" className="text-white inline-block">
//                   Full Name
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="full_name"
//                     name="full_name"
//                     type="text"
//                     autoComplete="name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g. Jane Doe"
//                     data-testid="full_name"
//                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="email" className="text-white inline-block">
//                   Email Address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="you@example.com"
//                     data-testid="email"
//                     className="mt-1 block px-4 py-3 bg-primarybox h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="message" className="text-white inline-block">
//                   Message
//                 </label>
//                 <div className="mt-1">
//                   <textarea
//                     name="message"
//                     id="message"
//                     rows={5}
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     maxLength={5000}
//                     placeholder="Enter your message here..."
//                     data-testid="message"
//                     className="mt-1 block px-4 py-3.5 bg-primarybox w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0 sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox resize-none min-h-[120px]"
//                   ></textarea>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   data-testid="submit-button"
//                   className="flex w-full justify-center rounded-md bg-primary cursor-pointer hover:bg-primaryhover px-6 py-3 h-12.5 lg:text-lg text-base font-medium text-mainheading disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-linear"
//                 >
//                   {isSubmitting ? "Sending Message..." : "Send Message"}
//                 </button>
//               </div>

//               {error && (
//                 <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
//               )}

//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;

// "use client";
// // ContactForm.tsx
// import React, { useState, ChangeEvent, FormEvent, useCallback } from "react"; // Added useCallback
// import { IoChatboxEllipsesOutline } from "react-icons/io5";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Heroicons (simple inline SVGs for demonstration)
// const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     {...props}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//     />
//   </svg>
// );

// // Define an interface for the form data
// interface FormData {
//   full_name: string;
//   email: string;
//   subject: string; // Subject was in FormData but not in the form, kept for consistency
//   message: string;
// }

// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     full_name: "",
//     email: "",
//     subject: "", // Subject field is not in the form UI but in the state
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     console.log("Form data submitted:", formData);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       toast.success("Your message has been sent successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//       setFormData({ full_name: "", email: "", subject: "", message: "" });
//     } catch (err) {
//       console.error("Submission error:", err);
//       const errorMessage =
//         err instanceof Error ? err.message : "An unknown error occurred";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handler for the "Chat with Us" button
//   const handleLiveChatClick = useCallback(() => {
//     console.log(
//       "ContactForm Live Chat button clicked: Attempting to open Tawk.to chat"
//     );
//     if (typeof window !== "undefined" && window.Tawk_API) {
//       if (typeof window.Tawk_API.maximize === "function") {
//         window.Tawk_API.maximize();
//       } else if (typeof window.Tawk_API.toggle === "function") {
//         // Fallback to toggle if maximize is not available or preferred
//         window.Tawk_API.toggle();
//       } else {
//         console.warn(
//           "Tawk_API.maximize() or Tawk_API.toggle() is not available on window.Tawk_API."
//         );
//       }
//     } else {
//       console.warn(
//         "Tawk_API is not initialized or not available on window. Cannot open chat."
//       );
//     }
//   }, []);

//   return (
//     <section className="bg-background py-10 sm:py-16 antialiased">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <div className="mx-auto container px-4">
//         <div className="flex flex-col justify-center items-center mb-10 md:mb-14">
//           <h2 className="text-4xl md:text-5xl font-bold mb-5 max-w-2xl mx-auto leading-tight text-mainheadingWhite">
//             Let’s <span className="text-primary">Connect</span>
//           </h2>

//           <p className="text-subheadingWhite md:text-lg text-center text-base leading-relaxed max-w-lg lg:mx-0">
//             Need help or have questions? Our team is here to assist you with
//             fast, friendly supports.
//           </p>
//         </div>

//         <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
//           {/* Left Column: Contact Info */}
//           <div className="lg:col-span-5 flex justify-between flex-col mb-10 lg:mb-0 p-6 rounded-xl h-full">
//             <div className="mb-4">
//               <div className="border px-6 py-2.5 inline-block rounded-3xl">
//                 <span className="text-mainheadingWhite text-lg">
//                   Contact us
//                 </span>
//               </div>

//               <h2 className="lg:text-6xl md:text-5xl text-4xl font-semibold text-mainheadingWhite mt-10">
//                 Get in touch
//               </h2>

//               <p className="text-mainheadingWhite mt-4 text-xl leading-7">
//                 Need help with our currency exchange services? Contact us
//                 directly or use the quick form we’ll respond as soon as
//                 possible. You can also reach out for assistance with adding a
//                 recipient or checking the status of your recent transfers.
//               </p>
//             </div>

//             <div className="space-y-5 flex justify-between gap-4">
//               <div className="flex items-start gap-3">
//                 <MailIcon className="size-6 text-primary flex-shrink-0 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Email Support
//                   </h3>
//                   <a
//                     href="mailto:contact@Remity.money"
//                     className="text-primary  hover:text-primaryhover transition-all ease-linear duration-150"
//                   >
//                     contact@remity.money
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <IoChatboxEllipsesOutline className="size-6 text-primary flex-shrink-0 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-medium text-white/90">
//                     Live Chat Assistance
//                   </h3>
//                   <button
//                     onClick={handleLiveChatClick} // Added onClick handler
//                     className="px-6 py-2 bg-primary hover:bg-primaryhover transition-all ease-linear duration-150 text-mainheading cursor-pointer mt-1 lg:text-lg text-base rounded-md font-medium"
//                     aria-label="Chat with us via live chat"
//                   >
//                     <span>Start Chat</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Form */}
//           <div className="lg:col-span-7 bg-primarybox sm:p-6 p-4 border-2 rounded-3xl">
//             {" "}
//             {/* Added sm:p-8 for consistency */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <div className="mt-1">
//                   <input
//                     id="full_name"
//                     name="full_name"
//                     type="text"
//                     autoComplete="name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Name"
//                     data-testid="full_name"
//                     className="block px-4 py-3 bg-secondarybox h-14 w-full border-2 rounded-full transition-all duration-75 ease-in-out placeholder:text-subheadingWhite placeholder:text-lg border-gray-600 focus:border-gray-500 text-white focus:outline-0" // Updated focus style
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="Email"
//                     data-testid="email"
//                     className="block px-4 py-3 bg-secondarybox h-14 w-full border-2 rounded-full transition-all duration-75 ease-in-out placeholder:text-subheadingWhite placeholder:text-lg border-gray-600 focus:border-gray-500 text-white focus:outline-0" // Updated focus style
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="mt-1">
//                   <textarea
//                     name="message"
//                     id="message"
//                     rows={6}
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     maxLength={4000}
//                     placeholder="Message"
//                     data-testid="message"
//                     className="block px-4 py-3.5 bg-secondarybox w-full border-2 rounded-3xl transition-all duration-75 ease-in-out placeholder:text-subheadingWhite placeholder:text-lg border-gray-600 focus:border-gray-500 text-white focus:outline-0 sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-secondarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondaryboxhover resize-none" // Updated focus style
//                   ></textarea>
//                 </div>
//               </div>

//               <div className="border-2 border-gray-500 rounded-full p-1">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   data-testid="submit-button"
//                   className="flex w-full justify-center rounded-full bg-primary cursor-pointer hover:bg-primaryhover px-6 py-3 h-12.5 lg:text-xl text-base font-medium text-mainheading disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-linear"
//                 >
//                   {isSubmitting ? "Sending Message..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;

"use client";
// ContactForm.tsx
import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Heroicons (simple inline SVGs for demonstration)
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

// Define an interface for the form data
interface FormData {
  full_name: string;
  email: string;
  subject: string; // Subject was in FormData but not in the form UI
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    subject: "", // Subject field is not in the form UI but in the state
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    console.log("Form data submitted:", formData);

    // Basic client-side validation (optional but good practice)
    if (!formData.full_name || !formData.email || !formData.message) {
      const validationError = "Please fill out all required fields.";
      setError(validationError);
      toast.error(validationError, { theme: "colored" });
      setIsSubmitting(false);
      return;
    }
    // Simple email format check (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const validationError = "Please enter a valid email address.";
      setError(validationError);
      toast.error(validationError, { theme: "colored" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call - Replace with your actual API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to send message');
      // }

      // Simulate success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Clear form after successful submission
      setFormData({ full_name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for the "Chat with Us" button
  const handleLiveChatClick = useCallback(() => {
    console.log(
      "ContactForm Live Chat button clicked: Attempting to open Tawk.to chat"
    );
    if (typeof window !== "undefined" && window.Tawk_API) {
      if (typeof window.Tawk_API.maximize === "function") {
        window.Tawk_API.maximize();
      } else if (typeof window.Tawk_API.toggle === "function") {
        // Fallback to toggle if maximize is not available or preferred
        window.Tawk_API.toggle();
      } else {
        console.warn(
          "Tawk_API.maximize() or Tawk_API.toggle() is not available on window.Tawk_API."
        );
      }
    } else {
      console.warn(
        "Tawk_API is not initialized or not available on window. Cannot open chat."
      );
      // Optionally show a message to the user if chat isn't available
      toast.info("Live chat is currently unavailable.", { theme: "colored" });
    }
  }, []);

  return (
    <section className="bg-background py-10 sm:py-16 antialiased">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="mx-auto container px-4">
        <div className="flex lg:flex-row flex-col lg:gap-10 gap-6 items-center">
          {/* Left Column: Contact Info */}
          <div className="flex flex-col text-start lg:w-1/2 w-full sm:p-6 p-2 rounded-xl h-full">
            <div className="space-y-8">
              <h2 className="lg:text-6xl md:text-5xl text-4xl font-semibold text-mainheadingWhite">
                Let’s <span className="text-primary">Connect</span>
              </h2>

              <p className="text-mainheadingWhite lg:text-xl text-base">
                Need help with our currency exchange services? Use the form or
                reach out directly we’ll get back to you quickly. You can also
                contact us for help with adding a recipient or tracking your
                recent transfers.
              </p>
            </div>

            <div className="space-y-5 text-left flex flex-col mt-6">
              <div className="flex items-start gap-3">
                <MailIcon className="size-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white/90">
                    Email Us
                  </h3>
                  <a
                    href="mailto:contact@Remity.money"
                    className="text-primary cursor-pointer hover:text-primaryhover transition-all ease-linear duration-150"
                  >
                    contact@remity.money
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IoChatboxEllipsesOutline className="size-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white/90">
                    Chat with Us
                  </h3>
                  <button
                    onClick={handleLiveChatClick} // Added onClick handler
                    className="px-6 py-1.5 bg-primary hover:bg-primaryhover transition-all ease-linear duration-150 text-mainheading cursor-pointer mt-1 lg:text-lg text-base rounded-md font-medium"
                    aria-label="Chat with us via live chat"
                  >
                    <span>Start Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-primarybox sm:p-6 p-4 lg:w-1/2 w-full border-2 border-gray-500 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Group Name and Email fields side-by-side on md+ */}
              <div className="flex flex-wrap gap-4 md:flex-nowrap md:gap-6">
                <div className="w-full md:w-1/2">
                  {" "}
                  {/* Name field */}
                  {/* Removed mt-1, gap handles spacing */}
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                    data-testid="full_name"
                    className="block px-4 py-3 bg-secondarybox h-14 w-full border rounded-full transition-all duration-75 ease-in-out placeholder:text-subheadingWhite placeholder:text-lg border-gray-600 focus:border-gray-500 text-white focus:outline-0"
                  />
                </div>

                <div className="w-full md:w-1/2">
                  {" "}
                  {/* Email field */}
                  {/* Removed mt-1, gap handles spacing */}
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    data-testid="email"
                    className="block px-4 py-3 bg-secondarybox h-14 w-full border rounded-full transition-all duration-75 ease-in-out placeholder:text-subheadingWhite placeholder:text-lg border-gray-600 focus:border-gray-500 text-white focus:outline-0"
                  />
                </div>
              </div>

              {/* Message field - follows the group above */}
              <div>
                {" "}
                {/* space-y-5 on form provides the top margin */}
                {/* Removed mt-1, space-y-5 handles spacing */}
                <textarea
                  name="message"
                  id="message"
                  rows={7}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={4000}
                  placeholder="Message"
                  data-testid="message"
                  className="block px-4 py-3.5 bg-secondarybox w-full border rounded-3xl transition-all duration-75 ease-in-out placeholder:text-subheadingWhite placeholder:text-lg border-gray-600 focus:border-gray-500 text-white focus:outline-0 sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-secondarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondaryboxhover resize-none"
                ></textarea>
              </div>

              {/* Submit Button - follows the message field */}
              <div>
                {" "}
                {/* space-y-5 on form provides the top margin */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="submit-button"
                  className="flex w-full justify-center rounded-full bg-primary cursor-pointer hover:bg-primaryhover px-6 py-3 h-12.5 lg:text-xl text-base font-medium text-mainheading disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-linear"
                >
                  {isSubmitting ? "Sending..." : "Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
