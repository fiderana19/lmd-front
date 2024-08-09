import { useState, useEffect } from 'react'
import { Select } from 'antd'
import { CheckCircleFilled , CloseCircleFilled, FileOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Option } from 'antd/es/mentions';

const NoteEtudiant = () => {
  const [etudiantError, setEtudiantError] = useState('');
  const [niveauError, setNiveauError] = useState('');
  const [anneeError, setAnneeError] = useState('');
  let [etudiant, setEtudiant] = useState([]);
  let [resultEtudiant, setResultEtudiant] = useState([]);
  let [resultUnity, setEtudiantUnity] = useState([]);
  let [resultMark, setResultMark] = useState([]);
  let [resultFinal, setResultFinal] = useState('');
  const [selectedEtudiantId, setSelectedEtudiantId] = useState('');
  let [annee, setAnnee] = useState([]);
  const [selectedAnneeId, setSelectedAnneeId] = useState(''); 
  let [niveau, setNiveau] = useState([]);
  const [selectedNiveauId, setSelectedNiveauId] = useState('');
  let [isView, setIsView] = useState(false);
  const [formData, setFormData] = useState({ id_etudiant: "", id_niveau: "", id_annee: ""});

  useEffect(() => {      
    //fethcing all etudiant item
    async function fetchEtudiant() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3002/etudiant/',
        }); 
        setEtudiant(response.data);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    fetchEtudiant();
    //fethcing all niveau item
    async function fetchNiveau() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3002/niveau/',
        }); 
        setNiveau(response.data);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des niveaux :', error);
      }
    }
    fetchNiveau(); 
    //fethcing all annee item
    async function fetchAnnee() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3002/annee/',
        }); 
        setAnnee(response.data);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des annees :', error);
      }
    }
    fetchAnnee();
  }, [])

  function transformLetter(lettre){
    let tableau = lettre.split('')
    for (let index = 0; index < tableau.length; index++) {
      const element = tableau[index];
      if (element == '/') {
        tableau[index] = '-'
      }
    }
    let result = tableau.join('')
    return result
  }

  //handling the form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setAnneeError('')
    setEtudiantError('')
    setNiveauError('')

    if(formData.id_annee == '' ) {
      setAnneeError("Vous devez selectionner une année ! ")
    }
    if(formData.id_niveau == '' ) {
      setNiveauError("Vous devez selectionner un niveau ! ")
    }
    if(formData.id_etudiant == '' ) {
      setEtudiantError("Vous devez selectionner un etudiant ! ")
    }
    if(formData.id_annee != '' && formData.id_niveau != '' && formData.id_etudiant != '') {
      setIsView(true)
      //Getting the student infomation
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
          console.log(response.data)
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
    }    
  }
  //handling the select etudiant change
  const handleSelectEtudiantChange = (value) => {
    setSelectedEtudiantId(value);
    setFormData({
      ...formData,
      id_etudiant: value,
    });
  };
  //handling the select annee change
  const handleSelectAnneeChange = (value) => {
    setSelectedAnneeId(value);
    setFormData({
      ...formData,
      id_annee: value,
    });
  };
    //handling the select niveau change
  const handleSelectNiveauChange = (value) => {
    setSelectedNiveauId(value);
    setFormData({
      ...formData,
      id_niveau: value,
    });
  };

  return (
    <div className='pb-5 pt-24'>
      <div className='lg:px-5 px-1'>
          <div className='text-xl text-center font-bold font-lato mb-3'>RECHERCHER NOTE D'UN ETUDIANT</div>
          <form className='lg:flex block lg:justify-end text-center'  onSubmit={handleSubmit}>
            <div className='mx-1'>
              <Select
                value={selectedEtudiantId}
                onChange={handleSelectEtudiantChange}
                className={etudiantError ? 'border md:w-56 w-full my-1 border-red-500' : 'md:w-56 w-full my-1' }
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Sélectionnez un etudiant</Option>
                {
                etudiant.map((et, index) => {
                  return(
                    <Option key={index} value={et.id_etudiant}>
                      { `${et.matricule} ${et.nom} ${et.prenom} ` }
                    </Option>
                  )
                  })
                }
              </Select>
              {etudiantError && <div className="text-red-500 text-xs">{etudiantError}</div>}
            </div>
            <div className='mx-1'>
              <Select
                value={selectedNiveauId}
                onChange={handleSelectNiveauChange}
                className={niveauError ? 'border md:w-56 w-full my-1 border-red-500' : 'w-full md:w-56 my-1' }
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Sélectionnez un niveau</Option>
                {
                  niveau.map((niv, index) => {
                    return(
                      <Option key={index} value={niv.id_niveau}>
                        { `${niv.titre_niveau} ${niv.parcours}` }
                      </Option>
                    )
                  })
                }
              </Select>
              {niveauError && <div className="text-red-500 text-xs">{niveauError}</div>}
            </div>
            <div className='mx-1'>
              <Select
                value={selectedAnneeId}
                onChange={handleSelectAnneeChange}
                className={anneeError ? 'border w-full md:w-56 my-1 border-red-500' : 'md:w-56 w-full my-1' }
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Sélectionnez une année</Option>
                {
                  annee.map((ann, index) => {
                    return(
                      <Option key={index} value={ann.id_annee}>
                        { `${ann.id_annee}` }
                      </Option>
                    )
                  })
                }
              </Select>
              {anneeError && <div className="text-red-500 text-xs">{anneeError}</div>}
            </div>
            <div className='md:block flex justify-center mx-1'>
              <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' >RECHERCHER</button>
            </div>
          </form>
          { isView && <div>
            <div className='text-xl text-center font-bold font-lato my-6'>NOTE D'UN ETUDIANT</div>
            {
              resultEtudiant &&
              <div className='font-lato'>
                <div className='flex'>
                  <div className='font-bold underline mr-2'> Etudiant:</div> <div> { resultEtudiant.nom } { resultEtudiant.prenom }</div>
                  </div>
                <div className='flex'>
                  <div className='font-bold underline mr-2'> Numero d'inscription: </div>
                  <div> { resultEtudiant.matricule } </div>
                </div>
                <div className='flex'>
                  <div className='font-bold underline mr-2'> Niveau:</div>
                  <div> { resultEtudiant.titre_niveau }</div>
                </div>
                <div className='text-right'>Année universitaire: { resultEtudiant.id_annee }</div>
              </div>
            }
         
            <table className='text-center min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='md:px-6 px-2 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>UE</th>
                  <th className='flex justify-between md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    <div>EC</div>
                    <div>Notes/20</div>
                  </th>
                  <th className='md:px-6 px-2 py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Credits</th>
                  <th className='md:px-6 px-2 py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Validation</th>
                </tr>
              </thead> 
                {
                  resultUnity &&
                resultUnity.map((item , index) => (
                  <tbody key={index} className='bg-white divide-y divide-gray-200'>
                      <tr key={item.id_ue}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'> { item.id_ue }</td>
                        {item.notes.map(note => (
                          <div className='flex justify-between' key={note.nom_ec}>
                              <td className='md:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>{ note.nom_ec } </td>
                              <td className='mr-6 md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'> { note.valeur }</td>
                          </div>
                        ))}
                        <td className='md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>{ item.credit_ue }</td>
                        <td className='md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900  flex justify-center'>
                          { item.credit_ue > 0 ?
                            <div className='text-green-700 mx-1 flex'><div><CheckCircleFilled /></div><div className='ml-1'> VALIDE </div> </div>
                            :
                            <div className='text-red-700 mx-1 flex'><div><CloseCircleFilled /></div><div className='ml-1'>NON VALIDE </div> </div>
                          }
                        </td>
                      </tr>
                      <tr key={item.id_ue}>
                        <td></td>
                        <td  className='md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 flex justify-end mr-6 font-bold'> <div>MOYENNE </div> <div className='ml-4'>{item.moyenne.toFixed(2)} </div></td>
                        <td > </td>
                        <td></td>
                        <td></td>
                      </tr>
                  </tbody>
                ))
                }
          </table>
          <div> 
            {
            resultMark &&
            <div className='flex justify-around border-t border-t-gray-200'>
              <div className='px-6 py-4 flex justify-between whitespace-nowrap text-sm leading-5 text-gray-900 border-r border-r-gray-200'><div className='font-bold mr-2'>MOYENNE GENERALE </div><div> { resultMark.moyenne_generale } </div></div>
              <div className='px-6 py-4 flex justify-between whitespace-nowrap text-sm leading-5 text-gray-900 '><div className='font-bold mr-2'>TOTAL CREDITS </div><div> { resultMark.total_credits }/60 </div></div>
            </div>
            }
            <div className='px-6 py-4 flex whitespace-nowrap text-sm leading-5 text-gray-900 font-bold border-y border-y-gray-200 '>
              <div className='mr-1'>OBSERVATION FINALE : </div>
              {resultFinal &&
                <div> { resultFinal } </div> 
              }
              </div>
            </div>
            <div className='flex justify-end my-10'>
               <a href={`/releve/pdf/${selectedEtudiantId}/${selectedNiveauId}/${transformLetter(selectedAnneeId)}`} target='_blank'>
                 <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'> <FileOutlined /> GENERER UN RELEVE DE NOTES </button>
               </a>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default NoteEtudiant;