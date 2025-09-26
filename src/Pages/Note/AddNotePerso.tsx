import { Select  } from 'antd'
import { Option } from 'antd/es/mentions';
import {  FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation';
import { useGetAllNiveau } from '@/hooks/useGetAllNiveau';
import { useGetAllEC } from '@/hooks/useGetAllEC';
import { useGetAllAnnee } from '@/hooks/useGetAllAnnee';
import { Controller, useForm } from 'react-hook-form';
import { CreateGlobalNote } from '@/types/Note';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateGlobalNoteValidation } from '../../validation/note.validation';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LoadingOutlined } from '@ant-design/icons';
import { transformLetter } from '@/utils/Format';

const AddNotePerso: FunctionComponent = () => { 
  const { data: niveau, isLoading: niveauLoading } = useGetAllNiveau();
  const { data: ec, isLoading: ecLoading } = useGetAllEC();
  const { data: annee, isLoading: anneeLoading } = useGetAllAnnee();
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateGlobalNote>({
    resolver: yupResolver(CreateGlobalNoteValidation)
  })
  const navigate = useNavigate()

  const handleSubmit = (data: CreateGlobalNote) => {
    navigate(`/admin/addglobal/note/${data?.ec}/${data?.niveau}/${transformLetter(data?.annee)}`)
  };
    
  return (
    <div>
      <Navigation />
      <div className='md:w-1/3 w-4/5 mx-auto pb-5 pt-24'>
        <h1 className='text-xl font-bold font-lato text-center my-5'>AJOUT GLOBAL DES NOTES</h1>
        <form onSubmit={submit(handleSubmit)}>
          <Label htmlFor='niveau' className='mb-1'>Niveau : </Label>
          <Controller 
            control={control}
            name='niveau'
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                className={errors?.niveau ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Sélectionnez un niveau</Option>
                { niveauLoading && <Option value=""><LoadingOutlined /></Option>}
                { niveau && niveau.map((niv: any, index: any) => {
                  return(
                    <Option key={index} value={niv.id_niveau}>
                      { `${niv.titre_niveau} -  ${niv.parcours}` }
                    </Option>
                  )
                })}
              </Select>
            )}
          />
          {errors?.niveau && <div className="text-red-500 text-xs">{errors?.niveau?.message}</div>}
          <Label htmlFor='ec' className='mb-1 mt-4'>Element Constitutif : </Label>
          <Controller 
            control={control}
            name='ec'
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                className={errors?.ec ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Sélectionnez un element</Option>
                { ecLoading && <Option value=""><LoadingOutlined /></Option>}
                { ec && ec.map((element: any, index: any) => {
                  return(
                    <Option key={index} value={element.id_ec}>
                      { `${element.nom_ec} -  ${element.id_ue}` }
                    </Option>
                  )
                })}
              </Select>
            )}
          />
          {errors?.ec && <div className="text-red-500 text-xs">{errors?.ec?.message}</div>}
          <Label htmlFor='annee' className='mb-1 mt-4'>Année universitaire : </Label>
          <Controller 
            control={control}
            name='annee'
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                className={errors?.annee ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="">Sélectionnez une année</Option>
                { anneeLoading && <Option value=""><LoadingOutlined /></Option>}
                { annee && annee.map((ann: any, index: any) => {
                  return(
                    <Option key={index} value={ann.id_annee}>
                      { `${ann.id_annee}` }
                    </Option>
                  )
                })}
              </Select>
            )}
          />
          {errors?.annee && <div className="text-red-500 text-xs">{errors?.annee?.message}</div>}
          <div className='flex justify-end my-4 gap-1'>
            <Button variant={'secondary'}>
              <Link to='/admin/note'>Retour</Link>
            </Button>
            <Button type='submit'>
                Suivant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotePerso