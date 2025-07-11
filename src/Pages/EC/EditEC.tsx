import { Select } from 'antd'
import {  FunctionComponent } from 'react'
import { handleFloatKeyPress, handleNumberKeyPress } from '@/utils/handleKeyPress';
import { useGetAllUE } from '@/hooks/useGetAllUE';
import { LoadingOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form'
import { CreateEC } from '@/types/EC';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateECValidation } from '../../validation/ec.validation';
import { usePostEC } from '@/hooks/usePostEC';
import { useGetAllEC } from '@/hooks/useGetAllEC';

const { Option } = Select;

const AddEC: FunctionComponent = () => {
  const { data: ues, isLoading: ueLoading } = useGetAllUE();
  const { refetch: refetchEC } = useGetAllEC();
  const { handleSubmit: submit, formState: { errors }, control } = useForm<CreateEC>({
    resolver: yupResolver(CreateECValidation),
  });
  const { mutateAsync: createEC, isPending: ecLoading } = usePostEC({action() {
    refetchEC();
  },})

  const ECSubmit = async (data: CreateEC) => {
    console.log(data)
    createEC(data);
  }

  return (
      <form className='sm:w-2/3 w-full my-4 mx-auto' onSubmit={submit(ECSubmit)}>
        <Label htmlFor='nom_ec' className='mb-1' >Nom de l'element : </Label>
        <Controller 
          name='nom_ec'
          control={control}
          render={({
            field : { value, onChange }
          }) => (
            <Input value={value} onChange={onChange} className={`w-full`} />
          )}
        />
        {errors?.nom_ec && <div className="text-red-500 text-xs text-left w-full">{errors?.nom_ec.message}</div>}
        <Label htmlFor='semestre' className='mb-1 mt-4' >Semestre : </Label>
        <Controller 
          name='semestre'
          control={control}
          render={({
            field : { value, onChange }
          }) => (
            <Input value={value} onChange={onChange}  className={`w-full`}/>
          )}
        />
        {errors?.semestre && <div className="text-red-500 text-xs text-left w-full">{errors?.semestre.message}</div>}
        <div className='flex justify-between gap-2 mt-4'>
          <div>
            <Label htmlFor='et' className='mb-1' >ET : </Label>
            <Controller 
              name='et'
              control={control}
              render={({
                field : { value, onChange }
              }) => (
                <Input value={value} onChange={onChange} onKeyPress={handleFloatKeyPress} className={`w-full`}/>
              )}
            />
            {errors?.et && <div className="text-red-500 text-xs text-left w-full">{errors?.et.message}</div>}
          </div>
          <div>
            <Label htmlFor='ed' className='mb-1' >ED : </Label>
            <Controller 
              name='ed'
              control={control}
              render={({
                field : { value, onChange }
              }) => (
                <Input value={value} onChange={onChange} onKeyPress={handleFloatKeyPress} className={`w-full`}/>
              )}
            />
            {errors?.ed && <div className="text-red-500 text-xs text-left w-full">{errors?.ed.message}</div>}
          </div>
          <div>
            <Label htmlFor='ep' className='mb-1'>EP : </Label>
            <Controller 
              name='ep'
              control={control}
              render={({
                field : { value, onChange }
              }) => (
                <Input value={value} onChange={onChange} onKeyPress={handleFloatKeyPress} className={`w-full`}/>
              )}
            />
            {errors?.ep && <div className="text-red-500 text-xs text-left w-full">{errors?.ep.message}</div>}
          </div>
        </div>
        <div className='flex justify-between gap-2 mt-4'>
          <div>
            <Label htmlFor='credit_ec' className='mb-1' >Credit de l'element : </Label>
            <Controller 
              name='credit_ec'
              control={control}
              render={({
                field : { value, onChange }
              }) => (
                <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress} className={`w-full`}/>
              )}
            />
            {errors?.credit_ec && <div className="text-red-500 text-xs text-left w-full">{errors?.credit_ec.message}</div>}
          </div>
          <div>
            <Label htmlFor='poids_ec' className='mb-1'>Poids de l'element : </Label>
            <Controller 
              name='poids_ec'
              control={control}
              render={({
                field : { value, onChange }
              }) => (
                <Input value={value} onChange={onChange} onKeyPress={handleFloatKeyPress} className={`w-full`}/>
              )}
            />
            {errors?.poids_ec && <div className="text-red-500 text-xs text-left w-full">{errors?.poids_ec.message}</div>}
          </div>
        </div>
        <Label htmlFor='id_ue' className='mb-1 mt-4'>Unité : </Label>
        <Controller 
          name='id_ue'
          control={control}
          render={({
            field : { value, onChange }
          }) => (
            <Select   
              value={value}
              onChange={onChange}
              showSearch
               className={`w-full`}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
                {
                  ueLoading && <Option value=""><LoadingOutlined /></Option>
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
          )}
        />        
        {errors?.id_ue && <div className="text-red-500 text-xs text-left w-full">{errors?.id_ue.message}</div>}
        <div className='flex justify-center mt-4'>
          <Button 
            variant={'success'} 
            type='submit'
            disabled={ecLoading}
            className={`${ecLoading && 'cursor-not-allowed'}`}
          >
            { ecLoading && <LoadingOutlined /> }
            AJOUTER
          </Button>
        </div>
      </form>
  );
}

export default AddEC