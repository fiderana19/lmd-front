import { useState, FunctionComponent, useEffect } from 'react'
import { Card } from 'antd'
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import Bg from '../../assets/pic/home-bg.jpg'
import { useGetAllEC } from '@/hooks/useGetAllEC';
import { useDeleteEC } from '@/hooks/useDeleteEC';
import { AlertDialog,AlertDialogAction,AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EC: FunctionComponent = () => {
  const { data: ecs, isLoading: ECSLoading, refetch: refectchEC } = useGetAllEC();
  const { mutateAsync: deleteEC, isPending: deleteLoading } = useDeleteEC({action() {
    refectchEC();
  },})
  const [searchEC, setSearchEC] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(ecs)
  }, [])
  
  function handleDelete(id: number) {
    console.log(id)
    deleteEC(id);
  }

  return (
    <div className='pb-5 pt-24'>
      <div className='px-10'>
        <div className='block sm:flex justify-between'>
          <div className='text-xl font-bold font-lato'>LES ELEMENTS CONSTUTITIFS</div>
          <div className='flex justify-end items-center gap-1.5'>
            <Input className='w-52' placeholder="Saisir le nom de l'EC..." value={searchEC} onChange={(e) => setSearchEC(e.target.value)}  />
            <Button onClick={() => navigate("/ec/create")} >AJOUTER</Button>
          </div>
        </div>
        <div className='my-7'>    
          <div className='sm:block hidden'>                   
            <table className=' min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Element</th>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Semestre</th>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>ET</th>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>ED</th>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>EP</th>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Credit</th>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Poids</th>
                  <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Unité</th>
                  <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                </tr>
              </thead> 
              <tbody className='bg-white divide-y divide-gray-200'>
                {
                  ecs && ecs.map((element: any, index: any) =>{
                    if (searchEC && !element.nom_ec.includes(searchEC)) {
                      return null;
                    }
                    return(
                    <tr key={index}>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { element.nom_ec } </td>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { element.semestre } </td>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.et } </td>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900  text-center'> { element.ed } </td>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.ep } </td>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.credit_ec } </td>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 text-center'> { element.poids_ec } </td>
                      <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap text-sm leading-5 text-gray-900'> { element.id_ue } </td>
                      <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                        <div className='flex justify-center gap-1'>
                          <Button 
                            size={'icon'}
                            onClick={() => navigate(`/ec/edit/${element.id_ec}`)} 
                          >
                            <EditOutlined />
                          </Button>
                          <AlertDialog>
                              <AlertDialogTrigger><Button variant={'destructive'} size={'icon'}><DeleteOutlined/></Button></AlertDialogTrigger>
                              <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Suppression d'un element constitutif</AlertDialogTitle>
                                  <AlertDialogDescription>
                                  Voulez-vous vraiment supprimer cet element ?
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className='m-0 p-0'>
                                    <Button 
                                      onClick={() => handleDelete(element.id_ec)} 
                                      variant={'destructive'}
                                      disabled={deleteLoading}
                                      className={`${deleteLoading && 'cursor-not-allowed'}`}  
                                    >
                                      { deleteLoading && <LoadingOutlined /> }
                                      Supprimer
                                    </Button>
                                  </AlertDialogAction>
                              </AlertDialogFooter>
                              </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
            {
              ECSLoading && <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
                </div>
            }
          </div>
          <div className='sm:hidden grid gap-2 justify-center grid-cols-customized'>
            {
              ECSLoading && <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
                </div>
            }
              {
                ecs && ecs.map((element: any, index: any) =>{
                  if (searchEC && !element.nom_ec.includes(searchEC)) {
                    return null;
                  }
                  return(
                  <Card  key={index} className='hover:scale-105 duration-300 bg-gray-50'>
                    <div className='text-center'>
                      <img src={Bg} />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                        { element.nom_ec }
                        </div>
                        <div className='text-xs flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            Semestre : 
                          </div>
                        { element.semestre }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            ET : 
                          </div>
                        { element.et } 
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            ED : 
                          </div>
                        { element.ed }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline'>
                            EP : 
                          </div>
                        { element.ep }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            Credit : 
                          </div>
                        { element.credit_ec }
                        </div>
                        <div className='text-sm flex justify-center'>
                          <div className='text-sm underline mr-2'>
                            Poids : 
                          </div>
                        { element.poids_ec }
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <AlertDialog>
                              <AlertDialogTrigger><Button variant={'destructive'} size={'icon'}><DeleteOutlined/></Button></AlertDialogTrigger>
                              <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Suppression d'un element constitutif</AlertDialogTitle>
                                  <AlertDialogDescription>
                                  Voulez-vous vraiment supprimer cet element ?
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className='m-0 p-0'>
                                    <Button 
                                      onClick={() => handleDelete(element.id_ec)} 
                                      variant={'destructive'}
                                      disabled={deleteLoading}
                                      className={`${deleteLoading && 'cursor-not-allowed'}`}  
                                    >
                                      { deleteLoading && <LoadingOutlined /> }
                                      Supprimer
                                    </Button>
                                  </AlertDialogAction>
                              </AlertDialogFooter>
                              </AlertDialogContent>
                          </AlertDialog>
                          <Button 
                            onClick={() => navigate(`/ec/edit/${element.id_ec}`)} 
                          >
                            <EditOutlined />
                          </Button>
                      </div>
                    </div>
                </Card>
                )
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default EC;