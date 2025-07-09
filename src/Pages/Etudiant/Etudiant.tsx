import { useState, useEffect, FunctionComponent } from 'react'
import { Button, Card, message, Modal, Input, DatePicker } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, UserOutlined, ShoppingCartOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddEtudiant from './AddEtudiant';
import dayjs from 'dayjs';
import Bg from '../../assets/pic/home-bg.jpg'


const Etudiant: FunctionComponent = () => {
  let [etudiant, setEtudiant] = useState([]);
  const [searchEtudiant, setSearchEtudiant] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading , setLoading] = useState(true);
  const [editedItem, setEditedItem] = useState({   
    id_etudiant: 0,
    matricule: '',
    nom: '',
    prenom: '',
    date_naiss: new Date(),
    lieu_naiss: '',
  });

  useEffect(() => {      
    //getting all etudiant
    try {
      axios({
        method: 'get',
        url: 'http://localhost:3002/etudiant/',
      })
      .then((rep) => {
        {
          setEtudiant(rep.data)
          setLoading(false);
        }
      })
    } catch (error) {
      console.error("Etudiant : Erreur de recuperation : " + error);
    }  
  }, [])
  //show delete confirmation
  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };
  //handling etudiant delete
  function handleDelete(itemId) {
    axios({
      method: 'delete',
      url: `http://localhost:3002/etudiant/delete/${itemId}`,
    })
    .then(() => {
      setEtudiant(etudiant.filter((item) => item.id_etudiant !== itemId));
      deleteMessage()
    })
    .catch(error => {
      console.error('Etudiant : Erreur lors de la suppression :', error);
    });
  }
  //edit product item
  function EditEtudiant(item) {
    setSelectedItem(item);
    showModal1();
  
    setEditedItem({
        id_etudiant: item.id_etudiant,
        matricule: item.matricule,
        nom: item.nom,
        prenom: item.prenom,
        date_naiss: item.date_naiss,
        lieu_naiss: item.lieu_naiss,
    });    
  }
  //handlign the form submit
  const handleSubmit = (e) => {
    console.log(editedItem)
    // e.preventDefault();
    if (editedItem) {
      axios({
        method: 'patch',
        url: `http://localhost:3002/etudiant/edit/${editedItem.id_etudiant}`,
        data: editedItem,
      })
      .then(() => {
        setEditedItem({id_etudiant: '',matricule: '',nom: '',prenom: '',date_naiss: '',lieu_naiss: '', });
      })
      .catch((error) => {
        console.error('EditEtudiant : Erreur lors du modification:', error);
      });
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
      handleDelete(itemToDelete.id_etudiant);
      setIsDeleteModalVisible(false);
    }
  };
  //handlign delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  ///message
  const deleteMessage = () => {
    message.success("Suppression de l'etudiant réussie !");
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

  //handling the date change
  const handleDateChange = (date, dateString) => {
    if (date) {
      const formatedDate = dayjs(dateString).format('YYYY-MM-DD')
      setEditedItem({
        ...editedItem,
        date_naiss: formatedDate,
      });
    }
   };

  return (
    <div className='pb-5 pt-24'>
      <div className='px-10'>
        <div className='block sm:flex justify-between'>
          <div className='text-xl font-bold font-lato'>LES ETUDIANTS</div>
          <div className='sm:block flex justify-end items-center'>
            <Input className='my-1 mx-1 w-52' placeholder='Saisir la matricule...' value={searchEtudiant} onChange={(e) => setSearchEtudiant(e.target.value)}  />
            <Button onClick={showModal} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
          </div>
        </div>
        <Modal title="AJOUTER UN ETUDIANT" open={isModalOpen} onCancel={handleCloseModal} footer={null} >
          <AddEtudiant />
        </Modal>
        <div className='my-7'>
          <div className='sm:block hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                    <th className='md:px-6 px-2  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenoms</th>
                    <th className='md:px-6 px-2  py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date de naissance</th>
                    <th className='md:px-6 px-2  py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Lieu de naissance</th>
                    <th className='px-1 py-4  bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
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
                etudiant.map((et, index) =>{
                  if (searchEtudiant && !et.matricule.includes(searchEtudiant)) {
                    return null;
                  }
                  return( 
                  <tr key={index}>
                    <td className='md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'> { et.matricule } </td>
                    <td className='md:px-6 px-2  py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 w-10 truncate'> { et.nom }  { et.prenom }  </td>
                    <td className='md:px-6 px-2  py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { dayjs(et.date_naiss).format('DD-MM-YYYY')  } </td>
                    <td className='md:px-6 px-2  py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { et.lieu_naiss } </td>
                    <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                      <div className='flex justify-center'>
                        <div  onClick={() => EditEtudiant(et)}  className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div  onClick={() => showDeleteConfirmation(et)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
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
              etudiant.map((et, index) =>{
                if (searchEtudiant && !et.matricule.includes(searchEtudiant)) {
                  return null;
                }
                return( 
                  <Card  key={index} className='hover:scale-105 duration-300'>
                    <div className='text-center'>
                      <img src={Bg} />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                          { et.matricule }
                        </div>
                        <div className='text-base font-bold'>
                          { et.nom }  { et.prenom }
                        </div>
                        <div className='text-sm'>
                          { dayjs(et.date_naiss).format('DD-MM-YYYY')  } 
                        </div>
                        <div className='text-sm'>
                          { et.lieu_naiss } 
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <div  onClick={() => EditEtudiant(et)}  className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div  onClick={() => showDeleteConfirmation(et)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
                      </div>
                    </div>
                </Card>
                )
                })
              )
            }
          </div>
        </div>
        <Modal title="MODIFIER ETUDIANT" open={isModalOpen1} onCancel={handleCloseModal1} footer={null} >
          {selectedItem && 
            <div>
              <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
              <label htmlFor='matricule' >Matricule : </label> <br />
                <Input name='matricule' value={editedItem.matricule} onChange={handleInputChange}/>
                <label htmlFor='nom' >nom : </label> <br />
                <Input name='nom' value={editedItem.nom} onChange={handleInputChange}/>
                <label htmlFor='prenom' >prenom : </label> <br />
                <Input name='prenom' value={editedItem.prenom} onChange={handleInputChange}/>
                <label htmlFor='date_naiss' >date_naiss : </label> <br />
                <DatePicker onChange={handleDateChange} className="w-full" showTime format="YYYY-MM-DD" />
                <label htmlFor='lieu_naiss' >lieu_naiss : </label> <br />
                <Input name='lieu_naiss' value={editedItem.lieu_naiss} onChange={handleInputChange}/>
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
            Êtes-vous sûr de vouloir supprimer cet etudiant ?
            Cela pourrait entraînner des incohérences de données
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Etudiant;