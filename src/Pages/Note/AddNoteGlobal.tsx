import { Input, Select , message , Card  } from 'antd'
import { Option } from 'antd/es/mentions';
import React, {  useState, useEffect, FunctionComponent } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CloseCircleFilled, CheckCircleFilled, WarningFilled, UserOutlined, ShoppingCartOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { handleFloatKeyPress } from '@/utils/handleKeyPress';

const AddNoteGlobal: FunctionComponent = () => {
  let params = useParams()
  let [ec , setEC] = useState(params.ec)
  let [annee , setAnnee] = useState(transformLetter(params.annee))
  let [niveau , setNiveau] = useState(params.niveau)
  let [etudiant, setEtudiant] = useState([]);
  let [niv, setNiv] = useState([]);
  let [element, setEl] = useState([]);
  const [loading , setLoading] = useState(true);
  const [etudiantError, setEtudiantError] = useState('');
  const [selectedEtudiantId, setSelectedEtudiantId] = useState('');  
  const [formData, setFormData] = useState({ valeur: 0, id_etudiant: "", id_niveau: niveau, id_ec: ec, id_annee: annee});
  const [valeurError, setValeurError] = useState('');
  let [values, setValues] = useState({id_ec: ec , id_niveau: niveau, id_annee: annee});
  let [notes, setNotes] = useState([]);
  const [searchNote, setSearchNote] = useState('');

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

    //getting niveau by id
    async function getNiveauById() {
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:3002/niveau/get/${ niveau }`,
        }); 
        setNiv(response.data[0]);
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    getNiveauById();

    //getting ec by id
    async function getEcByID() {
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:3002/ec/get/${ ec }/`,
        }); 
        setEl(response.data[0]);        
      } catch (error) {
        console.error('AddNote : Erreur lors de la récupération des etudiants :', error);
      }
    }
    getEcByID();

    //fethcing all note of niveau
    async function fetchNotes() {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3002/note/niveau/',
          data: values
        }); 
        setNotes(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error('AddNote : Erreur lors de la 555 des etudiants :', error);
      }
    }
    fetchNotes();
   return () => {
    };
  }, []);
  
  //handling the form submit
  const handleSubmit = async (e) => {
    setValeurError('')
    setEtudiantError('')

    if(formData.valeur > 20 ) {
      setValeurError("La note ne doit pas etre superieur à 20 !")
    }
    if(formData.id_etudiant == '' ) {
      setEtudiantError("Vous devez selectionner un etudiant !")
    }
    if(formData.valeur <= 20 && formData.id_etudiant != '') {
      try {
        const response  = await  axios({
          method: 'post',
          url: 'http://localhost:3002/note/create/',
          data: formData,
        });
        successMessage()
        setFormData({ valeur: 0, id_etudiant: "", id_niveau: niveau, id_ec: ec, id_annee: annee});
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
  
  //success message 
  const successMessage = () => {
    message.success('Note ajouté avec succés !');
  };
  //error message 
  const errorMessage = () => {
    message.error("Echec de l'ajout du note !");
  };
    
  return (
    <div className='mx-auto pb-5 pt-24 sm:px-10 px-5'>
      <div className='lg:whitespace-nowrap whitespace-normal uppercase flex justify-center text-2xl font-bold font-lato'>
        NOTE  { element.nom_ec }  DES ETUDIANTS  { niv.titre_niveau } EN ANNEE { annee }  
      </div>
      <div className='md:flex block justify-between lg:mx-32 mx-5 my-4'>
      <Card>
          <form className='my-7 mx-auto' onSubmit={handleSubmit}>
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
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="">Sélectionnez un etudiant</Option>
              {
                etudiant.map((et, index) => {
                  return(
                    <Option key={index} value={et.id_etudiant}>
                      { `${et.nom} ${et.matricule}` }
                    </Option>
                  )
                })
              }
          </Select>
          {etudiantError && <div className="text-red-500 text-xs">{etudiantError}</div>}
          <div className='flex justify-center my-3'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
          </div>
        </form>
        </Card>
        <div className='md:w-1/2 w-full md:py-0 py-4'>
          <div className='flex justify-end'>
            <Input className='my-1 mx-1 w-52' placeholder='Saisir la matricule...' value={searchNote} onChange={(e) => setSearchNote(e.target.value)}  />
          </div>
            <div>
              <table className=' min-w-full divide-y divide-gray-200'>
                  <thead>
                    <tr>
                      <th className='px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                      <th className='px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Note</th>
                    </tr>
                  </thead> 
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {
                  loading ? (
                  <div className='text-center my-10'>
                    <LoadingOutlined className='text-3xl' />
                    <div>Chargement...</div>
                  </div>
                    ) : (
                  notes.map((note, index) =>{
                    if (searchNote && !note.matricule.includes(searchNote)) {
                      return null;
                    }
                    return( 
                    <tr key={index}>
                      <td className='px-6 py-4 text-center whitespace-nowrap text-sm leading-5 text-gray-900'> { note.matricule } </td>
                      <td className='flex justify-center px-6 py-4 text-center whitespace-nowrap text-sm leading-5 text-gray-900'> 
                        { note.valeur }
                        { note.valeur >= 10 ?
                            <div className='text-green-700 mx-1'><CheckCircleFilled /></div>
                          :
                          (note.valeur >= 5 ? 
                            <div className='text-yellow-300 mx-1'><WarningFilled /></div>
                            :
                            <div className='text-red-600 mx-1'><CloseCircleFilled /></div>
                            )
                        }
                      </td>
                    </tr>
                    )
                  })
                )
              }
              </tbody>
              </table>
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default AddNoteGlobal