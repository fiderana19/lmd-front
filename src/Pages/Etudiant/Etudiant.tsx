import { useState, FunctionComponent } from 'react'
import { EditOutlined, DeleteOutlined, LoadingOutlined, EyeFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetAllEtudiant } from '@/hooks/useGetAllEtudiant';
import { useDeleteEtudiant } from '@/hooks/useDeleteEtudiant';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Navigation from '@/components/navigation/Navigation';

const Etudiant: FunctionComponent = () => {
  const { data: etudiants, isLoading, refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: etudiantDelete, isPending: deleteLoading } = useDeleteEtudiant({action() {
    refetchEtudiant()
  },})
  const [searchEtudiant, setSearchEtudiant] = useState('');
  const navigate = useNavigate();

  function handleDelete(itemId: number) {
    etudiantDelete(itemId);
  }

  return (
    <div>
      <Navigation />
      <div className='pb-5 pt-24'>
        <div className='px-10'>
          <div className='block sm:flex justify-between'>
            <div className='text-xl font-bold font-lato'>LES ETUDIANTS</div>
            <div className='flex justify-end items-center'>
              <Input className='my-1 mx-1 w-52' placeholder='Saisir la matricule...' value={searchEtudiant} onChange={(e) => setSearchEtudiant(e.target.value)}  />
              <Button onClick={() => navigate('/admin/etudiant/create')}>AJOUTER</Button>
            </div>
          </div>
          <div className='my-7'>
            <div className='sm:block hidden'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                    <th className='md:px-6 px-2  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenoms</th>
                    <th className='md:px-6 px-2  py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date de naissance</th>
                    <th className='md:px-6 px-2  py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Lieu de naissance</th>
                    <th className='px-1 py-4  bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                  </tr>
                </thead> 
                { isLoading &&
                  <div className='text-center my-10'>
                    <LoadingOutlined className='text-3xl' />
                    <div>Chargement...</div>
                  </div> 
                }
                <tbody className='bg-white divide-y divide-gray-200'>
                  {
                    etudiants && etudiants.map((et: any, index: any) =>{
                      if (searchEtudiant && !et.matricule.includes(searchEtudiant)) {
                        return null;
                      }
                      return( 
                        <tr key={index}>
                          <td className='md:px-6 px-2 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'> { et.matricule } </td>
                          <td className='md:px-6 px-2  py-4 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 w-10 truncate'> { et.nom }  { et.prenom }  </td>
                          <td className='md:px-6 px-2  py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { dayjs(et.date_naiss).format('DD-MM-YYYY')  } </td>
                          <td className='md:px-6 px-2  py-4 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { et.lieu_naiss } </td>
                          <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center gap-1.5'>
                              <Button 
                                size={'icon'}
                                variant={'secondary'}
                                onClick={() => navigate(`/admin/etudiant/view/${et.id_etudiant}`)} 
                              >
                                <EyeFilled />
                              </Button>
                              <Button 
                                size={'icon'}
                                onClick={() => navigate(`/admin/etudiant/edit/${et.id_etudiant}`)} 
                              >
                                <EditOutlined />
                              </Button>
                              <AlertDialog>
                                  <AlertDialogTrigger><Button variant={'destructive'} size={'icon'}><DeleteOutlined/></Button></AlertDialogTrigger>
                                  <AlertDialogContent>
                                  <AlertDialogHeader>
                                      <AlertDialogTitle>Suppression d'un etudiant</AlertDialogTitle>
                                      <AlertDialogDescription>
                                      Voulez-vous vraiment supprimer cet etudiant ?
                                      </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction className='m-0 p-0'>
                                        <Button 
                                          onClick={() => handleDelete(et.id_etudiant)} 
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
                      )})
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Etudiant;