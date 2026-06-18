import { ReactElement, cloneElement } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
  children: ReactElement;
  className?: string;
  labelClassName?: string;
  defaultValue?: any;
}

const FormField = ({ label, name, control, error, children, className, labelClassName, defaultValue }: FormFieldProps) => {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={name} className={cn("text-sm font-medium", labelClassName)}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, onBlur } }) =>
          cloneElement(children as any, {
            value,
            onChange,
            onBlur,
            className: cn(
              (children as any).props?.className,
              error && "border-destructive"
            ),
          })
        }
      />
      {error && (
        <p className="text-xs text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;
