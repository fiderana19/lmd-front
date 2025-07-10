import { useState, useEffect, FunctionComponent } from 'react'
import { Button, message, Modal, Input } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddUE from './AddUE';
import { useGetAllUE } from '@/hooks/useGetAllUE';

const UE: FunctionComponent = () => {
  const { data: ue, isLoading, refetch } = useGetAllUE();
  const [searchUE, setSearchUE] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading , setLoading] = useState(true);
  const [creditError, setCreditError] = useState('');
  const [editedItem, setEditedItem] = useState({   
    id_ue: 0,
    nom_ue: '',
    credit_ue: 0,
  });

  //show delete confirmation
  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };
  //handling product delete
  function handleDelete(itemId) {
    axios({
      method: 'delete',
      url: `http://localhost:3002/ue/delete/${itemId}`,
    })
    .then(() => {
      deleteMessage()
    })
    .catch(error => {
      console.error('UE : Erreur lors de la suppression :', error);
    });
  }
  //edit ue item
  function EditUE(item) {
    setSelectedItem(item);
    showModal1();
  
    setEditedItem({
        id_ue: item.id_ue,
        nom_ue: item.nom_ue,
        credit_ue: item.credit_ue,
    });    
  }
  //handlign the form submit
  const handleSubmit = (e) => {
    setCreditError('')

    if (editedItem.credit_ue > 60) {
      setCreditError('Le credit doit être inferieur à 60 !');
    }
    // e.preventDefault();
    if (editedItem) {
      if(editedItem.credit_ue <= 60) {
        axios({
          method: 'patch',
          url: `http://localhost:3002/ue/edit/${editedItem.id_ue}`,
          data: editedItem,
        })
        .then(() => {
          setEditedItem({id_ue: 0,nom_ue: '',credit_ue: 0 });
        })
        .catch((error) => {
          console.error('EditUE : Erreur lors du modification:', error);
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
      handleDelete(itemToDelete.id_ue);
      setIsDeleteModalVisible(false);
    }
  };
  //handlign delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  ///message
  const deleteMessage = () => {
    message.success("Suppression de l'unité réussie !");
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
  //handling the keypress
  const handleKeyPress =async (e) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }

  return (
    <div className='pb-5 pt-24'>
      <div className='px-10'>
        <div className='block sm:flex justify-between'>
          <div className='text-xl font-bold font-lato'>LISTE DES UNITES D'ENSEIGNEMENTS</div>
          <div className='sm:block flex justify-end items-center'>
            <Input className='my-1 mx-1 w-52' placeholder="Saisir le nom de l'UE..." value={searchUE} onChange={(e) => setSearchUE(e.target.value)}  />
            <Button onClick={showModal} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
          </div>
        </div>
        <Modal title="AJOUTER UNE UNITE D'ENSEIGNEMENT" open={isModalOpen} onCancel={handleCloseModal} footer={null} >
          <AddUE />
        </Modal>
        <div className='my-7'>
          <table className='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom de l'unite</th>
                  <th className='md:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Credit</th>
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
              ue && ue.map((uee, index) =>{
                if (searchUE && !uee.nom_ue.includes(searchUE)) {
                  return null;
                }
                return(
                <tr key={index}>
                  <td className='md:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { uee.nom_ue }</td>
                  <td className='md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { uee.credit_ue }</td>
                  <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                  <div className='flex justify-center'>
                      <div   onClick={() => EditUE(uee)} className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                      <div onClick={() => showDeleteConfirmation(uee)}  className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
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
        <Modal title="MODIFIER UNITE D'ENSEIGNEMENT" open={isModalOpen1} onCancel={handleCloseModal1} footer={null} >
          {selectedItem && 
            <div>
              <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
              <label htmlFor='nom_ue' >Nom de l'unite : </label> <br />
                <Input name='nom_ue' value={editedItem.nom_ue} onChange={handleInputChange}/>
                <label htmlFor='credit_ue' >Credit de l'unite : </label> <br />
                <Input name='credit_ue' value={editedItem.credit_ue} onChange={handleInputChange} onKeyPress={handleKeyPress} className={creditError ? 'border border-red-500' : '' }/>
                {creditError && <div className="text-red-500 text-xs">{creditError}</div>}
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
            Êtes-vous sûr de vouloir supprimer cet unité ?
            Cela pourrait entraînner des incohérences de données
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default UE;