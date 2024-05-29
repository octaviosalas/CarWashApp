import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

const Token = () => {

    const [timeLeft, setTimeLeft] = useState<number>(15 * 60); 

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
            <input type="number" className='h-12 w-full border-2 text-center rounded-lg' placeholder='Token..'></input>
         </div>
         <div className='mt-6'>
            <Button className='bg-blue-500 text-white font-medium text-md w-72 h-12 rounded-lg'>Confirmar mi Cuenta</Button>
         </div>
    </div>
  )
}

export default Token
