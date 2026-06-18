import { InboxOutlined } from "@ant-design/icons";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "Aucune donnée trouvée" }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-fade-in">
      <div className="p-4 rounded-full bg-primary/5 mb-4">
        <InboxOutlined className="text-4xl text-primary/40" />
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
