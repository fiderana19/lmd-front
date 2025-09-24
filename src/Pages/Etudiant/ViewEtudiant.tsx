import {  FunctionComponent } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import Bg from '../../assets/pic/home-bg.jpg'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useGetEtudiantById } from '@/hooks/useGetEtudiantById';
import { useGetAllEtudiant } from '@/hooks/useGetAllEtudiant';
import { useDeleteEtudiant } from '@/hooks/useDeleteEtudiant';
import Navigation from '@/components/navigation/Navigation';

const ViewEtudiant: FunctionComponent = () => {
  const req = useParams();
  const etudiantId = Number(req.id);
  const { data: etudiant, isLoading: ecLoading } = useGetEtudiantById(etudiantId ? etudiantId : 0);
  const { refetch: refetchEtudiant } = useGetAllEtudiant();
  const { mutateAsync: etudiantDelete, isPending: deleteLoading } = useDeleteEtudiant({action() {
    refetchEtudiant()
  },})
  const navigate = useNavigate();

  function handleDelete(itemId: number) {
    etudiantDelete(itemId);
    navigate('/etudiant');
  }


  return (
    <div>
      <Navigation />
      <div className='pb-5 pt-24 bg-gray-100 min-h-screen'>
        {
          ecLoading && <div className='my-4 mx-auto w-max'>
            <LoadingOutlined className='text-4xl' />
          </div>
        }
        {
          etudiant && 
          <div className='mx-20'>
            <div className='text-2xl font-bold'>ETUDIANT</div>
            <div className='my-2 flex justify-between gap-4'>
              <div className='bg-white rounded w-1/3'>
                <img src={Bg} alt="" className='w-full h-64 object-cover mx-auto rounded' />
                <div className='p-6'>
                  <div className='mb-2'>Nom de l'etudiant : </div>
                  <div className='border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold'>
                    {etudiant[0].nom} {etudiant[0].prenom}
                  </div>
                </div>
              </div>
              <div className='bg-white rounded w-1/3'>
                <div className='pt-4 px-4 font-semibold text-lg'>
                  Informations
                </div>
                <div className='p-6'>
                  <div className='mb-2'>Matricule : </div>
                  <div className='border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl'>
                    {etudiant[0].matricule}
                  </div>
                  <div className='mt-4 mb-2'>Date de naissance : </div>
                  <div className='border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl'>
                    {etudiant[0].date_naiss}
                  </div>
                  <div className='mt-4 mb-2'>Lieu de naissance : </div>
                  <div className='border rounded border-gray-100 py-2 px-4 text-gray-500 font-bold text-right text-xl'>
                    {etudiant[0].lieu_naiss}
                  </div>
                </div>
              </div>
              <div className='w-1/3'>
                <div className='bg-white rounded'>
                  <div className='pt-4 px-4 font-semibold text-lg'>
                    Actions
                  </div>
                  <div className='p-6'>
                    <div className='flex justify-between items-center'>
                      <div>Modification : </div>
                      <Button onClick={() => navigate(`/etudiant/edit/${etudiant[0].id_etudiant}`)}>Modifier</Button>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                      <div>Suppression : </div>
                        <AlertDialog>
                          <AlertDialogTrigger><Button variant={'destructive'}>Supprimer</Button></AlertDialogTrigger>
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
                                      onClick={() => handleDelete(etudiant[0].id_etudiant)} 
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default ViewEtudiant