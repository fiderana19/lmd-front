import { useState, FunctionComponent } from 'react'
import { Select } from 'antd'
import { FileOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import Navigation from '@/components/navigation/Navigation';
import { useGetAllAnnee } from '@/hooks/useGetAllAnnee';
import { useGetAllNiveau } from '@/hooks/useGetAllNiveau';
import { ResultCritere } from '@/constants/Critere';
import { Controller, useForm } from 'react-hook-form';
import { ResultNiveauSearch } from '@/types/Note';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResultNiveauSearchValidation } from '@/validation/note.validation';
import { usePostResultNiveauInfo } from '@/hooks/usePostResultNiveauInfo';
import { usePostResultNiveauFinal } from '@/hooks/usePostResultNiveauFinal';
import { Button } from '@/components/ui/button';
import { transformLetter } from '@/utils/Format';

const ResultatParNiveau: FunctionComponent = () => {
  const { data: annee } = useGetAllAnnee();
  const { data: niveau } = useGetAllNiveau();
  const [isView, setIsView] = useState<boolean>(false);
  const { handleSubmit: search, formState: { errors }, control } = useForm<ResultNiveauSearch>({
    resolver: yupResolver(ResultNiveauSearchValidation)
  });
  const { mutateAsync: getResultInfo } = usePostResultNiveauInfo();
  const { mutateAsync: getResultFinal } = usePostResultNiveauFinal();

  const [resultFinal, setResultFinal] = useState<any>();
  const [resultInfo, setResultInfo] = useState<any>();
  const [selectedAnneeId, setSelectedAnneeId] = useState<string>(''); 
  const [selectedCritere, setSelectedCritere] = useState<string>(''); 
  const [selectedNiveauId, setSelectedNiveauId] = useState<number>();

  const handleSubmit = async (data: ResultNiveauSearch) => {
    const i = await getResultInfo(data);
    setResultInfo(i?.data[0]);
    const f = await getResultFinal(data);
    setResultFinal(f?.data);

    setIsView(true)

    setSelectedAnneeId(data?.id_annee);
    setSelectedNiveauId(data?.id_niveau);
    setSelectedCritere(data?.obs)
  }

  return (
    <div>
      <Navigation />
      <div className='pb-5 pt-24'>
        <div className='lg:px-5 px-1'>
          <div className='mb-10'>
            <div className='text-xl text-center font-bold font-lato'>RECHERCHER RESULTAT D'UN NIVEAU</div>
              <form onSubmit={search(handleSubmit)} className='lg:flex block lg:justify-end text-center items-center mt-2'>
                <div className='mx-1'>
                  <Controller 
                    control={control}
                    name='id_niveau'
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        onChange={onChange}
                        className={errors?.id_niveau ? 'border  md:w-56 w-full my-1 border-red-500' : 'md:w-56 w-full my-1' }
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="">Sélectionnez un niveau</Option>
                        {
                          niveau && niveau.map((niv: any, index: any) => {
                            return(
                              <Option key={index} value={niv.id_niveau}>
                                { `${niv.titre_niveau} ${niv.parcours}` }
                              </Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  />
                  {errors?.id_niveau && <div className="text-red-500 text-xs">{errors?.id_niveau.message}</div>}
                </div>
                <div className='mx-1'>
                  <Controller 
                    control={control}
                    name='id_annee'
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        onChange={onChange}
                        className={errors?.id_annee ? 'border md:w-56 w-full my-1 border-red-500' : 'md:w-56 w-full my-1' }
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="">Sélectionnez une année</Option>
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
                </div>
                <div className='mx-1'>
                  <Controller 
                    control={control}
                    name='obs'
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        onChange={onChange}
                        className={errors?.obs ? 'border md:w-56 w-full my-1 border-red-500' : 'md:w-56 w-full my-1' }
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="">Sélectionnez une critere</Option>
                        {
                          ResultCritere.map((ann, index: any) => {
                            return(
                              <Option key={index} value={ann}>
                                { `${ann}` }
                              </Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  />
                  {errors?.obs && <div className="text-red-500 text-xs">{errors?.obs?.message}</div>}
                </div>
                <div className='md:block flex justify-center mx-1'>
                  <Button type='submit'>Rechercher</Button>
                </div>
              </form>
            </div>
            {isView && 
              <div>
                <div className='text-xl text-center font-bold font-lato my-6'>RESULTAT</div>
                {
                  resultInfo &&
                  <div className='font-lato'>
                    <div className='flex'>
                      <div className='font-bold underline mr-2'> Domaine:</div> <div> { resultInfo.domaine } </div>
                      </div>
                    <div className='flex'>
                      <div className='font-bold underline mr-2'> Mention: </div>
                      <div> { resultInfo?.mention } </div>
                    </div>
                    <div className='flex'>
                      <div className='font-bold underline mr-2'> Parcours:</div>
                      <div> { resultInfo?.parcours }</div>
                    </div>
                    <div className='flex'>
                      <div className='font-bold underline mr-2'> Niveau:</div>
                      <div> { resultInfo?.titre_niveau }</div>
                    </div>
                    <div className='text-right'>Année universitaire: { resultInfo.id_annee }</div>
                  </div>
                }
                <div className=''>
                  <table className=' min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr>
                        <th className='sm:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                        <th className='sm:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom</th>
                        <th className='sm:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Resultat</th>
                      </tr>
                    </thead> 
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {
                        resultFinal &&
                        resultFinal.map((final: any, index: any) => {
                          return(
                          <tr key={index} >
                            <td className='sm:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { final.matricule } </td>
                            <td className='sm:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { final.nom } { final.prenom }  </td>
                            <td className='sm:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { final.final }</td>
                          </tr>)
                        })
                      }
                    </tbody>
                  </table>
                </div>
                <div className='flex justify-end my-10'>
                  <a href={`/admin/resultat/pdf/${selectedCritere}/${selectedNiveauId}/${transformLetter(selectedAnneeId)}`} target='_blank'>
                    <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'> <FileOutlined /> GENERER LE RESULTAT </button>
                  </a>
                </div>
              </div>
            }
          </div>
      </div>
    </div>
  )
}

export default ResultatParNiveau;