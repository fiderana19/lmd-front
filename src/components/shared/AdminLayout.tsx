import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const Navigation = lazy(() => import("@/components/navigation/Navigation"));

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
      <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4 text-primary" />}>
        <Navigation />
      </Suspense>
      <div className="pb-8 pt-14 md:ml-64 min-h-screen animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
