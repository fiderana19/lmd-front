import { Input, Select , message  } from 'antd'
import { Option } from 'antd/es/mentions';
import React, {  useState, useEffect, FunctionComponent } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation';

const AddNotePerso: FunctionComponent = () => { 
  let [niveau, setNiveau] = useState([]);
  const [selectedNiveauId, setSelectedNiveauId] = useState('');  
  let [ec, setEC] = useState([]);
  const [selectedECId, setSelectedECId] = useState('');
  let [annee, setAnnee] = useState([]);
  const [selectedAnneeId, setSelectedAnneeId] = useState('');
  const [niveauError, setNiveauError] = useState('');
  const [ecError, setECError] = useState('');
  const [anneeError, setAnneeError] = useState('');
  const navigate = useNavigate()

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
    //fethcing all ec item
    async function fetchEC() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3002/ec/',
         }); 
        setEC(response.data);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des elements :', error);
      }
    }
    fetchEC();    
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
   return () => {
    
    };
  }, []);

  //handling the select niveau change
  const handleSelectNiveauChange = (value) => {
    setSelectedNiveauId(value);
  };
  //handling the select ec change
  const handleSelectECChange = (value) => {
    setSelectedECId(value);
  };
  //handling the select annee change
  const handleSelectAnneeChange = (value) => {
    setSelectedAnneeId(value);
  };

  //handling the select annee change
  const handleSubmit = (e) => {
    e.preventDefault()
    setNiveauError('')
    setAnneeError('')
    setECError('')

    if(selectedNiveauId == '' ) {
      setNiveauError("Vous devez selectionner un niveau ! ")
    }
    if(selectedAnneeId == '' ) {
      setAnneeError("Vous devez selectionner une année ! ")
    }
    if(selectedECId == '' ) {
      setECError("Vous devez selectionner un element ! ")
    }

    if(selectedAnneeId != '' && selectedECId != '' && selectedNiveauId != '') {
      navigate(`/addglobal/note/${selectedECId}/${selectedNiveauId}/${transformLetter(selectedAnneeId)}`)
    }
  };

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
    
  return (
    <div>
      <Navigation />
      <div className='md:w-1/3 w-4/5 mx-auto pb-5 pt-24'>
        <h1 className='text-xl font-bold font-lato text-center my-5'>AJOUT GLOBAL DES NOTES</h1>
        <form>
          <label htmlFor='id_niveau' >Niveau : </label> <br />
          <Select
            value={selectedNiveauId}
            onChange={handleSelectNiveauChange}
            className={niveauError ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
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
                      { `${niv.titre_niveau} -  ${niv.parcours}` }
                    </Option>
                  )
                })
              }
          </Select>
          {niveauError && <div className="text-red-500 text-xs">{niveauError}</div>}
          <label htmlFor='id_ec' >Element Constitutif : </label> <br />
          <Select
            value={selectedECId}
            onChange={handleSelectECChange}
            className={ecError ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="">Sélectionnez un element</Option>
              {
                ec.map((element, index) => {
                  return(
                    <Option key={index} value={element.id_ec}>
                      { `${element.nom_ec} -  ${element.id_ue}` }
                    </Option>
                  )
                })
              }
          </Select>
          {ecError && <div className="text-red-500 text-xs">{ecError}</div>}
          <label htmlFor='id_annee' >Année universitaire : </label> <br />
          <Select
            value={selectedAnneeId}
            onChange={handleSelectAnneeChange}
            className={anneeError ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
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
        </form>
        <div className='flex justify-end my-3'>
            <Link to='/note'>
              <button className='text-black border-black border mx-2 py-2 px-4 text-sm  rounded focus:outline-none'>RETOUR</button>
            </Link>
            <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'> CONFIRMER </button>
          </div>
      </div>
    </div>
  );
}

export default AddNotePerso