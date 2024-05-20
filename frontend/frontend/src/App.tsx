import { useEffect, useState } from 'react'
import './App.css'
import apiBackendUrl from './lib/axios'

function App() {

      const getData = async () => { 
          try {
            const respuesta = await apiBackendUrl.get('/users/hola');
            console.log(respuesta.data); 
          } catch (error) {
            console.error('Error al obtener el usuario:', error);
          }
      } 

  useEffect(() => { 
    getData()
  }, [])

  return (
    
      <div className='flex items-center justify-center text-center'>
         <p>App Car Wash</p> 
      </div>
  )
}

export default App
