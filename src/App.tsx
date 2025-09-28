import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Home = lazy(() => import("./Pages/Home"));
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

function App() {
  return (
    <Routes>
      <Route index element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><Login /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><NotFound /></Suspense>} />
      <Route path="/unauthorized" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><Unauthorized /></Suspense>} />
      <Route path="/admin/" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><ProtectedRoute /></Suspense>}>
        <Route
          path="addglobal/note/:ec/:niveau/:annee"
          element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><AddNoteGlobal /></Suspense>}
        />
        <Route path="addnote" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><AddNotePerso /></Suspense>} />
        <Route path="home" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><Home /></Suspense>} />
        <Route path="etudiant/create" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><AddEtudiant /></Suspense>} />
        <Route path="etudiant/edit/:id" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><EditEtudiant /></Suspense>} />
        <Route path="etudiant/view/:id" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><ViewEtudiant /></Suspense>} />
        <Route path="etudiant" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><Etudiant /></Suspense>} />
        <Route path="niveau/create" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><AddNiveau /></Suspense>} />
        <Route path="niveau/view/:id" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><ViewNiveau /></Suspense>} />
        <Route path="niveau/edit/:id" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><EditNiveau /></Suspense>} />
        <Route path="niveau" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><Niveau /></Suspense>} />
        <Route path="note" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><Note /></Suspense>} />
        <Route path="ue/create" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><AddUE /></Suspense>} />
        <Route path="ue/edit/:id" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><EditUE /></Suspense>} />
        <Route path="ue" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><UE /></Suspense>} />
        <Route path="ec/create" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><AddEC /></Suspense>} />
        <Route path="ec/edit/:id" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><EditEC /></Suspense>} />
        <Route path="ec/view/:id" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><ViewEC /></Suspense>} />
        <Route path="ec" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><EC /></Suspense>} />
        <Route path="note/etudiant" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><NoteEtudiant /></Suspense>} />
        <Route path="note/result" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><ResultatParNiveau /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<LoadingOutlined className="w-full text-center text-6xl my-4" />}><AdminNotFound /></Suspense>} />
        <Route
          path="releve/pdf/:id/:niveau/:annee"
          element={<NoteEtudiantPdf />}
        />
        <Route
          path="resultat/pdf/:obs/:niveau/:annee"
          element={<ResultatParNiveauPdf />}
        />
      </Route>
    </Routes>
  );
}

export default App;
