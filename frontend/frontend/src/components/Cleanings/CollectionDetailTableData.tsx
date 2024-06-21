import {useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { CollectionsType } from '../../types/CollectionsType'
import transformPrice from '../../functions/TransformDateHour/TransformPrice';
import formatDate from '../../functions/TransformDateHour/TransformDate';

interface ColumnsTypes { 
    allowsSorting: boolean,
    key: string,
    label: string
}

interface Props { 
    detail: CollectionsType | undefined,
}

interface tableDataType {
    CollectionsType
}

const CollectionDetailTableData = ({detail}: Props) => {

    const [load, setLoad] = useState<boolean>(false)
    const [tableData, setTableData] = useState<tableDataType>();
    const [columns, setColumns] = useState<ColumnsTypes[]>([]);
    const [showTable, setShowTable] = useState<boolean>(false);

    console.log(detail)

    useEffect(() => {
        if (tableData && columns.length > 0) {
        setShowTable(true);
        } else {
        setShowTable(false);
        }
    }, [tableData, columns]);


    useEffect(() => {
        createTable(detail);
    }, [detail])


    const createTable = async (detail: CollectionsType) => { 
        try {
            setTableData(detail)
                const propiedades = Object.keys(detail).filter(propiedad =>  propiedad !== '_id' && propiedad !== '__v' && propiedad !== "jobReference" && propiedad !== "client" && propiedad !== "user");
                const columnObjects = propiedades.map(propiedad => ({
                    key: propiedad,
                    label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                    allowsSorting: true
                }));

                const modifiedColumnObjects = columnObjects.map(column => {
                    if (column.key === 'paymentMethod') {
                        return { ...column, label: 'Forma de Pago' };
                    } else if (column.key === 'date') {
                    return { ...column, label: 'Fecha' };
                    }  else if (column.key === 'amount') {
                    return { ...column, label: 'Monto' };
                    }   else {
                            return column;
                        }
                    });
                    setColumns(modifiedColumnObjects);     
                    } catch (error) {
                        console.log(error)
                    }  
        }

  return (
    <div className='w-full flex items-center justify-center'>
        {showTable  ? 
               <Table     
                    aria-label="Selection behavior table example with dynamic content"             
                    className="w-3/4 mt-2 max-h-[350px] 2xl:max-h-[600px] h-auto text-center shadow-left-right shadow-lg shadow-top shadow-left-right overflow-y-auto  rounded-xl "
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
                            {column.key === "amount" ? ( 
                                transformPrice(item[column.key])
                            ) : column.key === "date" ? ( 
                                formatDate(item[column.key])
                            ) : item[column.key]}
                       </TableCell>
                         ))}
                       </TableRow>
                      )}
                        </TableBody> 
                  </Table> : <p>Sin datos para mostrar</p>}
    </div>
  )
}

export default CollectionDetailTableData
