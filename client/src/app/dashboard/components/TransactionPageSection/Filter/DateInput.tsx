// Latest Code Without Date Picker
// components/DateInput.tsx
import React from "react";

interface DateInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ placeholder, value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic date validation can be done here if needed beyond HTML5 validation
    const enteredValue = e.target.value;

    // Example: You could add more complex validation here, like checking for valid date ranges, formats, etc.
    // For now, we'll just pass the value directly to the onChange prop.

    onChange(e); // Call the onChange prop to update the parent component's state
  };

  return (
    <div>
      <div className="relative mt-1">
        <div className="bg-white border border-main rounded-lg shadow-sm focus:ring-0">
          <div className=" flex items-center justify-between">
            <input
              type="date" // Changed input type to 'date' for date picker
              className="block w-full px-3 py-3 text-gray-500 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 sm:text-sm border-none rounded-none shadow-none"
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange} // Use the handleInputChange function
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateInput;