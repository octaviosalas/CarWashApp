import { useNavigate } from 'react-router-dom';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { userStore } from '../../store/store';

interface Props { 
    showClients: ()  => void,
    showJobs: () => void,
    showServices: () => void,
    showEstadistics: () => void,
    showMyAccountMenu: () => void,
    showMyExpensesMenu: () => void
}

const Navbar = ({showClients, showJobs, showServices, showEstadistics, showMyAccountMenu, showMyExpensesMenu}: Props) => {

    const { user, setUserAccountData } = userStore();
    const navigate = useNavigate()

    const logOut = () => { 
        setUserAccountData(null)
        if(user === null) { 
            console.log("es null")
            navigate("/login")
        }
    }

  return (
    <div>
        <div className='bg-blue-500 flex items-center justify-between w-screen h-12'>
            <div className='flex items-center gap-4 ml-2'>
            <Dropdown>
                <DropdownTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6 cursor-pointer">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" >
                    <DropdownItem onClick={showMyAccountMenu}>Mi Cuenta</DropdownItem>
                    <DropdownItem onClick={() => logOut()}>Cerrar Sesion</DropdownItem>
                </DropdownMenu>
            </Dropdown>
                <p className='text-white font-medium text-md'>{user?.name}</p>
            </div>
            <div className='flex items-center gap-4 mr-8'>
               
                <p className='font-medium text-white cursor-pointer text-sm 2xl:text-md' onClick={showJobs}>Lavados</p>
                <p className='font-medium text-white cursor-pointer text-sm 2xl:text-md' onClick={showClients}>Clientes</p>
                <p className='font-medium text-white cursor-pointer text-sm 2xl:text-md' onClick={showEstadistics}>Estadisticas</p>
                <p className='font-medium text-white cursor-pointer text-sm 2xl:text-md' onClick={showServices}>Servicios</p>
                <p className='font-medium text-white cursor-pointer text-sm 2xl:text-md' onClick={showMyExpensesMenu}>Gastos</p>


            </div>
        </div>
    </div>
  )
}

export default Navbar


/* 
  <div className='flex items-center gap-4 mr-8'>
               
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6 cursor-pointer" onClick={showJobs}>
                   <title>Lavados</title>
                   <path  stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6 cursor-pointer" onClick={showClients}>
                    <title>Clientes</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6 cursor-pointer" onClick={showEstadistics}>
                    <title>Estadisticas</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6 cursor-pointer"  onClick={showServices}>
                     <title>Servicios</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  stroke="white" className="w-6 h-6 cursor-pointer"  onClick={showMyExpensesMenu}>
                    <title>Gastos</title>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>


            </div>


*/