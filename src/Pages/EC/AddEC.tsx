import { Input, Select , message  } from 'antd'
import React, {  useState, useEffect, FunctionComponent } from 'react'
import axios from 'axios';
import { Option } from 'antd/es/mentions';
import { handleFloatKeyPress, handleNumberKeyPress } from '@/utils/handleKeyPress';
import { useGetAllUE } from '@/hooks/useGetAllUE';
import { LoadingOutlined } from '@ant-design/icons';

const AddEC: FunctionComponent = () => {
  const { data: ues, isLoading: ueLoading, refetch } = useGetAllUE();
  const [selectedUEId, setSelectedUEId] = useState('');
  const [creditError, setCreditError] = useState('');
  const [poidsError, setPoidsError] = useState('');
  const [uniteError, setUniteError] = useState('');
  const [formData, setFormData] = useState({ nom_ec: "", semestre: "", et: 0, ed: 0, ep: 0, credit_ec: 0, poids_ec: 0 , id_ue: ""});

  //handling the form submit
  const handleSubmit = async (e) => {
    setCreditError('')
    setPoidsError('')
    setUniteError('')

    if (formData.credit_ec > 60) {
      setCreditError('Le credit doit être inferieur à 60 !');
    }
    if(formData.id_ue == '' ) {
      setUniteError("Vous devez selectionner un unité ! ")
    }
    if (formData.poids_ec > 1 || formData.poids_ec == 0) {
      setPoidsError('Le poids doit être strictement entre 0 à 1 !');
    }

    if(selectedUEId) {
      if(formData.credit_ec <= 60 && formData.poids_ec <= 1 && formData.poids_ec != 0) {
        try {
          const response  = await  axios({
            method: 'post',
            url: 'http://localhost:3002/ec/create/',
            data: formData,
          });
          successMessage()
        } catch (error) {
          errorMessage()
          console.error("AddEC : Erreur d'ajout de l'element : " + error);
        }
      }
      else {
        e.preventDefault()
      }
    }  
    else {
      e.preventDefault()
    }  
  }
  //handling the input change
  const handleChange = async (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }

  //handle select change
  const handleSelectChange = (value) => {
    setSelectedUEId(value);
    setFormData({
      ...formData,
      id_ue: value,
    });
  };
  //success message 
  const successMessage = () => {
    message.success('Element constitutif ajouté avec succés !');
  };
  //error message 
  const errorMessage = () => {
    message.error("Echec de l'ajout de l'element constitutif !");
  };
    
  return (
    <div>
      <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
        <label htmlFor='nom_ec' >Nom de l'element : </label> <br />
        <Input name='nom_ec' value={formData.nom_ec} onChange={handleChange} required/>
        <label htmlFor='semestre' >Semestre : </label> <br />
        <Input name='semestre' value={formData.semestre} onChange={handleChange} required/>
        <label htmlFor='et' >ET : </label> <br />
        <Input name='et' value={formData.et} onChange={handleChange} onKeyPress={handleNumberKeyPress} required />
        <label htmlFor='ed' >ED : </label> <br />
        <Input name='ed' value={formData.ed} onChange={handleChange} onKeyPress={handleNumberKeyPress} required />
        <label htmlFor='ep' >EP : </label> <br />
        <Input name='ep' value={formData.ep} onChange={handleChange} onKeyPress={handleNumberKeyPress} required />
        <label htmlFor='credit_ec' >Credit de l'element : </label> <br />
        <Input name='credit_ec' value={formData.credit_ec} onChange={handleChange} onKeyPress={handleFloatKeyPress} required className={creditError ? 'border border-red-500' : '' } />
        {creditError && <div className="text-red-500 text-xs">{creditError}</div>}
        <label htmlFor='poids_ec' >Poids de l'element : </label> <br />
        <Input name='poids_ec' value={formData.poids_ec} onChange={handleChange} onKeyPress={handleFloatKeyPress} required className={poidsError ? 'border border-red-500' : '' }  />
        {poidsError && <div className="text-red-500 text-xs">{poidsError}</div>}
        <label htmlFor='id_ue' >Unité : </label> <br />
        <Select
          value={selectedUEId}
          onChange={handleSelectChange}
          className={uniteError ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
          showSearch
          optionFilterProp="children"
          filterOption={(input: any, option: any) =>
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
                    { `${ue.nom_ue} - ${ue.credit_ue}` }
                  </Option>
                )
              })
            }
        </Select>
        {uniteError && <div className="text-red-500 text-xs">{uniteError}</div>}
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
    </div>
  );
}

export default AddEC