import React, {  FunctionComponent, useState } from 'react'
import { useGetAllNiveau } from '@/hooks/useGetAllNiveau';
import { usePostNiveau } from '@/hooks/usePostNiveau';
import { Controller, useForm } from 'react-hook-form';
import { CreateNiveauType } from '@/types/Niveau';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateNiveauValidation } from '@/validation/niveau.validation';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import Navigation from '@/components/navigation/Navigation';

const AddNiveau: FunctionComponent = () => {
  const { refetch: refetchNiveau } = useGetAllNiveau();
  const { mutateAsync: createNiveau, isPending: createLoading } = usePostNiveau({action() {
    refetchNiveau()
  },})
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateNiveauType>({
    resolver: yupResolver(CreateNiveauValidation)
  })
  const navigate = useNavigate();

  const createNiveauSubmit = (data: CreateNiveauType) => {
    createNiveau(data);
    navigate('/niveau')
  }

  return (
    <div>
      <Navigation />
      <div className='pb-5 pt-24 bg-gray-100 min-h-screen'>
          <div className='text-3xl mx-auto w-max font-bold'>NOUVEAU NIVEAU</div>
          <form className='p-7 mx-auto w-80 bg-white rounded mt-4' onSubmit={submit(createNiveauSubmit)}>
            <Label htmlFor='titre_niveau' className='mb-1'>Titre : </Label>
            <Controller 
              control={control}
              name='titre_niveau'
              render={({
                field: { value, onChange }
              }) => (
                <Input 
                  value={value} 
                  onChange={onChange} 
                  className={`${errors.titre_niveau && 'border border-red-500 text-red-500 rounded'}`}
                  />
              )}
            />
            {errors.titre_niveau && <div className="text-red-500 text-xs w-full">{ errors.titre_niveau.message }</div>}
            <Label htmlFor='descri_niveau' className='mt-4 mb-1'>Description : </Label>
            <Controller 
              control={control}
              name='descri_niveau'
              render={({
                field: { value, onChange }
              }) => (
                <Input 
                  value={value} 
                  onChange={onChange} 
                  className={`${errors.descri_niveau && 'border border-red-500 text-red-500 rounded'}`}
                  />
              )}
            />
            {errors.descri_niveau && <div className="text-red-500 text-xs w-full">{ errors.descri_niveau.message }</div>}
            <Label htmlFor='domaine' className='mt-4 mb-1'>Domaine : </Label>
            <Controller 
              control={control}
              name='domaine'
              render={({
                field: { value, onChange }
              }) => (
                <Input 
                  value={value} 
                  onChange={onChange} 
                  className={`${errors.domaine && 'border border-red-500 text-red-500 rounded'}`}
                  />
              )}
            />
            {errors.domaine && <div className="text-red-500 text-xs w-full">{ errors.domaine.message }</div>}
            <Label htmlFor='mention' className='mt-4 mb-1'>Mention : </Label>
            <Controller 
              control={control}
              name='mention'
              render={({
                field: { value, onChange }
              }) => (
                <Input 
                  value={value} 
                  onChange={onChange} 
                  className={`${errors.mention && 'border border-red-500 text-red-500 rounded'}`}
                  />
              )}
            />
            {errors.mention && <div className="text-red-500 text-xs w-full">{ errors.mention.message }</div>}
            <Label htmlFor='parcours' className='mt-4 mb-1'>Parcours : </Label>
            <Controller 
              control={control}
              name='parcours'
              render={({
                field: { value, onChange }
              }) => (
                <Input 
                  value={value} 
                  onChange={onChange} 
                  className={`${errors.parcours && 'border border-red-500 text-red-500 rounded'}`}
                  />
              )}
            />
            {errors.parcours && <div className="text-red-500 text-xs w-full">{ errors.parcours.message }</div>}
            <div className='flex justify-center mt-4'>
              <Button
                variant={'success'}
                type='submit'
                disabled={createLoading}
                className={`${createLoading && 'cursor-not-allowed'}`}
              >
                { createLoading && <LoadingOutlined /> }
                AJOUTER
              </Button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default AddNiveau