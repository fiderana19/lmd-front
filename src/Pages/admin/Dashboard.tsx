import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useGetAllEtudiant } from "@/hooks/useGetAllEtudiant";
import { useGetAllNote } from "@/hooks/useGetAllNote";
import { useGetAllUE } from "@/hooks/useGetAllUE";
import { useGetAllEC } from "@/hooks/useGetAllEC";
import {
  UserOutlined,
  FileTextOutlined,
  GroupOutlined,
  ReadOutlined,
  PlusOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ label, value, icon, color }: StatCardProps) => (
  <div className="bg-card rounded-xl border border-border shadow-card p-5 transition-all duration-200 hover:shadow-card-hover">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value ?? "..."}</p>
      </div>
    </div>
  </div>
);

interface NavCardProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NavCard = ({ to, label, icon }: NavCardProps) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3.5 bg-card rounded-xl border border-border shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5"
  >
    <span className="text-lg text-primary">{icon}</span>
    <span className="text-sm font-medium text-foreground">{label}</span>
  </Link>
);

const Dashboard: FunctionComponent = () => {
  const { data: etudiants, isLoading: loadingEtudiant } = useGetAllEtudiant();
  const { data: notes, isLoading: loadingNote } = useGetAllNote();
  const { data: ues, isLoading: loadingUE } = useGetAllUE();
  const { data: ecs, isLoading: loadingEC } = useGetAllEC();

  const isLoading = loadingEtudiant || loadingNote || loadingUE || loadingEC;

  if (isLoading) return <LoadingSpinner text="Chargement du tableau de bord..." />;

  const navItems = [
    { to: "/admin/etudiant", label: "Gestion des étudiants", icon: <UserOutlined /> },
    { to: "/admin/note", label: "Gestion des notes", icon: <FileTextOutlined /> },
    { to: "/admin/ue", label: "Unités d'enseignement", icon: <GroupOutlined /> },
    { to: "/admin/ec", label: "Éléments constitutifs", icon: <ReadOutlined /> },
    { to: "/admin/niveau", label: "Niveaux", icon: <UnorderedListOutlined /> },
    { to: "/admin/etudiant/create", label: "Ajouter un étudiant", icon: <PlusOutlined /> },
  ];

  return (
    <div>
      <PageHeader title="TABLEAU DE BORD" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Étudiants"
          value={etudiants?.length}
          icon={<UserOutlined className="text-white text-lg" />}
          color="bg-primary"
        />
        <StatCard
          label="Notes"
          value={notes?.length}
          icon={<FileTextOutlined className="text-white text-lg" />}
          color="bg-five"
        />
        <StatCard
          label="Unités d'enseignement"
          value={ues?.length}
          icon={<GroupOutlined className="text-white text-lg" />}
          color="bg-second"
        />
        <StatCard
          label="Éléments constitutifs"
          value={ecs?.length}
          icon={<ReadOutlined className="text-white text-lg" />}
          color="bg-six"
        />
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Accès rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {navItems.map((item) => (
            <NavCard key={item.to} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
