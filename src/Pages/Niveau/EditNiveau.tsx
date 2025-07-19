import {  FunctionComponent, useEffect } from 'react'
import { useGetAllNiveau } from '@/hooks/useGetAllNiveau';
import { Controller, useForm } from 'react-hook-form';
import { EditNiveauType } from '@/types/Niveau';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useGetNiveauById } from '@/hooks/useGetNiveauById';
import { usePatchNiveau } from '@/hooks/usePatchNiveau';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditNiveauValidation } from '@/validation/niveau.validation';

const EditNiveau: FunctionComponent = () => {
  const req = useParams();
  const NiveauId = Number(req.id);
  const { data: niveau, isLoading: niveauLoading, refetch } = useGetNiveauById(NiveauId ? NiveauId : 0);
  const { refetch: refetchNiveau } = useGetAllNiveau();
  const { mutateAsync: NiveauEdit, isPending: patchLoading } = usePatchNiveau({action() {
    refetchNiveau();
    refetch();
  },})
  const { handleSubmit: submit, formState: { errors }, control , setValue } = useForm<EditNiveauType>({
    resolver: yupResolver(EditNiveauValidation)
  })
  const navigate = useNavigate();
  
  useEffect(() => {
    setValue('id_niveau', req.id ? req.id : '')
  }, [])

  const editNiveauSubmit = (data: EditNiveauType) => {
    NiveauEdit(data)
    navigate('/niveau')
  }

  return (
  <div className='pb-5 pt-24 bg-gray-100 min-h-screen'>
      <div className='text-3xl mx-auto w-max font-bold'>MODIFIER NIVEAU</div>
      {
        niveauLoading && <LoadingOutlined className='text-3xl' />
      }      
      {
        niveau && 
          <form className='p-7 mx-auto w-80 bg-white rounded mt-4' onSubmit={submit(editNiveauSubmit)}>
            <Label htmlFor='titre_niveau' className='mb-1'>Titre : </Label>
            <Controller 
              control={control}
              name='titre_niveau'
              defaultValue={niveau[0].titre_niveau}
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
              defaultValue={niveau[0].descri_niveau}
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
              defaultValue={niveau[0].domaine}
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
              defaultValue={niveau[0].mention}
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
              defaultValue={niveau[0].parcours}
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
                variant={'primary'}
                type='submit'
                disabled={patchLoading}
                className={`${patchLoading && 'cursor-not-allowed'}`}
              >
                { patchLoading && <LoadingOutlined /> }
                MODIFIER
              </Button>
            </div>
          </form>
      }
    </div>
  );
}

export default EditNiveau