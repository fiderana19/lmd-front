import { LoadingOutlined } from "@ant-design/icons";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({ text = "Chargement..." }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
        <LoadingOutlined className="relative text-4xl text-primary" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
