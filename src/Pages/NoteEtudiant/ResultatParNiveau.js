import { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import { FileOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import axios from 'axios';

const ResultatParNiveau = () => {
  const [anneeError, setAnneeError] = useState('');
  const [obsError, setObsError] = useState('');
  const [niveauError, setNiveauError] = useState('');
  let [annee, setAnnee] = useState([]);
  let [resultFinal, setResultFinal] = useState([]);
  let [resultInfo, setResultInfo] = useState([]);
  const [selectedAnneeId, setSelectedAnneeId] = useState(''); 
  const [selectedCritere, setSelectedCritere] = useState(''); 
  let [niveau, setNiveau] = useState([]);
  let [critere, setCritere] = useState(["ADMIS", "EXCLUS", 'AUTORISE A PASSE AU NIVEAU SUPERIEUR','AUTORISER A REDOUBLER' ]);
  const [selectedNiveauId, setSelectedNiveauId] = useState('');
  let [isView, setIsView] = useState(false);
  const [formData, setFormData] = useState({ id_niveau: "", id_annee: "", obs: ""});

  useEffect(() => {      
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
    setNiveauError('')
    setObsError('')

    if(formData.id_annee == '' ) {
      setAnneeError("Vous devez selectionner une année ! ")
    }
    if(formData.id_niveau == '' ) {
      setNiveauError("Vous devez selectionner un niveau ! ")
    }
    if(formData.obs == '' ) {
      setObsError("Vous devez selectionner un critère ! ")
    }
    if(formData.id_annee != '' && formData.id_niveau != '' && formData.obs != '') {
      setIsView(true)
      //Getting the student unity
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
    }
  }
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
  //handling the select niveau change
  const handleSelectCritereChange = (value) => {
    setSelectedCritere(value);
    setFormData({
      ...formData,
      obs: value,
    });
  };

  return (
    <div className='pb-5 pt-24'>
      <div className='lg:px-5 px-1'>
        <div className='mb-10'>
          <div className='text-xl text-center font-bold font-lato'>RECHERCHER RESULTAT D'UN NIVEAU</div>
            <div className='lg:flex block lg:justify-end text-center'>
              <div className='mx-1'>
                <Select
                  value={selectedNiveauId}
                  onChange={handleSelectNiveauChange}
                  className={niveauError ? 'border  md:w-56 w-full my-1 border-red-500' : 'md:w-56 w-full my-1' }
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
                  className={anneeError ? 'border md:w-56 w-full my-1 border-red-500' : 'md:w-56 w-full my-1' }
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
              <div className='mx-1'>
                <Select
                  value={selectedCritere}
                  onChange={handleSelectCritereChange}
                  className={obsError ? 'border md:w-56 w-full my-1 border-red-500' : 'md:w-56 w-full my-1' }
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="">Sélectionnez une critere</Option>
                  {
                    critere.map((ann, index) => {
                      return(
                        <Option key={index} value={ann}>
                          { `${ann}` }
                        </Option>
                      )
                    })
                  }
                </Select>
                {obsError && <div className="text-red-500 text-xs">{obsError}</div>}
              </div>
              <div className='md:block flex justify-center mx-1'>
                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>RECHERCHER</button>
              </div>
            </div>
          </div>
          {isView && 
            <div>
              <div className='text-xl text-center font-bold font-lato my-6'>RESULTAT</div>
              {
                resultInfo &&
                <div className='font-lato'>
                  <div className='flex'>
                    <div className='font-bold underline mr-2'> Domaine:</div> <div> { resultInfo.domaine } </div>
                    </div>
                  <div className='flex'>
                    <div className='font-bold underline mr-2'> Mention: </div>
                    <div> { resultInfo.mention } </div>
                  </div>
                  <div className='flex'>
                    <div className='font-bold underline mr-2'> Parcours:</div>
                    <div> { resultInfo.parcours }</div>
                  </div>
                  <div className='flex'>
                    <div className='font-bold underline mr-2'> Niveau:</div>
                    <div> { resultInfo.titre_niveau }</div>
                  </div>
                  <div className='text-right'>Année universitaire: { resultInfo.id_annee }</div>
                </div>
              }
              <div className=''>
                <table className=' min-w-full divide-y divide-gray-200'>
                  <thead>
                    <tr>
                      <th className='sm:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                      <th className='sm:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom</th>
                      <th className='sm:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Resultat</th>
                    </tr>
                  </thead> 
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {
                      resultFinal &&
                      resultFinal.map((final, index) => {
                        return(
                        <tr key={index} >
                          <td className='sm:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { final.matricule } </td>
                          <td className='sm:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { final.nom } { final.prenom }  </td>
                          <td className='sm:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { final.final }</td>
                        </tr>)
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className='flex justify-end my-10'>
                <a href={`/resultat/pdf/${selectedCritere}/${selectedNiveauId}/${transformLetter(selectedAnneeId)}`} target='_blank'>
                  <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'> <FileOutlined /> GENERER LE RESULTAT </button>
                </a>
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default ResultatParNiveau;