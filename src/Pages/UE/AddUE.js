import { Input , message  } from 'antd'
import React, {  useState } from 'react'
import axios from 'axios';

const AddUE = () => {
  const [creditError, setCreditError] = useState('');
  const [formData, setFormData] = useState({ nom_ue: "", credit_ue: 0});
  //handling the form submit
  const handleSubmit = async (e) => {
    setCreditError('')

    if (formData.credit_ue > 60) {
      setCreditError('Le credit doit être inferieur à 60 !');
    }

    if(formData.credit_ue <= 60) {
      try {
        const response  = await  axios({
          method: 'post',
          url: 'http://localhost:3002/ue/create',
          data: formData,
        });
        successMessage()
      } catch (error) {
        errorMessage()
        console.error("AddUE : Erreur d'ajout de l'UE : " + error);
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
  //handling the key press
  const handleKeyPress =async (e) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }
  //success message 
  const successMessage = () => {
    message.success("Unité d'enseignement ajouté avec succés !");
  };
  //error message 
  const errorMessage = () => {
    message.error("Echec de l'ajout de l'unité d'enseignement !");
  };
    
  return (
    <div>
      <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
        <label htmlFor='nom_ue' >Nom de l'UE : </label> <br />
        <Input name='nom_ue' value={formData.nom_ue} onChange={handleChange} required/>
        <label htmlFor='credit_ue' >Credit de l'UE : </label> <br />
        <Input name='credit_ue' value={formData.credit_ue} onChange={handleChange} onKeyPress={handleKeyPress} required  className={creditError ? 'border border-red-500' : '' } />
        {creditError && <div className="text-red-500 text-xs">{creditError}</div>}
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
    </div>
  );
}

export default AddUE