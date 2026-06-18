import { WarningOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  code?: string;
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

const ErrorPage = ({
  code = "404",
  title = "Page introuvable",
  message = "La page que vous cherchez n'existe pas.",
  actionLabel = "Page d'accueil",
  actionHref = "/admin/home",
}: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4 animate-fade-in">
      <div className="relative">
        <div className="text-8xl font-bold text-primary/10 select-none">
          {code}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-full bg-primary/5">
            <WarningOutlined className="text-4xl text-primary/30" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-foreground text-center">
        {title}
      </h1>
      <p className="text-muted-foreground text-center max-w-md">
        {message}
      </p>
      <Button variant="default" className="mt-2" asChild>
        <a href={actionHref}>{actionLabel}</a>
      </Button>
    </div>
  );
};

export default ErrorPage;
