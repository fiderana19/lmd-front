import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ReadOutlined,
  FileTextOutlined,
  GroupOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "../ui/button";

const navLinks = [
  { to: "/admin/home", label: "Accueil", icon: <HomeOutlined /> },
  { to: "/admin/etudiant", label: "Etudiant", icon: <UserOutlined /> },
  { to: "/admin/note", label: "Note", icon: <FileTextOutlined /> },
  { to: "/admin/ue", label: "UE", icon: <GroupOutlined /> },
  { to: "/admin/ec", label: "EC", icon: <ReadOutlined /> },
  { to: "/admin/niveau", label: "Niveau", icon: <UnorderedListOutlined /> },
];

const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full fixed px-5 h-14 bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg z-50 text-foreground flex justify-between items-center font-lato shadow-nav border-b border-border/50">
      <Link to="/admin/home" onClick={() => setMobileOpen(false)}>
        <span className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-five bg-clip-text text-transparent">
          LMD
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
              isActive(link.to)
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {link.icon}
              {link.label}
            </span>
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        </button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="ml-1 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogoutOutlined className="mr-1" />
          Déconnexion
        </Button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-foreground text-xl p-1"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md md:hidden animate-fade-in border-t border-border/50">
          <div className="flex flex-col items-center gap-2 py-8 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`w-full max-w-xs text-center py-3 rounded-lg text-sm transition-all ${
                  isActive(link.to)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="w-full max-w-xs text-center py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
                {theme === "light" ? "Mode sombre" : "Mode clair"}
              </span>
            </button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="mt-2 w-full max-w-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogoutOutlined className="mr-1" />
              Déconnexion
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
