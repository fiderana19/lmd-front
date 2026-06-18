import ErrorPage from "@/components/shared/ErrorPage";

const Unauthorized = () => (
  <ErrorPage
    code="403"
    title="Page non autorisée"
    message="Vous n'avez pas les droits nécessaires pour accéder à cette page."
    actionLabel="Page d'accueil"
    actionHref="/"
  />
);

export default Unauthorized;
