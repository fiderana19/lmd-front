import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormCard = ({ title, children, className = "" }: FormCardProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-lato text-foreground">
            {title}
          </h1>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-six rounded-full mx-auto mt-1.5" />
        </div>
        <div
          className={`bg-card rounded-xl border border-border shadow-card p-6 sm:p-8 transition-shadow duration-200 hover:shadow-card-hover ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormCard;
