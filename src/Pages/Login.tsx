import { FunctionComponent } from 'react';
import Typewriter from '../components/Typewritter';
import Bg from '../assets/pic/home-bg.jpg'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { LoginType } from '../types/User';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidation } from '@/validation/user.validation';

const Login: FunctionComponent = () => {
    const { handleSubmit: submit, formState: { errors }, control } = useForm<LoginType>({
        resolver: yupResolver(LoginValidation)
    });
   
    const text = "LMD, L'APPLICATION DE GESTION DE NOTE UNIVERSITAIRE RESPECTANT LE REGIME LICENCE-MASTER-DOCTORAT";

    const submitLogin = async (data: LoginType) => {
        console.log(data);
    }

  return (
    <div className='h-screen'>
        <div className='block sm:justify-between sm:flex h-full'>
            <div className='flex flex-col justify-center w-2/3 mx-20'>
                <div className='flex flex-col justify-center w-full mb-4'>
                    <img src={Bg} className='w-48' />
                </div>                
                <div className='sm:text-3xl text-2xl text-center sm:text-left font-bold font-lato'>
                    <Typewriter text={text} />
                </div>
            </div>
            <div className='bg-gray-400 w-1/3 flex flex-col justify-center'>
                <form onSubmit={submit(submitLogin)} className='w-60 mx-auto'>
                    <div className='text-3xl font-bold text-center mb-10'>Connexion</div>
                    <Label htmlFor='username' className='mb-1'>Utilisateur :</Label>
                    <Controller 
                        name='username'
                        control={control}
                        render={({
                            field: { value, onChange }
                        }) => (
                            <Input value={value} onChange={onChange} className={`${errors?.username && 'border border-red-500 text-red-500 rounded'}`}  />
                        )}
                    />
                    { errors?.username && <div className='text-xs text-red-500 text-left w-full'>{ errors?.username.message }</div> }
                    <Label htmlFor='password' className='mb-1 mt-8'>Mot de passe :</Label>
                    <Controller 
                        name='password'
                        control={control}
                        render={({
                            field: { value, onChange }
                        }) => (
                            <Input value={value} onChange={onChange} className={`${errors?.password && 'border border-red-500 text-red-500 rounded'}`}  />
                        )}
                    />
                    { errors?.password && <div className='text-xs text-red-500 text-left w-full'>{ errors?.password.message }</div> }
                    <div className='w-full my-4'>
                        <Button size={'lg'} type='submit' className='w-full'>Se connecter</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login;