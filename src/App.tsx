import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Home from "./Pages/Home";
import NoteEtudiantPdf from "./Pages/NoteEtudiant/NoteEtudiantPdf";
import ResultatParNiveauPdf from "./Pages/NoteEtudiant/ResultatParNiveauPdf";
import AddNoteGlobal from "./Pages/Note/AddNoteGlobal";
import AddNotePerso from "./Pages/Note/AddNotePerso";
import Etudiant from "./Pages/Etudiant/Etudiant";
import Niveau from "./Pages/Niveau/Niveau";
import Note from "./Pages/Note/Note";
import UE from "./Pages/UE/UE";
import EC from "./Pages/EC/EC";
import NoteEtudiant from "./Pages/NoteEtudiant/NoteEtudiant";
import ResultatParNiveau from "./Pages/NoteEtudiant/ResultatParNiveau";
import NotFound from "./Pages/NotFound";
import AddEC from "./Pages/EC/AddEC";
import EditEC from "./Pages/EC/EditEC";
import ViewEC from "./Pages/EC/ViewEC";
import AddEtudiant from "./Pages/Etudiant/AddEtudiant";
import EditEtudiant from "./Pages/Etudiant/EditEtudiant";
import ViewEtudiant from "./Pages/Etudiant/ViewEtudiant";
import AddNiveau from "./Pages/Niveau/AddNiveau";
import ViewNiveau from "./Pages/Niveau/ViewNiveau";
import EditNiveau from "./Pages/Niveau/EditNiveau";
import AddUE from "./Pages/UE/AddUE";
import EditUE from "./Pages/UE/EditUE";
import Login from "./Pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Unauthorized from "./Pages/Unauthorized";
import AdminNotFound from "./Pages/AdminNotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/admin/" element={<ProtectedRoute />}>
        <Route
          path="addglobal/note/:ec/:niveau/:annee"
          element={<AddNoteGlobal />}
        />
        <Route path="addnote" element={<AddNotePerso />} />
        <Route path="home" element={<Home />} />
        <Route path="etudiant/create" element={<AddEtudiant />} />
        <Route path="etudiant/edit/:id" element={<EditEtudiant />} />
        <Route path="etudiant/view/:id" element={<ViewEtudiant />} />
        <Route path="etudiant" element={<Etudiant />} />
        <Route path="niveau/create" element={<AddNiveau />} />
        <Route path="niveau/view/:id" element={<ViewNiveau />} />
        <Route path="niveau/edit/:id" element={<EditNiveau />} />
        <Route path="niveau" element={<Niveau />} />
        <Route path="note" element={<Note />} />
        <Route path="ue/create" element={<AddUE />} />
        <Route path="ue/edit/:id" element={<EditUE />} />
        <Route path="ue" element={<UE />} />
        <Route path="ec/create" element={<AddEC />} />
        <Route path="ec/edit/:id" element={<EditEC />} />
        <Route path="ec/view/:id" element={<ViewEC />} />
        <Route path="ec" element={<EC />} />
        <Route path="note/etudiant" element={<NoteEtudiant />} />
        <Route path="note/result" element={<ResultatParNiveau />} />
        <Route path="*" element={<AdminNotFound />} />
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
