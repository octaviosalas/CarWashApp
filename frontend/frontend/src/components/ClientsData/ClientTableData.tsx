import React, { useEffect, useState } from 'react'
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell} from "@nextui-org/react";
import { ClientType } from 'types/ClientsTypes';
import Loading from '../Spinner/Loading'

interface Props { 
    client: ClientType
}

interface ColumnsTypes { 
    allowsSorting: boolean,
    key: string,
    label: string
}

interface tableDataType {
    ClientType: ClientType;
    [key: string]: any;
}

const ClientTableData = ({client}: Props) => {


    const [tableData, setTableData] = useState<tableDataType>();
    const [columns, setColumns] = useState<ColumnsTypes[]>([]);
    const [showTable, setShowTable] = useState<boolean>(false);


        const createTable = async (client: ClientType) => { 
        try {
            setTableData(client)
                const propiedades = Object.keys(client).filter(propiedad =>  propiedad !== '_id' && propiedad !== '__v' && propiedad !== "clientOf");
                const columnObjects = propiedades.map(propiedad => ({
                    key: propiedad,
                    label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                    allowsSorting: true
                }));

                const modifiedColumnObjects = columnObjects.map(column => {
                    if (column.key === 'name') {
                        return { ...column, label: 'Nombre' };
                    } else if (column.key === 'telephone') {
                    return { ...column, label: 'Telefono' };
                    }  else if (column.key === 'email') {
                    return { ...column, label: 'Email' };
                    }   else if (column.key === 'dni') {
                    return { ...column, label: 'Dni' };
                    }  else {
                            return column;
                        }
                    });

                    setColumns(modifiedColumnObjects);     
                    } catch (error) {
                        console.log(error)
                    }  
        }

        useEffect(() => {
            if (tableData && columns.length > 0) {
            setShowTable(true);
            } else {
            setShowTable(false);
            }
        }, [tableData, columns]);


        useEffect(() => {
            createTable(client);
        }, [client])

  return (
    <> 
   
    <div className='w-full flex items-center justify-center mt-2'>
          {showTable  ? 
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
                    <TableBody items={[tableData]}>
                      {(item) => (
                        <TableRow key={item?._id}>
                        {columns.map((column) => (
                         <TableCell key={column.key} className='text-left text-sm 2xl:text-md'>
                            {item[column.key]}
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

export default ClientTableData

