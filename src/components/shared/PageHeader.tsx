import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-primary/10">
        <div>
          <h1 className="text-2xl font-bold font-lato text-foreground">
            {title}
          </h1>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-six rounded-full mt-1.5" />
        </div>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
