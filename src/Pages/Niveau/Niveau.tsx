import { useState, useEffect, FunctionComponent } from 'react'
import { Button, Card, message, Modal, Input } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddNiveau from './AddNiveau';
import Bg from '../../assets/pic/home-bg.jpg'
import { useGetAllNiveau } from '@/hooks/useGetAllNiveau';

const Niveau: FunctionComponent = () => {
  const { data: niveau, isLoading, refetch } = useGetAllNiveau();
  const [searchNiveau, setSearchNiveau] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editedItem, setEditedItem] = useState({   
    id_niveau: 0,
    titre_niveau: '',
    descri_niveau: '',
    domaine: '',
    mention: '',
    parcours: '',
  });
  
  //show delete confirmation
  const showDeleteConfirmation = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };
  //handling niveau delete
  function handleDelete(itemId: any) {
    axios({
      method: 'delete',
      url: `http://localhost:3002/niveau/delete/${itemId}`,
    })
    .then(() => {
      deleteMessage()
    })
    .catch(error => {
      console.error('Niveau : Erreur lors de la suppression  :', error);
    });
  }
  //edit product item
  function EditNiveau(item: any) {
    setSelectedItem(item);
    showModal1();
  
    setEditedItem({
        id_niveau: item.id_niveau,
        titre_niveau: item.titre_niveau,
        descri_niveau: item.descri_niveau,
        domaine: item.domaine,
        mention: item.mention,
        parcours: item.parcours,
    });    
  }
  //handlign the form submit
  const handleSubmit = (e: any) => {
    // e.preventDefault();
    if (editedItem) {
      axios({
        method: 'patch',
        url: `http://localhost:3002/niveau/edit/${editedItem.id_niveau}`,
        data: editedItem,
      })
      .then(() => {
        setEditedItem({id_niveau: 0, titre_niveau: '',descri_niveau: '',domaine: '',mention: '',parcours: '' });
      })
      .catch((error) => {
        console.error('EditNiveau : Erreur lors du modification:', error);
      });
    }
  }
  //handle edit input change
  const handleInputChange = (e: any) => {
    if (editedItem) {
      const { name, value } = e.target;
      setEditedItem({ ...editedItem, [name]: value });
    }
  };
  //handling delete confirmation
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete?.id_niveau);
      setIsDeleteModalVisible(false);
    }
  };
  //handlign delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  ///message
  const deleteMessage = () => {
    message.success("Suppression du niveau réussie !");
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

  return (
    <div className='pb-5 pt-24'>
      <div className='px-10'>
        <div className='block sm:flex justify-between'>
          <div className='text-xl font-bold font-lato'>LES NIVEAUX</div>
          <div className='sm:block flex justify-end items-center'>
            <Input className='my-1 mx-1 w-52' placeholder='Saisir le titre...' value={searchNiveau} onChange={(e) => setSearchNiveau(e.target.value)}  />
            <Button onClick={showModal} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
          </div>
        </div>
        <Modal title="AJOUTER UN NIVEAU" open={isModalOpen} onCancel={handleCloseModal} footer={null} >
          <AddNiveau />
        </Modal>
        <div className='my-7'>  
          <div className='sm:block hidden'>          
            <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Titre</th>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Domaine</th>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Mention</th>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Parcours</th>
                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                  </tr>
                </thead> 
                <tbody className='bg-white divide-y divide-gray-200'>
                {
                isLoading ? (
                <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
                </div>
                  ) : (
                niveau && niveau.map((niv, index) =>{
                  if (searchNiveau && !niv.titre_niveau.includes(searchNiveau)) {
                    return null;
                  }
                  return(
                  <tr key={index}>
                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { niv.titre_niveau } </td>
                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { niv.descri_niveau } </td>
                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { niv.domaine } </td>
                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { niv.mention } </td>
                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { niv.parcours } </td>
                    <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                    <div className='flex justify-center'>
                        <div  onClick={() => EditNiveau(niv)}  className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div  onClick={() => showDeleteConfirmation(niv)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
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
                isLoading && (
                <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
                </div>
                  )
                }
                {
                niveau && niveau.map((niv, index) =>{
                if (searchNiveau && !niv.titre_niveau.includes(searchNiveau)) {
                  return null;
                }
                return( 
                  <Card  key={index} className='hover:scale-105 duration-300 bg-gray-50'>
                    <div className='text-center'>
                      <img src={Bg} />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                          { niv.titre_niveau }
                        </div>
                        <div className='text-base font-bold'>
                          { niv.descri_niveau }
                        </div>
                        <div className='text-sm'>
                          <div className='text-sm underline'>
                            Domaine : 
                          </div>
                          <div className='text-sm'>
                            { niv.domaine } 
                          </div>
                        </div>
                        <div className='text-sm'>
                          <div className='text-sm underline'>
                              Mention : 
                            </div>
                          { niv.mention }
                        </div>
                        <div className='text-sm'>
                          <div className='text-sm underline'>
                              Parcours : 
                            </div>
                          { niv.parcours }
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <div  onClick={() => EditNiveau(niv)}  className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div  onClick={() => showDeleteConfirmation(niv)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
                      </div>
                    </div>
                </Card>
                )}
              )
            }
          </div>
        </div>
        <Modal title="MODIFIER NIVEAU" open={isModalOpen1} onCancel={handleCloseModal1} footer={null} >
          {selectedItem && 
            <div>
              <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
                <label htmlFor='titre_niveau' >Titre : </label> <br />
                <Input name='titre_niveau' value={editedItem.titre_niveau} onChange={handleInputChange}/>
                <label htmlFor='descri_niveau' >Description du niveau : </label> <br />
                <Input name='descri_niveau' value={editedItem.descri_niveau} onChange={handleInputChange}/>
                <label htmlFor='domaine' >Domaine : </label> <br />
                <Input name='domaine' value={editedItem.domaine} onChange={handleInputChange}/>
                <label htmlFor='mention' >Mention : </label> <br />
                <Input name='mention' value={editedItem.mention} onChange={handleInputChange}/>
                <label htmlFor='parcours' >Parcours : </label> <br />
                <Input name='parcours' value={editedItem.parcours} onChange={handleInputChange}/>
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
            Êtes-vous sûr de vouloir supprimer ce niveau ?
            Cela pourrait entraînner des incohérences de données
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Niveau;