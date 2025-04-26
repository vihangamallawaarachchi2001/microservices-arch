import React, { useState } from "react";

interface ReusableFormProps {
  onSubmit: (data: any) => void; 
  children: React.ReactNode; 
  className?: string;
  buttonText: string; 
  validate?: (data: Record<string, any>) => Record<string, string>; 
}

export const ReusableForm = ({ onSubmit, children, className, buttonText, validate }: ReusableFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      if (validate) {
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors); 
          return;
        }
      }

      setErrors({});
      onSubmit(formData);
    } catch (error) {
      console.error("Form submission failed:", error);
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {children}
      {Object.keys(errors).map(
        (key) =>
          key !== "general" && (
            <div key={key} className="text-red-500 text-sm">
              {errors[key]}
            </div>
          )
      )}

      {errors.general && (
        <div className="text-red-500 text-sm">{errors.general}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-primary-600 text-white rounded-full font-medium transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <svg
              className="inline mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            ...
          </>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
};