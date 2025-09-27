import { Dropdown, Space } from "antd";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MenuOutlined,
  ReadOutlined,
  FileTextOutlined,
  GroupOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const items = [
    {
      label: (
        <Link to="/admin/home">
          <div
            className={
              location.pathname === "//admin/home"
                ? "text-primary px-4 py-1"
                : "px-4 py-1"
            }
          >
            <HomeOutlined /> ACCUEIL
          </div>
        </Link>
      ),
      key: "01",
    },
    {
      label: (
        <Link to="/admin/etudiant">
          <div
            className={
              location.pathname === "/admin/etudiant"
                ? "text-primary px-4 py-1"
                : "px-4 py-1"
            }
          >
            <UserOutlined /> ETUDIANT
          </div>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/admin/note">
          <div
            className={
              location.pathname === "/admin/note"
                ? "text-primary px-4 py-1"
                : "px-4 py-1"
            }
          >
            <FileTextOutlined /> NOTE
          </div>
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link to="/admin/ue">
          <div
            className={
              location.pathname === "/admin/ue"
                ? "text-primary px-4 py-1"
                : "px-4 py-1"
            }
          >
            <GroupOutlined /> UE
          </div>
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link to="/admin/ec">
          <div
            className={
              location.pathname === "/admin/ec"
                ? "text-primary px-4 py-1"
                : "px-4 py-1"
            }
          >
            <ReadOutlined /> EC
          </div>
        </Link>
      ),
      key: "6",
    },
    {
      label: (
        <Link to="/admin/niveau">
          <div
            className={
              location.pathname === "/admin/niveau"
                ? "text-primary px-4 py-1"
                : "px-4 py-1"
            }
          >
            <UnorderedListOutlined /> NIVEAU
          </div>
        </Link>
      ),
      key: "6",
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-full">
      <div className="w-full fixed px-5 h-14 bg-primary z-50 text-white flex justify-between items-center  font-lato">
        <Link to="/admin/home">
          <p className="text-2xl font-bold hover:animate-pulse">LMD</p>
        </Link>
        <div className="md:flex items-center hidden md:visible">
          <Link
            to="/admin/home"
            className="mx-1 p-1 hover:scale-105  hover:text-gray-400 hover:text-opacity-100  transition duration-300"
          >
            <div
              className={
                location.pathname === "/admin/home"
                  ? "text-gray-400 font-bold border-gray-400 border-b-2"
                  : ""
              }
            >
              <HomeOutlined /> Accueil
            </div>
          </Link>
          <Link
            to="/admin/etudiant"
            className="mx-1 p-1 hover:scale-105 hover:text-gray-400 hover:text-opacity-100  transition duration-300"
          >
            <div
              className={
                location.pathname === "/admin/etudiant"
                  ? "text-gray-400 font-bold border-gray-400 border-b-2"
                  : ""
              }
            >
              <UserOutlined /> Etudiant
            </div>
          </Link>
          <Link
            to="/admin/note"
            className="mx-1 p-1 hover:scale-105 hover:text-gray-400 hover:text-opacity-100  transition duration-300"
          >
            <div
              className={
                location.pathname === "/admin/note"
                  ? "text-gray-400 font-bold border-gray-400 border-b-2"
                  : ""
              }
            >
              <FileTextOutlined /> Note
            </div>
          </Link>
          <Link
            to="/admin/ue"
            className="mx-1 p-1 hover:scale-105 hover:text-gray-400 hover:text-opacity-100  transition duration-300"
          >
            <div
              className={
                location.pathname === "/admin/ue"
                  ? "text-gray-400 font-bold border-gray-400 border-b-2"
                  : ""
              }
            >
              <GroupOutlined /> UE
            </div>
          </Link>
          <Link
            to="/admin/ec"
            className="mx-1 p-1 hover:scale-105 hover:text-gray-400 hover:text-opacity-100  transition duration-300"
          >
            <div
              className={
                location.pathname === "/admin/ec"
                  ? "text-gray-400 font-bold border-gray-400 border-b-2"
                  : ""
              }
            >
              <ReadOutlined /> EC
            </div>
          </Link>
          <Link
            to="/admin/niveau"
            className="mx-1 p-1 hover:scale-105 hover:text-gray-400 hover:text-opacity-100  transition duration-300"
          >
            <div
              className={
                location.pathname === "/admin/niveau"
                  ? "text-gray-400 font-bold border-gray-400 border-b-2"
                  : ""
              }
            >
              <UnorderedListOutlined /> Niveau
            </div>
          </Link>
          <Button onClick={() => handleLogout()} variant={"secondary"}>
            <LogoutOutlined />
            Deconnexion
          </Button>
        </div>
        <Dropdown
          className="visible md:hidden"
          menu={{ items }}
          trigger={["click"]}
        >
          <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
            <Space>
              <MenuOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navigation;
