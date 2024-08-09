import { useState, useEffect } from 'react'
import { Button, Dropdown, message, Modal, Input, Card } from 'antd'
import { HomeOutlined, UserOutlined ,EditOutlined, DeleteOutlined, WarningFilled, SearchOutlined , UnorderedListOutlined,  WarningOutlined, CheckCircleFilled , CloseCircleFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import AddNote from './AddNote';
import Bg from '../../assets/pic/home-bg.jpg'

const Note = () => {
  let [note, setNote] = useState([]);
  let [etudiant, setEtudiant] = useState([]);
  const [selectedEtudiantId, setSelectedEtudiantId] = useState('');  
  let [niveau, setNiveau] = useState([]);
  const [selectedNiveauId, setSelectedNiveauId] = useState('');  
  let [ec, setEC] = useState([]);
  const [selectedECId, setSelectedECId] = useState('');
  let [annee, setAnnee] = useState([]);
  const [selectedAnneeId, setSelectedAnneeId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading , setLoading] = useState(true);
  const [valeurError, setValeurError] = useState('');
  const [editedItem, setEditedItem] = useState({   
    id_note: 0,
    valeur: 0,
    id_etudiant: '',
    id_niveau: '',
    id_ec: '',
    id_annee: '',
  });
  const location = useLocation()
  const items = [
    {
        label: <Link to='/note/etudiant'>
                    <div className='px-4 py-1'>
                        <UserOutlined /> NOTE D'UN ETUDIANT
                    </div>
                </Link>,
        key: '01'
    },
    {
        label: <Link to='/note/result'>
                <div className='px-4 py-1'>
                    <UnorderedListOutlined /> RESULTAT D'UN NIVEAU
                </div>
            </Link>,
        key: '1'
    },
];

  useEffect(() => {      
    //getting all note
    try {
      axios({
        method: 'get',
        url: 'http://localhost:3002/note/',
      })
      .then((rep) => {
        {
          setNote(rep.data)
          setLoading(false);
        }
      })
    } catch (error) {
      console.error("Note : Erreur de recuperation des notes : " + error);
    }  

  }, [])
  //show delete confirmation
  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };
  //handling note delete
  function handleDelete(itemId) {
    axios({
      method: 'delete',
      url: `http://localhost:3002/note/delete/${itemId}`,
    })
    .then(() => {
      setNote(note.filter((item) => item.id_note !== itemId));
      deleteMessage()
    })
    .catch(error => {
      console.error('Note : Erreur lors de la suppression de l\'élément :', error);
    });
  }
  //edit note item
  function EditNote(item) {
    setSelectedItem(item);
    showModal1();
  
    setEditedItem({
        id_note: item.id_note,
        valeur: item.valeur,
        id_etudiant: item.id_etudiant,
        id_niveau: item.id_niveau,
        id_ec: item.id_ec,
        id_annee: item.id_annee,
    });    
  }
  //handlign the form submit
  const handleSubmit = (e) => {
    // e.preventDefault();
    setValeurError('')

    if(editedItem.valeur > 20 ) {
      setValeurError("La note ne doit pas etre superieur à 20 !")
    }

    if (editedItem) {
      if(editedItem.valeur <= 20) {
        axios({
          method: 'patch',
          url: `http://localhost:3002/note/edit/${editedItem.id_note}`,
          data: editedItem,
        })
        .then(() => {
          setEditedItem({id_note: '',valeur: 0,  id_etudiant: '', id_niveau: '', id_ec: '', id_annee: '', });
        })
        .catch((error) => {
          console.error('EditNote : Erreur lors du modification:', error);
        });
      } else {
        e.preventDefault()
      }
      
    }
  }
  //handle edit input change
  const handleInputChange = (e) => {
    if (editedItem) {
      const { name, value } = e.target;
      setEditedItem({ ...editedItem, [name]: value });
    }
  };
  //handling delete confirmation
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete.id_note);
      setIsDeleteModalVisible(false);
    }
  };
  //handlign delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  ///message
  const deleteMessage = () => {
    message.success("Suppression du note réussie !");
  };
  //show add modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  //closing add modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //show edit modal
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  //close edit modal
  const handleCloseModal1 = () => {
    setIsModalOpen1(false);
  };
  const okDeleteStyle = {
    background: 'red'
  }
  //handling the key press
  const handleFloatKeyPress =async (e) => {
    const charCode = e.which || e.keyCode;
  
    if ((charCode < 48 || charCode > 57) && charCode != 46 && charCode > 31) {
      e.preventDefault();
    }
  }

  return (
    <div className='pb-5 pt-24'>
      <div className='px-10'>
        <div className='flex justify-between'>
          <div className='text-xl font-bold font-lato'>LES NOTES</div>
          <div>
            <Dropdown className="mx-1" menu={{items}} trigger={['click']}>
              <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                <Button>
                  <SearchOutlined />
                </Button>
              </a>
            </Dropdown>
            <Button onClick={showModal} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
          </div>
        </div>
        <Modal title="AJOUTER UN NOTE" open={isModalOpen} onCancel={handleCloseModal} footer={null} >
          <AddNote />
        </Modal>
        <div className='my-7 grid gap-2 justify-center grid-cols-customized'>
        </div>
          <div className='sm:block hidden'>                   
            <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Etudiant</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Niveau</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>EC</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Annee</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Note</th>
                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
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
                note.map((notee, index) =>{
                  return(
                  <tr key={index}>
                    <td className='lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { notee.id_etudiant } </td>
                    <td className='lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { notee.id_niveau } </td>
                    <td className='lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { notee.id_ec } </td>
                    <td className='lg:px-6 px-2 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { notee.id_annee } </td>
                    <td className='lg:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 flex justify-evenly'>
                    { notee.valeur }
                    { notee.valeur >= 10 ?
                        <div className='text-green-700 mx-1'><CheckCircleFilled /></div>
                      :
                      (notee.valeur >= 5 ? 
                        <div className='text-yellow-300 mx-1'><WarningFilled /></div>
                        :
                        <div className='text-red-600 mx-1'><CloseCircleFilled /></div>
                        )
                    }
                    </td>
                    <td className='px-1 py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                      <div className='flex justify-center'>
                        <div  onClick={() => EditNote(notee)}   className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div   onClick={() => showDeleteConfirmation(notee)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
                      </div>
                    </td>
                  </tr>
                    )
                  })
                )
              }
                </tbody>
            </table>
          </div>
          <div className='sm:hidden grid gap-2 justify-center grid-cols-customized'>
            {
              loading ? (
                <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
                </div>
                  ) : (
                note.map((notee, index) =>{
                  return(
                  <Card  key={index} className='hover:scale-105 duration-300'>
                    <div className='text-center'>
                      <img src={Bg} />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                        { notee.id_etudiant }
                        </div>
                        <div className='text-base font-bold'>
                        { notee.id_niveau }
                        </div>
                        <div className='text-sm'>
                        { notee.id_ec }
                        </div>
                        <div className='text-sm'>
                        { notee.id_annee }
                        </div>
                        <div className='text-sm flex justify-center'>
                          { notee.valeur }
                          { notee.valeur >= 10 ?
                              <div className='text-green-700 mx-1'><CheckCircleFilled /></div>
                            :
                            (notee.valeur >= 5 ? 
                              <div className='text-yellow-300 mx-1'><WarningFilled /></div>
                              :
                              <div className='text-red-600 mx-1'><CloseCircleFilled /></div>
                              )
                          }
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <div  onClick={() => EditNote(notee)}   className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div   onClick={() => showDeleteConfirmation(notee)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
                      </div>
                    </div>
                </Card>
                )
                })
              )
            }
          </div>
        <Modal title="MODIFIER NOTE" open={isModalOpen1} onCancel={handleCloseModal1} footer={null} >
          {selectedItem && 
            <div>
              <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
              <label htmlFor='valeur' >Valeur : </label> <br />
                <Input name='valeur' onKeyPress={handleFloatKeyPress} value={editedItem.valeur} onChange={handleInputChange}  className={valeurError ? 'border border-red-500' : '' } />
                {valeurError && <div className="text-red-500 text-xs">{valeurError}</div>}
                <label htmlFor='id_etudiant' >Etudiant : </label> <br />
                <Input name='id_etudiant' value={editedItem.id_etudiant} onChange={handleInputChange} readOnly/>
                <label htmlFor='id_niveau' >Niveau : </label> <br />
                <Input name='id_niveau' value={editedItem.id_niveau} onChange={handleInputChange} readOnly/>
                <label htmlFor='id_ec' >Element Constitutif : </label> <br />
                <Input name='id_ec' value={editedItem.id_ec} onChange={handleInputChange} readOnly/>
                <label htmlFor='id_annee' >Année universitaire : </label> <br />
                <Input name='id_annee' value={editedItem.id_annee} onChange={handleInputChange} readOnly/>
                <div className='flex justify-center my-3'>
                  <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>MODIFIER</button>
                </div>
              </form>
            </div>
          }
        </Modal>
        <Modal
          title="Suppression"
          open={isDeleteModalVisible}
          onOk={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          okText="Supprimer"
          cancelText="Annuler"
          okButtonProps={{style: okDeleteStyle}}
        >
          <div className='text-red-900'>
            <WarningOutlined className='mr-2' />  
            Êtes-vous sûr de vouloir supprimer ce note ?
            Cela pourrait entraînner des incohérences de données
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Note;