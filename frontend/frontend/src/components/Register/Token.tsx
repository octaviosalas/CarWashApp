import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import apiBackendUrl from '../../lib/axios';
import {toast} from "react-toastify"
import axios from 'axios';
import { errorRegisterMissedDataType } from 'types/UserTypes'
import { useNavigate } from 'react-router-dom';
import Loading from '../Spinner/Loading';

interface TokenType  { 
   token: number | undefined
}

const Token = () => {

    const [timeLeft, setTimeLeft] = useState<number>(15 * 60); 
    const [token, setToken] = useState<number | undefined>(); 
    const [load, setLoad] = useState<boolean>(false); 
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
       const tokenData : TokenType = ({ 
          token: token
       })
        try {
          const {status, data} = await apiBackendUrl.post("/auth/confirmAccount", tokenData)
          if(status === 401) { 
            toast.success(data, {
              style: { backgroundColor: 'white', color: 'blue' },
              pauseOnHover: false,
              autoClose: 1500
          });
          setLoad(false)
          } else if (status === 200) { 
            toast.success(data, {
              style: { backgroundColor: 'white', color: 'blue' },
              pauseOnHover: false,
              autoClose: 1500
          });
          navigate("/")
          setLoad(false)
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error)
            if (error.response && Array.isArray(error.response.data.errors)) {              
                console.log(error)
                const errorMessage = error.response.data.errors.map((er: errorRegisterMissedDataType) => er.msg)[0]
                console.log(errorMessage)
                toast.error(errorMessage, {
                    style: { backgroundColor: 'white', color: 'red' },
                    pauseOnHover: false,
                    autoClose: 2500
                });
                setLoad(false)
        } 
        }
    }
  }


  return (
    <div className='flex flex-col items-center justify-center mt-64 w-full'>
         <div>
            <img
                className="mx-auto h-36 w-96"
                src="https://i.pinimg.com/originals/ab/61/85/ab618567515f75d1b5ffb840e48b5862.png"
                alt="Your Company"
            />
         </div>
         <div className='mt-12 flex flex-col items-center justify-center'>
             <h4 className='text-xl'>Hemos enviado al correo electronico de registro un token que expirara en 15 minutos.</h4>
             <h1 className='font-black text-4xl mt-4'>{formatTime(timeLeft)}</h1>
         </div>
         <div className='flex flex-col items-center justify-center mt-6 w-1/4'>
            <input type="number" className='h-12 w-full border-2 text-center rounded-lg' placeholder='Token..' onChange={handleChangeToken}></input>
         </div>
         <div className='mt-6'>
            <Button className='bg-blue-500 text-white font-medium text-md w-72 h-12 rounded-lg' onClick={() => sendToken()}>Confirmar mi Cuenta</Button>
         </div>
    </div>
  )
 }



export default Token
