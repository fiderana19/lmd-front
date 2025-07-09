import { useState, useEffect, FunctionComponent } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResultatParNiveauPdf: FunctionComponent = () => {
  let params = useParams()
  let [resultFinal, setResultFinal] = useState([]);
  let [resultInfo, setResultInfo] = useState([]);
  let [annee, setAnnee] = useState(transformLetter(params.annee));
  let [niveau, setNiveau] = useState(params.niveau);
  let [obs, setObs] = useState(params.obs);
  const [formData, setFormData] = useState({ id_niveau: niveau, id_annee: annee, obs: obs});
   
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
    //Getting the student unity
    window.print()
    async function getInfo() {
      try {
        const response = await axios({
        method: 'post',
        url: 'http://localhost:3002/result/niveau/info',
        data: formData,
        }); 
        setResultInfo(response.data[0]);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    getInfo()

    //Getting the student final result
    async function getFinal() {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3002/result/niveau/final',
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
    <div className='py-1'>
      <div className='px-4'>
        <div className=' text-center'>
          <div className='text-lg font-bold font-lato'>UNIVERSITE DE FIANARANTSOA</div>
          <div className=' text-lg font-bold font-lato'>ECOLE NATIONALE D'INFORMATIQUE</div>
          <div className='text-right mt-4'>ANNEE UNIVERSITAIRE : { resultInfo.id_annee }</div>
          <div className='underline text-xl font-bold font-lato my-1'>LISTE DES ETUDIANTS { obs }</div>
        </div>        
        {
              resultInfo &&
              <div className='font-lato'>
                <div className='flex'>
                  <div className='font-bold underline mr-2'> Parcours:</div>
                  <div> { resultInfo.parcours }</div>
                </div>
                <div className='flex'>
                  <div className='font-bold underline mr-2'> Niveau:</div>
                  <div> { resultInfo.descri_niveau } </div>
                </div>
              </div>
            }
        <div className='my-2'>
          <table className=' min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-6  bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                  <th className='px-6 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom</th>
                  <th className='px-6  bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Resultat</th>
                </tr>
              </thead> 
              <tbody className='bg-white divide-y divide-gray-200'>
              {
                resultFinal &&
                resultFinal.map((final, index) => {
                  return(
                  <tr key={index} >
                    <td className='px-6 whitespace-nowrap text-sm leading-5 text-gray-900'> { final.matricule } </td>
                    <td className='px-6 whitespace-nowrap text-sm leading-5 text-gray-900'> { final.nom } { final.prenom }  </td>
                    <td className='px-6 whitespace-nowrap text-sm leading-5 text-gray-900'> { final.final }</td>
                  </tr>)
                })
              }
              </tbody>
          </table>
          </div>
        </div>
    </div>
  )
}

export default ResultatParNiveauPdf;