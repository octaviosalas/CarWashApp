import React from 'react'
import { ExpensesType } from 'types/ExpensesTypes'


interface Props { 
  detail: ExpensesType  | undefined,
  goBack: () => void,
  update: () => void
}

const DeleteExpense = ({detail, goBack, update}: Props) => {
  return (
    <div>
        diofhodfi
    </div>
  )
}

export default DeleteExpense
