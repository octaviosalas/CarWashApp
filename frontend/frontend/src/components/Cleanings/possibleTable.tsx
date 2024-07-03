import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { ServiceType } from "types/ServicesTypes";
import  { useEffect, useState } from 'react'
import transformPrice from '../../functions/TransformDateHour/TransformPrice';
import { Button } from "@nextui-org/react";
import { getDate, getHour } from '../../functions/TransformDateHour/HourAndDate'
import { ClientVehiclesType } from "types/VehiclesTypes";
import handleError from "../../utils/AxiosErrorFragment";
import { newJobType } from 'types/JobsTypes'
import {toast} from "react-toastify"
import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import Loading from "../Spinner/Loading";


interface Props { 
    services: ServiceType[],
    vehicleChoosen?: ClientVehiclesType,
    client: string,
    resetFormData: () => void,
    updateJobs: () => void
}

interface ColumnsTypes { 
    allowsSorting: boolean,
    key: keyof ServiceType,
    label: string
}

const PossibleTable = ({services, vehicleChoosen, client, updateJobs, resetFormData}: Props) => {
    
            const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
            const [tableData, setTableData] = useState<ServiceType[]>([]);
            const [columns, setColumns] = useState<ColumnsTypes[]>([]);
            const [showTable, setShowTable] = useState<boolean>(false);
            const [totalAmount, setTotalAmount] = useState<number>(0);
            const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
            const [loading, setLoading] = useState<boolean>(false)

            const date = getDate()
            const hour = getHour().toString()
            const user = userStore(state => state.user)


           const createTable = async (services:  ServiceType[]) => { 
            try {       
                setTableData(services)
                const propiedades = Object.keys(services[0]) as (keyof ServiceType)[];
                const filterProps = propiedades.filter(prop => prop !== "_id" && prop !== "__v" && prop !== "user")
                const columnObjects = filterProps.map(propiedad => ({
                    key: propiedad,
                    label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                    allowsSorting: true
                }))
                const columnsNameUpdated = columnObjects.map(column => {
                    if (column.key === 'service') {
                        return { ...column, label: 'Servicio' };
                    } else if (column.key === 'price') {
                    return { ...column, label: 'Precio' };
                    }  else {
                        return column;
                     }
                    });

                setColumns(columnsNameUpdated);       
                } catch (error) {
                console.log(error)
                }  
            }

            useEffect(() => {
                if (tableData.length > 0 && columns.length > 0) {
                    setShowTable(true);
                } else {
                    setShowTable(false);
                }
            }, [tableData, columns]);


            useEffect(() => { 
                createTable(services)
            }, [])

            const handleSelectionChange = (keys: "all" | Set<React.Key> | React.Key) => {
                if (keys === "all") {
                  setSelectedKeys(new Set(tableData.map(item => item.service)));
                  const total = tableData.reduce((acc, el) => acc + el.price, 0);
                  setTotalAmount(total);
                } else if (keys instanceof Set) {
                  setSelectedKeys(keys as Set<string>);
                  const selectedServices = tableData.filter((item) => keys.has(item.service));
                  const total = selectedServices.reduce((acc, el) => acc + el.price, 0);
                  setTotalAmount(total);
                  console.log("Servicios seleccionados:", selectedServices);
                  setSelectedServices(selectedServices)
                }
            };

            const createJob = async () => {
                if(vehicleChoosen === undefined) { 
                    toast.error("El vehiculo del cliente es obligatorio", {
                        style: { backgroundColor: 'white', color: 'blue' },
                        pauseOnHover: false,
                        autoClose: 1500
                    });
                } else { 
                    setLoading(true)
                    const jobData : newJobType  = ({
                        date: date,
                        hour: hour,
                        typeOfJob: selectedServices,
                        amount: selectedServices.reduce((acc, el) => acc + el.price, 0),
                        vehicle: vehicleChoosen ? vehicleChoosen._id : undefined
                    })
                    try {
                        const {data} = await apiBackendUrl.post(`/jobs/createJob/${user?._id}/${client}`, jobData);
                        console.log(data)
                        updateJobs()
                            toast.success("El lavado se guardó correctamente", {
                                style: { backgroundColor: 'white', color: 'blue' },
                                pauseOnHover: false,
                                autoClose: 1500
                            });
                            setLoading(false)
                            setSelectedServices([])
                            resetFormData()
                    } catch (error) {
                        handleError(error, setLoading)
                    } 
                }
                
            };


  return (
    <div className='w-full flex flex-col items-center justify-center mt-2 '>
          {showTable ? 
          <div className="w-full flex flex-col justify-start">
                <p className="ml-2 font-medium text-sm xl:text-md text-black">Tus Servicios</p>
                <Table 
               aria-label="Controlled table example with dynamic content"
               selectionMode="multiple"
               selectedKeys={selectedKeys}
               onSelectionChange={handleSelectionChange}
               className="w-3/4 flex items-start justify-start mt-2"
                  >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key} className="text-left bg-blue-500 text-white w-full text-sm 2xl:text-md h-10"> {column.label}  </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={tableData}>
                      {(item) => (
                        <TableRow key={item.service}>
                        {columns.map((column) => (
                            <TableCell key={column.key} className='text-left text-sm 2xl:text-md'>
                               {column.key === "price"? transformPrice(item[column.key]) : item[column.key]}
                            </TableCell>
                        ))}
                       </TableRow>
                      )}
                        </TableBody> 
                  </Table> </div> : <p>Sin datos para mostrar</p>}

                  {totalAmount > 0 && selectedServices.length > 0 ? 
                    <div className="w-full "> 
                        <div className="flex items-center text-center justify-start mt-6 bg-blue-500 h-10 text-white font-medium w-3/4 rounded-lg">
                            <p className="ml-2">Valor del servicio: {transformPrice(totalAmount)}</p>
                        </div> 

                      
                        <div className='flex items-center gap-6 mt-5'>
                            <Button className='bg-blue-500 font-medium text-white w-1/4' onClick={() => createJob()}>Confirmar</Button>
                            <Button className='bg-gray-400 font-medium text-white  w-1/4'>Cancelar</Button>
                        </div>

                        {loading ? <div className="flex items-center justify-center mt-6"> <Loading/> </div> : null}
                      
                    </div> : null}

              
         </div>
  );
}

export default PossibleTable 
