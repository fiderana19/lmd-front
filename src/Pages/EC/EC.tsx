import { useState, useEffect, FunctionComponent } from 'react'
import { Button, Card, message, Modal, Input, Select } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddEC from './AddEC';
import { Option } from 'antd/es/mentions';
import Bg from '../../assets/pic/home-bg.jpg'
import { useGetAllEC } from '@/hooks/useGetAllEC';
import { useGetAllUE } from '@/hooks/useGetAllUE';
import { handleFloatKeyPress, handleNumberKeyPress } from '@/utils/handleKeyPress';

const EC: FunctionComponent = () => {
  const { data: ec, isLoading, refetch } = useGetAllEC();
  const { data: ues, isLoading: ueLoading } = useGetAllUE();
  const [searchEC, setSearchEC] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [creditError, setCreditError] = useState('');
  const [poidsError, setPoidsError] = useState('');
  const [selectedUEId, setSelectedUEId] = useState('');
  let [selectEC, setSelectEC] = useState();
  const [editedItem, setEditedItem] = useState({   
    id_ec: 0,
    nom_ec: '',
    semestre: '',
    et: 0,
    ed: 0,
    ep: 0,
    credit_ec: 0,
    poids_ec: 0,
  });

  //show delete confirmation
  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };
  //handling ec delete
  function handleDelete(itemId) {
    axios({
      method: 'delete',
      url: `http://localhost:3002/ec/delete/${itemId}`,
    })
    .then(() => {
      deleteMessage()
    })
    .catch(error => {
      console.error('EC : Erreur lors de la suppression de l\'élément :', error);
    });
  }
  //edit product item
  function EditEC(item) {
    setSelectedItem(item);
    showModal1();
  
    setEditedItem({
        id_ec: item.id_ec,
        nom_ec: item.nom_ec,
        semestre: item.semestre,
        et: item.et,
        ed: item.ed,
        ep: item.ep,
        credit_ec: item.credit_ec,
        poids_ec: item.poids_ec,
    });    
  }
  //handlign the form submit
  const handleSubmit = (e) => {
    setCreditError('')
    setPoidsError('')

    if (editedItem.credit_ec > 60) {
      setCreditError('Le credit doit être inferieur à 60 !');
    }

    if (editedItem.poids_ec > 1 || editedItem.poids_ec == 0) {
      setPoidsError('Le poids doit être strictement entre 0 à 1 !');
    }

    // e.preventDefault();
    if (editedItem) {
      if(editedItem.poids_ec <= 1 && editedItem.poids_ec != 0) {
        axios({
          method: 'patch',
          url: `http://localhost:3002/ec/edit/${editedItem.id_ec}`,
          data: editedItem,
        })
        .then(() => {
          setEditedItem({id_ec: '',nom_ec: '',semestre: '',et: '',ed: '',ep: '',credit_ec: '',poids_ec: '',id_ue: '', });
        })
        .catch((error) => {
          console.error('EditEC : Erreur lors du modification:', error);
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
      handleDelete(itemToDelete.id_ec);
      setIsDeleteModalVisible(false);
    }
  };
  //handlign delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  const handleCloseModalDetail = () => {
    setIsModalDetailOpen(false);
  };
  ///message
  const deleteMessage = () => {
    message.success("Suppression de l'element constitutif réussie !");
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

  //handle select change
  const handleSelectChange = (value) => {
    setSelectedUEId(value);
  };

  return (
    <div className='pb-5 pt-24'>
      <div className='px-10'>
        <div className='block sm:flex justify-between'>
          <div className='text-xl font-bold font-lato'>LES ELEMENTS CONSTUTITIFS</div>
          <div className='sm:block flex justify-end items-center'>
            <Input className='my-1 mx-1 w-52' placeholder="Saisir le nom de l'EC..." value={searchEC} onChange={(e) => setSearchEC(e.target.value)}  />
            <Button onClick={showModal} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
          </div>
        </div>
        <Modal title="AJOUTER UN ELEMENT CONSTUTITIF" open={isModalOpen} onCancel={handleCloseModal} footer={null} >
          <AddEC />
        </Modal>
        <div className='my-7'>    
          <div className='sm:block hidden'>                   
            <table className=' min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Element</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Semestre</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>ET</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>ED</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>EP</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Credit</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Poids</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Unité</th>
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
                ec && ec.map((element: any, index: any) =>{
                  if (searchEC && !element.nom_ec.includes(searchEC)) {
                    return null;
                  }
                  return(
                  <tr key={index}>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { element.nom_ec } </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { element.semestre } </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.et } </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900  text-center'> { element.ed } </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.ep } </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.credit_ec } </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.poids_ec } </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap text-sm leading-5 text-gray-900'> { element.id_ue } </td>
                    <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                      <div className='flex justify-center'>
                        <div  onClick={() => EditEC(element)}    className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div   onClick={() => showDeleteConfirmation(element)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
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
                isLoading ? (
                <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
                </div>
                  ) : (
                ec && ec.map((element, index) =>{
                  if (searchEC && !element.nom_ec.includes(searchEC)) {
                    return null;
                  }
                  return(
                  <Card  key={index} className='hover:scale-105 duration-300 bg-gray-50'>
                    <div className='text-center'>
                      <img src={Bg} />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                        { element.nom_ec }
                        </div>
                        <div className='text-xs flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            Semestre : 
                          </div>
                        { element.semestre }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            ET : 
                          </div>
                        { element.et } 
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            ED : 
                          </div>
                        { element.ed }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline'>
                            EP : 
                          </div>
                        { element.ep }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            Credit : 
                          </div>
                        { element.credit_ec }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            Poids : 
                          </div>
                        { element.poids_ec }
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <div  onClick={() => EditEC(element)}    className='mx-1 border border-black w-min px-2 py-1 rounded-full hover:bg-gray-300 hover:scale-105 hover:transition-all'> <EditOutlined/></div>
                        <div   onClick={() => showDeleteConfirmation(element)} className='border bg-red-500 border-black w-min px-2 py-1 rounded-full hover:bg-red-600  hover:scale-105 hover:transition-all'> <DeleteOutlined/></div>
                      </div>
                    </div>
                </Card>
                )
                })
              )
            }
          </div>
        </div>
        <Modal title="MODIFIER ELEMENT CONSTITUTIF" open={isModalOpen1} onCancel={handleCloseModal1} footer={null} >
          {selectedItem && 
            <div>
              <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
              <label htmlFor='nom_ec' >Nom de l'EC : </label> <br />
                <Input name='nom_ec' value={editedItem.nom_ec} onChange={handleInputChange}/>
                <label htmlFor='semestre' >Semestre : </label> <br />
                <Input name='semestre' value={editedItem.semestre} onChange={handleInputChange}/>
                <label htmlFor='et' >ET : </label> <br />
                <Input name='et' value={editedItem.et} onChange={handleInputChange} onKeyPress={handleNumberKeyPress} />
                <label htmlFor='ed' >ED : </label> <br />
                <Input name='ed' value={editedItem.ed} onChange={handleInputChange} onKeyPress={handleNumberKeyPress} />
                <label htmlFor='ep' >EP : </label> <br />
                <Input name='ep' value={editedItem.ep} onChange={handleInputChange} onKeyPress={handleNumberKeyPress} />
                <label htmlFor='credit_ec' >Credit de l'EC : </label> <br />
                <Input name='credit_ec' value={editedItem.credit_ec} onChange={handleInputChange} onKeyPress={handleFloatKeyPress} className={creditError ? 'border border-red-500' : '' }/>
                {creditError && <div className="text-red-500 text-xs">{creditError}</div>}
                <label htmlFor='poids_ec' >Poids de l'EC : </label> <br />
                <Input name='poids_ec' value={editedItem.poids_ec} onChange={handleInputChange} onKeyPress={handleFloatKeyPress} className={poidsError ? 'border border-red-500' : '' }/>
                {poidsError && <div className="text-red-500 text-xs">{poidsError}</div>}
                <label htmlFor='id_ue' >Unité : </label> <br />
                <Select
                  value={selectedUEId}
                  onChange={handleSelectChange}
                  className='w-full my-1'
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="">Sélectionnez une unité</Option>
                    {
                      ueLoading && <LoadingOutlined />
                    }
                    {
                      ues && ues.map((ue: any, index: any) => {
                        return(
                          <Option key={index} value={ue.id_ue}>
                            { `${ue.nom_ue} ${ue.credit_ue}` }
                          </Option>
                        )
                      })
                    }
                </Select>
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
            Êtes-vous sûr de vouloir supprimer cet element constitutif ?
            Cela pourrait entraînner des incohérences de données
          </div>
        </Modal>

        <Modal
            title="ELEMENT CONSTITUTIF"
            open={isModalDetailOpen} onCancel={handleCloseModalDetail} footer={null} 
          >
            {selectEC &&
              <div> 
                {
                  selectEC.map((ec, index) =>{
                    return(
                      <div key={index}>
                        <div className='flex justify-between'>
                          <div className='px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> ELEMENT  </div>
                          <div className='px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { ec.id_ec } </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
          </Modal>   
      </div>
    </div>
  )
}

export default EC;