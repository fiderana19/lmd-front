import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home';
import Niveau from './Pages/Niveau/Niveau';
import Note from './Pages/Note/Note';
import UE from './Pages/UE/UE';
import EC from './Pages/EC/EC';
import Etudiant from './Pages/Etudiant/Etudiant';
import AppLayout from './layouts/AppLayout';
import NotFound from './Pages/NotFound';
import NoteEtudiant from './Pages/NoteEtudiant/NoteEtudiant';
import ResultatParNiveau from './Pages/NoteEtudiant/ResultatParNiveau';
import NoteEtudiantPdf from './Pages/NoteEtudiant/NoteEtudiantPdf';
import ResultatParNiveauPdf from './Pages/NoteEtudiant/ResultatParNiveauPdf';
import AddNotePerso from './Pages/Note/AddNotePerso';
import AddNoteGlobal from './Pages/Note/AddNoteGlobal';

const App = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/edit" element={<Home/>}/>
                <Route path='/releve/pdf/:id/:niveau/:annee' element={<NoteEtudiantPdf />}/>
                <Route path='/resultat/pdf/:obs/:niveau/:annee' element={<ResultatParNiveauPdf />}/>
                <Route path="/" element={<AppLayout/>}>
                    <Route path='addglobal/note/:ec/:niveau/:annee' element={<AddNoteGlobal />}/>
                    <Route path='addnote' element={<AddNotePerso />}/>
                    <Route index element={<Home/>}/>
                    <Route path='etudiant' element={<Etudiant/>}/>
                    <Route path='niveau' element={<Niveau/>}/>
                    <Route path='note' element={<Note/>}/>
                    <Route path='ue' element={<UE/>}/>
                    <Route path='ec' element={<EC/>}/>
                    <Route path='note/etudiant' element={<NoteEtudiant/>}/>
                    <Route path='note/result' element={<ResultatParNiveau/>}/>
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;