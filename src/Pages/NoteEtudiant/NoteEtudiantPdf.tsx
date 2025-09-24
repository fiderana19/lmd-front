import { useState, useEffect, FunctionComponent } from 'react'
import { CheckCircleFilled , CloseCircleFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import Navigation from '@/components/navigation/Navigation';

const NoteEtudiantPdf: FunctionComponent = () => {
  let params = useParams()
  let [id , setId] = useState(params.id)
  let [annee , setAnnee] = useState(transformLetter(params.annee))
  let [niveau , setNiveau] = useState(params.niveau)
  let [resultEtudiant, setResultEtudiant] = useState([]);
  let [resultUnity, setEtudiantUnity] = useState([]);
  let [resultMark, setResultMark] = useState([]);
  let [resultFinal, setResultFinal] = useState('');
  const [formData, setFormData] = useState({ id_etudiant: id, id_niveau: niveau, id_annee: annee});
 
  function transformLetter(lettre){
    let tableau = lettre.split('')
    for (let index = 0; index < tableau.length; index++) {
      const element = tableau[index];
      if (element == '-') {
        tableau[index] = '/'
      }
    }
    let result = tableau.join('')
    return result
  }

  useEffect(() => { 
    //Getting the student infomation
    window.print()
    async function getEtudiant() {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3002/result/etudiant/',
          data: formData,
        }); 
        setResultEtudiant(response.data[0]);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    getEtudiant()

    //Getting the student unity
    async function getUnity() {
      try {
        const response = await axios({
        method: 'post',
        url: 'http://localhost:3002/result/etudiant/unity',
        data: formData,
        }); 
        setEtudiantUnity(response.data);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    getUnity()

    //Getting the student mark
    async function getMark() {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3002/result/etudiant/result',
          data: formData,
        }); 
        setResultMark(response.data);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    getMark()
    //Getting the student final result
    async function getFinal() {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3002/result/etudiant/final',
          data: formData,
        }); 
        setResultFinal(response.data);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    getFinal()     
  }, [])

  return (
    <div>
      <Navigation />
      <div className='text-xs'>
        <div className=' text-center'>
          <div className='text-sm font-bold font-lato'>UNIVERSITE DE FIANARANTSOA</div>
          <div className=' text-sm font-bold font-lato'>ECOLE NATIONALE D'INFORMATIQUE</div>
          <div className='underline text-sm font-bold font-lato'>RELEVE DE NOTES</div>
        </div>
          { resultEtudiant && <div>
            <div className='text-sm text-center font-bold font-lato uppercase'>EN {  resultEtudiant.descri_niveau } PROFESSIONNELLE EN INFORMATIQUE </div>
            <div className='flex justify-center text-sm'>
              <div className='text-center font-bold font-lato mr-2'>Domaine : </div>
              <div className='text-center font-lato'>{  resultEtudiant.domaine } </div>
            </div>
            <div className='flex justify-between mx-6 text-sm'>
              <div className='text-center font-lato '>
                <div className='flex justify-center'>
                  <div className='text-center font-bold font-lato mr-2'>Mention : </div>
                  <div className='text-center font-lato'>{  resultEtudiant.mention } </div>
                </div> 
              </div>
              <div className='text-center font-lato '>
                <div className='flex justify-center'>
                  <div className='text-center font-bold font-lato mr-2'>Parcours : </div>
                  <div className='text-center font-lato'>{  resultEtudiant.parcours } </div>
                </div> 
              </div>
            </div>
            {
              resultEtudiant &&
              <div className='font-lato'>
                <div className='text-center font-lato '>
                  <div className='flex'>
                    <div className='underline text-center font-bold font-lato mr-2'>Nom et prénoms : </div>
                    <div className='text-center font-lato'>{  resultEtudiant.nom } {  resultEtudiant.prenom }</div>
                  </div> 
                </div>
                <div className='text-center font-lato '>
                  <div className='flex'>
                    <div className='underline text-center font-bold font-lato mr-2'>Date et lieu de naissance : </div>
                    <div className='text-center font-lato'>{ dayjs(resultEtudiant.date_naiss).format('DD-MM-YYYY') } à {  resultEtudiant.lieu_naiss }</div>
                  </div> 
                </div>
                <div className='text-center font-lato '>
                  <div className='flex'>
                    <div className='underline text-center font-bold font-lato mr-2'>Numero d'inscription : </div>
                    <div className='text-center font-lato'>{  resultEtudiant.matricule }</div>
                  </div> 
                </div>
                <div className='flex justify-end text-xs'>
                  <div className='mr-2'> Année universitaire:</div>
                  <div> { resultEtudiant.id_annee }</div>
                </div>
              </div>
            }
         
            <table className='text-center min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-6 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>UE</th>
                  <th className='flex justify-between px-6 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    <div>EC</div>
                    <div>Notes/20</div>
                  </th>
                  <th className='px-6 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Credits</th>
                  <th className='px-6 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Validation</th>
            </tr>
              </thead> 
                {
                  resultUnity &&
                resultUnity.map((item , index) => (
                  <tbody key={index} className='text-xs bg-white divide-y divide-gray-200'>
                      <tr key={item.id_ue}>
                        <td className='px-6 whitespace-nowrap leading-5 text-gray-900'> { item.id_ue }</td>
                        {item.notes.map(note => (
                          <div className='flex justify-between' key={note.nom_ec}>
                              <td className='px-6 whitespace-nowrap leading-5 text-gray-900'>{ note.nom_ec } </td>
                              <td className='mr-6 px-6 whitespace-nowrap leading-5 text-gray-900'> { note.valeur }</td>
                          </div>
                        ))}
                        <td className='px-6 whitespace-nowrap text-sm leading-5 text-gray-900'>{ item.credit_ue }</td>
                        <td className='px-6 whitespace-nowrap text-sm leading-5 text-gray-900  flex justify-center'>
                          { item.credit_ue > 0 ?
                            <div className='text-green-700 mx-1 flex'><div><CheckCircleFilled /></div><div className='mt-1 ml-1'> VALIDE </div> </div>
                          :
                          <div className='text-red-700 mx-1 flex'><div><CloseCircleFilled /></div><div className='mt-1 ml-1'>NON VALIDE </div> </div>
                          }
                        </td>
                      </tr>
                      <tr key={item.id_ue}>
                        <td></td>
                        <td  className='px-6 whitespace-nowrap leading-5 text-gray-900 flex justify-end mr-6 font-bold'> <div>MOYENNE </div> <div className='ml-4'>{item.moyenne.toFixed(2)} </div></td>
                        <td > </td>
                        <td></td>
                        <td></td>
                      </tr>
                  </tbody>
                ))
                }
                {/* yfvbevyb */}      
          </table>
          <div > 
            {
            resultMark &&
            <div className='flex justify-around border-t border-t-gray-200'>
              <div className='px-6 flex justify-between whitespace-nowrap text-xs leading-5 text-gray-900 border-r border-r-gray-200'><div className='font-bold mr-2'>MOYENNE GENERALE </div><div> { resultMark.moyenne_generale } </div></div>
              <div className='px-6 flex justify-between whitespace-nowrap text-xs leading-5 text-gray-900 '><div className='font-bold mr-2'>TOTAL CREDITS </div><div> { resultMark.total_credits }/60 </div></div>
            </div>
            }
            <div className='text-xs first-line:px-6 flex whitespace-nowrap leading-5 text-gray-900 font-bold border-y border-y-gray-200 '>
              <div className='mr-1'>OBSERVATION FINALE : </div>
              {resultFinal &&
                <div> { resultFinal } </div> 
              }
              </div>
            </div>
            </div>
        }
         <div className='text-right mt-1'>
          <div className='text-sm font-lato'>Fait à Fianarantsoa , le ....................</div>
        </div>
        <div className='flex mt-14'>
          <div className='text-xs underline font-lato'>NOTE IMPORTANTE  :</div>
          <div className='text-xs font-bold font-lato'>Ce relevé de notes être remis en aucun cas à l'interessé sous peine d'annulation</div>
        </div>
      </div>
    </div>
  )
}

export default NoteEtudiantPdf;