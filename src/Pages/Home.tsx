import { FunctionComponent } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Typewriter from "../components/Typewritter";
import Bg from "../assets/pic/home-bg.jpg";
import Navigation from "@/components/navigation/Navigation";

const Home: FunctionComponent = () => {
  const text = "BIENVENUE SUR NOTRE APPLICATION DE GESTION DE NOTE";

  return (
    <div>
      <Navigation />
      <div className="lg:px-32 sm:px-10 px-4 pb-5 pt-24 sm:h-screen h-full">
        <div className="block sm:justify-between sm:flex h-full">
          <div className="flex flex-col sm:py-0 py-20 justify-center w-full ">
            <div className="sm:text-3xl text-2xl text-center sm:text-left font-bold font-lato">
              <Typewriter text={text} />
            </div>
            <div className="my-4 flex justify-center">
              <Link to="/admin/note">
                <Button>VOIR LES NOTES</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full sm:w-4/5">
            <img src={Bg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
