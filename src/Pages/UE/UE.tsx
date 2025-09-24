import { useState, FunctionComponent } from 'react'
import { EditOutlined, DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetAllUE } from '@/hooks/useGetAllUE';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useDeleteUE } from '@/hooks/useDeleteUE';
import Navigation from '@/components/navigation/Navigation';

const UE: FunctionComponent = () => {
  const { data: ue, isLoading, refetch: refetchUE } = useGetAllUE();
  const { mutateAsync: ueDelete, isPending: deleteLoading } = useDeleteUE({action() {
    refetchUE()
  },})
  const navigate = useNavigate();
  const [searchUE, setSearchUE] = useState('');

  const handleDelete = (id: number) => {
    ueDelete(id);
  }

  return (
    <div>
      <Navigation />
      <div className='pb-5 pt-24'>
        <div className='px-10'>
          <div className='block sm:flex justify-between'>
            <div className='text-xl font-bold font-lato'>LES UNITES D'ENSEIGNEMENTS</div>
            <div className='flex justify-end items-center gap-1.5'>
              <Input className='my-1 mx-1 w-52' placeholder="Saisir le nom de l'UE..." value={searchUE} onChange={(e) => setSearchUE(e.target.value)}  />
              <Button onClick={() => navigate('/admin/ue/create')} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
            </div>
          </div>
          <div className='my-7'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom de l'unite</th>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Credit</th>
                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                  </tr>
                </thead> 
                <tbody className='bg-white divide-y divide-gray-200'>
                  {
                    ue && ue.map((uee: any, index: any) => {
                      if (searchUE && !uee.nom_ue.includes(searchUE)) {
                        return null;
                      }
                      return(
                        <tr key={index}>
                          <td className='md:px-6 px-2 py-4 sm:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { uee.nom_ue }</td>
                          <td className='md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { uee.credit_ue }</td>
                          <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                          <div className='flex justify-center gap-1.5'>
                            <Button 
                              size={'icon'}
                              onClick={() => navigate(`/admin/ue/edit/${uee.id_ue}`)} 
                            >
                              <EditOutlined />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger><Button variant={'destructive'} size={'icon'}><DeleteOutlined/></Button></AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Suppression d'un unité d'enseignement</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Voulez-vous vraiment supprimer cet unité ?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className='m-0 p-0'>
                                    <Button 
                                      onClick={() => handleDelete(uee.id_ue)}
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
              isLoading && <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UE;