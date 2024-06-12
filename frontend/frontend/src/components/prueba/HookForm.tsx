import React from 'react'
import {appendErrors, useForm} from "react-hook-form"

interface FormType { 
    Nombre: string,
    Direccion: string,
    Edad: number,
    Pais: string
}

const HookForm = () => {

     const {register, handleSubmit, formState: {errors}} = useForm<FormType>()

     const onSubmit = (data: FormType) => { 
        console.log(data)
     }


    return (
    <div className='flex flex-col items-center justify-center'>
        <div>
              <h2>Form Hook</h2>
        </div>
        <form className='flex flex-col items-center border w-96 shadow-xl' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
                <label className='mt-4 '>Nombre</label>
                <input className='w-96 h-6 rounded-lg border' type="text" placeholder='Nombre..' {...register("Nombre", { 
                    required: true
                })}/>
                {errors.Nombre?.type === "required" && <p>error</p>}
            </div>
            <div className='flex flex-col'>
                <label className='mt-4 '>Direccion</label>
                <input className='w-96 h-6 rounded-lg border' type="text" placeholder='Contraseña..' {...register("Direccion", { 
                    required: true
                })} />
                {errors.Direccion?.type === "required" && <p>error</p>}

            </div>
            <div className='flex flex-col'>
                <label className='mt-4 '>Edad</label>
                <input className='w-96 h-6 rounded-lg border' type="text" placeholder='Contraseña..' {...register("Edad", { 
                    required: true
                })}/>
                {errors.Edad?.type === "required" && <p>error</p>}

            </div>
            <div className='flex flex-col'>
            <label className='mt-4 '>Pais</label>
               <select  className='w-96 h-6 rounded-lg border' {...register("Pais", { 
                required: true
               })}>
                {errors.Pais?.type === "required" && <p>error</p>}
                  <option>Argentina</option>
                  <option>Bolivia</option>
                  <option>Peru</option>
                  <option>USA</option>
               </select>
            </div>
            <div className='mt-4'>
                <input type="submit" className='bg-blue-500 w-72 rounded-lg mb-2'/>
            </div>
        </form>
    </div>
  )
}

export default HookForm



/* 
import React from 'react'
import {appendErrors, useForm} from "react-hook-form"

interface FormType { 
    Nombre: string,
    Direccion: string,
    Edad: number,
    Pais: string
}

const HookForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormType>()

    const onSubmit = (data: FormType) => { 
         console.log(data)
    }


    return (
    <div className='flex flex-col items-center justify-center'>
        <div>
              <h2>Form Hook</h2>
        </div>
        <form className='flex flex-col items-center border w-96 shadow-xl' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
                <label className='mt-4 '>Nombre</label>
                <input className='w-96 h-6 rounded-lg border' type="text" placeholder='Nombre..' {...register("Nombre", { 
                    required: true,
                    maxLength: 10
                })}/>
                {errors.Nombre?.type === "required" && <p className='font-bold text-red-600 mt-2 text-sm'>El nombre es requerido</p>}
                {errors.Nombre?.type === "maxLength" && <p className='font-bold text-red-600 mt-2 text-sm'>El nombre es muy largo</p>}
            </div>
            <div className='flex flex-col'>
                <label className='mt-4 '>Direccion</label>
                <input className='w-96 h-6 rounded-lg border' type="text" placeholder='Contraseña..' {...register("Direccion")}/>
            </div>
            <div className='flex flex-col'>
                <label className='mt-4 '>Edad</label>
                <input className='w-96 h-6 rounded-lg border' type="text" placeholder='Contraseña..' {...register("Edad")}/>
            </div>
            <div className='flex flex-col'>
            <label className='mt-4 '>Pais</label>
               <select  className='w-96 h-6 rounded-lg border' {...register("Pais")}>
                  <option>Argentina</option>
                  <option>Bolivia</option>
                  <option>Peru</option>
                  <option>USA</option>
               </select>
            </div>
            <div className='mt-4'>
                <input type="submit" className='bg-blue-500 w-72 rounded-lg mb-2'/>
            </div>
        </form>
    </div>
  )
}

export default HookForm

*/