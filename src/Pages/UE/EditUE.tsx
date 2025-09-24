import {  FunctionComponent, useEffect } from 'react'
import { useGetAllUE } from '@/hooks/useGetAllUE';
import { Controller, useForm } from 'react-hook-form';
import { EditUEType } from '@/types/UE';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditUEValidation } from '@/validation/ue.validation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { handleNumberKeyPress } from '@/utils/handleKeyPress';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoadingOutlined } from '@ant-design/icons';
import { useGetUEById } from '@/hooks/useGetUEById';
import { usePatchUE } from '@/hooks/usePatchUE';
import Navigation from '@/components/navigation/Navigation';

const EditUE: FunctionComponent = () => {
  const req = useParams();
  const UEId = Number(req.id);
  const { data: ue, isLoading, refetch } = useGetUEById(UEId ? UEId : 0)
  const { refetch: refetchUE } = useGetAllUE();
  const { mutateAsync: UEEdit, isPending: patchLoading } = usePatchUE({action() {
    refetchUE()
    refetch()
  },})
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<EditUEType>({
    resolver: yupResolver(EditUEValidation)
  })
  const navigate = useNavigate();

  useEffect(() => {
    setValue('id_ue', req.id ? req.id : '');
  }, [])

  const editUESubmit = (data: EditUEType) => {
    UEEdit(data);
    navigate('/admin/ue')
  }
    
  return (
    <div>
      <Navigation />
      <div className='pb-5 pt-24 bg-gray-100 min-h-screen'>
        <div className='text-3xl mx-auto w-max font-bold'>MODIFIER UNITE D'ENSEIGNEMENT</div>
        {
          isLoading && <LoadingOutlined className='text-3xl' />
        }  
        {
          ue &&
            <form className='p-7 mx-auto w-80 bg-white rounded mt-4' onSubmit={submit(editUESubmit)}>
              <Label htmlFor='nom_ue' className='mb-1'>Nom de l'UE : </Label>
              <Controller
                name='nom_ue'
                defaultValue={ue[0].nom_ue}
                control={control}
                render={({
                  field: { value, onChange }
                }) => (
                  <Input 
                    value={value} 
                    onChange={onChange} 
                    className={`${errors?.nom_ue && 'border border-red-500 text-red-500 rounded'}`}
                  />
                )}
              />
              {errors.nom_ue && <div className="text-red-500 text-xs w-full text-left">{errors?.nom_ue.message}</div>}
              <Label htmlFor='credit_ue' className='mb-1 mt-4'>Credit de l'UE : </Label>
              <Controller
                name='credit_ue'
                defaultValue={ue[0].credit_ue}
                control={control}
                render={({
                  field: { value, onChange }
                }) => (
                  <Input 
                    value={value} 
                    onChange={onChange} 
                    className={`${errors?.credit_ue && 'border border-red-500 text-red-500 rounded'}`}
                    onKeyPress={handleNumberKeyPress}
                  />
                )}
              />
              {errors.credit_ue && <div className="text-red-500 text-xs w-full text-left">{errors?.credit_ue.message}</div>}
              <div className='flex justify-center mt-4'>
                <Button 
                  variant={'primary'} 
                  type='submit'
                  disabled={patchLoading}
                  className={`w-full ${patchLoading && 'cursor-not-allowed'}`}
                >
                  { patchLoading && <LoadingOutlined /> }
                  MODIFIER
                </Button>
              </div>
            </form>
        }   
      </div>
    </div>
  );
}

export default EditUE