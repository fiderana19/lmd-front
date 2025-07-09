import { Input , message  } from 'antd'
import React, {  FunctionComponent, useState } from 'react'
import axios from 'axios';

const AddNiveau: FunctionComponent = () => {
  const [formData, setFormData] = useState({ titre_niveau: "", descri_niveau: "", domaine: "", mention: "", parcours: ""});
  //handling the form submit
  const handleSubmit = async (e: any) => {
    try {
      const response  = await  axios({
        method: 'post',
        url: 'http://localhost:3002/niveau/create',
        data: formData,
      });
      successMessage()
    } catch (error) {
      errorMessage()
      console.error("AddNiveau : Erreur d'ajout du niveau : " + error);
    }
  }
  //handling the input change
  const handleChange = async (e: any) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }
  //success message 
  const successMessage = () => {
    message.success('Niveau ajouté avec succés !');
  };
  //error message 
  const errorMessage = () => {
    message.error("Echec de l'ajout du niveau !");
  };

  return (
    <div>
      <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit}>
        <label htmlFor='titre_niveau' >Titre : </label> <br />
        <Input name='titre_niveau' value={formData.titre_niveau} onChange={handleChange} required />
        <label htmlFor='descri_niveau' >Description : </label> <br />
        <Input name='descri_niveau' value={formData.domaine} onChange={handleChange} required />
        <label htmlFor='domaine' >Domaine : </label> <br />
        <Input name='domaine' value={formData.domaine} onChange={handleChange} required/>
        <label htmlFor='mention' >Mention : </label> <br />
        <Input name='mention' value={formData.mention} onChange={handleChange} required/>
        <label htmlFor='parcours' >Parcours : </label> <br />
        <Input name='parcours' value={formData.parcours} onChange={handleChange} required/>
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
    </div>
  );
}

export default AddNiveau