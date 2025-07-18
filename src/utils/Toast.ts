import { Bounce, toast } from 'react-toastify'

type ToastProps = {
    type?: any,
    message?: any
}

export const showToast = ({ message, type } : ToastProps) => {
    toast(message , {
        type: type,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:  Bounce 
    })
}