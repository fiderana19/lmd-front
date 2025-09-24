import { Button } from '@/components/ui/button';
import React, { FunctionComponent } from 'react'

const AdminNotFound: FunctionComponent = () => {
  return (
    <div className='container text-center add py-4'>
        <h1 className='text-black'>Page introuvable ! </h1>
        <Button variant={'link'}>
          <a href='/admin/home' >Page d'acceuil</a>
        </Button>    
      </div>
  )
}

export default AdminNotFound;