import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const Navigation = lazy(() => import("@/components/navigation/Navigation"));

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 dark:from-background dark:to-background">
      <div className="print:hidden">
        <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4 text-primary" />}>
          <Navigation />
        </Suspense>
      </div>
      <div className="pb-8 pt-20 md:ml-56 min-h-screen animate-fade-in print:m-0 print:p-0">
        <div className="px-4 sm:px-6 print:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
