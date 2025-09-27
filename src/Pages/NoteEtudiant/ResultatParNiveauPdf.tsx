import { useState, useEffect, FunctionComponent } from 'react'
import { useParams } from 'react-router-dom';
import { invertLetter } from '@/utils/Format';
import { usePostResultNiveauFinal } from '@/hooks/usePostResultNiveauFinal';
import { usePostResultNiveauInfo } from '@/hooks/usePostResultNiveauInfo';

const ResultatParNiveauPdf: FunctionComponent = () => {
  let params = useParams();
  const annee = params?.annee ? invertLetter(params.annee) : '';
  const niveau = params.niveau ? Number(params.niveau) : 0;
  const obs = params.obs ? params?.obs : '';
  const formData = { id_niveau: niveau, id_annee: annee, obs: obs};
  const { mutateAsync: getResultInfo } = usePostResultNiveauInfo();
  const { mutateAsync: getResultFinal } = usePostResultNiveauFinal();

  const [resultFinal, setResultFinal] = useState<any>();
  const [resultInfo, setResultInfo] = useState<any>();
   
  useEffect(() => {      
    async function fetch() {
      const i = await getResultInfo(formData);
      setResultInfo(i?.data[0]);
      const f = await getResultFinal(formData);
      setResultFinal(f?.data);
    }
    fetch()
    window.print()
  }, [annee, niveau, obs])

  return (
    <div>
      <div className='py-1'>
        <div className='px-4'>
          <div className=' text-center'>
            <div className='text-lg font-bold font-lato'>UNIVERSITE DE FIANARANTSOA</div>
            <div className=' text-lg font-bold font-lato'>ECOLE NATIONALE D'INFORMATIQUE</div>
            {
              resultInfo &&
            <div className='text-right mt-4'>ANNEE UNIVERSITAIRE : { resultInfo.id_annee }</div>
            }
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
                  resultFinal.map((final: any, index: any) => {
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
    </div>
  )
}

export default ResultatParNiveauPdf;