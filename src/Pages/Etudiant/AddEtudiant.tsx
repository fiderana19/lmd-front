import { Input, DatePicker , message  } from 'antd'
import React, {  FunctionComponent, useState } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';

const AddEtudiant: FunctionComponent = () => {
  const [formData, setFormData] = useState({ matricule: "", nom: "", prenom: "", date_naiss: "", lieu_naiss: ""});
  const [dateError, setDateError] = useState('');

  //handling the form submit
  const handleSubmit = async (e: any) => {
    setDateError('')

    if(formData.date_naiss == '' ) {
      setDateError("Vous devez entrer une date de naissance ! ")
      e.preventDefault()
    }
    if(formData.date_naiss != ''){
      try {
        const response  = await  axios({
          method: 'post',
          url: 'http://localhost:3002/etudiant/create',
          data: formData,
        });
        successMessage()
      } catch (error) {
        errorMessage()
        console.error("AddEtudiant : Erreur d'ajout de l'etudiant : " + error);
      }
    }
  }
  //handling the input change
  const handleChange = async (e: any) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }
  //handling the date change
  const handleDateChange = (date: any, dateString: any) => {
    if (date) {
      const formatedDate = dayjs(dateString).format('YYYY-MM-DD')
      setFormData({
        ...formData,
        date_naiss: formatedDate,
      });
    }
  };
  //success message 
  const successMessage = () => {
    message.success('Etudiant ajouté avec succés !');
  };
  //error message 
  const errorMessage = () => {
    message.error("Echec de l'ajout de l'etudiant !");
  };
  
  return (
    <div>
      <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={handleSubmit} >
        <label htmlFor='matricule' >Matricule : </label> <br />
        <Input name='matricule' value={formData.matricule} onChange={handleChange} required/>
        <label htmlFor='nom' >Nom : </label> <br />
        <Input name='nom' value={formData.nom} onChange={handleChange} required/>
        <label htmlFor='prenom' >Prenom : </label> <br />
        <Input name='prenom' value={formData.prenom} onChange={handleChange}/>
        <label htmlFor='date_naiss' >Date de naissance : </label> <br />
        <DatePicker onChange={handleDateChange}  className={dateError ? 'border border-red-500 w-full' : 'w-full' } showTime format="YYYY-MM-DD" required />
        {dateError && <div className="text-red-500 text-xs">{dateError}</div>}
        <label htmlFor='lieu_naiss' >Lieu de naissance : </label> <br />
        <Input name='lieu_naiss' value={formData.lieu_naiss} onChange={handleChange} required />
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
    </div>
  );
}

export default AddEtudiant