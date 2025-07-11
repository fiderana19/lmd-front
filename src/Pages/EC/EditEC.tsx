import { Select } from 'antd'
import {  FunctionComponent, useEffect } from 'react'
import { handleFloatKeyPress, handleNumberKeyPress } from '@/utils/handleKeyPress';
import { useGetAllUE } from '@/hooks/useGetAllUE';
import { LoadingOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditECValidation } from '../../validation/ec.validation';
import { useGetAllEC } from '@/hooks/useGetAllEC';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetECById } from '@/hooks/useGetECById';
import { usePatchEC } from '@/hooks/usePatchEC';
import { EditECType } from '@/types/EC';

const { Option } = Select;

const EditEC: FunctionComponent = () => {
  const req = useParams();
  const ECId = Number(req.id);
  const { data: ec, isLoading: ecLoading } = useGetECById(ECId ? ECId : 0);
  const { data: ues, isLoading: ueLoading } = useGetAllUE();
  const { refetch: refetchEC } = useGetAllEC();
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<EditECType>({
    resolver: yupResolver(EditECValidation),
  });
  const { mutateAsync: ECEdit, isPending: patchLoading } = usePatchEC({action() {
    refetchEC();
  },})
  const navigate = useNavigate();

  useEffect(() => {
    setValue('id_ec', (req.id ? req.id : ''))
  }, [])

  const ECSubmit = async (data: EditECType) => {
    ECEdit(data);
    navigate('/ec')
  }

  return (
    <div className='pb-5 pt-24 bg-gray-100 min-h-screen'>
      <div className='text-3xl mx-auto w-max font-bold'>MODIFIER UN ELEMENT CONSTITUTIF</div>
      {
        ecLoading && <div className='my-4 mx-auto w-max'>
          <LoadingOutlined className='text-4xl' />
        </div>
      }
      {
        ec && 
              <form className='p-7 mx-auto w-80 bg-white rounded mt-4' onSubmit={submit(ECSubmit)}>
                <Label htmlFor='nom_ec' className='mb-1' >Nom de l'element : </Label>
                <Controller 
                  name='nom_ec'
                  control={control}
                  defaultValue={ec ? ec[0].nom_ec : null}
                  render={({
                    field : { value, onChange }
                  }) => (
                    <Input value={value} onChange={onChange} className={`w-full`} />
                  )}
                />
                {errors?.id_ec && <div className="text-red-500 text-xs text-left w-full">{errors?.id_ec.message}</div>}
                {errors?.nom_ec && <div className="text-red-500 text-xs text-left w-full">{errors?.nom_ec.message}</div>}
                <Label htmlFor='semestre' className='mb-1 mt-4' >Semestre : </Label>
                <Controller 
                  name='semestre'
                  control={control}
                  defaultValue={ec ? ec[0].semestre : null}
                  render={({
                    field : { value, onChange }
                  }) => (
                    <Select   
                      value={value}
                      onChange={onChange}
                      showSearch
                      placeholder="Veuillez selectionner le semestre"
                      className={`w-full`}
                      optionFilterProp="children"
                      filterOption={(input: any, option: any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="Paire">Paire</Option>
                      <Option value="Impaire">Impaire</Option>
                    </Select>
                  )}
                />
                {errors?.semestre && <div className="text-red-500 text-xs text-left w-full">{errors?.semestre.message}</div>}
                <div className='flex justify-between gap-2 mt-4'>
                  <div>
                    <Label htmlFor='et' className='mb-1' >ET : </Label>
                    <Controller 
                      name='et'
                      control={control}
                      defaultValue={ec ? ec[0].et : null}
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
                      defaultValue={ec ? ec[0].ed : null}
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
                      defaultValue={ec ? ec[0].ep : null}
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
                      defaultValue={ec ? ec[0].credit_ec : null}
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
                      defaultValue={ec ? ec[0].poids_ec : null}
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
                  defaultValue={ec ? ec[0].id_ue : null}
                  render={({
                    field : { value, onChange }
                  }) => (
                    <Select   
                      value={value}
                      onChange={onChange}
                      showSearch
                      placeholder="Veuillez selectionner l'unité"
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
  );
}

export default EditEC