import { Input, Select , message  } from 'antd'
import { Option } from 'antd/es/mentions';
import React, {  useState, useEffect, FunctionComponent } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { handleFloatKeyPress } from '@/utils/handleKeyPress';
import { useGetAllEtudiant } from '@/hooks/useGetAllEtudiant';
import { useGetAllNiveau } from '@/hooks/useGetAllNiveau';
import { useGetAllEC } from '@/hooks/useGetAllEC';
import { LoadingOutlined } from '@ant-design/icons';

const AddNote: FunctionComponent = () => {
  const { data: etudiants, isLoading: etudiantLoading } = useGetAllEtudiant();
  const [selectedEtudiantId, setSelectedEtudiantId] = useState('');  
  const { data: niveaux, isLoading: niveauLoading } = useGetAllNiveau();
  const [selectedNiveauId, setSelectedNiveauId] = useState(''); 
  const { data: ecs, isLoading: ecLoading } = useGetAllEC(); 
  const [selectedECId, setSelectedECId] = useState('');
  let [annee, setAnnee] = useState([]);
  const [selectedAnneeId, setSelectedAnneeId] = useState('');
  const [formData, setFormData] = useState({ valeur: 0, id_etudiant: "", id_niveau: "", id_ec: "", id_annee: ""});
  const [valeurError, setValeurError] = useState('');
  const [etudiantError, setEtudiantError] = useState('');
  const [niveauError, setNiveauError] = useState('');
  const [ecError, setECError] = useState('');
  const [anneeError, setAnneeError] = useState('');

  useEffect(() => {
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
  
  //handling the form submit
  const handleSubmit = async (e) => {
    setValeurError('')
    setAnneeError('')
    setEtudiantError('')
    setNiveauError('')
    setECError('')

    if(formData.valeur > 20 ) {
      setValeurError("La note ne doit pas etre superieur à 20 !")
    }
    if(formData.id_annee == '' ) {
      setAnneeError("Vous devez selectionner une année ! ")
    }
    if(formData.id_etudiant == '' ) {
      setEtudiantError("Vous devez selectionner un etudiant ! ")
    }
    if(formData.id_niveau == '' ) {
      setNiveauError("Vous devez selectionner un niveau ! ")
    }
    if(formData.id_ec == '' ) {
      setECError("Vous devez selectionner un element constitutif ! ")
    }
    if(formData.valeur <= 20 && formData.id_annee != '' && formData.id_etudiant != '' && formData.id_niveau != '' && formData.id_ec != '') {
      try {
        const response  = await  axios({
          method: 'post',
          url: 'http://localhost:3002/note/create/',
          data: formData,
        });
        successMessage()
      } catch (error) {
        errorMessage()
        console.error("AddNOTE : Erreur d'ajout du note : " + error);
      }
    } else {
      e.preventDefault()
    }
    
  }
  //handling the input change
  const handleChange = async (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }

  //handling the select etudiant change
  const handleSelectEtudiantChange = (value) => {
    setSelectedEtudiantId(value);
    setFormData({
      ...formData,
      id_etudiant: value,
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
  //handling the select ec change
  const handleSelectECChange = (value) => {
    setSelectedECId(value);
    setFormData({
      ...formData,
      id_ec: value,
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
  //success message 
  const successMessage = () => {
    message.success('Note ajouté avec succés !');
  };
  //error message 
  const errorMessage = () => {
    message.error("Echec de l'ajout du note !");
  };
    
  return (
    <div>
      <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
        <label htmlFor='valeur' >Note : </label> <br />
        <Input name='valeur' value={formData.valeur} onChange={handleChange} onKeyPress={handleFloatKeyPress}  className={valeurError ? 'border border-red-500' : '' }/>
        {valeurError && <div className="text-red-500 text-xs">{valeurError}</div>}
        <label htmlFor='id_etudiant' >Etudiant : </label> <br />
        <Select
          value={selectedEtudiantId}
          onChange={handleSelectEtudiantChange}
          className={etudiantError ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
          showSearch
          optionFilterProp="children"
          filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="">Sélectionnez un etudiant</Option>
            {
              etudiantLoading && <LoadingOutlined />
            }
            {
              etudiants && etudiants.map((et: any, index: any) => {
                return(
                  <Option key={index} value={et.id_etudiant}>
                    { `${et.matricule} -  ${et.nom} ${et.prenom}` }
                  </Option>
                )
              })
            }
        </Select>
        {etudiantError && <div className="text-red-500 text-xs">{etudiantError}</div>}
        <label htmlFor='id_niveau' >Niveau : </label> <br />
        <Select
          value={selectedNiveauId}
          onChange={handleSelectNiveauChange}
          className={niveauError ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
          showSearch
          optionFilterProp="children"
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="">Sélectionnez un niveau</Option>
            {
              niveauLoading && <LoadingOutlined />
            }
            {
              niveaux && niveaux.map((niv: any, index: any) => {
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
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="">Sélectionnez un element</Option>
            {
              ecLoading && <LoadingOutlined />
            }
            {
              ecs && ecs.map((element: any, index: any) => {
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
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="">Sélectionnez une année</Option>
            {
              annee.map((ann: any, index: any) => {
                return(
                  <Option key={index} value={ann.id_annee}>
                    { `${ann.id_annee}` }
                  </Option>
                )
              })
            }
        </Select>
        {anneeError && <div className="text-red-500 text-xs">{anneeError}</div>}
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
      <Link to='/addnote' className='flex justify-center'>
        <a className='underline'>Faire un ajout global</a>
      </Link>
    </div>
  );
}

export default AddNote