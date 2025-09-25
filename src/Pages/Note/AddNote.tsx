import { Select  } from 'antd'
import { Option } from 'antd/es/mentions';
import {  FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { handleFloatKeyPress } from '@/utils/handleKeyPress';
import { useGetAllEtudiant } from '@/hooks/useGetAllEtudiant';
import { useGetAllNiveau } from '@/hooks/useGetAllNiveau';
import { useGetAllEC } from '@/hooks/useGetAllEC';
import { LoadingOutlined } from '@ant-design/icons';
import { useGetAllAnnee } from '@/hooks/useGetAllAnnee';
import { Controller, useForm } from 'react-hook-form';
import { CreateNote } from '@/types/Note';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateNoteValidation } from '@/validation/note.validation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePostNote } from '@/hooks/usePostNote';
import { useGetAllNote } from '@/hooks/useGetAllNote';

const AddNote: FunctionComponent = () => {
  const { data: etudiants, isLoading: etudiantLoading } = useGetAllEtudiant();
  const { data: niveaux, isLoading: niveauLoading } = useGetAllNiveau();
  const { data: ecs, isLoading: ecLoading } = useGetAllEC(); 
  const { data: annee, isLoading: anneeLoading } = useGetAllAnnee(); 
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateNote>({
    resolver: yupResolver(CreateNoteValidation)
  });
  const { refetch: refetchNote } = useGetAllNote();
  const { mutateAsync: createNote, isPending: createLoading } = usePostNote({action() {
    refetchNote();
  },})

  const handleSubmit = async (data: CreateNote) => {
    await createNote(data);
  };

  return (
    <div>
      <div>
        <form className='sm:w-2/3 w-full my-7 mx-auto' onSubmit={submit(handleSubmit)}>
          <Label htmlFor='valeur' className='mb-1'>Note : </Label>
          <Controller 
            name='valeur'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input 
                value={value} 
                onChange={onChange} 
                onKeyPress={handleFloatKeyPress}  
                className={errors?.valeur ? 'border border-red-500' : '' }
              />
            )}
          />
          {errors?.valeur && <div className="text-red-500 text-xs">{errors?.valeur?.message}</div>}
          <Label htmlFor='id_etudiant' className='mb-1 mt-2'>Etudiant : </Label>
          <Controller 
            name='id_etudiant'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
              value={value}
              onChange={onChange}
              className={errors?.id_etudiant ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Sélectionnez un etudiant</Option>
                {
                  etudiantLoading && <LoadingOutlined />
                }
                {
                  etudiants && etudiants.map((et: any, index: any) => {
                    return(
                      <Option key={index} value={et.id_etudiant}>
                        { `${et.matricule} -  ${et.nom} ${et.prenom}` }
                      </Option>
                    )
                  })
                }
            </Select>
            )}
          />
          {errors?.id_etudiant && <div className="text-red-500 text-xs">{errors?.id_etudiant?.message}</div>}
          <Label htmlFor='id_niveau' className='mb-1 mt-2'>Niveau : </Label>
          <Controller 
            name='id_niveau'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
              value={value}
              onChange={onChange}
              className={errors?.id_niveau ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Sélectionnez un niveau</Option>
              {
                niveauLoading && <LoadingOutlined />
              }
              {
                niveaux && niveaux.map((niv: any, index: any) => {
                  return(
                    <Option key={index} value={niv.id_niveau}>
                      { `${niv.titre_niveau} -  ${niv.parcours}` }
                    </Option>
                  )
                })
              }
            </Select>
            )}
          />
          {errors?.id_niveau && <div className="text-red-500 text-xs">{errors?.id_niveau?.message}</div>}
          <Label htmlFor='id_ec' className='mb-1 mt-2'>Element Constitutif : </Label>
          <Controller 
            name='id_ec'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
              value={value}
              onChange={onChange}
              className={errors?.id_ec ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Sélectionnez un element</Option>
              {
                ecLoading && <LoadingOutlined />
              }
              {
                ecs && ecs.map((element: any, index: any) => {
                  return(
                    <Option key={index} value={element.id_ec}>
                      { `${element.nom_ec} -  ${element.id_ue}` }
                    </Option>
                  )
                })
              }
            </Select>
            )}
          />
          {errors?.id_ec && <div className="text-red-500 text-xs">{errors?.id_ec?.message}</div>}
          <Label htmlFor='id_annee' className='mb-1 mt-2'>Année universitaire : </Label>
          <Controller 
            name='id_annee'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
              value={value}
              onChange={onChange}
              className={errors?.id_annee ? 'border w-full my-1 border-red-500' : 'w-full my-1' }
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Sélectionnez une année</Option>
                {
                  anneeLoading && <LoadingOutlined />
                }              
                {
                annee && annee.map((ann: any, index: any) => {
                  return(
                    <Option key={index} value={ann.id_annee}>
                      { `${ann.id_annee}` }
                    </Option>
                  )
                })
              }
            </Select>
            )}
          />
          {errors?.id_annee && <div className="text-red-500 text-xs">{errors?.id_annee?.message}</div>}
          <div className='flex justify-center my-3'>
            <Button variant={'success'} type='submit'>
              {
                createLoading && <LoadingOutlined />
              }
              Ajouter
            </Button>
          </div>
        </form>
        <Link to='/addnote' className='flex justify-center'>
          <Button variant={'link'} type='submit'>
            Faire un ajout global
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AddNote