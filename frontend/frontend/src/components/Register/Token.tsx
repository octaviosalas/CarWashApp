import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import apiBackendUrl from '../../lib/axios';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
import handleError from '../../utils/AxiosErrorFragment';
import Loading from '../Spinner/Loading';

interface TokenType  { 
   token: number | undefined
}

const Token = () => {

    const [timeLeft, setTimeLeft] = useState<number>(15 * 60); 
    const [token, setToken] = useState<number | undefined>(); 
    const [load, setLoad] = useState<boolean>(false); 
    const [tryAgain, setTryAgain] = useState<boolean>(false); 
    const navigate = useNavigate()


    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
      if (timeLeft > 0) {
        const timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId); 
      }
  
      let timerId;
      clearTimeout(timerId);
    }, [timeLeft]);

    const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => { 
       setToken(Number(e.target.value))
    }

    const sendToken = async () => { 
      setLoad(true)
      try {
        if(token === undefined ) { 
            toast.error("El token no puede ser vacio", {
              style: { backgroundColor: 'white', color: 'blue' },
              pauseOnHover: false,
              autoClose: 1500
          });
          setLoad(false)
        } else { 
          const tokenData : TokenType = ({ 
            token: token
          })
           const {data, status} = await apiBackendUrl.post("/auth/confirmAccount", tokenData);
           if (status === 202) { 
            toast.error(data.error, {
               style: { backgroundColor: 'white', color: 'blue' },
               pauseOnHover: false,
               autoClose: 4500
           });
           setLoad(false)
           setTryAgain(true)
           } else if (status === 200) { 
             toast.success(data, {
               style: { backgroundColor: 'white', color: 'blue' },
               pauseOnHover: false,
               autoClose: 1500
           });
           navigate("/login")
           setLoad(false)
           }
        }    
         } catch (error) {
          handleError(error, setLoad)
     }
     
      
  }


  return (
    <div className='flex flex-col items-center justify-center mt-24 2xl:mt-36 w-full'>
         <div>
            <img
                className="mx-auto h-36 w-96"
                src="https://i.pinimg.com/originals/ab/61/85/ab618567515f75d1b5ffb840e48b5862.png"
                alt="Your Company"
            />
         </div>
         <div className='mt-12 flex flex-col items-center justify-center'>
              <h4 className='text-xl text-blue-600 font-medium'> Hemos enviado un token de confirmación a tu correo electrónico. Este token caducará en 15 minutos.  </h4>
              <h4 className='text-md'> Por favor, verifica tu bandeja de entrada y sigue las instrucciones para completar tu registro. Gracias </h4>
             <h1 className='font-black text-4xl mt-4'>{formatTime(timeLeft)}</h1>
         </div>
         <div className='flex flex-col items-center justify-center mt-6 w-1/4'>
            <input type="number" className='h-12 w-full border-2 text-center rounded-lg' placeholder='Token..' onChange={handleChangeToken}></input>
         </div>
         <div className='mt-6'>
            <Button className='bg-blue-500 text-white font-medium text-md w-72 h-12 rounded-lg' onClick={() => sendToken()}>Confirmar mi Cuenta</Button>
         </div>

         {load ? <Loading /> : null}
         
        {tryAgain ?
         <div className='mt-6'>
             <p className='text-smn text-blue-600 font-medium underline cursor-pointer' onClick={() => navigate("/login")}>Iniciar sesion y recibir nuevo Token</p>
         </div> : null}
    </div>
  )
 }



export default Token
