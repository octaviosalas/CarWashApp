import React, { useEffect, useState, useRef } from 'react'
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell} from "@nextui-org/react";
import transformPrice from '../../functions/TransformDateHour/TransformPrice';

interface serviceData { 
    price: number,
    service: string,
    user: string,
    __v: number,
    _id: string
}

interface JobsOrdersByType { 
    services: string,
    data: serviceData[]
}

interface Props { 
    data: JobsOrdersByType[]
}

interface ColumnsTypes { 
    allowsSorting: boolean,
    key: string,
    label: string
}

interface tableDataType { 
   cantidad: number,
   servicio: string,
   facturacion: number,
   [key: string]: any;
}

const TableEstadistics = ({data}: Props) => {


    const [tableData, setTableData] = useState<tableDataType[]>([]);
    const [columns, setColumns] = useState<ColumnsTypes[]>([]);
    const [showTable, setShowTable] = useState<boolean>(false);
    const tableRef = useRef(null);


    const createTable = async () => { 
       try {
          const datos = data.map((d) => { 
             return { 
                servicio: d.services,
                facturacion: d.data.reduce((acc, el) => acc + el.price, 0),
                cantidad: d.data.length
             }
          })
          setTableData(datos)
            const propiedades = Object.keys(datos[0])
            const columnObjects = propiedades.map(propiedad => ({
                key: propiedad,
                label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                allowsSorting: true
            }));

            setColumns(columnObjects);       
       } catch (error) {
        console.log(error)
       }  
    }

    useEffect(() => { 
      console.log("soy show table", showTable)
    }, [showTable])

    useEffect(() => {
      if (tableData.length > 0 && columns.length > 0) {
          setShowTable(true);
      } else {
          setShowTable(false);
      }
   }, [tableData, columns]);


    useEffect(() => { 
        createTable()
    }, [])

  return (
    <> 
   
    <div className='w-full flex items-center justify-center mt-2'>
          {showTable ? 
               <Table 
                    columnAutoWidth={true} 
                    columnSpacing={10}  
                    aria-label="Selection behavior table example with dynamic content"   
                    className="w-full mt-2  max-h-[350px] 2xl:max-h-[600px] h-auto text-center shadow-left-right shadow-lg shadow-top shadow-left-right overflow-y-auto  rounded-xl "
                  >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key} className="text-left bg-blue-500 text-white text-sm 2xl:text-md h-10"> {column.label}  </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={tableData}>
                      {(item) => (
                        <TableRow key={item.servicio}>
                        {columns.map((column) => (
                            <TableCell key={column.key} className='text-left text-sm 2xl:text-md'>
                               {column.key === "facturacion"? transformPrice(item[column.key]) : item[column.key]}
                            </TableCell>
                        ))}
                       </TableRow>
                      )}
                        </TableBody> 
                  </Table> : <p>Sin datos para mostrar</p>}
         </div>
    </>
  )
}

export default TableEstadistics
