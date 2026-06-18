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

const navLinks = [
  { to: "/admin/home", label: "Accueil", icon: <HomeOutlined /> },
  { to: "/admin/etudiant", label: "Etudiant", icon: <UserOutlined /> },
  { to: "/admin/note", label: "Note", icon: <FileTextOutlined /> },
  { to: "/admin/ue", label: "UE", icon: <GroupOutlined /> },
  { to: "/admin/ec", label: "EC", icon: <ReadOutlined /> },
  { to: "/admin/niveau", label: "Niveau", icon: <UnorderedListOutlined /> },
];

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex flex-col h-full w-full py-4 space-y-1">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={`flex items-center gap-3 px-3 py-3 w-full text-sm transition-all duration-200 ${
            isActive(link.to)
              ? "bg-primary/10 text-primary font-semibold border-l-[3px] border-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border-l-[3px] border-transparent"
          }`}
        >
          <span className="text-base ml-2">{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 h-12 z-40 bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg border-b border-border/50 shadow-nav">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-foreground text-lg p-1 -ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
            <Link to="/admin/home">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-five bg-clip-text text-transparent">
                LMD
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
            </button>
            <button
              onClick={async () => { await logout(); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogoutOutlined />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-white dark:bg-gray-900 shadow-xl md:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-12">
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-12 bottom-0 w-56 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-r border-border/50 shadow-nav z-20">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Navigation;
