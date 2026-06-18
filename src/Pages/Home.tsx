import { FunctionComponent, lazy, Suspense } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
const Typewriter = lazy(() => import("../components/Typewritter"));
import Bg from "../assets/pic/home-bg.jpg";
import { LoadingOutlined } from "@ant-design/icons";

const Home: FunctionComponent = () => {
  const text = "BIENVENUE SUR NOTRE APPLICATION DE GESTION DE NOTE";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-six/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto lg:px-16 sm:px-10 px-4 pb-5 pt-8 sm:min-h-screen">
        <div className="block sm:flex sm:justify-between sm:items-center h-full gap-12">
          <div className="flex flex-col sm:py-0 py-20 justify-center w-full">
            <div className="sm:text-3xl text-2xl text-center sm:text-left font-bold font-lato text-foreground">
              <Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}>
                <Typewriter text={text} />
              </Suspense>
            </div>
            <p className="mt-4 text-muted-foreground text-center sm:text-left max-w-md">
              Application de gestion des notes universitaires pour le régime LMD (Licence-Master-Doctorat).
            </p>
            <div className="mt-6 flex justify-center sm:justify-start">
              <Link to="/admin/note">
                <Button type="primary" size="large" className="font-semibold shadow-lg shadow-primary/20">
                  VOIR LES NOTES
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full sm:w-3/5">
            <img src={Bg} alt="Gestion universitaire" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
