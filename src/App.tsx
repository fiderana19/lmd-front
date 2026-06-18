import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
const AdminLayout = lazy(() => import("@/components/shared/AdminLayout"));
const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const NoteEtudiantPdf = lazy(() => import("./Pages/NoteEtudiant/NoteEtudiantPdf"));
const ResultatParNiveauPdf = lazy(() => import("./Pages/NoteEtudiant/ResultatParNiveauPdf"));
const AddNoteGlobal = lazy(() => import("./Pages/Note/AddNoteGlobal"));
const AddNotePerso = lazy(() => import("./Pages/Note/AddNotePerso"));
const Etudiant = lazy(() => import("./Pages/Etudiant/Etudiant"));
const Niveau = lazy(() => import("./Pages/Niveau/Niveau"));
const Note = lazy(() => import("./Pages/Note/Note"));
const UE = lazy(() => import("./Pages/UE/UE"));
const EC = lazy(() => import("./Pages/EC/EC"));
const NoteEtudiant = lazy(() => import("./Pages/NoteEtudiant/NoteEtudiant"));
const ResultatParNiveau = lazy(() => import("./Pages/NoteEtudiant/ResultatParNiveau"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const AddEC = lazy(() => import("./Pages/EC/AddEC"));
const EditEC = lazy(() => import("./Pages/EC/EditEC"));
const ViewEC = lazy(() => import("./Pages/EC/ViewEC"));
const AddEtudiant = lazy(() => import("./Pages/Etudiant/AddEtudiant"));
const EditEtudiant = lazy(() => import("./Pages/Etudiant/EditEtudiant"));
const ViewEtudiant = lazy(() => import("./Pages/Etudiant/ViewEtudiant"));
const AddNiveau = lazy(() => import("./Pages/Niveau/AddNiveau"));
const ViewNiveau = lazy(() => import("./Pages/Niveau/ViewNiveau"));
const EditNiveau = lazy(() => import("./Pages/Niveau/EditNiveau"));
const AddUE = lazy(() => import("./Pages/UE/AddUE"));
const EditUE = lazy(() => import("./Pages/UE/EditUE"));
const Login = lazy(() => import("./Pages/Login"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const Unauthorized = lazy(() => import("./Pages/Unauthorized"));
const AdminNotFound = lazy(() => import("./Pages/AdminNotFound"));

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

function App() {
  return (
    <Routes>
      <Route index element={<S><Login /></S>} />
      <Route path="*" element={<S><NotFound /></S>} />
      <Route path="/unauthorized" element={<S><Unauthorized /></S>} />
      <Route path="/admin/" element={<S><ProtectedRoute /></S>}>
        <Route element={<S><AdminLayout /></S>}>
          <Route path="home" element={<S><Dashboard /></S>} />
          <Route path="etudiant" element={<S><Etudiant /></S>} />
          <Route path="etudiant/create" element={<S><AddEtudiant /></S>} />
          <Route path="etudiant/edit/:id" element={<S><EditEtudiant /></S>} />
          <Route path="etudiant/view/:id" element={<S><ViewEtudiant /></S>} />
          <Route path="niveau" element={<S><Niveau /></S>} />
          <Route path="niveau/create" element={<S><AddNiveau /></S>} />
          <Route path="niveau/edit/:id" element={<S><EditNiveau /></S>} />
          <Route path="niveau/view/:id" element={<S><ViewNiveau /></S>} />
          <Route path="note" element={<S><Note /></S>} />
          <Route path="ue" element={<S><UE /></S>} />
          <Route path="ue/create" element={<S><AddUE /></S>} />
          <Route path="ue/edit/:id" element={<S><EditUE /></S>} />
          <Route path="ec" element={<S><EC /></S>} />
          <Route path="ec/create" element={<S><AddEC /></S>} />
          <Route path="ec/edit/:id" element={<S><EditEC /></S>} />
          <Route path="ec/view/:id" element={<S><ViewEC /></S>} />
          <Route path="note/etudiant" element={<S><NoteEtudiant /></S>} />
          <Route path="note/result" element={<S><ResultatParNiveau /></S>} />
          <Route path="addnote" element={<S><AddNotePerso /></S>} />
          <Route path="addglobal/note/:ec/:niveau/:annee" element={<S><AddNoteGlobal /></S>} />
          <Route path="*" element={<S><AdminNotFound /></S>} />
        </Route>
        <Route path="releve/pdf/:id/:niveau/:annee" element={<NoteEtudiantPdf />} />
        <Route path="resultat/pdf/:obs/:niveau/:annee" element={<ResultatParNiveauPdf />} />
      </Route>
    </Routes>
  );
}

export default App;
