/*import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { ServiceType } from "types/ServicesTypes";
import  { useEffect, useState } from 'react'
import transformPrice from './functions/TransformDateHour/TransformPrice';


interface Props { 
   services: ServiceType[]
}

interface tableDataType { 
    service: string,
    price: number,
    [key: string]: any;
 }

 interface ColumnsTypes { 
    allowsSorting: boolean,
    key: string,
    label: string
}

const PossibleTable = ({services}: Props) => {
    
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
  const [tableData, setTableData] = useState<tableDataType[]>([]);
  const [columns, setColumns] = useState<ColumnsTypes[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

        const createTable = async () => { 
            try {
            const datos = services.map((d) => { 
                return { 
                    service: d.service,
                    price: d.price
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
            if (tableData.length > 0 && columns.length > 0) {
                setShowTable(true);
            } else {
                setShowTable(false);
            }
        }, [tableData, columns]);

        useEffect(() => { 
            createTable()
        }, [])

        const handleSelectionChange = (keys: Set<string>) => {
            setSelectedKeys(keys);
            // Aquí puedes procesar los servicios seleccionados
            const selectedServices = tableData.filter((item) => keys.has(item.service));
            console.log("Servicios seleccionados:", selectedServices);
          };


  return (
    <div className='w-full flex items-center justify-center mt-2 '>
          {showTable ? 
          <div className="w-full flex justify-start">
                  <Table 
               aria-label="Controlled table example with dynamic content"
               selectionMode="multiple"
               selectedKeys={selectedKeys}
               onSelectionChange={handleSelectionChange}
               className="w-3/4 flex items-start justify-start"
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
         </div>
  );
}

export default PossibleTable */